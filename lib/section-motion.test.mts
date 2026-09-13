import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

test("section reveals run once, release on focus/reduced motion, and clean up on navigation", () => {
  const calls: { delay: number; duration: number; easing: string; plays: number; canceled: boolean; onfinish?: () => void }[] = [];
  class Element {
    dataset = { motion: "rise" };
    parentElement = { hasAttribute: () => true, children: [] as Element[] };
    top = 1200;
    getBoundingClientRect() { return { top: this.top, bottom: this.top + 500 }; }
    contains(target: unknown) { return target === this; }
    animate(_frames: unknown, timing: { delay: number; duration: number; easing: string }) {
      const call = { ...timing, plays: 0, canceled: false, onfinish: undefined as (() => void) | undefined };
      calls.push(call);
      return Object.assign(call, {
        pause() {},
        play() { call.plays++; },
        cancel() { call.canceled = true; },
      });
    }
  }
  const elements = Array.from({ length: 5 }, () => new Element());
  elements[0].dataset.motion = "headline";
  elements[1].dataset.motion = "panel";
  elements[2].dataset.motion = "fade";
  elements.forEach((element) => { element.parentElement.children = elements; });
  let intersect: (entries: { target: Element; isIntersecting: boolean }[]) => void;
  const observed = new Set<Element>();
  class IntersectionObserver {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe(element: Element) { observed.add(element); }
    unobserve(element: Element) { observed.delete(element); }
    disconnect() { observed.clear(); }
  }
  const listeners = new Map<string, (event?: unknown) => void>();
  const events = {
    addEventListener: (name: string, callback: (event?: unknown) => void) => listeners.set(name, callback),
    removeEventListener: (name: string) => listeners.delete(name),
  };
  const preference = { matches: false, ...events };
  const tokens: Record<string, string> = { "--reveal-duration": "1s", "--reveal-stagger": ".12s" };
  const exports: { observeSectionMotion?: () => (() => void) | undefined } = {};
  const context = {
    exports, Element, Node: Element, IntersectionObserver,
    window: { IntersectionObserver, innerHeight: 800, matchMedia: () => preference },
    document: { documentElement: {}, activeElement: null, querySelectorAll: () => elements, ...events },
    getComputedStyle: () => ({ getPropertyValue: (name: string) => tokens[name] || "" }),
  };
  const source = readFileSync(new URL("./section-motion.ts", import.meta.url), "utf8");
  runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, context);
  const cleanup = exports.observeSectionMotion!()!;
  assert.equal(observed.size, 5);
  assert.deepEqual(calls.map((call) => call.delay), [0, 120, 240, 360, 360]);
  assert.deepEqual(calls.map((call) => call.duration), [1200, 1200, 800, 1000, 1000]);
  assert.ok(calls.every((call) => call.easing === "cubic-bezier(0.25, 0.1, 0.25, 1)"));
  intersect!([{ target: elements[0], isIntersecting: false }]);
  assert.equal(calls[0].plays, 0);
  intersect!([{ target: elements[0], isIntersecting: true }]);
  assert.equal(calls[0].plays, 1);
  assert.equal(observed.has(elements[0]), false);
  calls[0].onfinish!();
  assert.equal(calls[0].canceled, true, "finished effects release their styles");
  listeners.get("focusin")!({ target: elements[1] });
  assert.equal(calls[1].canceled, true);
  assert.equal(observed.has(elements[1]), false);
  preference.matches = true;
  listeners.get("change")!();
  assert.equal(observed.size, 0);
  assert.ok(calls.every((call) => call.canceled));
  cleanup();
  assert.equal(listeners.size, 0);
  exports.observeSectionMotion!()!();
  assert.equal(calls.length, 5, "reduced motion never creates hidden pending effects");
  preference.matches = false;
  tokens["--reveal-duration"] = "1000ms";
  tokens["--reveal-stagger"] = "120ms";
  const stop = exports.observeSectionMotion!()!;
  assert.deepEqual(calls.slice(5).map((call) => call.duration), [1200, 1200, 800, 1000, 1000], "seconds and milliseconds produce the same pacing");
  assert.deepEqual(calls.slice(5).map((call) => call.delay), [0, 120, 240, 360, 360]);
  stop();
  elements.forEach((element) => { element.top = 100; });
  const callCount = calls.length;
  const stopVisible = exports.observeSectionMotion!()!;
  assert.equal(calls.length, callCount, "initial viewport remains visible without delaying LCP");
  stopVisible();
  delete (context.window as { IntersectionObserver?: unknown }).IntersectionObserver;
  assert.equal(exports.observeSectionMotion!(), undefined, "unsupported browsers retain visible content");
});
