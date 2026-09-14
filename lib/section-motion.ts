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
        if ((entry.target as HTMLElement).dataset.motion === "tools") {
          if (entry.intersectionRatio < .5) continue;
          const distance = entry.target.getBoundingClientRect().height + 80;
          entry.target.querySelectorAll("li").forEach((pill, index) => {
            const direction = index % 2 ? 1 : -1;
            const animation = pill.animate([
              { translate: `0 -${distance}px`, rotate: `${direction * 24}deg`, offset: 0, easing: "cubic-bezier(.55, 0, 1, .45)" },
              { translate: "0 0", rotate: `${direction * -5}deg`, offset: .6, easing: "cubic-bezier(0, 0, .3, 1)" },
              { translate: "0 -22px", rotate: `${direction * 3}deg`, offset: .77, easing: "cubic-bezier(.55, 0, 1, .45)" },
              { translate: "0 0", rotate: "0deg", offset: 1 },
            ], { id: "tools-drop", duration: 950, delay: index * 110, fill: "both" });
            animations.set(pill, animation);
            animation.onfinish = () => { animation.cancel(); animations.delete(pill); };
          });
        }
        animations.get(entry.target)?.play();
        observer?.unobserve(entry.target);
      }
    }, { threshold: [0, .5], rootMargin: "0px 0px -24px 0px" });

    document.querySelectorAll<HTMLElement>("[data-motion], [data-motion-group] > *").forEach((element) => {
      if (element.dataset.motion === "tools") {
        observer!.observe(element);
        return;
      }
      // Never hide content already visible at hydration, including the LCP image.
      // Below-fold sections retain their entrance animations.
      if (element.getBoundingClientRect().top < window.innerHeight || element.contains(document.activeElement)) return;
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
