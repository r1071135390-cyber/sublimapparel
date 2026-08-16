"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-muted/60 to-muted flex items-center justify-center border border-border">
        <div className="text-center px-6">
          <div className="text-5xl mb-3 opacity-40">📷</div>
          <p className="text-sm text-muted-foreground">
            Real product shots coming soon — inquire for current samples.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted border border-border">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
          {images.map((src, idx) => (
            <button
              key={src}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                idx === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
