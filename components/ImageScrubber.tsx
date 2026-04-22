"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useDragFrame } from "@/hooks/useDragFrame";

const TOTAL_FRAMES = 97;

// Zero-padded filename: f001.jpg … f097.jpg
const frameSrc = (i: number) => `/frames/f${String(i + 1).padStart(3, "0")}.jpg`;

interface ImageScrubberProps {
  onProgress?: (pct: number) => void;
}

export default function ImageScrubber({ onProgress }: ImageScrubberProps) {
  const [frame, setFrame] = useState(0);
  const preloadedRef = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFrame = useCallback(
    (idx: number) => {
      setFrame(idx);
      onProgress?.(idx / TOTAL_FRAMES);
    },
    [onProgress]
  );

  const dragHandlers = useDragFrame(handleFrame, {
    totalFrames: TOTAL_FRAMES,
    pixelsPerFrame: 7,
  });

  // Preload all frames in the background after mount so subsequent
  // drags feel instant. Priority: frames near 0 first, then the rest.
  useEffect(() => {
    const order = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
    let i = 0;

    const preloadNext = () => {
      if (i >= order.length) return;
      const idx = order[i++];
      if (preloadedRef.current.has(idx)) {
        preloadNext();
        return;
      }
      const img = new window.Image();
      img.src = frameSrc(idx);
      img.onload = img.onerror = () => {
        preloadedRef.current.add(idx);
        // Small yield to keep the main thread free
        setTimeout(preloadNext, 10);
      };
    };

    // Short initial delay so the first render paints first
    const t = setTimeout(preloadNext, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      onPointerCancel={dragHandlers.onPointerCancel}
    >
      {/* Current frame — fills the container */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc(frame)}
        alt="Glass 360 spin"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Frame 0 preloaded with Next.js priority for instant first paint */}
      <Image
        src={frameSrc(0)}
        alt=""
        fill
        priority
        className="object-cover"
        style={{ opacity: frame === 0 ? 1 : 0, pointerEvents: "none" }}
        sizes="430px"
      />

      {/* Soft top fade for name tag readability */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
      />

      {/* Soft bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
      />
    </div>
  );
}
