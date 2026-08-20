/* ============================================
   OverBitCore – Készségek / Skills Data
   ============================================ */

const SKILLS = [
  {
    id: "unity",
    icon: "🎮",
    title: "Unity & C#",
    description: {
      // MÓDOSÍTVA: Godot és GDScript törölve, fókuszban a Unity és a tiszta C# kód
      hu: "A fő fegyverem. Komplett játéklogikák, 2D/3D fizika és az elavult Unity függvények könyörtelen gyomlálása.",
      en: "My main weapon. Full game logic, 2D/3D physics, and relentlessly purging deprecated Unity methods."
    }
  },
  {
    id: "blender",
    icon: "🎨",
    title: "Blender 3D",
    description: {
      // MÓDOSÍTVA: Hozzáadva a 3D modellezés és animáció
      hu: "Low-poly és high-poly 3D modellezés, textúrázás, karakterek és környezetépítés a játékokhoz.",
      en: "Low-poly and high-poly 3D modeling, texturing, characters, and environment design for games."
    }
  },
  {
    id: "kotlin",
    icon: "📱",
    title: "Kotlin & Android",
    description: {
      // MÓDOSÍTVA: Hozzáadva a natív Android app fejlesztés
      hu: "Natív Android fejlesztés, autófejegység médialejátszók és egyedi mobilos felületek építése.",
      en: "Native Android development, custom car head unit media players, and UI logic."
    }
  },
  {
    id: "web",
    icon: "💻",
    title: "Web & Front-end",
    description: {
      // MÓDOSÍTVA: Hozzáadva a reszponzív webfejlesztés
      hu: "HTML5, CSS3, JavaScript és GitHub. Tiszta, moduláris weboldalak reszponzív elrendezéssel.",
      en: "HTML5, CSS3, JavaScript, and GitHub. Clean, modular websites with fully responsive layouts."
    }
  },
  {
    id: "hardware",
    icon: "🔌",
    title: {
      hu: "Hardver & Elektronika",
      en: "Hardware & Electronics"
    },
    description: {
      // MÓDOSÍTVA: Hozzáadva a DIY forrasztás és audió építés
      hu: "Forrasztópáka, tápok átalakítása, egyedi audió rendszerek és áramkörök hibaelhárítása.",
      en: "Soldering, power supply modifications, custom audio systems, and circuit troubleshooting."
    }
  }
];

window.SKILLS = SKILLS;