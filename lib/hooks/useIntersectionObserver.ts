"use client";

import { useEffect } from "react";

type UseIntersectionObserverParams = {
  target: React.RefObject<Element | null>;
  onIntersect: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
};

export function useIntersectionObserver({
  target,
  onIntersect,
  root = null,
  rootMargin,
  threshold,
  enabled = true,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    if (!enabled) return;
    const element = target.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        onIntersect();
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, onIntersect, root, rootMargin, threshold, enabled]);
}
