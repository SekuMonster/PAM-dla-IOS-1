const maLaptop       = true;
const maLadowarke    = false;
const maNotes        = true;
const maButelkeWody  = false;       // własne rozszerzenie
const typDnia        = "laboratorium";


console.log("=== Czy jestem gotowy na zajęcia? ===");
console.log(`Typ zajęć dziś: ${typDnia}`);

// 1. Podstawowa gotowość (if...else)

let gotowy = false;

if (maLaptop && maNotes) {
    gotowy = true;
    
    if (typDnia === "laboratorium" && !maLadowarke) {
        gotowy = false;
    }
}

console.log("");
console.log("Ocena ogólna:", gotowy ? "GOTOWY" : "NIE GOTOWY");


// 2. Krótki komunikat statusu (operator trójargumentowy)

console.log(
    gotowy 
        ? "Możesz spokojnie iść na zajęcia"
        : "Coś ważnego zostało w domu..."
);


// 3. Dodatkowe ostrzeżenia (z użyciem &&)

!maLadowarke    && console.log("Brak ładowarki – bateria może nie wytrzymać labu!");
!maButelkeWody  && console.log("Nie masz wody – weź coś do picia, będzie długi dzień");
maLaptop        && maLadowarke && console.log("✓ Laptop + ładowarka = bezpieczny dzień");


// 4. Komunikat zależny od typu dnia

console.log("");
console.log("Co jest dzisiaj najważniejsze:");

const komunikatDnia = 
    typDnia === "laboratorium" ? "Komputer i notatki są kluczowe" :
    typDnia === "wykład"       ? "Głównie notes i długopis" :
    typDnia === "egzamin"      ? "Wszystko musi być na tip-top" :
    /* default */                "Zwykły dzień – bierz standardowy zestaw";

console.log(`→ ${komunikatDnia}`);


// Podsumowanie – własne rozszerzenie (prosta funkcja pomocnicza)

function ileBrakuje() {
    let brak = 0;
    if (!maLaptop)     brak++;
    if (!maLadowarke)  brak++;
    if (!maNotes)      brak++;
    if (!maButelkeWody) brak++;
    return brak;
}

const brakujacychRzeczy = ileBrakuje();

console.log("");
if (brakujacychRzeczy === 0) {
    console.log("Gratulacje – masz komplet!");
} else if (brakujacychRzeczy === 1) {
    console.log("Tylko jedna rzecz do zabrania – dasz radę!");
} else {
    console.log(`Brakuje ${brakujacychRzeczy} rzeczy – sprawdź torbę jeszcze raz.`);
}