#!/usr/bin/env node
/**
 * Step 2 of `npm run build:fonts`: slice the prepared CJK sources into unicode-range
 * chunks and emit the @font-face rules for them.
 *
 * All four faces are published under a single CSS family, `SiriusCJK`, distinguished
 * only by font-weight / font-style. That is the browser-side equivalent of WezTerm's
 * `font_rules`: one family name, four physical fonts, and the browser picks per run of
 * text. The Latin side does the same thing with `Monaspace` (see custom.scss).
 *
 *   weight  style   face                     role in the WezTerm config
 *   400     normal  GenRyuMin2 TC R          kanji_regular
 *   700     normal  GenRyuMin2 TC B          kanji_bold
 *   400     italic  LXGW WenKai Mono NF R    kanji_italic
 *   700     italic  Yozai Bold               kanji_bold_italic
 *
 * NOTE: the two "italic" faces are upright fonts. Declaring them as font-style: italic
 * makes the browser substitute them for italic text *without slanting them*, which is
 * exactly what WezTerm does. This is intentional — do not "fix" it by adding an oblique
 * transform, and do not let font-synthesis kick in.
 *
 * Run `npm run build:fonts` rather than this file directly; the npm script runs the
 * Python preparation step first.
 */

import { fontSplit } from "cn-font-split"
import { readFile, writeFile, rm, mkdir, readdir, unlink } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"

const SRC_DIR = "build/cjk-sources"
const FONT_DIR = "quartz/static/fonts/cjk"
const JIGMO_DIR = "quartz/static/fonts/jigmo"
const SCSS_OUT = "quartz/styles/fonts-cjk.scss"
const FAMILY = "SiriusCJK"
const JIGMO_FAMILY = "SiriusJigmo"

/** Slice size. 70 KB keeps a typical page at a handful of requests without producing
 *  thousands of files; cn-font-split treats it as a target, not a hard cap. */
const CHUNK_SIZE = 70 * 1024

const ROLES = [
  { id: "genryumin-r", weight: "400", style: "normal", label: "GenRyuMin2 TC R" },
  { id: "genryumin-b", weight: "700", style: "normal", label: "GenRyuMin2 TC B" },
  { id: "lxgw-wenkai-mono", weight: "400", style: "italic", label: "LXGW WenKai Mono NF R" },
  { id: "yozai-b", weight: "700", style: "italic", label: "Yozai Bold" },
]

/**
 * Jigmo, self-hosted. It is the last-resort CJK fallback: GlyphWiki-derived, covers
 * CJK Ext A-I, and is deliberately plain — its job is to keep rare ideographs from
 * becoming tofu boxes, not to look good. Declared under its own family name rather than
 * joining SiriusCJK, because it carries a single weight and no italic; folding it in
 * would make it answer for bold and italic runs it cannot render.
 *
 * Set `theme.typography.jigmoFirst: true` in quartz.config.yaml to also give it the
 * first slot of the body stack — see sirius-site-assets.
 */
const JIGMO = { id: "jigmo", label: "Jigmo" }

/** cn-font-split writes these next to the slices; none of them belong in the site. */
const STRAY_OUTPUTS = ["index.html", "index.proto", "reporter.bin", "result.css"]

if (!existsSync(SRC_DIR)) {
  console.error(`✗ ${SRC_DIR}/ not found — run scripts/prepare-cjk-sources.py first.`)
  process.exit(1)
}

const blocks = []
let totalBytes = 0
let totalSlices = 0

