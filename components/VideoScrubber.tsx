"use client";

import { useRef, useEffect, useState } from "react";
import { useDragScrub } from "@/hooks/useDragScrub";
import { VIDEO_SRC } from "@/lib/constants";

interface VideoScrubberProps {
  /** Called whenever the scrub percentage changes (0–1) for reactive UI */
  onProgress?: (pct: number) => void;
}

export default function VideoScrubber({ onProgress }: VideoScrubberProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hint, setHint] = useState(true); // "swipe to spin" hint

  const dragHandlers = useDragScrub(videoRef, { pixelsPerSecond: 60 });

  // Fire onProgress while user scrubs
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    onProgress?.(v.currentTime / v.duration);
  };

  // Pause immediately once metadata is ready so the first frame shows
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleLoaded = () => {
      v.pause();
      v.currentTime = 0;
      setIsLoaded(true);
    };
    v.addEventListener("loadedmetadata", handleLoaded);
    return () => v.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  // Dismiss hint on first drag
  const wrappedPointerDown = (e: React.PointerEvent) => {
    setHint(false);
    dragHandlers.onPointerDown(e);
  };

  return (
    <div
      className="relative w-full h-full select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={wrappedPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      onPointerCancel={dragHandlers.onPointerCancel}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        // Prevent native drag behavior on the video element
        draggable={false}
      />

      {/* ── Dark vignette so overlaid text is readable ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* ── Bottom sweep gradient ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
        }}
      />

      {/* ── Loading state ── */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-cyan-400 text-sm font-mono tracking-widest animate-pulse">
            LOADING ASSET...
          </div>
        </div>
      )}

      {/* ── Swipe hint (auto-dismiss on first drag) ── */}
      {isLoaded && hint && (
        <div className="absolute bottom-28 inset-x-0 flex justify-center pointer-events-none">
          <div
            className="px-4 py-2 rounded-full text-xs font-mono tracking-widest text-cyan-300 border border-cyan-400/40 animate-pulse"
            style={{ background: "rgba(0,255,255,0.06)", backdropFilter: "blur(8px)" }}
          >
            ← DRAG TO SPIN →
          </div>
        </div>
      )}
    </div>
  );
}
