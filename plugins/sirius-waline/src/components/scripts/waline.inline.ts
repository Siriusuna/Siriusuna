// Ported from the Quartz 4 component at quartz/components/scripts/waline.inline.ts.
// Runs on every SPA navigation so the widget follows client-side route changes.

type WalineInstance = { destroy: () => void; update: (options: unknown) => void }
type WalineInit = (options: Record<string, unknown>) => WalineInstance

const WALINE_CSS = "https://unpkg.com/@waline/client@v3/dist/waline.css"
const WALINE_JS = "https://unpkg.com/@waline/client@v3/dist/waline.js"

document.addEventListener("nav", async () => {
  const container = document.getElementById("waline")
  if (!container) return

  const { serverUrl, lang, pageview, comment, reaction, emoji, dark } = container.dataset

  if (!document.querySelector(`link[href="${WALINE_CSS}"]`)) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = WALINE_CSS
    document.head.appendChild(link)
  }

  // Kept as a runtime import: tsup.base marks https:// imports external so the CDN
  // module is fetched by the browser rather than bundled at build time.
  const { init } = (await import(/* @vite-ignore */ WALINE_JS)) as { init: WalineInit }

  const instance = init({
    el: "#waline",
    serverURL: serverUrl,
    lang,
    dark, // a CSS selector, e.g. html[saved-theme="dark"]
    pageview: pageview === "true",
    comment: comment === "true",
    reaction: reaction === "true",
    emoji: emoji ? JSON.parse(emoji) : undefined,
    path: window.location.pathname,
  })

  // Quartz reuses the DOM across SPA navigations — tear the instance down or it duplicates.
  window.addCleanup(() => instance.destroy())
})
