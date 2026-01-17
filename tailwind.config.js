/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Verdana", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
        title: ["Times New Roman", "sans-serif"], // Add a specific font stack for titles
        subtitle: ["Verdana", "sans-serif"], // Add a specific font stack for subtitles
      },
      utilities: {
        ".strong2": {
          fontWeight: "bold",
        },
      },
      colors: {
        background: "#4b463b",
        backgroundLight: "#cbcbcbff",
        backgroundBlue: "#645e4e",
        outline: "",
        outlineLight: "#47484a",
        text: "#d2c7c7ff",
        textLight: "#756e6eff",
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
            color: theme("colors.textLight"),
            a: {
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.300"),
              },
            },
            h2: {
              color: theme("colors.textLight"),
            },
            h3: {
              color: theme("colors.textLight"),
            },
            strong: {
              color: theme("colors.success.DEFAULT"),
            },
            strong2: {
              fontWeight: "bold",
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
  plugins: [require("@tailwindcss/typography")],
};
