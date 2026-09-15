import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { classNames } from "@quartz-community/utils/lang"
// @ts-ignore - bundled to a browser-ready string by the inline-script loader
import script from "./scripts/waline.inline"

export interface WalineCommentOptions {
  /** Waline server endpoint, e.g. https://waline.siriusuna.top */
  serverUrl: string
  lang?: string
  pageview?: boolean
  comment?: boolean
  reaction?: boolean
  emoji?: string[]
  /**
   * Selector Waline watches to decide when to render dark. Quartz toggles the
   * `saved-theme` attribute on <html>, so that is the default.
   */
  darkModeSelector?: string
}

export default ((opts?: WalineCommentOptions) => {
  const WalineComment: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    // `comments: false` in a note's frontmatter opts that page out.
    const commentsFlag = fileData.frontmatter?.comments
    const disabled =
      typeof commentsFlag !== "undefined" && (!commentsFlag || commentsFlag === "false")
    if (disabled) return <></>

    return (
      <div
        id="waline"
        class={classNames(displayClass, "waline-container")}
        data-server-url={opts?.serverUrl}
        data-lang={opts?.lang ?? "zh-CN"}
        data-pageview={String(opts?.pageview ?? true)}
        data-comment={String(opts?.comment ?? true)}
        data-reaction={String(opts?.reaction ?? true)}
        data-emoji={opts?.emoji ? JSON.stringify(opts.emoji) : ""}
        data-dark={opts?.darkModeSelector ?? 'html[saved-theme="dark"]'}
      ></div>
    )
  }

  WalineComment.afterDOMLoaded = script

  return WalineComment
}) satisfies QuartzComponentConstructor<WalineCommentOptions>
