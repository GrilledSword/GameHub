/* ============================================
   OverBitCore – Projektek / Projects Data
   ============================================ */

const PROJECTS = [
  {
    id: "mindscape",
    title: {
      hu: "Mindscape",
      en: "Mindscape"
    },
    description: {
      hu: "Ebben az egyjátékos anomália-vadász élményben folyamatosan változó szobák sorát fedezheted fel, ahol mindegyik finom torzulásokat rejt. Tárgyak mozdulnak el, tűnnek el, vagy bukkannak fel ott, ahová nem valók — de nem minden anomália látható azonnal. A feladatod? Találd meg őket, mielőtt a valóság összeomlik.",
      en: "In this single-player anomaly-hunting experience, you'll explore an ever-shifting series of rooms, each hiding subtle distortions. Objects shift, vanish, or appear where they don’t belong—but not all anomalies are immediately visible. Your task? Find them before reality collapses."
    },
    tags: ["Unity", "3D / Puzzle", "Horror"],
    status: "completed",
    statusText: {
      hu: "Elkészült",
      en: "Completed"
    },
    image: "img/project/mindscape/main.jpg",
    link: "https://grilledsword.itch.io/mindscape",
    year: 2026
  },
    {
    id: "comming-soon",
    title: {
      hu: "Coming Soon",
      en: "Coming Soon"
    },
    description: {
      hu: "",
      en: ""
    },
    tags: [""],
    status: "inDevelopment",
    statusText: {
      hu: "Fejlesztés Alatt",
      en: "In Development"
    },
    image: null,
    link: null,
    year: 2027
  }
];

window.PROJECTS = PROJECTS;