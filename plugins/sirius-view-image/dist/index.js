import { createRequire } from 'module';

createRequire(import.meta.url);

// src/index.ts
var DEFAULT_SELECTOR = "article img, .content img";
var VIEW_IMAGE_SRC = "https://cdn.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js";
var ViewImage = (opts) => {
  const selector = opts?.selector ?? DEFAULT_SELECTOR;
  return {
    name: "SiriusViewImage",
    // Quartz's validateCategory() only accepts a transformer that implements at least one of
    // textTransform / markdownPlugins / htmlPlugins. This plugin contributes nothing but
    // external resources, so it declares an empty pipeline to satisfy that check — without
    // it the plugin is silently skipped at load time.
    markdownPlugins() {
      return [];
    },
    externalResources() {
      return {
        js: [
          {
            src: VIEW_IMAGE_SRC,
            loadTime: "afterDOMReady",
            contentType: "external"
          },
          {
            script: `
              document.addEventListener("nav", () => {
                if (!window.ViewImage) return
                window.ViewImage.init(${JSON.stringify(selector)})
              })
            `,
            loadTime: "afterDOMReady",
            contentType: "inline"
          }
        ],
        css: [
          {
            content: `${selector} { cursor: zoom-in; }`,
            inline: true
          }
        ]
      };
    }
  };
};
var src_default = ViewImage;

export { ViewImage, src_default as default };
