import { getImageProps, type ImageProps } from 'next/image';

type PhotoProps = Omit<ImageProps, 'placeholder' | 'blurDataURL' | 'onLoad' | 'onLoadingComplete' | 'onError'>;

/**
 * next/image's optimisation pipeline (responsive srcset, format negotiation,
 * lazy loading, priority hints) rendered as a plain <img>. Using getImageProps
 * keeps the markup free of the placeholder inline style and client-side
 * load handlers, and lets layout be expressed in CSS like any other element.
 */
export function Photo({ style, alt, ...props }: PhotoProps) {
  const { props: generated } = getImageProps({ ...props, alt });
  // The generated style only positions `fill` images and hides alt text while loading; CSS covers both.
  const { style: _generated, 'data-nimg': _marker, ...img } = generated as typeof generated & { 'data-nimg'?: string };
  void _generated;
  void _marker;
  // eslint-disable-next-line @next/next/no-img-element -- the props come from next/image itself.
  return <img {...img} alt={alt} style={style} />;
}
