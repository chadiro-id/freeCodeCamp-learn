const footballTeam = {
  team: "Super Ball FC",
  year: 1898,
  headCoach: "Lampir",
  players: [
    {
      name: "Grandong",
      position: "goalkeeper",
      isCaptain: true
    },
    {
      name: "Batik Madrim",
      position: "defender",
      isCaptain: false
    },
    {
      name: "Angling Dharma",
      position: "midfielder",
      isCaptain: false
    },
    {
      name: "Syudawirat",
      position: "forward",
      isCaptain: false
    },
  ]
}

const headCouchElement = document.getElementById("head-coach");
const teamElement = document.getElementById("team");
const yearElement = document.getElementById("year");
const playersDropdown = document.getElementById("players");
const playerCardsElement = document.getElementById("player-cards");

headCouchElement.innerText = footballTeam.headCoach;
teamElement.innerText = footballTeam.team;
yearElement.innerText = footballTeam.year;

playersDropdown.addEventListener("change", () => {
  console.log(playersDropdown.value);
  renderPlayerCards();
});

function renderPlayerCards() {
  const playerPosition = playersDropdown.value;
  let players;
  if (playerPosition === "all") {
    players = [...footballTeam.players];
  } else {
    players = footballTeam.players.filter(({ position }) => position === playerPosition);
  }
  let mappedPlayer = players.map((player) => {
    const captain = player.isCaptain ? "(Captain) " : "";
    return `<div class="player-card"><h2>${captain}${player.name}</h2><p>Position: ${player.position}</p></div>`;
  });
  playerCardsElement.innerHTML = mappedPlayer.join("");
}

renderPlayerCards();