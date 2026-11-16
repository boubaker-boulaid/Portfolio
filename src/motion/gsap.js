import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register once; every motion module imports gsap from here.
gsap.registerPlugin(ScrollTrigger, SplitText);

// One easing vocabulary for the whole site: quick start, long soft landing.
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP = '(min-width: 1024px)';

export { gsap, ScrollTrigger, SplitText };
