// const { transform } = require("typescript");
import { transform } from "typescript";
import { FadeOutKeyframes } from "./keyframes/FadeOutKeyframes";
import { FadeOutAnimations } from "./animations/FadeOutAnimations";
import { background, position } from "@chakra-ui/react";

import { headerAnimations } from "./animations/HeaderAnimation";
import { matchingButtonAnimation } from "./animations/MatchingButtonAnimation";
import { fadeInAnimation } from "./animations/FadeInAnimation";
import { rulesAnimation } from "./animations/RulesAnimation";
import { LoginPromptFadeIn } from "./animations/LoginPromptFadeIn";
import { vocabFadeOutAnimation } from "./animations/VocabFadeOutAnimation";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "custom": "1740px",
      },
    },
    extend: {
      boxShadow: {
        "custom-dark": "0 4px 8px rgba(0, 0, 0, 0.6)",
        "custom-red": "0 4px 8px rgba(255, 0, 0, 1)",
        "custom-green": "0 4px 8px rgba(0, 255, 0, 1)",
      },
      colors: {
        "light-gray": "#f1efe7",
        "light-green": "#e7f1ea",
        "light-blue": "#e7e9f1",
        "light-pink": "#f1e7ee",
        "dark-orange": "#ff7900",
        navy: "#3f5277",
        beige: "#fff0db",
        teal: "#319795",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInTop: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInBottom: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        navbarOpen: {
          "0%": {
            transform: "translateX(-400px)",
            width: "0px",
          },
          "100%": {
            transform: "translateX(0)",
            width: "240px",
          },
        },
        navbarClose: {
          "0%": {
            transform: "translateX(0)",
            display: "flex",
            width: "240px",
          },
          "100%": {
            transform: "translateX(-400px)",
            display: "none",
            width: "0px",
          },
        },
        openFlashcardMenu: {
          "0%": {
            transform: "translateX(12px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        matchingSlideX: {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        ...headerAnimations.keyframes,
        ...matchingButtonAnimation.keyframes,
        ...fadeInAnimation.keyframes,
        ...rulesAnimation.keyframes,
        ...LoginPromptFadeIn.keyframes,
        ...vocabFadeOutAnimation.keyframes,
        // FadeOutKeyframes,
      },
      animation: {
        // FadeOutAnimations,
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-out": "fadeOut 5s ease-out forwards",
        "slide-in-from-left": "slideInLeft 0.4s ease-in-out forwards",
        "slide-in-from-top": "slideInTop 0.4s ease-in-out forwards",
        "slide-in-from-right": "slideInRight 0.4s ease-in-out forwards",
        "slide-in-from-bottom": "slideInBottom 0.4s ease-in-out forwards",
        "navbar-open": "navbarOpen 0.4s ease-in-out forwards",
        "navbar-close": "navbarClose 0.4s ease-in-out forwards",
        "open-flashcard-menu": "openFlashcardMenu 0.6s ease-out forwards",
        "matching-slide-x": "matchingSlideX 14s linear infinite",
        ...headerAnimations.animation,
        ...matchingButtonAnimation.animation,
        ...fadeInAnimation.animation,
        ...rulesAnimation.animation,
        ...LoginPromptFadeIn.animation,
        ...vocabFadeOutAnimation.animation,
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
