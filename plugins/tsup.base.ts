import { defineConfig, type Options } from "tsup"
import type { Plugin } from "esbuild"
import path from "path"
import fs from "fs"

/**
 * Shared tsup configuration for Siriusuna's local Quartz plugins.
 *
 * Adapted from quartz-community/plugin-template's tsup.config.ts. Kept in one place
 * so all local plugins build identically and there is a single spot to update when
 * upstream changes its plugin build contract.
 */

/** Warn early if a plugin's package.json is missing the fields the Quartz loader reads. */
function validateManifest(cwd: string): void {
  const pkgPath = path.resolve(cwd, "package.json")
  if (!fs.existsSync(pkgPath)) throw new Error(`package.json not found in ${cwd}`)

  const quartz = JSON.parse(fs.readFileSync(pkgPath, "utf-8")).quartz
  if (!quartz) {
    console.warn(
      `\x1b[33m⚠ ${cwd}: no "quartz" field in package.json — plugin will not load\x1b[0m`,
    )
    return
  }

  const missing = ["name", "displayName", "category", "version"].filter((k) => !quartz[k])
  if (missing.length > 0) {
    console.warn(`\x1b[33m⚠ ${cwd}: quartz manifest missing ${missing.join(", ")}\x1b[0m`)
  }
}

/**
 * Bundles `.inline.ts` files into browser-ready JS strings and compiles `.scss` to CSS.
 *
 * Inline scripts are injected as raw text into <script> tags, so TypeScript syntax has to
 * be transpiled away here rather than surviving into the browser. Mirrors Quartz v5 core's
 * own inline-script-loader in quartz/cli/handlers.js.
 */
const inlineScriptPlugin: Plugin = {
  name: "inline-script-loader",
  setup(parentBuild) {
    const absWorkingDir = parentBuild.initialOptions.absWorkingDir ?? process.cwd()

    parentBuild.onLoad({ filter: /\.scss$/ }, async (args) => {
      const sass = await import("sass")
      return { contents: sass.compile(args.path).css, loader: "text" }
    })

    parentBuild.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      const esbuild = await import("esbuild")
      let text = await fs.promises.readFile(args.path, "utf8")

      // Inline scripts run in a <script> tag, not as ES modules — strip module syntax.
      text = text.replace(/^export default /gm, "").replace(/^export /gm, "")

      const result = await esbuild.build({
        stdin: {
          contents: text,
          loader: "ts",
          resolveDir: path.dirname(args.path),
          sourcefile: path.relative(absWorkingDir, args.path),
        },
        write: false,
        bundle: true,
        minify: true,
        platform: "browser",
        format: "esm",
        target: "es2020",
        sourcemap: false,
        // Keep CDN imports as runtime imports (e.g. Waline loaded from unpkg)
        external: ["http://*", "https://*"],
      })

      const js = result.outputFiles?.[0]?.text
      if (!js) throw new Error(`inline-script-loader: no JS output for ${args.path}`)
      return { contents: js, loader: "text" }
    })
  },
}

/**
 * Packages that MUST be a single shared instance across the Quartz host and every plugin.
 * Everything else is bundled into dist/ so the plugin is self-contained.
 */
const SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "vfile",
  "vfile/*",
  "unified",
]

/**
 * Build a `noExternal` matcher that bundles everything EXCEPT the given ids.
 *
 * tsup gives `noExternal` precedence over `external`, so the plugin-template's
 * match-everything `noExternal` pattern silently bundles preact too — which defeats the
 * whole point of the singleton list and gives the plugin its own preact instance. Encoding
 * the exclusions into the noExternal pattern itself is what actually keeps them external.
 */
function bundleAllExcept(ids: string[]): RegExp[] {
  const alternatives = ids.map((id) =>
    id.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*"),
  )
  // `(?:$|/)` so that listing "preact" also covers "preact/hooks", "preact/jsx-runtime", ...
  return [new RegExp(`^(?!(?:${alternatives.join("|")})(?:$|/)).+`)]
}

export function makeTsupConfig(
  options: {
    entry?: Record<string, string>
    /**
     * Extra packages to leave as runtime imports instead of bundling. Use this for
     * `@quartz-community/*` plugins that a local plugin wraps, so the host's copy is
     * reused rather than duplicated into dist/.
     */
    external?: string[]
  } = {},
) {
  validateManifest(process.cwd())

  const entry = options.entry ?? { index: "src/index.ts" }
  const external = [...SINGLETON_EXTERNALS, ...(options.external ?? [])]

  return defineConfig({
    entry,
    format: ["esm"],
    dts: true,
    tsconfig: "tsconfig.json",
    // Off deliberately: dist/ is committed, and these are Node-side SSR bundles whose
    // sources already live next to them in src/. The maps would just duplicate that source
    // into the repo. Browser-facing inline scripts are minified separately, also without maps.
    sourcemap: false,
    clean: true,
    treeshake: true,
    target: "es2022",
    splitting: false,
    outDir: "dist",
    platform: "node",
    noExternal: bundleAllExcept(external),
    external,
    banner: {
      js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
    },
    esbuildOptions(opts) {
      opts.jsx = "automatic"
      opts.jsxImportSource = "preact"
    },
    esbuildPlugins: [inlineScriptPlugin],
  }) as Options
}
