<script>
    import ListField from '../components/ListField.svelte';
    import { currentPageStore, playersStore } from '../store.js';

    const defaults = [
        { id: 1, placeholder: 'Spieler 1', value: '' },
        { id: 2, placeholder: 'Spieler 2', value: '' },
        { id: 3, placeholder: 'Spieler 3', value: '' }
    ];

    let players = defaults;

    if ($playersStore.length > 0) {
        players = $playersStore.map(player => ({
            id: player.id,
            placeholder: player.name,
            value: ''
        }));
    }

    const startGame = () => {
        const playersValues = players.map(player => ({
            id: player.id,
            name: player.value || player.placeholder,
            data: [],
            currentValue: null
        }));
        playersStore.set(playersValues);
        localStorage.setItem('players', JSON.stringify(playersValues));
        currentPageStore.set('game');
    };

    const onResetClick = (e) => {
        playersStore.set([]);
        localStorage.removeItem('players');
        players = defaults;
    };
</script>

<form>
    <ListField bind:value={players} addText='Spieler hinzufügen' placeholderPrefix='Spieler'/>

    <div class="d-flex mb-3">
        <button on:click|preventDefault={startGame} type="submit" class="btn btn-outline-success btn-lg">
            Spiel starten
        </button>
        <div class='flex-grow-1'></div>
        <button on:click|preventDefault={onResetClick} class="btn btn-outline-danger btn-lg">
            Zurücksetzen
        </button>
    </div>
</form>
