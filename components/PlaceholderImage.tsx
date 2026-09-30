import Image, { type ImageProps } from "next/image"

type Props = Omit<ImageProps, "alt" | "fill"> & {
  alt: string
}

export function PlaceholderImage({ alt, style, ...props }: Props) {
  // TODO: replace with real client photography
  return <Image alt={alt} fill style={{ objectFit: "cover", ...style }} {...props} />
}
