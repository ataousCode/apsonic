'use client'

import Image from "next/image";
import { CldImage } from "next-cloudinary";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function CloudImage({ src, alt, width, height, className, priority }: Props) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const isCloudinary = cloudName && !src.startsWith("/");
  if (isCloudinary) {
    return <CldImage src={src} alt={alt} width={width} height={height} className={className} priority={priority} />;
  }
  return <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />;
}