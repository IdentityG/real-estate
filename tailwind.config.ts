import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        "deep-teal": "#005F73",
        "royal-navy": "#0A2342",
        
        // Secondary
        "warm-sand": "#E9D8A6",
        "soft-sage": "#94A187",
        
        // Neutrals
        white: "#FFFFFF",
        alabaster: "#F8F9FA",
        "silver-mist": "#DEE2E6",
        "slate-gray": "#6C757D",
        charcoal: "#212529",
        midnight: "#001219",
        
        // Accents
        terracotta: "#AE2012",
        "gold-leaf": "#BB9457",
        
        // States
        success: "#2A9D8F",
        warning: "#E9C46A",
        error: "#AE2012",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #0A2342, #005F73)',
      },
    },
  },
  plugins: [],
} satisfies Config;