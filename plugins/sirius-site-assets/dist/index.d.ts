import { QuartzTransformerPlugin } from '@quartz-community/types';

/**
 * Webfonts and third-party assets that used to be hand-patched into quartz/components/Head.tsx
 * on Quartz 4.
 *
 * They live here instead so the Quartz core stays untouched and `npx quartz upgrade` does not
 * conflict. `additionalHead` is used rather than the `css` array because these <link> tags carry
 * integrity/crossorigin/referrerpolicy attributes that a plain CSSResource URL cannot express.
 *
 * Fonts referenced by quartz.config.yaml typography and by quartz/styles/custom.scss:
 *   - Jigmo              -> last-resort CJK fallback, served sliced by ZeoSeven #881
 *   - Maple Mono NF CN   -> CJK inside code blocks (Monaspace is Latin-only), ZeoSeven #442
 *   - Monsieur La Doulaise-> `.content-meta` in custom.scss
 * Locally hosted faces (Alegreya, Monaspace, the four SiriusCJK faces, TekitouPoem) are
 * declared as @font-face in custom.scss / fonts-cjk.scss and served from quartz/static/fonts/.
 */
interface SiteAssetsOptions {
    /**
     * APlayer (audio player) CSS + JS. Shipped on Quartz 4 but no note actually instantiates a
     * player, so it defaults to off. Set true if you add a player back.
     */
    enableAPlayer?: boolean;
    /** Fira Code webfont. Superseded by Maple Mono NF CN as the code font; off by default. */
    enableFiraCode?: boolean;
}
declare const SiteAssets: QuartzTransformerPlugin<SiteAssetsOptions>;

export { SiteAssets, type SiteAssetsOptions, SiteAssets as default };
