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

const REF = /(?:src|href)="((?:\.{1,2}\/)*static\/[^"]+)"/g

let checked = 0
const missing = new Map()

for await (const entry of glob("**/*.html", { cwd: publicDir })) {
  const file = path.join(publicDir, entry)
  const html = readFileSync(file, "utf8")
  for (const [, ref] of html.matchAll(REF)) {
    checked++
    const target = path.resolve(path.dirname(file), decodeURIComponent(ref))
    if (!existsSync(target)) {
      if (!missing.has(ref)) missing.set(ref, [])
      missing.get(ref).push(entry)
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
