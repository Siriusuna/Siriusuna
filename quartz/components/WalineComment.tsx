import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/waline.inline"

type Options = {
  // 必须配置
  serverUrl: string
  
  // 可选配置
  lang?: string
  pageview?: boolean
  comment?: boolean
  reaction?: boolean
  emoji?: string[]
  
  // Quartz 特定配置：用于暗色模式匹配的选择器
  // 默认为 'html[saved-theme="dark"]'，这通常能匹配 Quartz 的默认行为
  darkModeSelector?: string
}

export default ((opts: Options) => {
  const WalineComment: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    // 检查 frontmatter 中是否禁用了评论
    const disableComment: boolean =
      typeof fileData.frontmatter?.comments !== "undefined" &&
      (!fileData.frontmatter?.comments || fileData.frontmatter?.comments === "false")

    if (disableComment) {
      return <></>
    }

    return (
      <div
        id="waline"
        class={classNames(displayClass, "waline-container")}
        data-server-url={opts.serverUrl}
        data-lang={opts.lang ?? "zh-CN"}
        data-pageview={String(opts.pageview ?? true)}
        data-comment={String(opts.comment ?? true)}
        data-reaction={String(opts.reaction ?? true)}
        data-emoji={opts.emoji ? JSON.stringify(opts.emoji) : ""}
        // 这里至关重要：告诉 Waline 何时切换暗色模式
        // Quartz 默认在 html 标签上切换 saved-theme 属性
        data-dark={opts.darkModeSelector ?? 'html[saved-theme="dark"]'}
      ></div>
    )
  }

  // 加载上面编写的客户端脚本
  WalineComment.afterDOMLoaded = script

  return WalineComment
}) satisfies QuartzComponentConstructor<Options>