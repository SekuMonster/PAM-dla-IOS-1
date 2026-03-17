const filmy = [
  { tytul: "Arrival",        gatunek: "sci-fi",      ocena: 8.1,  obejrzany: true,   rok: 2016  },
  { tytul: "Whiplash",       gatunek: "dramat",      ocena: 8.5,  obejrzany: false,  rok: 2014  },
  { tytul: "Dune",           gatunek: "sci-fi",      ocena: 8.0,  obejrzany: false,  rok: 2021  },
  { tytul: "Inside Out",     gatunek: "animacja",    ocena: 8.1,  obejrzany: true,   rok: 2015  },
  // własne rozszerzenie – dodatkowe filmy
  { tytul: "Everything Everywhere All at Once", gatunek: "sci-fi / komedia", ocena: 8.4, obejrzany: false, rok: 2022 },
  { tytul: "The Banshees of Inisherin",         gatunek: "dramat / komedia", ocena: 7.7, obejrzany: false, rok: 2022 }
];

// 1. Filmy jeszcze nieobejrzane
const nieobejrzane = filmy.filter(film => !film.obejrzany);

console.log("=== Filmy do obejrzenia ===");
nieobejrzane.forEach(f => {
  console.log(`→ ${f.tytul} (${f.gatunek}, ${f.rok}) – ocena: ${f.ocena}`);
});

console.log("");

// 2. Filmy z oceną > 8.0 (niezależnie od obejrzenia)
const bardzoDobre = filmy.filter(film => film.ocena > 8.0);

console.log("=== Filmy z oceną powyżej 8.0 ===");
bardzoDobre.forEach(f => {
  const status = f.obejrzany ? "✓ obejrzany" : "do obejrzenia";
  console.log(`→ ${f.tytul.padEnd(32)} ${f.ocena}  ${status}`);
});

console.log("");

// 3. Tylko tytuły nieobejrzanych i bardzo dobrych (własne połączenie filtrów)
const polecaneDoObejrzenia = filmy
  .filter(film => !film.obejrzany && film.ocena > 8.0)
  .map(film => film.tytul);

console.log("=== Najbardziej polecane (jeszcze nie obejrzane + ocena > 8.0) ===");
if (polecaneDoObejrzenia.length === 0) {
  console.log("Brak filmów spełniających oba kryteria");
} else {
  polecaneDoObejrzenia.forEach((tytul, i) => {
    console.log(`${i + 1}. ${tytul}`);
  });
}

console.log("");
console.log(`Liczba polecanych: ${polecaneDoObejrzenia.length}`);

// Dodatkowa funkcja pomocnicza (własne rozszerzenie)

function ileFilmowZGatunku(gatunek) {
  return filmy.filter(f => f.gatunek.toLowerCase().includes(gatunek.toLowerCase())).length;
}

console.log("\nStatystyka gatunków:");
console.log(`Sci-fi:          ${ileFilmowZGatunku("sci-fi")}`);
console.log(`Dramat:          ${ileFilmowZGatunku("dramat")}`);
console.log(`Animacja:        ${ileFilmowZGatunku("animacja")}`);