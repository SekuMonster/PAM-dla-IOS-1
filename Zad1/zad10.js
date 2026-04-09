const aktywnosci = [
  { rodzaj: "bieg",       czasMin: 35,  kalorie: 320,  intensywnosc: "średnia" },
  { rodzaj: "rower",      czasMin: 50,  kalorie: 410,  intensywnosc: "wysoka"  },
  { rodzaj: "spacer",     czasMin: 20,  kalorie: 90,   intensywnosc: "niska"   },
  { rodzaj: "siłownia",   czasMin: 60,  kalorie: 450,  intensywnosc: "wysoka"  },
  // własne rozszerzenie – dodatkowa aktywność
  { rodzaj: "joga",       czasMin: 45,  kalorie: 180,  intensywnosc: "niska"   }
];

// 1. Łączny czas i kalorie (reduce)

const calkowityCzas = aktywnosci.reduce((suma, akt) => suma + akt.czasMin, 0);
const calkowiteKalorie = aktywnosci.reduce((suma, akt) => suma + akt.kalorie, 0);

// 2. Aktywności dłuższe niż 30 minut (filter)

const dlugieTreningi = aktywnosci.filter(akt => akt.czasMin > 30);

// 3. Najbardziej kaloryczna aktywność (reduce + porównanie)

const najbardziejKaloryczna = aktywnosci.reduce((najlepsza, obecna) => 
  obecna.kalorie > najlepsza.kalorie ? obecna : najlepsza
);

// 4. Raport

console.log("═══════════════════════════════════════════════");
console.log("       TYGODNIOWY DZIENNIK AKTYWNOŚCI          ");
console.log("═══════════════════════════════════════════════");

console.log(`Łączny czas treningu:       ${calkowityCzas} minut`);
console.log(`Spalone kalorie:            ${calkowiteKalorie} kcal`);
console.log(`Średni czas na trening:     ${(calkowityCzas / aktywnosci.length).toFixed(1)} min`);

console.log("\nNajbardziej kaloryczny trening:");
console.log(`→ ${najbardziejKaloryczna.rodzaj.toUpperCase()} – ${najbardziejKaloryczna.kalorie} kcal ` +
            `(${najbardziejKaloryczna.czasMin} min, intensywność: ${najbardziejKaloryczna.intensywnosc})`);

console.log("\nDłuższe treningi (> 30 min):");
dlugieTreningi.forEach(akt => {
  console.log(
    `  • ${akt.rodzaj.padEnd(10)} ${akt.czasMin} min   ${akt.kalorie} kcal   ` +
    `${akt.intensywnosc}`
  );
});

console.log("───────────────────────────────────────────────");
console.log(`Liczba długich treningów:   ${dlugieTreningi.length} z ${aktywnosci.length} wszystkich`);
console.log("═══════════════════════════════════════════════");