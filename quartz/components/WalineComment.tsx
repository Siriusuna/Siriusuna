import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/waline.inline"

type Options = {
  serverUrl: string
  lang?: string
  reaction?: boolean
  pageview?: boolean
  comment?: boolean
}

export default ((opts: Options) => {
  const WalineComment: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
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
        data-reaction={String(opts.reaction ?? true)}
        data-pageview={String(opts.pageview ?? false)}
        data-comment={String(opts.comment ?? true)}
      ></div>
    )
  }
  WalineComment.afterDOMLoaded = script

  return WalineComment
}) satisfies QuartzComponentConstructor<Options>