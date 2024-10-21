let mov = document.querySelector(".mov-box");
let box = document.querySelector(".box");
let span = document.querySelector(".span");
let timerSpan = document.querySelector(".timer");
let startButton = document.querySelector(".start-button");
let table = document.querySelector(".result-table tbody");

let count = 0;
let run = 1;
let scores = [];
let timeLeft = 10;
let interval;
let gameInterval;

startButton.addEventListener("click", () => {
    if (run <= 10) {
        startGame();
    }
});

function startGame() {
    count = 0; // Reset score for each run
    timeLeft = 10;
    span.innerHTML = `Score : ${count}`;
    timerSpan.innerHTML = `Temps restant: ${timeLeft}s`;

    interval = setInterval(() => {
        timeLeft--;
        timerSpan.innerHTML = `Temps restant: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(interval);
            clearInterval(gameInterval);
            scores.push(count); // Save the score for the current run
            run++;
            if (run <= 10) {
                alert(`Run ${run - 1} terminé. Cliquer sur 'DÉMARRER' pour lancer le prochain run.`);
            } else {
                endSession();
            }
        }
    }, 1000);

    gameInterval = setInterval(() => {
        let x = Math.floor(Math.random() * 400);
        let y = Math.floor(Math.random() * 400);
        mov.style.top = `${y}px`;
        mov.style.left = `${x}px`;
    }, 800);
}

// Move the event listener outside of startGame to prevent multiple listeners being added
mov.addEventListener("click", () => {
    count++; // Increment score for the current run
    span.innerHTML = `Score : ${count}`;
    mov.classList.add("color");
    setTimeout(() => mov.classList.remove("color"), 200);
});

function endSession() {
    alert("Session terminée! Affichage des résultats.");
    displayResults();
}

function displayResults() {
    table.innerHTML = ''; // Clear previous results
    scores.forEach((score, index) => {
        let row = `<tr><td>Run ${index + 1}</td><td>${score}</td></tr>`;
        table.innerHTML += row;
    });
}

