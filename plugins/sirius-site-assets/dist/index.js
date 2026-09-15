import { createRequire } from 'module';
import { jsx } from 'preact/jsx-runtime';

createRequire(import.meta.url);
var LXGW_WENKAI_SCREEN = {
  href: "https://cdnjs.cloudflare.com/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/style.css",
  integrity: "sha512-A2sVEqmNCGCac7ji4czWLqCVSn28L0U5lSobS173H+gk+QTV6rH0EH0QEnYk5mz3KPRDmEr+GKM1hfdfLrsFpg=="
};
var FIRA_CODE = {
  href: "https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.css",
  integrity: "sha512-LaxQmGd9k/pW51CsEy2nLIlbUXCgsyvUEVT5fSguN2b2OBwHjMi2aiUdEEXSMg8Jvy+bCB01as61aNrHnL2DYQ=="
};
var ZEOSEVEN_442 = "https://fontsapi.zeoseven.com/442/main/result.css";
var MONSIEUR_LA_DOULAISE = "https://fonts.googleapis.com/css2?family=Monsieur+La+Doulaise&display=swap";
var APLAYER_CSS = "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css";
var APLAYER_JS = "https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js";
var SiteAssets = (opts) => {
  const enableAPlayer = opts?.enableAPlayer ?? false;
  const enableFiraCode = opts?.enableFiraCode ?? false;
  return {
    name: "SiriusSiteAssets",
    // See the note in sirius-view-image: a transformer must expose one of
    // textTransform / markdownPlugins / htmlPlugins or Quartz skips it at load time.
    markdownPlugins() {
      return [];
    },
    externalResources() {
      const additionalHead = [
        /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://cdn.jsdelivr.net" }),
        /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fontsapi.zeoseven.com" }),
        /* @__PURE__ */ jsx(
          "link",
          {
            rel: "stylesheet",
            href: LXGW_WENKAI_SCREEN.href,
            integrity: LXGW_WENKAI_SCREEN.integrity,
            crossOrigin: "anonymous",
            referrerPolicy: "no-referrer"
          }
        ),
        /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: ZEOSEVEN_442 }),
        /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: MONSIEUR_LA_DOULAISE })
      ];
      if (enableFiraCode) {
        additionalHead.push(
          /* @__PURE__ */ jsx(
            "link",
            {
              rel: "stylesheet",
              href: FIRA_CODE.href,
              integrity: FIRA_CODE.integrity,
              crossOrigin: "anonymous",
              referrerPolicy: "no-referrer"
            }
          )
        );
      }
      if (enableAPlayer) {
        additionalHead.push(/* @__PURE__ */ jsx("link", { rel: "stylesheet", href: APLAYER_CSS }));
      }
      return {
        additionalHead,
        js: enableAPlayer ? [
          {
            src: APLAYER_JS,
            loadTime: "afterDOMReady",
            contentType: "external"
          }
        ] : []
      };
    }
  };
};
var src_default = SiteAssets;

export { SiteAssets, src_default as default };
