"use client";

import { useRef, useCallback, RefObject } from "react";

interface DragFrameOptions {
  totalFrames: number;
  /** Pixels of horizontal drag to advance one frame */
  pixelsPerFrame?: number;
}

interface DragFrameHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
}

/**
 * Maps horizontal drag to a frame index with seamless looping.
 * onFrame is called on every move with the new frame index.
 */
export function useDragFrame(
  onFrame: (index: number) => void,
  { totalFrames, pixelsPerFrame = 8 }: DragFrameOptions
): DragFrameHandlers {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startFrame = useRef(0);
  const currentFrame = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      startFrame.current = currentFrame.current;
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = Math.round((e.clientX - startX.current) / pixelsPerFrame);
      // Wrap seamlessly in both directions
      const raw = startFrame.current + delta;
      const next = ((raw % totalFrames) + totalFrames) % totalFrames;
      if (next !== currentFrame.current) {
        currentFrame.current = next;
        onFrame(next);
      }
    },
    [onFrame, totalFrames, pixelsPerFrame]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp };
}
