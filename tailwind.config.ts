import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" } },
    extend: {
      colors: {
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
        cream: "#F7F2E8",
        ink: "#1B0408",
        paper: "#FEFEFE",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      maxWidth: { container: "1320px" },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        card: "0 24px 60px -28px rgba(74, 0, 15, 0.45)",
        ring: "0 0 0 1px rgba(204, 177, 112, 0.25)",
        gold: "0 18px 48px -22px rgba(204, 177, 112, 0.55)",
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
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(204,177,112,0.45)" },
          "50%": { boxShadow: "0 0 0 14px rgba(204,177,112,0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both",
        marquee: "marquee 38s linear infinite",
        pulseSoft: "pulseSoft 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
