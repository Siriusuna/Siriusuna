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
 *   - Jigmo              -> last-resort CJK fallback, self-hosted and sliced
 *   - Maple Mono NF CN   -> CJK inside code blocks (Monaspace is Latin-only), ZeoSeven #442
 *   - Monsieur La Doulaise-> `.content-meta` in custom.scss
 * Locally hosted faces (Alegreya, Monaspace, the four SiriusCJK faces, Jigmo, TekitouPoem)
 * are declared as @font-face in custom.scss / fonts-cjk.scss and served from
 * quartz/static/fonts/.
 *
 * This plugin also owns the `jigmoFirst` switch described below, because that decision
 * changes which stylesheet overrides <head> carries.
 */
interface SiteAssetsOptions {
    /**
     * APlayer (audio player) CSS + JS. Shipped on Quartz 4 but no note actually instantiates a
     * player, so it defaults to off. Set true if you add a player back.
     */
    enableAPlayer?: boolean;
    /** Fira Code webfont. Superseded by Maple Mono NF CN as the code font; off by default. */
    enableFiraCode?: boolean;
    /**
     * Put Jigmo at the front of the body CJK stack instead of the back.
     *
     * Off (default) — `Alegreya, SiriusCJK, Jigmo, serif`. GenRyuMin2 renders the prose and
     * Jigmo only catches ideographs outside its subset. Jigmo is never actually reached
     * today: every CJK character in content/ is inside the GenRyuMin subset.
     *
     * On — `Alegreya, Jigmo, SiriusCJK, serif`. Jigmo's plain GlyphWiki skeleton replaces
     * GenRyuMin's heavier Mincho decoration for ordinary text. Two costs, both measured:
     *   - Jigmo has no fullwidth punctuation (U+FF0C `，`, U+FF1B `；`, U+FF1A `：`,
     *     U+300C-D `「」`, U+300A-B `《》`, …). Those fall through to GenRyuMin, so a line
     *     mixes two typefaces. In this site's content that is 27 characters, ~7.4k
     *     occurrences, concentrated in Japanese notes.
     *   - Jigmo's vertical metrics are looser (1.23em line box vs GenRyuMin's 1.00em), so
     *     body line height grows noticeably.
     *
     * Everything Jigmo does render is a rare-ideograph glyph, so this affects ordinary
     * reading rather than edge cases. Read a few pages before leaving it on.
     */
    jigmoFirst?: boolean;
}
declare const SiteAssets: QuartzTransformerPlugin<SiteAssetsOptions>;

export { SiteAssets, type SiteAssetsOptions, SiteAssets as default };
