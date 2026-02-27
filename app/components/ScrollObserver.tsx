"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const update = () => {
      document.body.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return null;
}
