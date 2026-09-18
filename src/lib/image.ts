import { IMAGES, type ImageKey } from "@/data/image-manifest";

export type PiuraImage = (typeof IMAGES)[ImageKey];

export function image(key: ImageKey): PiuraImage {
  return IMAGES[key];
}
