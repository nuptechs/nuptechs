"use client";

/**
 * Animations.tsx — Lightweight JS intelligence layer
 *
 * Zero dependencies beyond React. Uses:
 *  - IntersectionObserver  → scroll-reveal + counter animation
 *  - requestAnimationFrame → counter easing
 *  - scroll event (passive) → nav scroll indicator
 *
 * All effects are additive CSS-class driven, never blocking paint.
 */

import { useEffect } from "react";

export default function Animations() {
  useEffect(() => {
    /* ── 1. Scroll-reveal ─────────────────────────────────────
       Adds `.revealed` to elements with [data-reveal] once they
       enter the viewport. CSS handles the actual transition.
    ─────────────────────────────────────────────────────────── */
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      revealObserver.observe(el);
    });

    /* ── 2. Staggered children ────────────────────────────────
       Elements with [data-reveal-group] trigger their children
       with a stagger delay via CSS custom property.
    ─────────────────────────────────────────────────────────── */
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll("[data-reveal-item]");
            children.forEach((child, i) => {
              (child as HTMLElement).style.setProperty("--stagger", String(i));
              (child as HTMLElement).classList.add("revealed");
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll("[data-reveal-group]").forEach((el) => {
      staggerObserver.observe(el);
    });

    /* ── 3. Animated counters ─────────────────────────────────
       Elements with [data-counter="N"] count up from 0 to N
       when they enter the viewport. Supports suffix (data-suffix).
    ─────────────────────────────────────────────────────────── */
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animateCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.counter ?? "0");
      const suffix = el.dataset.suffix ?? "";
      const prefix = el.dataset.prefix ?? "";
      const duration = 1400;
      const start = performance.now();

      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.round(eased * target);
        el.textContent = `${prefix}${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-counter]").forEach((el) => {
      counterObserver.observe(el);
    });

    /* ── 4. Nav scroll state ──────────────────────────────────
       Adds `.nav-scrolled` to .nav-bar once user scrolls > 8px.
       CSS uses this to increase backdrop saturation + shadow.
    ─────────────────────────────────────────────────────────── */
    const nav = document.querySelector(".nav-bar") as HTMLElement | null;

    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 8) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount

    /* ── 5. Active nav link highlight ────────────────────────
       Watches sections with [id] and adds .nav-link--active
       to the matching anchor in the nav.
    ─────────────────────────────────────────────────────────── */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link[href]");

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const href = (link as HTMLAnchorElement).getAttribute("href") ?? "";
              if (href === `#${id}` || href === `/#${id}`) {
                link.classList.add("nav-link--active");
              } else {
                link.classList.remove("nav-link--active");
              }
            });
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => sectionObserver.observe(s));

    /* ── 6. Magnetic button micro-effect ──────────────────────
       CTAs with [data-magnetic] get a subtle magnetic pull
       on hover — purely CSS-var driven, no layout shifts.
    ─────────────────────────────────────────────────────────── */
    const magneticEls = document.querySelectorAll<HTMLElement>("[data-magnetic]");

    const magneticHandlers: Array<{
      el: HTMLElement;
      enter: () => void;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    magneticEls.forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic ?? "0.35");

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      };

      const handleEnter = () => {
        el.style.transition = "transform 0.1s ease";
      };

      const handleLeave = () => {
        el.style.transition = "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)";
        el.style.transform = "translate(0px, 0px)";
      };

      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);

      magneticHandlers.push({ el, enter: handleEnter, move: handleMove, leave: handleLeave });
    });

    /* ── Cleanup ──────────────────────────────────────────── */
    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
      counterObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      magneticHandlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null; // renders nothing — pure side-effect component
}
