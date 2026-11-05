import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "aio-black": "#0a0a0a",
        "aio-deep": "#111111",
        "aio-card": "#161616",
        "aio-red": "#c8102e",
        "aio-red-light": "#e8243e",
      },
      fontFamily: {
        playfair: ["Inter", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
