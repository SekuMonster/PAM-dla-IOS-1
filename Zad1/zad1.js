const osoba = {
  imie: "Jan",
  nazwisko: "Kowalski",
  miasto: "Katowice",
  wiek: 21,
  kierunek: "informatyka",
  // własne rozszerzenie
  hobby: "Motoryzacja"
};

const pelneImie = `${osoba.imie} ${osoba.nazwisko}`;

console.log("1. Pełne imię i nazwisko:", pelneImie);

console.log(
  `2. ${osoba.imie} studiuje ${osoba.kierunek} i mieszka w ${osoba.miasto}.`
);

const statusWiek = osoba.wiek >= 18 
  ? "jest pełnoletni" 
  : "nie jest jeszcze pełnoletni";

console.log(`3. Użytkownik ${pelneImie} ma ${osoba.wiek} lat i ${statusWiek}.`);

// dodatkowe komunikaty z własnym polem
console.log(
  `Dodatkowe info: ulubione hobby Jana → ${osoba.hobby}`
);

console.log(
  `${osoba.imie} interesuje się klasyczną ${osoba.hobby.toUpperCase()} 🚗`
);