/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}",  "!./src/sanity/**",],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
        title: ["Playfair Display", "Georgia", "serif"],
        subtitle: ["Georgia", "system-ui", "sans-serif"],
      },
      utilities: {
        ".strong2": {
          fontWeight: "bold",
        },
      },
      colors: {
        background: "#4b463b",
        backgroundLight: "#cbcbcbff",
        backgroundDark: "#1f1d16ff",
        backgroundBlue: "#645e4e",
        outline: "",
        outlineLight: "#47484a",
        white: {
          DEFAULT: "#d2c7c7",
          50: "#faf9f9",
          100: "#f5f3f3",
          200: "#ebe8e8",
          300: "#e0dcdc",
          400: "#d2c7c7",
          500: "#b8a9a9",
          600: "#9e8b8b",
          700: "#847272",
          800: "#6a5959",
          900: "#504444",
          950: "#3a3232",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        brown: {
          50: "#faf9f7",
          100: "#f5f3ef",
          200: "#e8e4dc",
          300: "#d4cbbf",
          400: "#b5a594",
          500: "#8f7d6b",
          600: "#756e6e",
          700: "#5e5449",
          800: "#4b463b",
          900: "#3a3630",
          950: "#2a2621",
        },
        text: {
          DEFAULT: "#d2c7c7ff",
          50: "#f5f3f3",
          100: "#ebe8e8",
          200: "#d2c7c7",
          300: "#b8a9a9",
          400: "#9e8b8b",
          500: "#756e6e",
          600: "#5c5656",
          700: "#4a4343",
          800: "#3a3434",
          900: "#2d2828",
        },
        primary: {
          DEFAULT: "#42687D",
          200: "#A2BBCB",
          300: "#809FB3",
          400: "#688AA0",
          500: "#42687D",
          600: "#22323bff",
          700: "#335467",
          800: "#264252",
          900: "#152D3A",
        },
        success: {
          DEFAULT: "#44AA99",
          200: "#8ACEC3",
          300: "#809FB3",
          400: "#44AA99",
          500: "#359A88",
          600: "#F29F4C",
          700: "#2C7D6C",
        },
        error: {
          DEFAULT: "#CC6677",
          200: "#D67A8C",
          300: "#809FB3",
          400: "#CC6677",
          500: "#C45A65",
          600: "#B45461",
          700: "#9E4E5B",
          800: "#884955",
          900: "#653C48",
        },
      },
      typography: /** @type {any} */ (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white.400"),
            fontFamily: theme("fontFamily.sans"),
            a: {
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.300"),
              },
            },
            h1: {
              color: theme("colors.white.200"),
              fontFamily: theme("fontFamily.title"),
            },
            h2: {
              color: theme("colors.white.300"),
              fontFamily: theme("fontFamily.title"),
            },
            h3: {
              color: theme("colors.white.400"),
              fontFamily: theme("fontFamily.title"),
            },
            h4: {
              color: theme("colors.white.400"),
            },
            strong: {
              color: theme("colors.success.DEFAULT"),
            },
            code: {
              color: theme("colors.white.300"),
              fontFamily: theme("fontFamily.mono"),
            },
            blockquote: {
              color: theme("colors.white.500"),
              borderLeftColor: theme("colors.primary.DEFAULT"),
            },
          },
        },
      }),
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1.5s ease-in-out",
        "slide-up": "slideUp 1s ease-out",
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addBase, theme }) {
      addBase({
        'html': {
          color: theme('colors.white.400'),
          backgroundColor: theme('colors.background'),
          fontFamily: theme('fontFamily.sans'),
        },
        'body': {
          color: theme('colors.white.400'),
        },
        'h1, h2, h3': {
          fontFamily: theme('fontFamily.title'),
        },
      });
    },
  ],
};