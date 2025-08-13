// Lenis in window

import type Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
    preventScrollHandler?: (e: TouchEvent) => void;
  }
}
