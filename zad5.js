// Funkcja główna z parametrami domyślnymi

function stworzPlanDnia(imie, zadania = ["spanie", "jedzenie", "odpoczynek"]) {
    if (!imie || typeof imie !== "string" || imie.trim() === "") {
        imie = "Anonim";
    }

    const liczbaZadan = zadania.length;
    let plan = `Plan dnia dla ${imie}:\n`;

    if (liczbaZadan === 0) {
        plan += "  → dzisiaj bez konkretnych zadań – wolny dzień!\n";
        return plan;
    }

    // numerowanie + małe ulepszenie czytelności
    zadania.forEach((zadanie, index) => {
        const numer = (index + 1).toString().padStart(2, "0");
        plan += `  ${numer}. ${zadanie.charAt(0).toUpperCase() + zadanie.slice(1)}\n`;
    });

    // własne rozszerzenie – krótki komentarz w zależności od liczby zadań
    let komentarz = "";
    if (liczbaZadan <= 2) {
        komentarz = "Lekki dzień – będzie czas na kawę";
    } else if (liczbaZadan <= 5) {
        komentarz = "Zrównoważony plan – dasz radę";
    } else {
        komentarz = "Intensywny dzień – trzymam kciuki!";
    }

    plan += `\nPodsumowanie: ${liczbaZadan} zadań – ${komentarz}\n`;

    return plan;
}

// Testowe wywołania

const plan1 = stworzPlanDnia("Kasia", ["zajęcia 8:15", "obiad z przyjaciółmi", "trening na siłowni", "nauka do kolokwium"]);
console.log(plan1);

console.log("─".repeat(50));

const plan2 = stworzPlanDnia("Marek");   // bez podania listy → domyślna
console.log(plan2);

console.log("─".repeat(50));

const plan3 = stworzPlanDnia("Ola", []);  // pusta tablica
console.log(plan3);

console.log("─".repeat(50));

// dodatkowe wywołanie – własne rozszerzenie (bardzo długi dzień)
const plan4 = stworzPlanDnia("Tomek", [
    "poranna kawa",
    "zajęcia 8:00–11:30",
    "ćwiczenia na basenie",
    "praca zdalna 13:00–17:00",
    "zakupy spożywcze",
    "kolacja z rodziną",
    "nauka angielskiego 30 min",
    "spacer z psem"
]);
console.log(plan4);