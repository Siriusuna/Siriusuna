/*
* TODO: Fix the Spotify Player width issue in Quartz sidebar
* Issue Description: When embedding the Spotify Player in the Quartz sidebar,
* the player does not span the full width of the sidebar due to padding.
* Consideration: Whether to add this component and where to place it.
* Fix Approach Right Now:
*    1. Use negative margins to offset the sidebar padding.
*    2. Set the width of the player container to 100% plus the offset.
*    3. Ensure the iframe inside also has width 100% to fill the container.
* Remaining Issue: The embedded player may impact other components' layout and sometime cannot be show completely.
*/

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const SpotifyPlayer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const PADDING_COMPENSATION = 20; 
    const NEGATIVE_MARGIN = `-${PADDING_COMPENSATION}px`;
    const MINIMAL_HEIGHT = "80"; 
    return (
        <div 
            class={`spotify-player ${displayClass ?? ""}`} 
            style={{ 
                marginTop: "1rem", 
                borderRadius: "12px",
                lineHeight: 0, 
                overflow: "hidden", 
                // 1. Use negative margins to offset the sidebar padding
                marginLeft: NEGATIVE_MARGIN,
                marginRight: NEGATIVE_MARGIN,
                // 2. Set the width of the player container to 100% plus the offset
                width: `calc(100% + ${PADDING_COMPENSATION * 2}px)`, 
                // 3. Limit the height of the parent container
                maxHeight: `${MINIMAL_HEIGHT}px`, 
            }}
        >
            <iframe 
                data-testid="embed-iframe" 
                style={{ 
                    borderRadius: "12px",
                    // Ensure iframe width is 100% to fill the parent container
                    width: '100%', 
                    // Force hide the iframe's internal scrollbars
                    overflow: 'hidden', 
                    border: 'none'
                }} 
                src="https://open.spotify.com/embed/track/2YzWMawD5PsAqGobme6x0k?utm_source=generator" 
                // 最小高度
                height={MINIMAL_HEIGHT} 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
            ></iframe>
        </div>
    )
}

export default (() => SpotifyPlayer) satisfies QuartzComponentConstructor

/* 
<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/2YzWMawD5PsAqGobme6x0k?utm_source=generator" width="80%" height="100" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
*/