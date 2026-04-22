"use client";

import { useRef, useCallback, RefObject } from "react";

interface DragScrubOptions {
  /** Pixels of horizontal drag needed to advance 1 second of video */
  pixelsPerSecond?: number;
}

interface DragScrubHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}

/**
 * Maps horizontal drag gestures to video.currentTime.
 * Drag right → play forward. Drag left → rewind.
 *
 * Works with both mouse and touch via the unified PointerEvent API.
 */
export function useDragScrub(
  videoRef: RefObject<HTMLVideoElement | null>,
  { pixelsPerSecond = 80 }: DragScrubOptions = {}
): DragScrubHandlers {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startTime = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const video = videoRef.current;
      if (!video) return;

      isDragging.current = true;
      startX.current = e.clientX;
      startTime.current = video.currentTime;

      // Capture so we keep receiving events even if pointer leaves the element
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    [videoRef]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const deltaX = e.clientX - startX.current;
      const deltaTime = deltaX / pixelsPerSecond;
      const raw = startTime.current + deltaTime;

      // Wrap around seamlessly — drag past end loops back to start and vice versa
      video.currentTime = ((raw % video.duration) + video.duration) % video.duration;
    },
    [videoRef, pixelsPerSecond]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
}
