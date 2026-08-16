/* ============================================
   OverBitCore – Projektek / Projects Data
   ============================================ */

const PROJECTS = [
  {
    id: "alpha",
    title: {
      hu: "Projekt Alpha",
      en: "Project Alpha"
    },
    description: {
      hu: "Atmoszférikus 2D kalandjáték prototípusa. A történet és a gameplay fejlesztés alatt áll.",
      en: "Prototype of an atmospheric 2D adventure. Story and gameplay are under development."
    },
    tags: ["Prototype", "2D"],
    status: "dev",
    statusText: {
      hu: "Fejlesztés alatt",
      en: "In Development"
    },
    image: null,
    link: null,
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
      hu: "Kísérletek",
      en: "Experiments"
    },
    description: {
      hu: "Kisebb jam-ek, prototípusok és technikai próbák. Ezekből születnek a nagyobb ötletek.",
      en: "Smaller jams, prototypes and technical experiments. This is where bigger ideas are born."
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
];

window.PROJECTS = PROJECTS;
