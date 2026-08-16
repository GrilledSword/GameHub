/* ============================================
   OverBitCore – Készségek / Skills Data
   Itt szerkeszd a készségeket.
   ============================================ */

/**
 * Mezők:
 * - id:        egyedi azonosító
 * - icon:      emoji vagy SVG string
 * - title:     { hu, en }  – ha csak string, mindkét nyelven ugyanaz
 * - description: { hu, en }
 */

const SKILLS = [
  {
    id: "unity",
    icon: "🎮",
    title: "Unity",
    description: {
      hu: "2D/3D játékfejlesztés, C# scripting",
      en: "2D/3D game development, C# scripting"
    }
  },
  {
    id: "godot",
    icon: "🦊",
    title: "Godot",
    description: {
      hu: "Könnyűsúlyú, nyílt forráskódú motor",
      en: "Lightweight, open-source engine"
    }
  },
  {
    id: "code",
    icon: "💻",
    title: "C# & GDScript",
    description: {
      hu: "Tiszta, karbantartható kód",
      en: "Clean, maintainable code"
    }
  },
  {
    id: "art",
    icon: "🎨",
    title: {
      hu: "Pixel & Digitális művészet",
      en: "Pixel & Digital Art"
    },
    description: {
      hu: "Karakterek, környezetek, UI",
      en: "Characters, environments, UI"
    }
  },
  {
    id: "design",
    icon: "🧠",
    title: {
      hu: "Játéktervezés",
      en: "Game Design"
    },
    description: {
      hu: "Mechanikák, balance, történet",
      en: "Mechanics, balance, narrative"
    }
  },
  {
    id: "audio",
    icon: "🔊",
    title: {
      hu: "Hang & Zene",
      en: "Sound & Music"
    },
    description: {
      hu: "Atmoszféra és feedback tervezés",
      en: "Atmosphere and feedback design"
    }
  }

  // Új készség:
  // {
  //   id: "blender",
  //   icon: "🧊",
  //   title: "Blender",
  //   description: { hu: "3D modellezés és animáció", en: "3D modeling and animation" }
  // },
];

window.SKILLS = SKILLS;
