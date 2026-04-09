const wydatki = [18.5, 42, 9.99, 27, 61.3, 15, 33.5];

// własne rozszerzenie – kategorie i opis wydatku
const wydatkiZOpisem = [
  { kwota: 18.5,  opis: "obiad w pracy" },
  { kwota: 42,    opis: "internet + telefon" },
  { kwota: 9.99,  opis: "kawa" },
  { kwota: 27,    opis: "bilety" },
  { kwota: 61.3,  opis: "tankowanie" },
  { kwota: 15,    opis: "przekąska" },
  { kwota: 33.5,  opis: "zakupy spożywcze" }
];

// obliczenia

const suma = wydatki.reduce((acc, curr) => acc + curr, 0);

const srednia = suma / wydatki.length;

const najwiekszyWydatek = Math.max(...wydatki);

// dodatkowe – najdroższy wydatek z opisem
const najdroższy = wydatkiZOpisem.reduce((max, obecny) => 
  obecny.kwota > max.kwota ? obecny : max
);

// raport

console.log("=== Tygodniowy raport budżetowy ===");
console.log(`Liczba wydatków:     ${wydatki.length}`);
console.log(`Suma wydatków:       ${suma.toFixed(2)} zł`);
console.log(`Średni wydatek:      ${srednia.toFixed(2)} zł`);
console.log(`Największy wydatek:  ${najwiekszyWydatek.toFixed(2)} zł`);

console.log("");
console.log("Najdroższy wydatek:");
console.log(`→ ${najdroższy.opis.padEnd(22)} ${najdroższy.kwota.toFixed(2)} zł`);

// dodatkowe info – czy zmieściliśmy się w założonym budżecie (własne rozszerzenie)
const budzetTygodniowy = 220;
const pozostalo = budzetTygodniowy - suma;

console.log("");
console.log(`Założony budżet:     ${budzetTygodniowy.toFixed(2)} zł`);
if (pozostalo >= 0) {
  console.log(`Pozostało:           ${pozostalo.toFixed(2)} zł ✓`);
} else {
  console.log(`Przekroczono o:      ${Math.abs(pozostalo).toFixed(2)} zł ✗`);
}