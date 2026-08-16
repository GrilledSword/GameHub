# OverBitCore – Personal portfolio site

Moduláris, bilingual (HU/EN) portfolio liquid glass dizájnnal és scroll-vezérelt 3D Core / reaktor háttérrel.

## Fájlok

| Fájl | Szerep |
|------|--------|
| `index.html` | Struktúra |
| `css/main.css` | Stílusok, téma, responsive |
| `js/parallax.js` | **3D háttér** (vertex → face → solid mesh) |
| `js/main.js` | Téma, rendererek, interakciók |
| `js/i18n.js` | Fordítások |
| `js/projektek.js` | Projektek adatai |
| `js/hivatkozasok.js` | Email + social linkek + SVG ikonok |
| `js/keszsegek.js` | Készségek |
| `js/rolam.js` | Rólam kártyák |

## Tartalom szerkesztése

- **Projektek** → `js/projektek.js`
- **Linkek / social** → `js/hivatkozasok.js`
- **Készségek** → `js/keszsegek.js`
- **Rólam** → `js/rolam.js`
- **Szövegek (HU/EN)** → `js/i18n.js`

## Futtatás

Nyisd meg az `index.html`-t, vagy:

```bash
cd overbitcore
python3 -m http.server 8080
```

Majd: http://localhost:8080
