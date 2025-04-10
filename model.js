const MAX_CREDITS = 200;
const MAX_TEAM_SIZE = 6;
const IMAGE_FILE_PATH = '../../images/';
// =========================
// Classe Base: Pokemon
// =========================
class Pokemon {
  constructor(id, name, image, points, special_power) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.points = points;
    this.special_power = special_power;
  }

  displayDetails() {
    return `${this.name} (ID: ${this.id}) - Points: ${this.points}`;
  }
}

// Classes heretades per cada tipus de Pokémon
class GrassPokemon extends Pokemon {}
class FirePokemon extends Pokemon {}
class WaterPokemon extends Pokemon {}
class ElectricPokemon extends Pokemon {}
class BugPokemon extends Pokemon {}
class NormalPokemon extends Pokemon {}
class PoisonPokemon extends Pokemon {}
class PsychicPokemon extends Pokemon {}
class GroundPokemon extends Pokemon {}
class FairyPokemon extends Pokemon {}
class RockPokemon extends Pokemon {}
class IcePokemon extends Pokemon {}
class DragonPokemon extends Pokemon {}
class DarkPokemon extends Pokemon {}
class SteelPokemon extends Pokemon {}
class GhostPokemon extends Pokemon {}
class FightingPokemon extends Pokemon {}
class FlyingPokemon extends Pokemon {}
// =========================
// Carregar dades del JSON. Generació dinàmica de classes
// =========================
/*async function getPokemonTypesFromData() {
    try {
      const response = await fetch("./pokemon_data.json");
      const data = await response.json();
      const uniqueTypes = [
        ...new Set(data.map((pokemon) => pokemon.class_type).filter(Boolean)),
      ];
      return uniqueTypes;
    } catch (error) {
      console.error("Error carregant tipus de Pokémon des del JSON:", error);
      return [];
    }
  }*/

// =========================
// Crear Subclasses Dinàmiques
// =========================
/*async function generatePokemonSubclasses() {
    const types = await getPokemonTypesFromData();
  
    types.forEach((type) => {
      globalThis[`${type}`] = class extends Pokemon {
        constructor(id, name, image, points, specialPower) {
          super(id, name, image, points);
          this.specialPower = specialPower || `${type} Special Attack`;
        }
  
        displayDetails() {
          return `${this.name} [${type}] - Points: ${this.points}, Special Power: ${this.specialPower}`;
        }
      };
    });
  }*/

