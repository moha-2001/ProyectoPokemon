import { PokemonTeamViewModel } from "../viewModel.js";
import PokemonCard from "./PokemonCard.js";

export const App = {
  components: {
    "pokemon-card": PokemonCard,
  },
  template: /*html*/ `
  <div class="pokemon-app">
    <!-- Pantalla de configuración inicial -->
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

    <!-- Pantalla de selección de equipo -->
    <section v-if="currentScreen === 'teamSelection'" class="team-selection-section">
      <h2>Selecciona el teu Equip</h2>
      <h3>{{ currentPlayerSelectionMessage }}</h3>        
      <div class="credits-display">
        Crèdits restants: <span class="credits-value">{{ currentCredits }}</span>
      </div>
      
      <div class="team-display">
        <h3>{{ currentPlayerSelectionDisplay }}</h3>
        <div class="selected-team-grid grid-container">
          <pokemon-card
            v-for="(pokemon, index) in currentPlayerTeam"
            :key="'team-'+index"
            :pokemon="formatPokemonForCard(pokemon)"
            :is-selected="true"
            @toggle-selection="removePokemonFromTeam"
          />
        </div>
      </div>

      <button class="next-player-button" @click="handleNextPlayer" :disabled="currentPlayerTeam.length === 0">
        {{ nextPlayerButtonText }}
      </button>
      
      <!-- Opciones de ordenación -->
      <div class="sort-options-section">
        <h3>Opcions d'Ordenació</h3>
        <form class="sort-options-form">
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
          <button type="button" class="sort-button" @click="handleSortOptions">
            Ordenar
          </button>
        </form>
      </div>
      
      <!-- Búsqueda -->
      <div class="search-box">
        <input v-model="searchTerm" placeholder="Buscar Pokémon..." @input="filterPokemonList" />
      </div>
      
      <!-- Lista de Pokémon -->
      <div class="pokemon-grid grid-container">
        <pokemon-card
          v-for="pokemon in filteredPokemonList"
          :key="pokemon.id"
          :pokemon="formatPokemonForCard(pokemon)"
          :is-selected="isPokemonInTeam(pokemon.name)"
          @toggle-selection="togglePokemonSelection"
        />
      </div>
    </section>

    <!-- Pantalla de vista previa de equipos -->
    <section v-if="currentScreen === 'teamsOverview'" class="teams-overview-section">
      <h2>Vista General dels Equips</h2>
      
      <div class="team-container">
        <h3>Equip del {{ player1Name }}</h3>
        <div class="team-grid grid-container">
          <pokemon-card
            v-for="(pokemon, index) in player1Team"
            :key="'p1-'+index"
            :pokemon="formatPokemonForCard(pokemon)"
            :is-selected="true"
          />
        </div>
      </div>
      
      <div class="team-container">
        <h3>Equip del {{ player2Name }}</h3>
        <div class="team-grid grid-container">
          <pokemon-card
            v-for="(pokemon, index) in player2Team"
            :key="'p2-'+index"
            :pokemon="formatPokemonForCard(pokemon)"
            :is-selected="true"
          />
        </div>
      </div>
      
      <button class="start-battle-button" @click="startBattle">
        Iniciar la Batalla
      </button>
    </section>

    <!-- Pantalla de batalla -->
    <section v-if="currentScreen === 'battle'" class="battle-section">
      <h2>Moment de la Batalla!</h2>
      <p class="current-turn-display">És el torn del {{ currentTurnPlayer }}!</p>
      
      <div class="battle-arena">
        <!-- Pokémon del jugador 1 -->
        <div class="pokemon-fighter">
          <pokemon-card 
            v-if="currentPokemon1" 
            :pokemon="formatPokemonForCard(currentPokemon1, true)" 
            :show-hp="true"
          />
          <div v-if="currentPokemon1" class="health-bar">
            <div class="health-fill" :style="{ width: (currentPokemon1.special_power / currentPokemon1.maxHp * 100) + '%' }"></div>
            <span class="health-text">
              {{ currentPokemon1.special_power }}/{{ currentPokemon1.maxHp }}
            </span>
          </div>
        </div>
        
        <p class="vs-text">VS</p>
        
        <!-- Pokémon del jugador 2 -->
        <div class="pokemon-fighter">
          <pokemon-card 
            v-if="currentPokemon2" 
            :pokemon="formatPokemonForCard(currentPokemon2, true)" 
            :show-hp="true"
          />
          <div v-if="currentPokemon2" class="health-bar">
            <div class="health-fill" :style="{ width: (currentPokemon2.special_power / currentPokemon2.maxHp * 100) + '%' }"></div>
            <span class="health-text">
              {{ currentPokemon2.special_power }}/{{ currentPokemon2.maxHp }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="battle-log-container">
        <h3>Registre de la Batalla</h3>
        <div class="battle-log">
          <div v-for="(log, index) in battleLog" :key="index" class="log-entry">
            {{ log }}
          </div>
        </div>
      </div>
      
      <button class="battle-button" @click="performAttack" :disabled="isBattleFinished">
        Atacar!
      </button>
      
      <button class="return-button" @click="returnToTeamSelection" v-if="isBattleFinished">
        Tornar a Selecció d'Equips
      </button>
    </section>
  </div>    
  `,
  data() {
    return {
      currentScreen: "setup",
      isTwoPlayers: true,
      player1Name: "",
      player2Name: "",
      viewModel: null,

      // Team selection
      sortCriteria: "name",
      sortMethod: "bubble",
      searchTerm: "",
      currentPlayer: 1,
      currentCredits: 0,
      globalPokemonList: [],
      filteredPokemonList: [],
      currentPlayerTeam: [],
      nextPlayerButtonText: "Següent Jugador",
      
      // Teams overview
      player1Team: [],
      player2Team: [],
      
      // Battle
      currentPokemon1: null,
      currentPokemon2: null,
      battleLog: [],
      currentTurnPlayer: "",
      isBattleFinished: false
    };
  },
  computed: {
    currentPlayerSelectionMessage() {
      return this.currentPlayer === 1 
        ? `${this.player1Name}, selecciona el teu equip Pokémon`
        : `${this.player2Name}, selecciona el teu equip Pokémon`;
    },
    currentPlayerSelectionDisplay() {
      return this.currentPlayer === 1
        ? `Equip de ${this.player1Name}`
        : `Equip de ${this.player2Name}`;
    }
  },
  methods: {
    formatPokemonForCard(pokemon, forBattle = false) {
      const formattedPokemon = {
        ...pokemon,
        image: this.getPokemonImage(pokemon),
        types: [pokemon.class_type?.replace('Pokemon', '') || 'Normal']
      };
      
      if (forBattle && !pokemon.maxHp) {
        formattedPokemon.maxHp = pokemon.special_power;
      }
      
      return formattedPokemon;
    },
    
    getPokemonImage(pokemon) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    },
    
    async startGame() {
      if (!this.player1Name || (this.isTwoPlayers && !this.player2Name)) {
        alert("Por favor, introduce los nombres de los jugadores");
        return;
      }
      
      try {
        // 1. Inicializar ViewModel con créditos (200 por defecto)
        this.viewModel = new PokemonTeamViewModel(200, 6); // 200 créditos, 6 Pokémon máximo
        
        // 2. Configurar jugadores con créditos iniciales
        const player2Name = this.isTwoPlayers ? this.player2Name : "CPU";
        this.viewModel.initializeMatch(this.player1Name, player2Name);
        
        // 3. Verificar que los jugadores se crearon correctamente
        if (!this.viewModel.player1 || !this.viewModel.player2) {
          throw new Error("Error al crear los jugadores");
        }
        
        // 4. Establecer jugador actual
        this.viewModel.currentPlayer = this.viewModel.player1;
        this.currentPlayer = 1;
        
        // 5. Cargar datos de Pokémon
        await this.loadPokemonData();
        
        // 6. Iniciar selección de equipo
        this.currentScreen = "teamSelection";
        this.updateTeamSelectionUI();
        
      } catch (error) {
        console.error("Error al iniciar el juego:", error);
        alert("Error al iniciar el juego. Por favor recarga la página.");
      }
    },
    
    startTeamSelection() {
      if (!this.viewModel) {
        console.error("ViewModel no está inicializado");
        return;
      }
      
      const currentPlayer = this.viewModel.getCurrentPlayer();
      if (!currentPlayer || !currentPlayer.team) {
        console.error("Jugador actual no está definido correctamente");
        return;
      }
      
      this.currentCredits = currentPlayer.getCredits();
      this.currentPlayerTeam = currentPlayer.team.selectedTeam;
    },
    updateTeamSelectionUI() {
      // Verificación exhaustiva
      if (!this.viewModel || !this.viewModel.currentPlayer || !this.viewModel.currentPlayer.team) {
        console.error("Estado inválido al actualizar UI");
        return;
      }
      
      const currentPlayer = this.viewModel.currentPlayer;
      
      // Actualizar créditos
      this.currentCredits = currentPlayer.team.credits;
      
      // Actualizar equipo actual
      this.currentPlayerTeam = [...currentPlayer.team.selectedTeam];
      
      console.log("Créditos actuales:", this.currentCredits);
      console.log("Equipo actual:", this.currentPlayerTeam);
    },
    
    async loadPokemonData() {
      try {
        const response = await fetch('./pokemon_data.json');
        if (!response.ok) throw new Error("Error al cargar datos");
        
        const data = await response.json();
        
        // Verificar estructura básica de los datos
        if (!Array.isArray(data)) {
          throw new Error("Formato de datos inválido");
        }
        
        // Cargar datos en el ViewModel
        this.viewModel.pokemonList.loadPokemons(data);
        this.globalPokemonList = this.viewModel.getGlobalList();
        this.filteredPokemonList = [...this.globalPokemonList];
        
      } 
      catch (error) {
        console.error("Error cargando Pokémon:", error);
        throw error;
      }
    },
    
    filterPokemonList() {
      if (!this.searchTerm) {
        this.filteredPokemonList = [...this.globalPokemonList];
        return;
      }
      
      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredPokemonList = this.globalPokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    },
    
    togglePokemonSelection(pokemon) {
      if (!this.viewModel?.currentPlayer?.team) {
        console.error("No se puede modificar equipo - estado inválido");
        return;
      }
      
      const team = this.viewModel.currentPlayer.team;
      
      if (this.isPokemonInTeam(pokemon.name)) {
        // Remover Pokémon
        const removed = team.removePokemon(pokemon.name);
        if (removed) {
          this.currentCredits += pokemon.points;
        }
      } else {
        // Añadir Pokémon
        if (team.credits >= pokemon.points && team.selectedTeam.length < 6) {
          const added = team.addPokemon(pokemon);
          if (added) {
            this.currentCredits -= pokemon.points;
          }
        } else {
          alert("No hay suficientes créditos o el equipo está lleno");
        }
      }
      
      this.updateTeamSelectionUI();
    },
    removePokemonFromTeam(pokemon) {
      if (!this.viewModel) return;
      
      this.viewModel.removePokemonFromTeam(pokemon.name);
      const currentPlayer = this.viewModel.getCurrentPlayer();
      this.currentCredits = currentPlayer.getCredits();
      this.currentPlayerTeam = currentPlayer.team.selectedTeam;
    },
    
    isPokemonInTeam(name) {
      if (!this.viewModel || !this.viewModel.getCurrentPlayer() || !this.viewModel.getCurrentPlayer().team) {
        return false;
      }
      
      return this.viewModel.getCurrentPlayer().team.selectedTeam.some(p => p.name === name);
    },
    
    handleSortOptions() {
      if (!this.viewModel) return;
      
      this.viewModel.sortGlobalList(this.sortCriteria, this.sortMethod);
      this.globalPokemonList = this.viewModel.getGlobalList();
      this.filterPokemonList();
    },
    
    handleNextPlayer() {
      if (!this.viewModel) return;
      
      if (this.currentPlayer === 1) {
        if (this.isTwoPlayers) {
          // Cambiar al jugador 2
          this.viewModel.currentPlayer = this.viewModel.player2;
          this.currentPlayer = 2;
          this.nextPlayerButtonText = "Finalizar Selección";
        } else {
          // Selección automática para CPU
          this.viewModel.autoSelectCpuTeam();
        }
        this.updateTeamSelectionUI();
      } else {
        this.showTeamsOverview();
      }
    },
    
    showTeamsOverview() {
      if (!this.viewModel) return;
      
      this.player1Team = this.viewModel.player1.team.selectedTeam;
      this.player2Team = this.viewModel.player2.team.selectedTeam;
      this.currentScreen = "teamsOverview";
    },
    
    startBattle() {
      this.currentScreen = "battle";
      this.currentTurnPlayer = this.player1Name;
      this.isBattleFinished = false;
      this.battleLog = [`🔥 Comença la batalla entre ${this.player1Name} i ${this.player2Name}!`];
      this.selectBattlePokemon();
    },
    
    selectBattlePokemon() {
      this.currentPokemon1 = this.getRandomPokemon(this.player1Team);
      this.currentPokemon2 = this.getRandomPokemon(this.player2Team);
      
      if (this.currentPokemon1 && this.currentPokemon2) {
        this.battleLog.push(`⚔️ ${this.currentPokemon1.name} vs ${this.currentPokemon2.name}`);
      }
    },
    
    getRandomPokemon(team) {
      if (!team || team.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * team.length);
      return {...team[randomIndex]}; // Copia para no modificar el original
    },
    
    performAttack() {
      if (!this.currentPokemon1 || !this.currentPokemon2) {
        this.selectBattlePokemon();
        return;
      }
      
      if (this.currentTurnPlayer === this.player1Name) {
        this.player1Attacks();
      } else {
        this.player2Attacks();
      }
      
      this.checkBattleEnd();
    },
    
    player1Attacks() {
      const damage = Math.floor(this.currentPokemon1.special_power * 0.3);
      this.currentPokemon2.special_power = Math.max(0, this.currentPokemon2.special_power - damage);
      
      this.battleLog.push(
        `💥 ${this.currentPokemon1.name} ataca a ${this.currentPokemon2.name} per ${damage} de dany!`
      );
      
      if (this.currentPokemon2.special_power <= 0) {
        this.battleLog.push(`☠️ ${this.currentPokemon2.name} ha estat derrotat!`);
        this.removeDefeatedPokemon(2);
      }
      
      this.currentTurnPlayer = this.player2Name;
    },
    
    player2Attacks() {
      const damage = Math.floor(this.currentPokemon2.special_power * 0.3);
      this.currentPokemon1.special_power = Math.max(0, this.currentPokemon1.special_power - damage);
      
      this.battleLog.push(
        `💥 ${this.currentPokemon2.name} ataca a ${this.currentPokemon1.name} per ${damage} de dany!`
      );
      
      if (this.currentPokemon1.special_power <= 0) {
        this.battleLog.push(`☠️ ${this.currentPokemon1.name} ha estat derrotat!`);
        this.removeDefeatedPokemon(1);
      }
      
      this.currentTurnPlayer = this.player1Name;
    },
    
    removeDefeatedPokemon(player) {
      if (player === 1) {
        this.player1Team = this.player1Team.filter(p => p.name !== this.currentPokemon1.name);
        this.currentPokemon1 = null;
      } else {
        this.player2Team = this.player2Team.filter(p => p.name !== this.currentPokemon2.name);
        this.currentPokemon2 = null;
      }
    },
    
    checkBattleEnd() {
      if (this.player1Team.length === 0 || this.player2Team.length === 0) {
        const winner = this.player1Team.length > 0 ? this.player1Name : this.player2Name;
        this.battleLog.push(`🏆 ${winner} guanya la batalla!`);
        this.isBattleFinished = true;
      }
    },
    
    returnToTeamSelection() {
      this.currentScreen = "teamSelection";
      this.currentPlayer = 1;
      if (this.viewModel) {
        this.viewModel.currentPlayer = this.viewModel.player1;
      }
      this.startTeamSelection();
    }
  },
  mounted() {
    this.viewModel = new PokemonTeamViewModel(200, 6);
  }
};