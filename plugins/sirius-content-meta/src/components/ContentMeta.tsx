import type { QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"
import { formatDate } from "@quartz-community/utils/date"
import { classNames } from "@quartz-community/utils/lang"
import readingTime from "reading-time"
import type { JSX } from "preact"
import style from "./styles/contentMeta.scss"

/**
 * Fork of @quartz-community/content-meta.
 *
 * Upstream shows a single date, chosen by `defaultDateType`. This site has shown all three
 * dates side by side with emoji labels since Quartz 4 (quartz/components/ContentMeta.tsx),
 * which upstream's optionSchema (showReadingTime / showComma only) cannot express — hence
 * the fork rather than a config change.
 *
 * Difference from the Quartz 4 version: each date is now rendered only when present. The v4
 * code pushed all three unconditionally, so a note without a `published` date would call
 * .toISOString() on undefined.
 */

export interface ContentMetaOptions {
  showReadingTime: boolean
  showComma: boolean
  /** Locale used for the dates and the reading-time string. */
  dateLocale: string
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
  dateLocale: "en-US",
}

const DATE_FIELDS = [
  { key: "created", emoji: "✏️" },
  { key: "modified", emoji: "🔧" },
  { key: "published", emoji: "📄" },
] as const

function DateSegment({ date, locale, emoji }: { date: Date; locale: string; emoji: string }) {
  return (
    <span>
      {emoji} <time datetime={date.toISOString()}>{formatDate(date, locale)}</time>
    </span>
  )
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (!text) return null

    const segments: (string | JSX.Element)[] = []

    const dates = fileData.dates as Record<string, Date | undefined> | undefined
    if (dates) {
      for (const { key, emoji } of DATE_FIELDS) {
        const value = dates[key]
        if (!value) continue
        const date = value instanceof Date ? value : new Date(value)
        if (Number.isNaN(date.getTime())) continue
        segments.push(<DateSegment date={date} locale={options.dateLocale} emoji={emoji} />)
      }
    }

    if (options.showReadingTime) {
      const { minutes } = readingTime(text as string)
      segments.push(<span>{`${Math.ceil(minutes)} min read`}</span>)
    }

    return (
      <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
        {segments}
      </p>
    )
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor<Partial<ContentMetaOptions>>
