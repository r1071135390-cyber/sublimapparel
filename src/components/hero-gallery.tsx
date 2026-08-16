"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  /** Image URLs to cycle through. Empty array hides the carousel. */
  images: string[];
  /** Auto-rotate interval in ms. */
  intervalMs?: number;
};

/**
 * Carousel of product images for archive/tag heroes.
 * Auto-rotates through images with a smooth crossfade.
 * Mirrors the home page hero style: text on the left, photos on the right.
 *
 * The left edge of the carousel has a gradient mask so it blends
 * into the dark text area (left side looks faded, right side is clear).
 *
 * Image URLs must be pre-computed on the server (this is a client component).
 */
export function HeroGallery({ images, intervalMs = 3500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <div className="relative hidden lg:block">
      {/* gradient mask: fade left edge of images into the dark background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-foreground to-transparent z-20"
      />

      {/* carousel viewport */}
      <div className="relative aspect-square overflow-hidden rounded-md">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-background"
                  : "w-1.5 bg-background/40 hover:bg-background/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
