import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types"
import { RecentNotes } from "@quartz-community/recent-notes"

/**
 * Thin wrapper around @quartz-community/recent-notes.
 *
 * On Quartz 4 this widget was configured in quartz.layout.ts with a `filter` callback that
 * hid the landing pages (tagged 主页 / 介绍) from the list, so the homepage did not list
 * itself. `filter` is a function, which quartz.config.yaml cannot express — the upstream
 * plugin's optionSchema has no equivalent — so the filter is rebuilt here from a plain list
 * of tag names that YAML *can* carry.
 *
 * The companion half of the v4 behaviour (only render on those landing pages) is the
 * `sirius-landing-page` layout condition registered in quartz.ts.
 */

export interface RecentNotesOptions {
  title?: string
  limit?: number
  showTags?: boolean
  /** Notes carrying any of these tags are omitted from the list. Case-insensitive. */
  excludeTags?: string[]
}

const DEFAULT_EXCLUDE_TAGS = ["主页", "介绍"]

export default ((opts?: RecentNotesOptions) => {
  const excluded = new Set(
    (opts?.excludeTags ?? DEFAULT_EXCLUDE_TAGS).map((tag) => tag.toLowerCase()),
  )

  return RecentNotes({
    title: opts?.title,
    limit: opts?.limit ?? 2,
    showTags: opts?.showTags ?? true,
    filter: (f) => {
      const tags = (f.frontmatter?.tags ?? []) as string[]
      return !tags.some((tag) => excluded.has(String(tag).toLowerCase()))
    },
  }) as QuartzComponent
}) satisfies QuartzComponentConstructor<RecentNotesOptions>
