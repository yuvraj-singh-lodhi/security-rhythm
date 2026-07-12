"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapContext(scope: React.RefObject<Element | null>) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {}, scope);
    return () => ctx.revert();
  }, [scope]);
}

export { gsap, ScrollTrigger };
