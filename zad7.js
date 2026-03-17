const naprawy = [
  { id: 1, klient: "Anna",   urzadzenie: "laptop",     status: "nowe",        dataZgloszenia: "2025-03-10", priorytet: "normalny" },
  { id: 2, klient: "Piotr",  urzadzenie: "telefon",    status: "w trakcie",   dataZgloszenia: "2025-03-12", priorytet: "wysoki"   },
  // własne rozszerzenie – dodatkowe zgłoszenie
  { id: 3, klient: "Kamil",  urzadzenie: "klawiatura", status: "w trakcie",   dataZgloszenia: "2025-03-14", priorytet: "wysoki"   }
];

// 1. Wyszukanie zgłoszenia po id (find)

const idDoZmiany = 2;
const znalezioneZgloszenie = naprawy.find(n => n.id === idDoZmiany);

console.log("Znaleziono zgłoszenie:");
console.log(znalezioneZgloszenie || "Brak zgłoszenia o podanym ID");
console.log("");

// 2. Niemutowalna aktualizacja statusu (map + spread)

const NOWY_STATUS = "gotowe do odbioru";

const zaktualizowaneNaprawy = naprawy.map(naprawa => {
  if (naprawa.id === idDoZmiany) {
    return {
      ...naprawa,
      status: NOWY_STATUS,
      dataZakonczenia: "2025-03-17"
    };
  }
  return naprawa;
});

// 3. Porównanie przed i po

console.log("=== Przed aktualizacją ===");
naprawy.forEach(n => {
  console.log(`#${n.id}  ${n.klient.padEnd(8)}  ${n.urzadzenie.padEnd(12)}  ${n.status}`);
});

console.log("\n=== Po aktualizacji ===");
zaktualizowaneNaprawy.forEach(n => {
  console.log(`#${n.id}  ${n.klient.padEnd(8)}  ${n.urzadzenie.padEnd(12)}  ${n.status}`);
});

console.log("");

// 4. Liczenie zgłoszeń w trakcie (przed i po)

function policzWGStatusie(lista, status) {
  return lista.filter(n => n.status === status).length;
}

const wTrakciePrzed  = policzWGStatusie(naprawy, "w trakcie");
const wTrakciePo     = policzWGStatusie(zaktualizowaneNaprawy, "w trakcie");

console.log(`Zgłoszenia "w trakcie" przed zmianą:  ${wTrakciePrzed}`);
console.log(`Zgłoszenia "w trakcie" po zmianie:     ${wTrakciePo}`);

// Dodatkowe info (własne rozszerzenie)

console.log("\nPriorytety w toku (po aktualizacji):");
const wTrakcie = zaktualizowaneNaprawy.filter(n => n.status === "w trakcie");
wTrakcie.forEach(z => {
  console.log(`→ #${z.id}  ${z.klient}  priorytet: ${z.priorytet}`);
});

console.log(`\nŁączna liczba otwartych zgłoszeń: ${policzWGStatusie(zaktualizowaneNaprawy, "nowe") + wTrakciePo}`);