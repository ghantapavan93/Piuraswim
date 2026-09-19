import { IMAGES, type ImageAsset, type ImageKey } from '@/data/image-manifest';

export type { ImageAsset, ImageKey };

/** Resolves a manifest key to its public path and intrinsic size. */
export function image(key: ImageKey): ImageAsset {
  return IMAGES[key];
}
