#!/usr/bin/env node
/**
 * Verify every /static/ reference in the built site resolves to a file that was emitted.
 *
 * Why this exists: Quartz's CrawlLinks transformer lowercases URL paths in note content,
 * but the core Static emitter copies quartz/static/** verbatim, preserving case. So an
 * asset named `Foo.jpg` referenced from a note becomes `./static/foo.jpg` in the HTML and
 * 404s on any case-sensitive host — silently, with no build warning. That shipped once
 * during the Quartz 5 migration.
 *
 * Rule this enforces: anything under quartz/static/ that a note references must have a
 * lowercase filename. (Fonts are exempt in practice because they are only referenced from
 * custom.scss, and CSS urls are not rewritten — but keeping them lowercase does no harm.)
 *
 * Usage: node .siriusuna/check-static-refs.mjs [publicDir]
 */

import { readFileSync } from "node:fs"
import { existsSync } from "node:fs"
import { glob } from "node:fs/promises"
import path from "node:path"

const publicDir = path.resolve(process.argv[2] ?? "public")

if (!existsSync(publicDir)) {
  console.error(`✗ ${publicDir} does not exist — run \`npx quartz build\` first.`)
  process.exit(1)
}

/** Read baseUrl from quartz.config.yaml so self-referencing absolute URLs can be checked too. */
function readBaseUrl() {
  try {
    const cfg = readFileSync("quartz.config.yaml", "utf8")
    return cfg.match(/^\s*baseUrl:\s*["']?([^"'\s#]+)/m)?.[1] ?? null
  } catch {
    return null
  }
}

const baseUrl = readBaseUrl()

// Relative refs (./static/…, ../static/…, static/…) — CrawlLinks rewrites these.
const RELATIVE_REF = /(?:src|href)="((?:\.{1,2}\/)*static\/[^"]+)"/g
// Absolute refs back at this same site. CrawlLinks leaves these alone, so they keep whatever
// case the note author typed and break independently of the relative ones.
const ABSOLUTE_REF = baseUrl
  ? new RegExp(
      `(?:src|href)="https?://${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(/static/[^"]+)"`,
      "g",
    )
  : null

let checked = 0
const missing = new Map()

function record(ref, entry) {
  if (!missing.has(ref)) missing.set(ref, [])
  missing.get(ref).push(entry)
}

for await (const entry of glob("**/*.html", { cwd: publicDir })) {
  const file = path.join(publicDir, entry)
  const html = readFileSync(file, "utf8")

  for (const [, ref] of html.matchAll(RELATIVE_REF)) {
    checked++
    const target = path.resolve(path.dirname(file), decodeURIComponent(ref))
    if (!existsSync(target)) record(ref, entry)
  }

  if (ABSOLUTE_REF) {
    for (const [, urlPath] of html.matchAll(ABSOLUTE_REF)) {
      checked++
      const target = path.join(publicDir, decodeURIComponent(urlPath))
      if (!existsSync(target)) record(`https://${baseUrl}${urlPath}`, entry)
    }
  }
}

if (missing.size === 0) {
  console.log(`✓ all ${checked} /static/ references resolve`)
  process.exit(0)
}

console.error(`✗ ${missing.size} unresolved /static/ reference(s) out of ${checked} checked:\n`)
for (const [ref, pages] of missing) {
  console.error(`  ${ref}`)
  console.error(`    on ${pages.length} page(s), e.g. ${pages[0]}`)
  const base = path.basename(ref)
  if (base !== base.toLowerCase()) {
    console.error(`    hint: filename is not lowercase`)
  } else {
    console.error(`    hint: is the file present under quartz/static/ with this exact name?`)
  }
}
console.error(
  `\nAssets referenced from notes must be lowercase — CrawlLinks lowercases the URL but` +
    ` the Static emitter does not rename the file. See .siriusuna/customizations.md.`,
)
process.exit(1)
