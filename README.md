# OverBitCore – Személyes / Stúdió weboldal

Modern, moduláris, kétnyelvű (HU/EN) portfólió oldal Liquid Glass stílussal, 3D parallax háttérrel + sötét/világos téma.

## Fájlstruktúra

```
overbitcore/
├── index.html
├── css/
│   └── main.css
├── js/
│   ├── hivatkozasok.js   ← IDE ÍRD BE A LINKJEIDET
│   ├── projektek.js      ← IDE TEDD FEL A PROJEKTJEIDET
│   ├── keszsegek.js      ← IDE A KÉSZSÉGEK
│   ├── rolam.js          ← IDE A RÓLAM / STÚDIÓ KÁRTYÁK
│   ├── i18n.js           ← fordítások
│   └── main.js           ← logika + 3D parallax
└── README.md
```

## Hol mit állíts?

### 1. Linkek és közösségi profilok
**Fájl:** `js/hivatkozasok.js`

```js
email: "hello@overbitcore.com",

social: [
  {
    id: "twitter",
    label: "Twitter / X",
    url: "https://x.com/TEFELHASZNALONEVED",
    icon: ICONS.twitter,   // hivatalos SVG ikon
    enabled: true
  },
  // ...
]
```

### 2. Projektek
**Fájl:** `js/projektek.js`

```js
{
  id: "uj-jatek",
  title: { hu: "Az én játékom", en: "My Game" },
  description: { hu: "...", en: "..." },
  tags: ["2D", "Puzzle"],
  status: "dev",               // dev | concept | experimental | released
  image: "assets/projects/kep.jpg",
  link: "https://...",
  year: 2026
}
```

### 3. Készségek
**Fájl:** `js/keszsegek.js`

```js
{
  id: "blender",
  icon: "🧊",
  title: "Blender",
  description: { hu: "3D modellezés", en: "3D modeling" }
}
```

### 4. Rólam / Stúdió kártyák
**Fájl:** `js/rolam.js`

```js
{
  id: "values",
  icon: "❤️",
  title: { hu: "Értékeink", en: "Our Values" },
  description: { hu: "...", en: "..." }
}
```

## Főbb funkciók

- **3D Parallax háttér** – egérkövető mélységi rétegek, forgó gyűrűk, lebegő kockák, perspektív rács
- **Liquid Glass** hatás
- **Sötét / Világos téma** váltó
- **HU / EN** nyelvváltó
- Teljesen reszponzív (telefon + tablet finomhangolva)
- Moduláris adatfájlok

## Futtatás

Nyisd meg az `index.html`-t böngészőben, vagy tedd fel Netlify / Vercel / GitHub Pages-re.
