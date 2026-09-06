import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Every tween that moves things goes inside mm.add('(prefers-reduced-motion: no-preference)', …)
export const mm = gsap.matchMedia();
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, duration: 1.4, anchors: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
