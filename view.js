import { PokemonTeamViewModel } from "./viewModel.js";

export class PokemonUI {
  constructor(jsonUrl = "./pokemon_data.json") {//viewModel, jsonUrl = "./pokemon_data.json") {
    this.viewModel = new PokemonTeamViewModel();  // Your PokemonTeamViewModel instance
    this.jsonUrl = jsonUrl;

    // Existing DOM element references:
    this.gridContainer = "";
    this.teamGrid = "";
    this.creditsDisplay = "";
//    this.showTeamButton = "";
//    this.sortTeamButton = "";
//    this.sortOptionsForm = "";

    // New DOM element references for view transitions:
//    this.startTeamSelectionButton = "";
//    this.nextPlayerButton = "";
    this.playerSetupSection = "";
    this.teamSelectionSection = "";
    this.battleSection = "";
    this.twoPlayersToggle = "";
    this.currentPlayerSelectionDisplay = "";
    this.player2Container = "";

    // Track which player is selecting (1 or 2 – note: even CPU is considered Player 2)
    this.currentPlayer = 1;
  }
//  async init() {
  init(){
    this.cacheDom();
    this.bindEvents();
//    await this.fetchAndLoadPokemons();
//    this.renderGlobalList();
//    this.updateCreditsDisplay();
  }

  cacheDom() {
    // Existing elements:
//    this.gridContainer = document.getElementById("pokemon-grid");
    this.teamGrid = document.getElementById("selected-team-grid");
    this.creditsDisplay = document.getElementById("credits-display");
//    this.showTeamButton = document.getElementById("show-team");
//    this.sortTeamButton = document.getElementById("sort-team");
//    this.sortOptionsForm = document.getElementById("sort-options-form");

    // New elements for view transitions:
//    this.startTeamSelectionButton = document.getElementById("start-team-selection-button");
//    this.nextPlayerButton = document.getElementById("next-player-button");
    this.playerSetupSection = document.getElementById("player-setup-section");
    this.teamSelectionSection = document.getElementById("team-selection-section");
    this.battleSection = document.getElementById("battle-section");
    this.twoPlayersToggle = document.getElementById("two-players-toggle");
    this.currentPlayerSelectionDisplay = document.getElementById("current-player-selection");
    this.player2Container = document.getElementById("player2-container");
    this.performAttackButton = document.getElementById("perform-attack-button");
    this.player1List = document.getElementById("player1-team-display");
    this.player2List = document.getElementById("player2-team-display");
  }

  bindEvents() {
    // Existing bindings:
//    this.showTeamButton.addEventListener("click", () => this.showTeam());
//    this.sortTeamButton.addEventListener("click", () => this.handleSortOptions());

    // New bindings for transitions:
//    this.startTeamSelectionButton.addEventListener("click", () => this.startTeamSelection());
//    this.nextPlayerButton.addEventListener("click", () => this.handleNextPlayer());

    // Bind toggle for Player 2 (show/hide input)
//    this.twoPlayersToggle.addEventListener("change", () => this.toggleTwoPlayersMode());
    this.performAttackButton = document.getElementById("perform-attack-button");
    this.performAttackButton.addEventListener("click", () => this.startBattle());
  }

  toggleTwoPlayersMode() {
    if (this.twoPlayersToggle.checked) {
        this.player2Container.style.display = "block";
    } else {
        this.player2Container.style.display = "none";
        document.getElementById("player2-name").value = "CPU";
    }
  }

/*  async fetchAndLoadPokemons() {
    try {
      const response = await fetch(this.jsonUrl);
      const data = await response.json();
      this.viewModel.pokemonList.loadPokemons(data);
    } catch (error) {
      console.error("Error loading Pokémon data:", error);
    }
  }*/
    async fetchAndLoadPokemons() {
      try {
        console.log("Fetching from URL:", this.jsonUrl);
        const response = await fetch(this.jsonUrl);
        if (!response.ok) {
          throw new Error("HTTP error: " + response.status);
        }
        const data = await response.json();
        console.log("Data fetched:", data);
        this.viewModel.pokemonList.loadPokemons(data);
      } catch (error) {
        console.error("Error loading Pokémon data:", error);
      }
    }
    

  renderGlobalList() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = "";
    const globalPokemons = this.viewModel.getGlobalList();

    globalPokemons.forEach((pokemon) => {
      const card = document.createElement("div");
      card.className = "pokemon-card";
      card.dataset.name = pokemon.name;
      card.dataset.points = pokemon.points;

      const imageName = pokemon.name.replace(/ /g, "_").replace(/\./g, "") + ".png";
      const img = document.createElement("img");
      img.src = `./images/${imageName}`;
      img.alt = pokemon.name;

      const nameEl = document.createElement("h3");
      nameEl.textContent = pokemon.name;

      const pointsEl = document.createElement("p");
      pointsEl.textContent = `Points: ${pokemon.points}`;

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(pointsEl);

      // Check if this Pokémon is already in the current player's team:
      if (this.isPokemonInTeam(pokemon.name)) {
        card.classList.add("selected");
      }

      // Click to toggle add/remove:
      card.addEventListener("click", () => this.toggleSelection(card));

      this.gridContainer.appendChild(card);
    });
  }

