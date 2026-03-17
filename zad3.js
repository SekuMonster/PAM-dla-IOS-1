const listaZakupow = [
  { nazwa: "chleb",      ilosc: 2,  pilne: true,  kategoria: "pieczywo"    },
  { nazwa: "mleko",      ilosc: 1,  pilne: false, kategoria: "nabiał"      },
  { nazwa: "jajka",      ilosc: 10, pilne: true,  kategoria: "nabiał"      },
  { nazwa: "makaron",    ilosc: 3,  pilne: false, kategoria: "suche"       },
  // własne rozszerzenie – dodatkowy produkt
  { nazwa: "papier toaletowy", ilosc: 1, pilne: true, kategoria: "chemia" }
];

// 1. Wyświetlenie całej listy w czytelnej formie

console.log("Cała lista zakupów:");
listaZakupow.forEach(produkt => {
  const znacznik = produkt.pilne ? "PILNE" : "  zwykłe";
  console.log(`• ${produkt.nazwa.padEnd(18)} × ${produkt.ilosc}   ${znacznik}`);
});

console.log("");

// 2. Tylko produkty pilne (filter)

const pilneZakupy = listaZakupow.filter(item => item.pilne);

console.log("Produkty PILNE:");
pilneZakupy.forEach(p => {
  console.log(`→ ${p.nazwa} × ${p.ilosc} szt.`);
});

console.log("");

// 3. Tablica samych nazw wielkimi literami (map)

const nazwyDuzeLitery = listaZakupow.map(item => item.nazwa.toUpperCase());

console.log("Wszystkie produkty wielkimi literami:");
console.log(nazwyDuzeLitery.join(" • "));

console.log("");

// 4. Raport podsumowujący

const ilePilnych = pilneZakupy.length;
const ileWszystkich = listaZakupow.length;

console.log("=== PODSUMOWANIE ===");
console.log(`Produktów ogółem:     ${ileWszystkich}`);
console.log(`Pilnych do kupienia:  ${ilePilnych} (${Math.round(ilePilnych / ileWszystkich * 100)}%)`);

// dodatkowe – najczęstsza kategoria wśród pilnych (własne rozszerzenie)
const kategoriePilne = pilneZakupy.map(p => p.kategoria);
const najczestszaKategoria = kategoriePilne.sort((a,b) =>
  kategoriePilne.filter(v => v===a).length - kategoriePilne.filter(v => v===b).length
).pop() || "brak";

console.log(`Najpilniejsza kategoria: ${najczestszaKategoria}`);