import type { QuartzTransformerPlugin } from "@quartz-community/types"
import { readFileSync } from "node:fs"
import path from "node:path"

/**
 * Webfonts and third-party assets that used to be hand-patched into quartz/components/Head.tsx
 * on Quartz 4.
 *
 * They live here instead so the Quartz core stays untouched and `npx quartz upgrade` does not
 * conflict. `additionalHead` is used rather than the `css` array because these <link> tags carry
 * integrity/crossorigin/referrerpolicy attributes that a plain CSSResource URL cannot express.
 *
 * Fonts referenced by quartz.config.yaml typography and by quartz/styles/custom.scss:
 *   - Jigmo              -> last-resort CJK fallback, self-hosted and sliced
 *   - Maple Mono NF CN   -> CJK inside code blocks (Monaspace is Latin-only), ZeoSeven #442
 *   - Monsieur La Doulaise-> `.content-meta` in custom.scss
 * Locally hosted faces (Alegreya, Monaspace, the four SiriusCJK faces, Jigmo, TekitouPoem)
 * are declared as @font-face in custom.scss / fonts-cjk.scss and served from
 * quartz/static/fonts/.
 *
 * This plugin also owns the `jigmoFirst` switch described below, because that decision
 * changes which stylesheet overrides <head> carries.
 */

export interface SiteAssetsOptions {
  /**
   * APlayer (audio player) CSS + JS. Shipped on Quartz 4 but no note actually instantiates a
   * player, so it defaults to off. Set true if you add a player back.
   */
  enableAPlayer?: boolean
  /** Fira Code webfont. Superseded by Maple Mono NF CN as the code font; off by default. */
  enableFiraCode?: boolean
  /**
   * Put Jigmo at the front of the body CJK stack instead of the back.
   *
   * Off (default) — `Alegreya, SiriusCJK, Jigmo, serif`. GenRyuMin2 renders the prose and
   * Jigmo only catches ideographs outside its subset. Jigmo is never actually reached
   * today: every CJK character in content/ is inside the GenRyuMin subset.
   *
   * On — `Alegreya, Jigmo, SiriusCJK, serif`. Jigmo's plain GlyphWiki skeleton replaces
   * GenRyuMin's heavier Mincho decoration for ordinary text. Two costs, both measured:
   *   - Jigmo has no fullwidth punctuation (U+FF0C `，`, U+FF1B `；`, U+FF1A `：`,
   *     U+300C-D `「」`, U+300A-B `《》`, …). Those fall through to GenRyuMin, so a line
   *     mixes two typefaces. In this site's content that is 27 characters, ~7.4k
   *     occurrences, concentrated in Japanese notes.
   *   - Jigmo's vertical metrics are looser (1.23em line box vs GenRyuMin's 1.00em), so
   *     body line height grows noticeably.
   *
   * Everything Jigmo does render is a rare-ideograph glyph, so this affects ordinary
   * reading rather than edge cases. Read a few pages before leaving it on.
   */
  jigmoFirst?: boolean
}

const FIRA_CODE = {
  href: "https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.css",
  integrity:
    "sha512-LaxQmGd9k/pW51CsEy2nLIlbUXCgsyvUEVT5fSguN2b2OBwHjMi2aiUdEEXSMg8Jvy+bCB01as61aNrHnL2DYQ==",
}

/** ZeoSeven font mirror #442 — serves Maple Mono NF CN, the CJK half of the code font. */
const ZEOSEVEN_442 = "https://fontsapi.zeoseven.com/442/main/result.css"

const MONSIEUR_LA_DOULAISE =
  "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap"

const APLAYER_CSS = "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css"
const APLAYER_JS = "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"

/**
 * The stack override emitted when `jigmoFirst` is on. Same shape as the `:root` block in
 * quartz/styles/custom.scss so the stack stays defined in exactly one place per build —
 * overrides --sirius-serif-stack and re-derives the three role variables from it.
 */
const JIGMO_FIRST_STACK = `:root {
  --sirius-serif-stack: "Alegreya", "SiriusJigmo", "SiriusCJK", Georgia, serif;
  --titleFont: var(--sirius-serif-stack);
  --headerFont: var(--sirius-serif-stack);
  --bodyFont: var(--sirius-serif-stack);
}`

/**
 * Read `theme.typography.jigmoFirst` straight out of quartz.config.yaml.
 *
 * The flag lives in the typography block so it is discoverable next to the other font
 * settings, but quartz.config.yaml is validated against a schema that only knows
 * `header` / `body` / `code` / `title` — hence the hand-rolled read instead of an
 * optionSchema. Absent means off; the comment in the YAML is the user-facing docs.
 */
function readJigmoFirst(): boolean {
  try {
    const yaml = readFileSync(path.join(process.cwd(), "quartz.config.yaml"), "utf8")
    return /^\s*jigmoFirst:\s*true\s*(?:#.*)?$/m.test(yaml)
  } catch {
    return false
  }
}

export const SiteAssets: QuartzTransformerPlugin<SiteAssetsOptions> = (opts) => {
  const enableAPlayer = opts?.enableAPlayer ?? false
  const enableFiraCode = opts?.enableFiraCode ?? false

  // Read from the YAML rather than from opts so the switch cannot go stale: this option
  // has to be duplicated in quartz.config.yaml's typography block for schema reasons,
  // and the typography copy is the one a reader will actually find and flip.
  const jigmoFirst = readJigmoFirst()

  return {
    name: "SiriusSiteAssets",
    // See the note in sirius-view-image: a transformer must expose one of
    // textTransform / markdownPlugins / htmlPlugins or Quartz skips it at load time.
    markdownPlugins() {
      return []
    },
    externalResources() {
      const additionalHead: unknown[] = [
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />,
        <link rel="preconnect" href="https://fontsapi.zeoseven.com" />,
        <link rel="stylesheet" href={ZEOSEVEN_442} />,
        <link rel="stylesheet" href={MONSIEUR_LA_DOULAISE} />,
      ]

      if (enableFiraCode) {
        additionalHead.push(
          <link
            rel="stylesheet"
            href={FIRA_CODE.href}
            integrity={FIRA_CODE.integrity}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />,
        )
      }

      if (enableAPlayer) {
        additionalHead.push(<link rel="stylesheet" href={APLAYER_CSS} />)
      }

      // Rendered last in <head>, after every core stylesheet, so it wins the cascade
      // over the stacks custom.scss sets. Only emitted when Jigmo leads — the default
      // stack needs no override.
      if (jigmoFirst) {
        additionalHead.push(<style dangerouslySetInnerHTML={{ __html: JIGMO_FIRST_STACK }} />)
      }

      return {
        additionalHead,
        js: enableAPlayer
          ? [
              {
                src: APLAYER_JS,
                loadTime: "afterDOMReady" as const,
                contentType: "external" as const,
              },
            ]
          : [],
      }
    },
  }
}

export default SiteAssets
