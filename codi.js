import { App } from './src/App.js'; // Importem el component App
// Importem només els altres mòduls locals
import { PokemonUI } from './view.js';
import { PokemonTeamViewModel } from './viewModel.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicialitza el joc
//    const pokemonUI = new PokeDOMContentLoadedmonUI();
//    const viewModel = new PokemonTeamViewModel(pokemonUI);
//    pokemonUI.viewModel = viewModel;
//    pokemonUI.init();
    
    console.log('Game initialized successfully.');

    // Muntem Vue a l'element #app
    Vue.createApp(App).mount('#app');

    console.log('Vue.js App initialized successfully.');
});
