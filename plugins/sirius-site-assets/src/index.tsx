import type { QuartzTransformerPlugin } from "@quartz-community/types"

/**
 * Webfonts and third-party assets that used to be hand-patched into quartz/components/Head.tsx
 * on Quartz 4.
 *
 * They live here instead so the Quartz core stays untouched and `npx quartz upgrade` does not
 * conflict. `additionalHead` is used rather than the `css` array because these <link> tags carry
 * integrity/crossorigin/referrerpolicy attributes that a plain CSSResource URL cannot express.
 *
 * Fonts referenced by quartz.config.yaml typography and by quartz/styles/custom.scss:
 *   - Jigmo              -> last-resort CJK fallback, served sliced by ZeoSeven #881
 *   - Maple Mono NF CN   -> CJK inside code blocks (Monaspace is Latin-only), ZeoSeven #442
 *   - Monsieur La Doulaise-> `.content-meta` in custom.scss
 * Locally hosted faces (Alegreya, Monaspace, the four SiriusCJK faces, TekitouPoem) are
 * declared as @font-face in custom.scss / fonts-cjk.scss and served from quartz/static/fonts/.
 */

export interface SiteAssetsOptions {
  /**
   * APlayer (audio player) CSS + JS. Shipped on Quartz 4 but no note actually instantiates a
   * player, so it defaults to off. Set true if you add a player back.
   */
  enableAPlayer?: boolean
  /** Fira Code webfont. Superseded by Maple Mono NF CN as the code font; off by default. */
  enableFiraCode?: boolean
}

const FIRA_CODE = {
  href: "https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.css",
  integrity:
    "sha512-LaxQmGd9k/pW51CsEy2nLIlbUXCgsyvUEVT5fSguN2b2OBwHjMi2aiUdEEXSMg8Jvy+bCB01as61aNrHnL2DYQ==",
}

/**
 * ZeoSeven font mirror #881 — Jigmo, sliced by unicode-range.
 *
 * Jigmo is CC0 and covers CJK Ext A-I, so it catches rare ideographs that the
 * self-hosted SiriusCJK faces leave out (those are subset to the BMP block). It sits
 * last in the body stack, which means for almost every page it costs the stylesheet
 * (~57 KB gzipped) and downloads no font data at all.
 */
const ZEOSEVEN_881_JIGMO = "https://fontsapi.zeoseven.com/881/main/result.css"

/** ZeoSeven font mirror #442 — serves Maple Mono NF CN, the CJK half of the code font. */
const ZEOSEVEN_442 = "https://fontsapi.zeoseven.com/442/main/result.css"

const MONSIEUR_LA_DOULAISE =
  "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap"

const APLAYER_CSS = "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css"
const APLAYER_JS = "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"

export const SiteAssets: QuartzTransformerPlugin<SiteAssetsOptions> = (opts) => {
  const enableAPlayer = opts?.enableAPlayer ?? false
  const enableFiraCode = opts?.enableFiraCode ?? false

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
        <link rel="stylesheet" href={ZEOSEVEN_881_JIGMO} />,
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
