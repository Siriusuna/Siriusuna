import type { QuartzTransformerPlugin } from "@quartz-community/types"

/**
 * Image lightbox, backed by Tokinx/ViewImage.
 *
 * Ported from the Quartz 4 transformer at quartz/plugins/transformers/viewImage.ts, which in
 * turn came from upstream PR #2074 by @jxlenco (jackyzha0/quartz, MIT).
 *
 * Two changes from the v4 version:
 *   - init runs on Quartz's `nav` event instead of `DOMContentLoaded`. The old version bound
 *     once on first paint, so the lightbox silently stopped working after any SPA navigation.
 *   - dropped the `border: 2px dashed` debug outline that shipped with the v4 code.
 */

export interface ViewImageOptions {
  /** CSS selector for the images the lightbox attaches to. */
  selector?: string
}

const DEFAULT_SELECTOR = "article img, .content img"
const VIEW_IMAGE_SRC = "https://cdn.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js"

export const ViewImage: QuartzTransformerPlugin<ViewImageOptions> = (opts) => {
  const selector = opts?.selector ?? DEFAULT_SELECTOR

  return {
    name: "SiriusViewImage",
    // Quartz's validateCategory() only accepts a transformer that implements at least one of
    // textTransform / markdownPlugins / htmlPlugins. This plugin contributes nothing but
    // external resources, so it declares an empty pipeline to satisfy that check — without
    // it the plugin is silently skipped at load time.
    markdownPlugins() {
      return []
    },
    externalResources() {
      return {
        js: [
          {
            src: VIEW_IMAGE_SRC,
            loadTime: "afterDOMReady",
            contentType: "external",
          },
          {
            script: `
              document.addEventListener("nav", () => {
                if (!window.ViewImage) return
                window.ViewImage.init(${JSON.stringify(selector)})
              })
            `,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
        css: [
          {
            content: `${selector} { cursor: zoom-in; }`,
            inline: true,
          },
        ],
      }
    },
  }
}

export default ViewImage
