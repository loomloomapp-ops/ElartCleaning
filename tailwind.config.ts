import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "2rem" } },
    extend: {
      colors: {
        paper: "#FDF8F1",
        surface: "#FFFFFF",
        cream: {
          DEFAULT: "#FDF8F1",
          deep: "#F2ECE5",
        },
        ink: {
          DEFAULT: "#1B0408",
          soft: "rgba(27,4,8,0.64)",
          muted: "rgba(27,4,8,0.48)",
          faint: "rgba(27,4,8,0.32)",
          line: "rgba(27,4,8,0.08)",
        },
        burgundy: {
          900: "#4A000F",
          800: "#5A0112",
          700: "#6A0116",
          600: "#83142B",
          500: "#9C2842",
        },
        gold: {
          600: "#B59954",
          500: "#CCB170",
          400: "#D8C28A",
          300: "#E5D4A1",
        },
        accent: {
          DEFAULT: "#E5D4A1",
          deep: "#D8C28A",
          ink: "#1B0408",
        },
        orchid: "#DCC9F9",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "label-2": ["0.625rem", { lineHeight: "0.75rem", letterSpacing: "0.047rem" }],
        "label-1": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.047rem" }],
        b3: ["0.875rem", { lineHeight: "1.25rem" }],
        b2: ["1rem", { lineHeight: "1.5rem" }],
        b1: ["1.25rem", { lineHeight: "1.75rem" }],
        h6: ["1.25rem", { lineHeight: "1.25rem", letterSpacing: "0.031rem" }],
        h5: ["2rem", { lineHeight: "2rem", letterSpacing: "-0.031rem" }],
        h4: ["2.75rem", { lineHeight: "2.5rem", letterSpacing: "-0.031rem" }],
        h3: ["3.5rem", { lineHeight: "3rem", letterSpacing: "-0.094rem" }],
        h2: ["5rem", { lineHeight: "4rem", letterSpacing: "-0.125rem" }],
        h1: ["6.5rem", { lineHeight: "5.5rem", letterSpacing: "-0.125rem" }],
      },
      spacing: {
        "section-xs": "clamp(1rem, 2.5vw, 1.5rem)",
        "section-sm": "clamp(2rem, 4vw, 3rem)",
        "section-md": "clamp(2.5rem, 5vw, 4.5rem)",
        "section-lg": "clamp(3rem, 6vw, 5.5rem)",
      },
      maxWidth: {
        container: "1440px",
        "col-3": "20.75rem",
        "col-4": "28rem",
        "col-5": "35.25rem",
        "col-6": "42.5rem",
        "col-8": "57rem",
        "col-10": "71.5rem",
      },
      borderRadius: {
        DEFAULT: "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(27,4,8,0.04), 0 12px 36px -16px rgba(27,4,8,0.08)",
        soft: "0 24px 60px -28px rgba(27,4,8,0.18)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeY: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 42s linear infinite",
        marqueeY: "marqueeY 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
