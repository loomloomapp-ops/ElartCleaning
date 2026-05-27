"use client";

import * as React from "react";

/**
 * Brand preloader — "squeegee wipe".
 * A gold squeegee sweeps across the screen and "cleans" the frosted logo into a
 * crisp brand mark, then the sheet lifts away like a curtain. No spinner, no 0–100%.
 *
 * Tune via CSS variables on `.elart-preloader` (see globals.css):
 *   --pre-bg, --pre-ink, --pre-accent, --pre-logo-size, --pre-duration
 */
export function Preloader() {
  const [phase, setPhase] = React.useState<"active" | "exit" | "done">("active");

  React.useEffect(() => {
    const MIN_VISIBLE = 1500; // let the intro animation finish
    const start = Date.now();
    let started = false; // local guard — resets per effect run (StrictMode-safe)
    let exitTimer = 0;
    let doneTimer = 0;
    let fallback = 0;

    const begin = () => {
      if (started) return;
      started = true;
      const wait = Math.max(0, MIN_VISIBLE - (Date.now() - start));
      exitTimer = window.setTimeout(() => {
        setPhase("exit");
        doneTimer = window.setTimeout(() => setPhase("done"), 800);
      }, wait);
    };

    if (document.readyState === "complete") {
      begin();
    } else {
      window.addEventListener("load", begin, { once: true });
      fallback = window.setTimeout(begin, 4000); // safety net if `load` never fires
    }

    return () => {
      window.removeEventListener("load", begin);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(fallback);
    };
  }, []);

  // Lock scrolling while the preloader covers the page.
  React.useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className="elart-preloader" data-phase={phase} role="presentation" aria-hidden>
      <div className="elart-preloader__inner">
        <div className="elart-preloader__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-elart.png" alt="" className="elart-preloader__img elart-preloader__img--frost" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-elart.png" alt="" className="elart-preloader__img elart-preloader__img--clear" />
        </div>
        <span className="elart-preloader__word">ELART CLEANING</span>
      </div>
      <span className="elart-preloader__squeegee" aria-hidden />
    </div>
  );
}