/*  toggleSelection(card) {
    const pokemonName = card.dataset.name;

    // Check if the Pokémon is already in the team once
    const isInTeam = this.isPokemonInTeam(pokemonName);

    if (isInTeam) {
        // Remove from the current player's team
        this.viewModel.removePokemonFromTeam(pokemonName);
        card.classList.remove("selected");
        this.showTeam();
    } else {
        // Try adding the Pokémon to the team
        const addResult = this.viewModel.addPokemonToCurrentPlayer(this.viewModel.pokemonList.getPokemonByName(pokemonName));

        // If the Pokémon was successfully added, mark it as selected
        if (addResult) {
            card.classList.add("selected");
            this.showTeam();
        } else {
            alert("Cannot add the pokémon.");  // Notify the player if there was an issue (e.g., team full)
        }
    }

    // Update the credits display after the operation
    this.updateCreditsDisplay();
}*/


  showTeam(teamSection=this.teamGrid) {
    const teamGrid=teamSection;
    if (!teamGrid) return;
    teamGrid.innerHTML = "";
    // Show the team of the current player (adjust based on your view model)
    const teamToDisplay =
      this.currentPlayer === 1
        ? this.viewModel.player1.team.selectedTeam
        : this.viewModel.player2.team.selectedTeam;

    if (teamToDisplay.length === 0) {
      teamGrid.textContent = "El teu equip està buit!";
      return;
    }

    teamToDisplay.forEach((pokemon) => {
      const card = document.createElement("div");
      card.className = "pokemon-card";

      const imageName = pokemon.name.replace(/ /g, "_").replace(/\./g, "") + ".png";
      const img = document.createElement("img");
      img.src = `./images/${imageName}`;
      img.alt = pokemon.name;

      const nameEl = document.createElement("h3");
      nameEl.textContent = pokemon.name;

      const pointsEl = document.createElement("p");
      pointsEl.textContent = `Points: ${pokemon.points}`;

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(pointsEl);

      teamGrid.appendChild(card);
    });
  }




/*  isPokemonInTeam(name) {
    const playerTeam = this.currentPlayer === 1
        ? this.viewModel.player1.team
        : this.viewModel.player2.team;
    return playerTeam.selectedTeam.some((p) => p.name === name);
}*/


  // —–––––––––––––––––––––––––––––––––––––––––––––––––
  // New methods to manage the state transitions:
  // —–––––––––––––––––––––––––––––––––––––––––––––––––

  startTeamSelection() {
    // Read player names from the setup form
    const player1Name = document.getElementById("player1-name").value.trim();
    let player2Name = document.getElementById("player2-name").value.trim();

    // If the toggle is off, set Player 2 to CPU
    if (!this.twoPlayersToggle.checked) {
        player2Name = "CPU";
    }

    // Validation: Ensure at least Player 1 has a name
    if (!player1Name) {
        alert("Please enter a name for Player 1.");
        return;
    }

    // Call initializeMatch() on the ViewModel to set up players
    this.viewModel.initializeMatch(player1Name, player2Name);

    // Transition to the team selection screen
    this.playerSetupSection.style.display = "none";
    this.teamSelectionSection.style.display = "block";

    // Set up for Player 1's team selection
    this.currentPlayer = 1;
    this.currentPlayerSelectionDisplay.textContent = `${player1Name}, selecciona el teu Pokémon`;
    this.renderGlobalList();
    this.updateCreditsDisplay();
}


  transitionToBattle() {
    // Hide team selection and sort options.
    this.teamSelectionSection.style.display = "none";
    document.getElementById("sort-options-section").style.display = "none";

    // Show the battle section.
    this.battleSection.style.display = "block";

    // For example, update the battle header with Player 1’s turn.
    document.getElementById("current-turn-display").textContent =
      `Comença la batalla: ${this.viewModel.player1.getName()}!`;

    // (Optionally, you might also render both teams in the battle section.)
  }
  startBattle() {
    console.log("🔥 Battle started!");
    
    // Show the teams display and battle arena
    document.getElementById("teams-overview-section").style.display = "block";
    document.getElementById("battle-arena-section").style.display = "flex";
    document.getElementById("battle-section").style.display = "block";
    document.getElementById("player1-team-name").textContent = this.viewModel.player1.getName();
    document.getElementById("player2-team-name").textContent = this.viewModel.player2.getName();

    // Render initial team lists
    this.updateTeamsDisplay();

    // Call ViewModel to start battle
    this.viewModel.startBattle();
}
updateTeamsDisplay() {
 
  // Clear previous lists
  this.player1List.innerHTML = "";
  this.player2List.innerHTML = "";

  let turn = this.currentPlayer;
  // Populate Player 1's Team
  this.currentPlayer=1;
  this.showTeam(this.player1List);
  
  // Populate Player 2's Team
  this.currentPlayer=2;
  this.showTeam(this.player2List);
  this.currentPlayer=turn;
}

}