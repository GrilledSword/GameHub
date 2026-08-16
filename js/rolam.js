/* ============================================
   OverBitCore – Rólam / About Data
   Itt szerkeszd a stúdió bemutatkozó kártyáit.
   ============================================ */

/**
 * Mezők:
 * - id:          egyedi azonosító
 * - icon:        emoji vagy SVG
 * - title:       { hu, en }
 * - description: { hu, en }
 */

const ABOUT = [
  {
    id: "mission",
    icon: "🎯",
    title: {
      hu: "Küldetésünk",
      en: "Our Mission"
    },
    description: {
      hu: "Olyan játékokat készítünk, amelyek érzelmeket váltanak ki, és új élményeket adnak a játékosoknak. Minden projektünkben a minőség és a kreativitás áll a középpontban.",
      en: "We create games that evoke emotions and deliver fresh experiences to players. Quality and creativity are at the heart of every project."
    }
  },
  {
    id: "vision",
    icon: "💡",
    title: {
      hu: "Látomásunk",
      en: "Our Vision"
    },
    description: {
      hu: "Hiszünk abban, hogy a kis stúdiók is nagy hatással lehetnek. A bitről bitre épített világok segíthetnek abban, hogy a játékipar sokszínűbb és innovatívabb legyen.",
      en: "We believe small studios can make a big impact. Worlds built bit by bit help make the games industry more diverse and innovative."
    }
  },
  {
    id: "approach",
    icon: "🛠️",
    title: {
      hu: "Megközelítésünk",
      en: "Our Approach"
    },
    description: {
      hu: "Modern eszközökkel és klasszikus játéktervezési elvekkel dolgozunk. A játékos élmény mindig elsőbbséget élvez a technikai megoldások felett.",
      en: "We work with modern tools and classic game design principles. Player experience always comes before technical solutions."
    }
  }

  // Új kártya:
  // {
  //   id: "values",
  //   icon: "❤️",
  //   title: { hu: "Értékeink", en: "Our Values" },
  //   description: { hu: "...", en: "..." }
  // },
];

window.ABOUT = ABOUT;
