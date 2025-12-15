// quartz/components/scripts/waline.inline.ts

// 定义 Waline 初始化函数的类型（简化版）
type WalineInit = (options: any) => { destroy: () => void; update: (options: any) => void }

document.addEventListener("nav", async () => {
  const container = document.getElementById("waline")
  if (!container) return

  // 从 data 属性读取配置
  const serverURL = container.dataset.serverUrl
  const lang = container.dataset.lang
  const pageview = container.dataset.pageview === "true"
  const comment = container.dataset.comment === "true"
  const reaction = container.dataset.reaction === "true"
  const emoji = container.dataset.emoji ? JSON.parse(container.dataset.emoji) : undefined
  const dark = container.dataset.dark

  // 动态引入 CSS
  const cssUrl = "https://unpkg.com/@waline/client@v3/dist/waline.css"
  if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = cssUrl
    document.head.appendChild(link)
  }

  // 动态引入 Waline JS (ESM)
  // 注意：这里使用动态 import，Quartz 构建时会将其保留为原生 import
  // @ts-ignore
  const { init } = (await import("https://unpkg.com/@waline/client@v3/dist/waline.js")) as {
    init: WalineInit
  }

  // 初始化 Waline
  const walineInstance = init({
    el: "#waline",
    serverURL,
    lang,
    dark, // 传入选择器，例如 'html[saved-theme="dark"]'
    pageview,
    comment,
    reaction,
    emoji,
    // 自动根据当前路径定位
    path: window.location.pathname,
  })

  // 清理函数：Quartz 切换页面时销毁实例，防止重复
  window.addCleanup(() => walineInstance.destroy())
})
