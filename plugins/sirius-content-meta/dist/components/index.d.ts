import { QuartzComponentProps } from '@quartz-community/types';
import { JSX } from 'preact';

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
interface ContentMetaOptions {
    showReadingTime: boolean;
    showComma: boolean;
    /** Locale used for the dates and the reading-time string. */
    dateLocale: string;
}
declare const _default: (opts?: Partial<ContentMetaOptions>) => {
    ({ fileData, displayClass }: QuartzComponentProps): JSX.Element | null;
    css: string;
};

export { _default as ContentMeta, type ContentMetaOptions };