// =========================
// Classe: PokemonList
// =========================
export class PokemonList {
  constructor() {
    this._allPokemons = [];
    this.isLoaded = false; // Estat per saber si s'han carregat
  }
  get allPokemons() {
    const sortedPokemons = [...this._allPokemons]; // Còpia de l'array
    return sortedPokemons;
  }
  formatFilename(filename) {
    // Remove leading/trailing spaces
    filename = filename.trim();

    // Extract base name and extension
    let parts = filename.split(".");

    // Reconstruct the name without internal dots
    let name = parts.join(" ").replace(/\s+/g, " "); // Replace multiple spaces

    // Convert to camelCase
    let words = name.split(" ");
    let formattedName =
      words.shift().toLowerCase() +
      words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
    return `${formattedName}.png`;
  }
  loadPokemons(data) {
    try {
      data.map((pokemon, index) => {
        switch (pokemon.class_type) {
          case "GrassPokemon":
            this._allPokemons.push(
              new GrassPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FirePokemon":
            this._allPokemons.push(
              new FirePokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "WaterPokemon":
            this._allPokemons.push(
              new WaterPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "ElectricPokemon":
            this._allPokemons.push(
              new ElectricPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "BugPokemon":
            this._allPokemons.push(
              new BugPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "NormalPokemon":
            this._allPokemons.push(
              new NormalPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "PoisonPokemon":
            this._allPokemons.push(
              new PoisonPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "PsychicPokemon":
            this._allPokemons.push(
              new PsychicPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "GroundPokemon":
            this._allPokemons.push(
              new GroundPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FairyPokemon":
            this._allPokemons.push(
              new FairyPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "RockPokemon":
            this._allPokemons.push(
              new RockPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "IcePokemon":
            this._allPokemons.push(
              new IcePokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "DragonPokemon":
            this._allPokemons.push(
              new DragonPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "DarkPokemon":
            this._allPokemons.push(
              new DarkPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "SteelPokemon":
            this._allPokemons.push(
              new SteelPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "GhostPokemon":
            this._allPokemons.push(
              new GhostPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FightingPokemon":
            this._allPokemons.push(
              new FightingPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          case "FlyingPokemon":
            this._allPokemons.push(
              new FlyingPokemon(
                index + 1,
                pokemon.name,
                IMAGE_FILE_PATH + this.formatFilename(pokemon.name),
                pokemon.points,
                pokemon.special_power
              )
            );
            break;
          default:
            console.log(`No s'ha trobat la classe ${pokemon.class_type}`);
            throw new Error(`Unknown class type: ${pokemon.class_type}`);
        }
      });
      this.isLoaded = true; // Marquem com a carregat
      console.log("Pokémon carregats correctament:", this._allPokemons.length);
    } catch (error) {
      console.error("Error carregant Pokémon des del JSON:", error);
      this.isLoaded = false;
    }
  }

  /*  loadPokemons(data) {
      try {
        this._allPokemons = data.map((pokemon, index) => {
          const { name, image, points, class_type, special_power } = pokemon;
          const imageName = name.replace(/[\s.]/g, "_") + ".png";
  
          if (globalThis[class_type]) {
            return new globalThis[class_type](
              index + 1,
              name,
              image || imageName,
              points,
              special_power
            );
          }
          return new Pokemon(index + 1, name, image || imageName, points);
        });
        this.isLoaded = true; // Marquem com a carregat
        console.log("Pokémon carregats correctament:", this._allPokemons.length);
      } catch (error) {
        console.error("Error carregant Pokémon des del JSON:", error);
        this.isLoaded = false;
      }
    }*/

  sortPokemons(criteria, method) {
    if (!this.isLoaded || this._allPokemons.length === 0) {
      console.error("❌ No tinc pokemons a la llista.");
    } else {
      if (criteria == "name" || criteria == "points" || criteria == "type") {
        if (
          method == "bubble" ||
          method == "insertion" ||
          method == "selection"
        ) {
          //tot Ok. Comencem a ordenar
          console.log(
            `✅ Ordenat per '${criteria}' amb el mètode '${method}'.`
          );
          let len = this._allPokemons.length;
          switch (method) {
            case "bubble":
              switch (criteria) {
                case "name":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - 1 - i; j++) {
                      if (
                        this._allPokemons[j].name >
                        this._allPokemons[j + 1].name
                      ) {
                        // Intercanviem els elements si estan fora d'ordre
                        let temp = this._allPokemons[j];
                        this._allPokemons[j] = this._allPokemons[j + 1];
                        this._allPokemons[j + 1] = temp;
                      }
                    }
                  }
                  break;
                case "points":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - i - 1; j++) {
                      if (
                        this._allPokemons[j].points >
                        this._allPokemons[j + 1].points
                      ) {
                        [this._allPokemons[j], this._allPokemons[j + 1]] = [
                          this._allPokemons[j + 1],
                          this._allPokemons[j],
                        ];
                      }
                    }
                  }

                  break;
                case "type":
                  for (let i = 0; i < len - 1; i++) {
                    for (let j = 0; j < len - i - 1; j++) {
                      if (
                        this._allPokemons[j].constructor.name >
                        this._allPokemons[j + 1].constructor.name
                      ) {
                        [this._allPokemons[j], this._allPokemons[j + 1]] = [
                          this._allPokemons[j + 1],
                          this._allPokemons[j],
                        ];
                      }
                    }
                  }
                  break;
              }
              break;
            case "insertion":
              switch (criteria) {
                case "name":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (j >= 0 && this._allPokemons[j].name > key.name) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }

                  break;
                case "points":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (j >= 0 && this._allPokemons[j].points > key.points) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }
                  break;
                case "type":
                  for (let i = 1; i < len; i++) {
                    let key = this._allPokemons[i]; // Copia l'objecte complet
                    let j = i - 1;
                    while (
                      j >= 0 &&
                      this._allPokemons[j].constructor.name >
                        key.constructor.name
                    ) {
                      this._allPokemons[j + 1] = this._allPokemons[j];
                      j--;
                    }
                    this._allPokemons[j + 1] = key; // Reinsereix l'objecte complet
                  }

                  break;
              }
              break;
            case "selection":
              switch (criteria) {
                case "name":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Suposem que el mínim és el primer element no ordenat
                    for (let j = i + 1; j < len; j++) {
                      if (
                        this._allPokemons[j].name <
                        this._allPokemons[minIndex].name
                      ) {
                        minIndex = j; // Actualitzem l'índex del mínim si trobem un element més petit
                      }
                    }
                    // Intercanviar l'element actual amb el mínim trobat
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }

                  break;
                case "points":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Suposem que el mínim és el primer element no ordenat
                    for (let j = i + 1; j < len; j++) {
                      if (
                        this._allPokemons[j].points <
                        this._allPokemons[minIndex].points
                      ) {
                        minIndex = j; // Actualitzem l'índex del mínim si trobem un element més petit
                      }
                    }
                    // Intercanviar l'element actual amb el mínim trobat
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }

                  break;
                case "type":
                  for (let i = 0; i < len - 1; i++) {
                    let minIndex = i; // Assume the current index has the minimum type
                    for (let j = i + 1; j < len; j++) {
                      // Compare the types (constructor names) alphabetically
                      if (
                        this._allPokemons[j].constructor.name <
                        this._allPokemons[minIndex].constructor.name
                      ) {
                        minIndex = j; // Update the minimum index if a smaller type is found
                      }
                    }
                    // Swap the current element with the minimum element found
                    if (minIndex !== i) {
                      let temp = this._allPokemons[i];
                      this._allPokemons[i] = this._allPokemons[minIndex];
                      this._allPokemons[minIndex] = temp;
                    }
                  }
                  break;
              }
              break;
          }
        } else {
          console.error(
            `❌ El mètode d'ordenació '${method}' no és vàlid. Tria 'bubble', 'insertion' o 'selection'.`
          );
        }
      } else {
        console.error(
          `❌ El criteri d'ordenació '${criteria}' no és vàlid. Tria 'name', 'points' o 'type'.`
        );
      }
    }
  }

  getPokemonByName(name) {
    for (let i = 0; i < this._allPokemons.length; i++) {
      if (this._allPokemons[i].name == name) {
        return this._allPokemons[i];
      }
    }
  }
}

// =========================
// Classe: PokemonTeam
// =========================
export class PokemonTeam {
  constructor(credits = MAX_CREDITS, maxTeamSize = MAX_TEAM_SIZE) {
    this.selectedTeam = [];
    this.credits = credits;
    this.maxTeamSize = maxTeamSize; // New property for max team size
  }

  addPokemon(pokemon) {
    if (this.selectedTeam.length >= this.maxTeamSize) {
      console.warn(`Cannot add ${pokemon.name}. Team is already full.`);
      return false;
    }

    if (this.credits < pokemon.points) {
      console.warn(`Cannot add ${pokemon.name}. Not enough credits.`);
      return false;
    }

    const oldPokemon =
      this.selectedTeam.find(
        (oldPokemon) => oldPokemon.name === pokemon.name
      ) || null;
    if (!oldPokemon) {
      this.selectedTeam.push(pokemon);
      this.credits -= pokemon.points;
      return true;
    } else {
      console.warn(`Pokemon ${pokemon.name} was already in the team.`);
      return false;
    }
  }

  removePokemon(pokemonName) {
    const index = this.selectedTeam.findIndex((p) => p.name === pokemonName);
    if (index !== -1) {
      let damageMade = this.selectedTeam[index].special_power;
      this.credits += this.selectedTeam[index].points;
      this.selectedTeam.splice(index, 1);
      return damageMade;
    }
  }

  getTeamDetails() {
    return this.selectedTeam
      .map((pokemon) => pokemon.displayDetails())
      .join("\n");
  }
  getTeam(){
    return this.selectedTeam;
  }
  getCredits() {
    return this.credits;
  }
  decreaseSpecialPower(winnerName, pointsToDecrease) {
    const winner = this.selectedTeam.find(
      (pokemon) => pokemon.name === winnerName
    );

    if (!winner) {
      return `El Pokémon ${winnerName} no s'ha trobat en l'equip.`;
    }

    // Reduce special power
    winner.special_power -= pointsToDecrease;

    // Check if the Pokémon has "died"
    if (winner.special_power <= 0) {
      this.removePokemon(winnerName);
      return `☠️ ${winnerName} ha perdut tot el seu poder especial i s'ha eliminat de l'equip!`;
    }
    return `✅ ${winnerName} sobreviu amb un special power de: ${winner.special_power} punts.`;
  }
}

// Merged Player class definition
export class Player {
  constructor(name) {
    this.name = name;
    this.team = new PokemonTeam(); // Instance of PokemonTeam to manage the player's team
  }

  // Returns the player's name
  getName() {
    return this.name;
  }

  // Adds a Pokémon to the player's team
  addPokemon(pokemon) {
    return this.team.addPokemon(pokemon);
  }

  // Removes a Pokémon from the player's team
  removePokemon(pokemonName) {
    return this.team.removePokemon(pokemonName);
  }

  // Returns the player's team details
  getTeamDetails() {
    return this.team.getTeamDetails();
  }
  getTeam(){
    return this.team.getTeam();
  }
  // Returns the player's remaining credits
  getCredits() {
    return this.team.getCredits();
  }

  // Handles attacking another player during the battle
  attack(target) {
    if (!this.team.hasAvailablePokemon()) {
      console.log(`${this.name} has no available Pokémon to attack.`);
      return;
    }

    const attackingPokemon = this.team.getNextPokemon();
    const defendingPokemon = target.team.getNextPokemon();

    if (attackingPokemon && defendingPokemon) {
      console.log(
        `${this.name}'s ${
          attackingPokemon.name
        } attacks ${target.getName()}'s ${defendingPokemon.name}!`
      );
      attackingPokemon.attack(defendingPokemon);

      if (defendingPokemon.isFainted()) {
        console.log(
          `${target.getName()}'s ${defendingPokemon.name} has fainted!`
        );
        target.team.removeFaintedPokemon(defendingPokemon);
      }
    } else {
      console.log("No valid Pokémon for the battle.");
    }
  }
}
