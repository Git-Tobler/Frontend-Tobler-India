import ResponsiveImage from './ResponsiveImage.jsx'

/* The static photo mosaic, and the pieces ShuffleGrid animates.

   Kept separate from ShuffleGrid so the animated version can be code-split:
   framer-motion is ~35kB gzipped and this is a below-the-fold decoration, so
   the page paints this static grid first and swaps in the shuffling one once
   the motion chunk lands. Identical markup on both sides means the swap costs
   no layout shift and no second image download. */

export const MOSAIC_GRID = 'grid grid-cols-4 grid-rows-4 gap-1.5'
export const MOSAIC_TILE = 'overflow-hidden rounded-sm bg-white/5'

export function MosaicTile({ tile, sizes }) {
  return (
    <ResponsiveImage
      publicId={tile.publicId}
      alt={tile.alt}
      className="h-full w-full"
      displayWidth={400}
      sizes={sizes}
    />
  )
}

function Mosaic({ tiles, className = '', sizes = '(min-width: 768px) 14vw, 24vw' }) {
  return (
    <div className={`${MOSAIC_GRID} ${className}`}>
      {tiles.map((tile) => (
        <div key={tile.id} className={MOSAIC_TILE}>
          <MosaicTile tile={tile} sizes={sizes} />
        </div>
      ))}
    </div>
  )
}

export default Mosaic
