import { QuartzComponent } from '@quartz-community/types';

interface WalineCommentOptions {
    /** Waline server endpoint, e.g. https://waline.siriusuna.top */
    serverUrl: string;
    lang?: string;
    pageview?: boolean;
    comment?: boolean;
    reaction?: boolean;
    emoji?: string[];
    /**
     * Selector Waline watches to decide when to render dark. Quartz toggles the
     * `saved-theme` attribute on <html>, so that is the default.
     */
    darkModeSelector?: string;
}
declare const _default: (opts?: WalineCommentOptions) => QuartzComponent;

export { _default as WalineComment, type WalineCommentOptions };
