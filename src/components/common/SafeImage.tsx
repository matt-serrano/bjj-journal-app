"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

type SafeImageProps = ImageProps & {
  fallbackSrc?: string
}

export function SafeImage({ src, fallbackSrc = "/images/logo.png", alt, onError, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)
  const [hasErrored, setHasErrored] = useState(false)

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt || ""}
      onError={(event) => {
        onError?.(event)

        if (!hasErrored && currentSrc !== fallbackSrc) {
          setHasErrored(true)
          setCurrentSrc(fallbackSrc)
        }
      }}
    />
  )
}
