const cases = document.querySelectorAll(".case");
const joueurAffichage = document.getElementById("joueur");
const score1Affichage = document.getElementById("score1");
const score2Affichage = document.getElementById("score2");
const matchesNulsAffichage = document.getElementById("matches");

const state = {
  joueurEnCours: 1,
  score1: 0,
  score2: 0,
  matchesNuls: 0,
};

function playCase(e) {
  const caseCliquee = e.target;

  if (caseCliquee.textContent !== "") {
    return;
  }

  caseCliquee.textContent = state.joueurEnCours === 1 ? "X" : "O";

  if (verifierVictoire()) {
    setTimeout(() => {
      if (state.joueurEnCours === 1) {
        state.score1++;
        alert("Joueur 1 a gagné !");
      } else {
        state.score2++;
        alert("Joueur 2 a gagné !");
      }

      score1Affichage.textContent = state.score1;
      score2Affichage.textContent = state.score2;

      reset();
    }, 100);

    return;
  }

  if (verifierMatchNul()) {
    state.matchesNuls++;
    matchesNulsAffichage.textContent = state.matchesNuls;

    alert("Match nul !");
    reset();
    return;
  }

  state.joueurEnCours = state.joueurEnCours === 1 ? 2 : 1;
  joueurAffichage.textContent = state.joueurEnCours;
}

function verifierVictoire() {
  const combinaisonsGagnantes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combinaison of combinaisonsGagnantes) {
    const a = cases[combinaison[0]].textContent;
    const b = cases[combinaison[1]].textContent;
    const c = cases[combinaison[2]].textContent;

    if (a !== "" && a === b && b === c) {
      return true;
    }
  }

  return false;
}

function verifierMatchNul() {
  for (let i = 0; i < 9; i++) {
    if (cases[i].textContent === "") {
      return false;
    }
  }

  return true;
}

function reset() {
  cases.forEach((caseElement) => {
    caseElement.textContent = "";
  });

  state.joueurEnCours = 1;
  joueurAffichage.textContent = state.joueurEnCours;

  score1Affichage.textContent = state.score1;
  score2Affichage.textContent = state.score2;
}

cases.forEach((caseElement) => {
  caseElement.addEventListener("click", playCase);
});

joueurAffichage.textContent = state.joueurEnCours;
