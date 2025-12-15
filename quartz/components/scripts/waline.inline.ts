type WalineInstance = {
  destroy: () => void
  update: (props: any) => void
}

let walineInstance: WalineInstance | null = null

document.addEventListener("nav", async () => {
  const container = document.getElementById("waline")
  if (!container) return
  const serverURL = container.dataset.serverUrl
  const lang = container.dataset.lang ?? "zh-CN"
  const reaction = container.dataset.reaction === "true"
  const pageview = container.dataset.pageview === "true"
  const comment = container.dataset.comment === "true"
  if (!serverURL) {
    console.warn("Waline: serverURL is required")
    return
  }
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = "https://unpkg.com/@waline/client@v3/dist/waline.css"
  document.head.appendChild(link)
  // @ts-ignore
  const { init } = await import("https://unpkg.com/@waline/client@v3/dist/waline.js")
  if (walineInstance) {
    walineInstance.destroy()
  }
  walineInstance = init({
    el: "#waline",
    serverURL: serverURL,
    lang: lang,
    reaction: reaction,
    pageview: pageview,
    comment: comment,
    path: window.location.pathname,
    dark: 'html[saved-theme="dark"]',
    emoji: [
      "//unpkg.com/@waline/emojis@1.2.0/weibo",
      "//unpkg.com/@waline/emojis@1.2.0/bilibili",
      "//unpkg.com/@waline/emojis@1.2.0/tieba",
    ],
  })
})

window.addCleanup(() => {
  if (walineInstance) {
    walineInstance.destroy()
    walineInstance = null
  }
})
