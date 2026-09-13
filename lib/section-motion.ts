const entrances: Record<string, Keyframe[]> = {
  rise: [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
  headline: [{ opacity: 0, transform: "translateY(16px)", filter: "blur(2px)" }, { opacity: 1, transform: "translateY(0)", filter: "blur(0)" }],
  panel: [{ opacity: 0, transform: "scale(.985)" }, { opacity: 1, transform: "scale(1)" }],
  fade: [{ opacity: 0 }, { opacity: 1 }],
};

function milliseconds(value: string, fallback: number) {
  // CSS minification can rewrite millisecond tokens as seconds.
  return parseFloat(value) * (value.trim().endsWith("ms") ? 1 : 1000) || fallback;
}

export function observeSectionMotion() {
  if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Map<Element, Animation>();
  let observer: IntersectionObserver | undefined;

  function clear() {
    observer?.disconnect();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  }

  function start() {
    clear();
    if (preference.matches) return;
    const tokens = getComputedStyle(document.documentElement);
    const duration = milliseconds(tokens.getPropertyValue("--reveal-duration"), 1000);
    const stagger = milliseconds(tokens.getPropertyValue("--reveal-stagger"), 120);
    const easing = tokens.getPropertyValue("--reveal-ease").trim() || "cubic-bezier(0.25, 0.1, 0.25, 1)";
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animations.get(entry.target)?.play();
        observer?.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    document.querySelectorAll<HTMLElement>("[data-motion], [data-motion-group] > *").forEach((element) => {
      // Restored scroll positions and focused controls must stay immediately readable.
      if (element.getBoundingClientRect().bottom <= 0 || element.contains(document.activeElement)) return;
      const kind = element.dataset.motion || "rise";
      const parent = element.parentElement;
      const index = parent?.hasAttribute("data-motion-group") ? Array.from(parent.children).indexOf(element) : 0;
      const animation = element.animate(entrances[kind] || entrances.rise, {
        id: "section-reveal",
        duration: kind === "panel" || kind === "headline" ? duration * 1.2 : kind === "fade" ? duration * .8 : duration,
        delay: Math.min(index, 3) * stagger,
        easing,
        fill: "both",
      });
      animation.pause();
      animation.currentTime = 0;
      animations.set(element, animation);
      animation.onfinish = () => {
        animation.cancel();
        animations.delete(element);
      };
      observer!.observe(element);
    });
  }

  function revealFocused(event: FocusEvent) {
    if (!(event.target instanceof Node)) return;
    for (const [element, animation] of animations) {
      if (!element.contains(event.target)) continue;
      animation.cancel();
      animations.delete(element);
      observer?.unobserve(element);
    }
  }

  start();
  preference.addEventListener("change", start);
  document.addEventListener("focusin", revealFocused);
  return () => {
    clear();
    preference.removeEventListener("change", start);
    document.removeEventListener("focusin", revealFocused);
  };
}
