const { transform } = require("typescript");

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
      },
    },
    extend: {
      colors: {
        "light-gray": "#f1efe7",
        "light-green": "#e7f1ea",
        "light-blue": "#e7e9f1",
        "light-pink": "#f1e7ee",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-out": "fadeOut 10s ease-out forwards",
        "slide-in-from-left": "slideInLeft 0.4s ease-in-out forwards",
        "slide-in-from-top": "slideInTop 0.4s ease-in-out forwards",
        "slide-in-from-right": "slideInRight 0.4s ease-in-out forwards",
        "slide-in-from-bottom": "slideInBottom 0.4s ease-in-out forwards",
        "navbar-open": "navbarOpen 0.4s ease-in-out forwards",
        "navbar-close": "navbarClose 0.4s ease-in-out forwards",
        "open-flashcard-menu": "openFlashcardMenu 0.6s ease-out forwards",
        "matching-slide-x": "matchingSlideX 14s linear infinite",
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
