const MIN_SREDNIA_ZALICZENIE = 3.0;
const OCENY_WAZONE = false;

// Funkcja główna – oblicza średnią i zwraca obiekt z podsumowaniem

function oceńWynik(oceny) {
  if (!Array.isArray(oceny) || oceny.length === 0) {
    return {
      srednia: null,
      status: "brak ocen",
      klasyfikacja: "—",
      ileOcen: 0,
      komunikat: "Nie można obliczyć wyniku – brak ocen do analizy"
    };
  }

  // reduce do obliczenia sumy
  const suma = oceny.reduce((acc, ocena) => acc + ocena, 0);
  const srednia = suma / oceny.length;

  // status zaliczenia – operator trójargumentowy
  const zaliczone = srednia >= MIN_SREDNIA_ZALICZENIE;
  const status = zaliczone ? "ZALICZONE" : "NIEZALICZONE";

  // własne rozszerzenie – klasyfikacja opisowa
  let klasyfikacja = "—";
  if (srednia >= 4.75)      klasyfikacja = "bardzo dobry";
  else if (srednia >= 4.0)  klasyfikacja = "dobry";
  else if (srednia >= 3.5)  klasyfikacja = "plus dostateczny";
  else if (srednia >= 3.0)  klasyfikacja = "dostateczny";
  else if (srednia >= 2.0)  klasyfikacja = "niedostateczny";
  else                       klasyfikacja = "niedostateczny (znacznie poniżej progu)";

  // dodatkowe pole – ile ocen poniżej 3.0
  const ileNiedostatecznych = oceny.filter(o => o < 3.0).length;

  return {
    srednia: Number(srednia.toFixed(2)),
    status,
    klasyfikacja,
    ileOcen: oceny.length,
    ileNiedostatecznych,
    komunikat: zaliczone
      ? `Średnia ${srednia.toFixed(2)} → ${klasyfikacja.toUpperCase()} – gratulacje!`
      : `Średnia ${srednia.toFixed(2)} → niezaliczone (potrzebne minimum ${MIN_SREDNIA_ZALICZENIE})`
  };
}

// Testowe wywołania

const oceny1 = [3.0, 4.0, 5.0, 3.5, 4.5];
const wynik1 = oceńWynik(oceny1);

console.log("=== Student A ===");
console.log("Oceny:", oceny1.join(", "));
console.log("Średnia:", wynik1.srednia);
console.log("Status:", wynik1.status);
console.log("Klasyfikacja:", wynik1.klasyfikacja);
console.log("Niedostateczne:", wynik1.ileNiedostatecznych);
console.log("Komunikat:", wynik1.komunikat);
console.log("");

const oceny2 = [2.0, 2.5, 3.0, 2.0];
const wynik2 = oceńWynik(oceny2);

console.log("=== Student B ===");
console.log("Oceny:", oceny2.join(", "));
console.log("Średnia:", wynik2.srednia);
console.log("Status:", wynik2.status);
console.log("Klasyfikacja:", wynik2.klasyfikacja);
console.log("Niedostateczne:", wynik2.ileNiedostatecznych);
console.log("Komunikat:", wynik2.komunikat);
console.log("");

console.log("=== Przypadek pusty ===");
console.log(oceńWynik([]).komunikat);