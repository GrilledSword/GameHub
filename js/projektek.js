/* ============================================
   OverBitCore – Projektek / Projects Data
   Itt add hozzá / szerkeszd a projektjeidet.
   ============================================ */

/**
 * Minden projekt objektum mezői:
 * - id:         egyedi azonosító (string)
 * - title:      { hu: "...", en: "..." }
 * - description:{ hu: "...", en: "..." }
 * - tags:       ["Tag1", "Tag2"]
 * - status:     "dev" | "concept" | "experimental" | "released"
 * - statusText: { hu: "...", en: "..." }  (opcionális, ha nincs, a status alapján generálódik)
 * - image:      null vagy "assets/projects/valami.jpg" vagy külső URL
 * - link:       null vagy a játék / itch.io / steam linkje
 * - year:       opcionális évszám
 */

const PROJECTS = [
  {
    id: "alpha",
    title: {
      hu: "Projekt Alpha",
      en: "Project Alpha"
    },
    description: {
      hu: "Egy atmoszférikus 2D kalandjáték prototípusa. A történet és a gameplay jelenleg fejlesztés alatt áll.",
      en: "A prototype of an atmospheric 2D adventure game. Story and gameplay are currently under development."
    },
    tags: ["Prototype", "2D"],
    status: "dev",
    statusText: {
      hu: "Fejlesztés alatt",
      en: "In Development"
    },
    image: null,          // pl. "assets/projects/alpha.jpg"
    link: null,           // pl. "https://overbitcore.itch.io/alpha"
    year: 2026
  },
  {
    id: "beta",
    title: {
      hu: "Projekt Beta",
      en: "Project Beta"
    },
    description: {
      hu: "Innovatív puzzle-mechanika körül épülő játékötlet. A koncepció és a core loop tervezése zajlik.",
      en: "A game idea built around innovative puzzle mechanics. Concept and core loop design are in progress."
    },
    tags: ["Concept", "Puzzle"],
    status: "concept",
    statusText: {
      hu: "Koncepció",
      en: "Concept"
    },
    image: null,
    link: null,
    year: 2026
  },
  {
    id: "experimental",
    title: {
      hu: "Kísérleti projektek",
      en: "Experimental Projects"
    },
    description: {
      hu: "Kisebb kísérletek, jam-ek és prototípusok. Ezekből születnek a nagyobb ötletek.",
      en: "Smaller experiments, game jams and prototypes. These are where the bigger ideas are born."
    },
    tags: ["Experimental"],
    status: "experimental",
    statusText: {
      hu: "Folyamatos",
      en: "Ongoing"
    },
    image: null,
    link: null,
    year: null
  }

  // Új projekt hozzáadása:
  // {
  //   id: "uj-jatek",
  //   title: { hu: "Új Játék", en: "New Game" },
  //   description: { hu: "...", en: "..." },
  //   tags: ["3D", "Action"],
  //   status: "released",
  //   statusText: { hu: "Kiadva", en: "Released" },
  //   image: "assets/projects/uj-jatek.jpg",
  //   link: "https://store.steampowered.com/app/...",
  //   year: 2027
  // },
];

// Export a globális scope-ba (egyszerűség kedvéért)
window.PROJECTS = PROJECTS;
