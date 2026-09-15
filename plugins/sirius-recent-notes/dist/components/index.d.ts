import { QuartzComponent } from '@quartz-community/types';

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
interface RecentNotesOptions {
    title?: string;
    limit?: number;
    showTags?: boolean;
    /** Notes carrying any of these tags are omitted from the list. Case-insensitive. */
    excludeTags?: string[];
}
declare const _default: (opts?: RecentNotesOptions) => QuartzComponent;

export { _default as RecentNotes, type RecentNotesOptions };