// --- Jigmo -------------------------------------------------------------------------
// Trimmed to the BMP block by the Python step, then sliced under its own family.
{
  const input = path.join(SRC_DIR, `${JIGMO.id}.ttf`)
  if (!existsSync(input)) {
    console.error(`✗ missing prepared source: ${input}`)
    process.exit(1)
  }
  await rm(JIGMO_DIR, { recursive: true, force: true })
  await mkdir(JIGMO_DIR, { recursive: true })

  process.stdout.write(`  slicing ${JIGMO.label} … `)
  await fontSplit({
    input: new Uint8Array(await readFile(input)),
    outDir: JIGMO_DIR,
    targetType: "woff2",
    chunkSize: CHUNK_SIZE,
    testHtml: false,
    reporter: false,
    fontFeature: true,
    css: {
      fontFamily: JIGMO_FAMILY,
      fontWeight: "400",
      fontStyle: "normal",
      fontDisplay: "swap",
    },
  })

  const css = await readFile(path.join(JIGMO_DIR, "result.css"), "utf8")
  for (const stray of STRAY_OUTPUTS) await unlink(path.join(JIGMO_DIR, stray)).catch(() => {})

  const files = await readdir(JIGMO_DIR)
  const bytes = (
    await Promise.all(files.map(async (f) => (await readFile(path.join(JIGMO_DIR, f))).byteLength))
  ).reduce((a, b) => a + b, 0)

  blocks.push(
    `// ${JIGMO.label} — 400 normal — ${files.length} slices, ${(bytes / 1e6).toFixed(2)} MB\n` +
      css
        .replace(/url\("\.\//g, `url("/static/fonts/jigmo/`)
        .replace(/^\/\*[\s\S]*?\*\/\s*/, "")
        .trim(),
  )
  totalBytes += bytes
  totalSlices += files.length
  console.log(`${files.length} slices, ${(bytes / 1e6).toFixed(2)} MB`)
}

for (const role of ROLES) {
  const input = path.join(SRC_DIR, `${role.id}.ttf`)
  if (!existsSync(input)) {
    console.error(`✗ missing prepared source: ${input}`)
    process.exit(1)
  }

  const outDir = path.join(FONT_DIR, role.id)
  // Wipe first: slice filenames are content hashes, so stale ones would otherwise pile
  // up forever and ship with the site.
  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })

  process.stdout.write(`  slicing ${role.label} (${role.weight} ${role.style}) … `)

  await fontSplit({
    input: new Uint8Array(await readFile(input)),
    outDir,
    targetType: "woff2",
    chunkSize: CHUNK_SIZE,
    testHtml: false,
    reporter: false,
    fontFeature: true,
    css: {
      fontFamily: FAMILY,
      fontWeight: role.weight,
      fontStyle: role.style,
      fontDisplay: "swap",
    },
  })

  const css = await readFile(path.join(outDir, "result.css"), "utf8")

  for (const stray of STRAY_OUTPUTS) {
    await unlink(path.join(outDir, stray)).catch(() => {})
  }

  const files = await readdir(outDir)
  const bytes = (
    await Promise.all(files.map(async (f) => (await readFile(path.join(outDir, f))).byteLength))
  ).reduce((a, b) => a + b, 0)

  // cn-font-split emits `url("./<hash>.woff2")`, relative to its own outDir. The
  // stylesheet lives in quartz/styles/, so rewrite to the site-absolute path the
  // Static emitter will serve them from.
  const rewritten = css
    .replace(/url\("\.\//g, `url("/static/fonts/cjk/${role.id}/`)
    .replace(/^\/\*[\s\S]*?\*\/\s*/, "") // drop cn-font-split's provenance banner

  blocks.push(
    `// ${role.label} — ${role.weight} ${role.style} — ${files.length} slices, ` +
      `${(bytes / 1e6).toFixed(2)} MB\n${rewritten.trim()}`,
  )

  totalBytes += bytes
  totalSlices += files.length
  console.log(`${files.length} slices, ${(bytes / 1e6).toFixed(2)} MB`)
}

const header = `// GENERATED by scripts/build-fonts.mjs — do not edit by hand.
//
// @font-face rules for the self-hosted CJK faces, sliced by unicode-range so a visitor
// only downloads the chunks covering characters actually on the page.
//
// The four SiriusCJK faces share one family name and differ only in weight/style, so
// the browser performs the same regular/bold/italic/bold-italic dispatch that
// WezTerm's font_rules does. The two italic entries are upright fonts by design —
// see the comment block in scripts/build-fonts.mjs before changing anything here.
//
// ${JIGMO_FAMILY} is a separate family: single weight, no italic, last-resort coverage.
//
// Which family leads the body stack is controlled by theme.typography.jigmoFirst in
// quartz.config.yaml, not here.
//
// Regenerate with: npm run build:fonts
// Total: ${totalSlices} slices, ${(totalBytes / 1e6).toFixed(2)} MB

`

await writeFile(SCSS_OUT, header + blocks.join("\n\n") + "\n")

console.log(`✓ ${totalSlices} slices, ${(totalBytes / 1e6).toFixed(2)} MB total → ${FONT_DIR}/`)
console.log(`✓ wrote ${SCSS_OUT}`)
