import { PokemonUI } from "./view.js";
import { PokemonTeamViewModel } from "./viewModel.js";
// Instantiate your ViewModel (matching UML exactly)
const viewModel = new PokemonTeamViewModel();

// Instantiate your UI class, passing the ViewModel
const ui = new PokemonUI(viewModel);

// When DOM is ready, initialize everything
document.addEventListener("DOMContentLoaded", () => {
  const twoPlayersToggle = document.getElementById("two-players-toggle");
  const player2Container = document.getElementById("player2-container");
  const player2Input = document.getElementById("player2-name");

  function updatePlayer2Visibility() {
    if (twoPlayersToggle.checked) {
      player2Container.style.display = "block";
      player2Input.required = true;
      if (player2Input.value === "CPU") {
        player2Input.value = "";
      }
    } else {
      player2Container.style.display = "none";
      player2Input.required = false;
      player2Input.value = "CPU";
    }
  }

  twoPlayersToggle.addEventListener("change", updatePlayer2Visibility);
  updatePlayer2Visibility();
  ui.init();
});
