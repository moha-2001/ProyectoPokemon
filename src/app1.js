import { PokemonUI } from "../view.js";
import PokemonCard from "./PokemonCard.js";

export const App = {
  components: {
    "pokemon-card": PokemonCard,
  },
  template: /*html*/ `
  <div>
  <section v-if="currentScreen === 'setup'" class="setup-container">
      <h2 class="setup-title">Configuració dels Jugadors</h2>
      <p class="setup-instruccions">
          Introdueix els noms dels jugadors per començar el joc.
      </p>
  
      <div class="toggle-container">
          <label for="two-players-toggle">Dos Jugadors:</label>
          <label class="switch">
          <input type="checkbox" v-model="isTwoPlayers" />
          <span class="slider round"></span>
          </label>
      </div>
  
      <div class="player-input-group">
          <label for="player1-name" class="player-label">Nom del Jugador 1:</label>
          <input type="text" v-model="player1Name" class="player-input" required />
      </div>
  
      <div class="player-input-group" v-if="isTwoPlayers">
          <label for="player2-name" class="player-label">Nom del Jugador 2:</label>
          <input type="text" v-model="player2Name" class="player-input" required />
      </div>
  
      <button @click="startGame" class="setup-button">Següent</button>
  </section>
        <!-- Secció de selecció de l'equip -->
  <section v-if="currentScreen === 'teamSelection'" id="team-selection-section">
      <h2>Selecciona el teu Equip</h2>
      <h2>{{ currentPlayerSelectionMessage }}</h2>        
      <h2 id="credits-display">
          Crèdits restants: <span id="credits-value">{{ creditsDisplay }}</span>
      </h2>
      <div id="team-section">
          <h2 id="current-player-selection">{{ currentPlayerSelectionDisplay }}</h2>
          <div id="selected-team-grid" class="grid-container" ref="teamContainer">
            <pokemon-card
            v-for="(poke, index) in currentPlayerTeam"
            :key="index"
            :pokemon="poke"
            :is-selected="isPokemonInTeam(poke.name)"
            @toggle-selection="handleToggleSelection"
            />
          </div>
      </div>

      <button id="next-player-button" @click="handleNextPlayer">
          Següent Jugador
      </button>
      <!-- Opcions d'ordenació -->
      <div id="sort-options-section">
          <h2>Opcions d'Ordenació</h2>
          <form id="sort-options-form">
              <fieldset>
                  <legend>Ordena per:</legend>
                  <label>
                  <input type="radio" name="sort-criteria" value="name" v-model="sortCriteria" />
                  Nom
                  </label>
                  <label>
                  <input type="radio" name="sort-criteria" value="points" v-model="sortCriteria" />
                  Punts
                  </label>
                  <label>
                  <input type="radio" name="sort-criteria" value="type" v-model="sortCriteria" />
                  Tipus
                  </label>
              </fieldset>
              <fieldset>
                  <legend>Mètode d'ordenació:</legend>
                  <label>
                  <input type="radio" name="sort-method" value="bubble" v-model="sortMethod" />
                  Bombolla
                  </label>
                  <label>
                  <input type="radio" name="sort-method" value="insertion" v-model="sortMethod" />
                  Inserció
                  </label>
                  <label>
                  <input type="radio" name="sort-method" value="selection" v-model="sortMethod" />
                  Selecció
                  </label>
              </fieldset>
              <button type="button" id="sort-team" @click="handleSortOptions">
              Ordenar
              </button>
          </form>
      </div>
      <div id="pokemon-grid" class="grid-container" ref="gridContainer">
          <pokemon-card
          v-for="(poke, index) in globalPokemonList"
          :key="index"
          :pokemon="poke"
          :is-selected="isPokemonInTeam(poke.name)"
          @toggle-selection="handleToggleSelection"
          />
      </div>
  </section>
</div>    
`,
data() {
  return {
    currentScreen: "setup",
    isTwoPlayers: true,
    player1Name: "",
    player2Name: "",
    currentPlayerSelectionMessage: "",
    currentPlayerSelectionDisplay: "",
    creditsDisplay: "",
    sortCriteria: "",
    sortMethod: "",
    globalPokemonList: [],
    currentPlayerTeam: [],
    view: new PokemonUI(),
  };
},
methods: {
  startGame() {
    this.view.init();
    if (!this.player1Name || (this.isTwoPlayers && !this.player2Name)) {
      alert("Si us plau, introdueix els noms de tots els jugadors.");
      return;
    }
    if (!this.isTwoPlayers) {
      this.player2Name = "CPU";
    }
    console.log(`Jugador 1: ${this.player1Name}, Jugador 2: ${this.player2Name}`);
    this.currentScreen = "teamSelection";
    this.startTeamSelection();
  },

  startTeamSelection() {
    // Inicializar el juego y los jugadores
    this.view.viewModel.initializeMatch(this.player1Name, this.player2Name);
    this.view.viewModel.currentPlayer = this.view.viewModel.player1;
    this.currentPlayerSelectionMessage = `${this.player1Name}, selecciona el teu equip Pokémon`;
    this.renderGlobalList();
    this.updateCreditsDisplay();
  },

  renderGlobalList() {
    this.globalPokemonList = this.view.viewModel.getGlobalList();
  },

  renderSelectionTeam() {
    this.currentPlayerTeam = this.view.viewModel.getCurrentTeam();
  },

  handleNextPlayer() {
    // Cambiar al siguiente jugador
    if (this.view.viewModel.currentPlayer === this.view.viewModel.player1) {
      if (this.isTwoPlayers) {
        this.view.viewModel.switchPlayer();  // Cambiar al Jugador 2
        this.currentPlayerSelectionDisplay = `${this.player2Name}, selecciona el teu Pokémon`;
        this.updateCurrentPlayerTeam();
        this.renderGlobalList();
        this.updateCreditsDisplay();
      } else {
        this.view.viewModel.autoSelectCpuTeam(); // Seleccionar automáticamente el equipo de la CPU
        this.updateCurrentPlayerTeam();
        this.view.transitionToBattle();
      }
    } else {
      this.view.transitionToBattle();  // Ambos jugadores han seleccionado sus equipos
    }
  },

  updateCurrentPlayerTeam() {
    this.currentPlayerTeam = this.view.viewModel.getCurrentTeam();
    this.renderSelectionTeam();
  },

  handleSortOptions() {
    console.log("Ordenar per:", this.sortCriteria);
    console.log("Mètode d'ordenació:", this.sortMethod);
    this.view.viewModel.sortGlobalList(this.sortCriteria, this.sortMethod);
    this.renderGlobalList();
  },

  updateCreditsDisplay() {
    const credits = this.view.viewModel.getCredits();
    this.creditsDisplay = `${credits}`;
  },

  isPokemonInTeam(name) {
    const playerTeam = this.view.viewModel.currentPlayer.team;
    return playerTeam.selectedTeam.some((p) => p.name === name);
  },

  handleToggleSelection(pokemon) {
    const isInTeam = this.isPokemonInTeam(pokemon.name);
    if (isInTeam) {
      this.view.viewModel.removePokemonFromTeam(pokemon.name);
    } else {
      const addResult = this.view.viewModel.addPokemonToCurrentPlayer(pokemon);
      if (!addResult) {
        alert("No es pot afegir el Pokémon.");
      }
    }

    // Después de agregar/quitar, refrescar el equipo del jugador
    this.updateCurrentPlayerTeam();
    this.updateCreditsDisplay();
  },
},

mounted() {
  this.view.fetchAndLoadPokemons();
  console.log("Grid container:", this.$refs.gridContainer);
},
};