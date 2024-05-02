/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      noto: ["Noto Sans Thai", "sans-serif"],
    },
  },
  plugins: [
    require("daisyui"),
    require("@shrutibalasa/tailwind-grid-auto-fit"),
  ],
  daisyui: {
    themes: [
        {
          mytheme: {
            "primary": "#F4F3F0",
            "primary-content": "#141414",

            "secondary": "#F4F3F0",
            "secondary-content": "#141414",

            "accent": "#2F84FF",
            "accent-content": "#010616",

            "neutral": "#21232b",
            "neutral-content": "#F4F3F0",

            "base-100": "#F4F3F0",
            "base-200": "#d4d3d1",
            "base-300": "#b5b4b2",
            "base-content": "#141414",

            "info": "#22d3ee",
            "info-content": "#001014",

            "success": "#00bc68",
            "success-content": "#000d04",

            "warning": "#d39900",
            "warning-content": "#100800",
            
            "error": "#cf284c",
            "error-content": "#fcd8d9",
          }
        },
    ]
}
}


