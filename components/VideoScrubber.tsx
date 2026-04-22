"use client";

import { useRef, useEffect, useState } from "react";
import { useDragScrub } from "@/hooks/useDragScrub";
import { VIDEO_SRC } from "@/lib/constants";

interface VideoScrubberProps {
  onProgress?: (pct: number) => void;
}

export default function VideoScrubber({ onProgress }: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  const dragHandlers = useDragScrub(videoRef, { pixelsPerSecond: 60 });

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    onProgress?.(v.currentTime / v.duration);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => {
      v.pause();
      v.currentTime = 0;
      setIsReady(true);
    };

    // canplay fires as soon as the browser can render the first frame
    if (v.readyState >= 3) {
      onCanPlay();
    } else {
      v.addEventListener("canplay", onCanPlay, { once: true });
    }
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div
      className="relative w-full h-full select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      onPointerCancel={dragHandlers.onPointerCancel}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.4s ease" }}
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        draggable={false}
      />

      {/* Soft top fade so header text stays legible */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
      />

      {/* Soft bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
      />

      {/* Loading — clean white spinner */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin" />
          <span className="text-xs text-gray-400 tracking-widest">Loading...</span>
        </div>
      )}
    </div>
  );
}
