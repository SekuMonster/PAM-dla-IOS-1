const koszyk = [
  { nazwa: "Chleb", cena: 4.5,  ilosc: 2,  kategoria: "pieczywo" },
  { nazwa: "Ser",   cena: 9.9,  ilosc: 1,  kategoria: "nabiał"  },
  { nazwa: "Sok",   cena: 6.2,  ilosc: 3,  kategoria: "napoje"  },
  // własne rozszerzenie – dodatkowy produkt
  { nazwa: "Jajka", cena: 8.99, ilosc: 2,  kategoria: "nabiał"  }
];

const progRabatowy     = 30;
const procentRabatu    = 10;


// 1. Pomocnicza tablica z wyliczonymi wartościami pozycji (map)

const pozycjeZKosztem = koszyk.map(produkt => ({
  ...produkt,
  wartoscPozycji: produkt.cena * produkt.ilosc
}));


// 2. Obliczenie sumy koszyka (reduce)

const sumaPrzedRabatem = pozycjeZKosztem.reduce(
  (suma, pozycja) => suma + pozycja.wartoscPozycji,
  0
);


// 3. Obliczenie rabatu i ceny końcowej (warunek)

const czyRabat = sumaPrzedRabatem >= progRabatowy;
const kwotaRabatu = czyRabat ? sumaPrzedRabatem * (procentRabatu / 100) : 0;
const sumaPoRabacie = sumaPrzedRabatem - kwotaRabatu;


// 4. Raport

console.log("┌──────────────────────────────────────────────┐");
console.log("          KOSZYK ZAKUPOWY                     ");
console.log("└──────────────────────────────────────────────┘");

console.log("\nPozycje w koszyku:");
pozycjeZKosztem.forEach(p => {
  console.log(
    `  ${p.ilosc} × ${p.nazwa.padEnd(12)} ` +
    `(${p.kategoria})   ${p.wartoscPozycji.toFixed(2)} zł`
  );
});

console.log("────────────────────────────────────────────────");

console.log(`Suma przed rabatem:          ${sumaPrzedRabatem.toFixed(2)} zł`);

if (czyRabat) {
  console.log(`Rabat ${procentRabatu}% (próg ${progRabatowy} zł):   -${kwotaRabatu.toFixed(2)} zł`);
  console.log(`Do zapłaty:                  ${sumaPoRabacie.toFixed(2)} zł`);
} else {
  console.log(`Brak rabatu (suma poniżej ${progRabatowy} zł)`);
  console.log(`Do zapłaty:                  ${sumaPrzedRabatem.toFixed(2)} zł`);
}

console.log("────────────────────────────────────────────────");

// własne rozszerzenie – podsumowanie wg kategorii

function sumaWgKategorii(kategoria) {
  return pozycjeZKosztem
    .filter(p => p.kategoria === kategoria)
    .reduce((sum, p) => sum + p.wartoscPozycji, 0)
    .toFixed(2);
}

console.log("Wydatki według kategorii:");
console.log(`  Pieczywo     ${sumaWgKategorii("pieczywo")} zł`);
console.log(`  Nabiał       ${sumaWgKategorii("nabiał")} zł`);
console.log(`  Napoje       ${sumaWgKategorii("napoje")} zł`);