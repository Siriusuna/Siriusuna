import { QuartzTransformerPlugin } from '@quartz-community/types';

/**
 * Image lightbox, backed by Tokinx/ViewImage.
 *
 * Ported from the Quartz 4 transformer at quartz/plugins/transformers/viewImage.ts, which in
 * turn came from upstream PR #2074 by @jxlenco (jackyzha0/quartz, MIT).
 *
 * Two changes from the v4 version:
 *   - init runs on Quartz's `nav` event instead of `DOMContentLoaded`. The old version bound
 *     once on first paint, so the lightbox silently stopped working after any SPA navigation.
 *   - dropped the `border: 2px dashed` debug outline that shipped with the v4 code.
 */
interface ViewImageOptions {
    /** CSS selector for the images the lightbox attaches to. */
    selector?: string;
}
declare const ViewImage: QuartzTransformerPlugin<ViewImageOptions>;

export { ViewImage, type ViewImageOptions, ViewImage as default };
