export default {
  name: 'PokemonCard',
  // Inline template if not using .vue files
  template: /*html*/ `
    <div 
      class="pokemon-card" 
      :class="{ selected: isSelected }" 
      @click="onToggleSelection"
    >
      <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
      <h3>{{ pokemon.name }}</h3>
      <p v-if="pokemon.types && pokemon.types.length">
        Tipus: {{ pokemon.types.join(', ') }}
      </p>
      <p>Punts: {{ pokemon.points }}</p>
      <p v-if="pokemon.special_power">Especial: {{ pokemon.special_power }}</p>
    </div>
  `,
  props: {
    // The Pokémon data
    pokemon: {
      type: Object,
      required: true
    },
    // Whether this Pokémon is in the team or not (used to set 'selected' class)
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onToggleSelection() {
      // Instead of referencing viewModel directly, emit an event to the parent
      this.$emit('toggle-selection', this.pokemon);
    }
  }
}
