<script>
    import ListField from '../components/ListField.svelte';
    import { playersScoreStore } from '../store.js';
    import { Navigator } from '../navigator.js';

    let listField;

    let players = [];

    if ($playersScoreStore.length > 0) {
        players = $playersScoreStore.map(player => ({
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
        playersScoreStore.setPlayers(playersValues);
        Navigator.setPage('game');
    };

    const onResetClick = () => {
        listField.reset();
        playersScoreStore.reset();
    };
</script>

<div class='text-center pb-3'>
    <span class='badge text-bg-secondary'>Alter: ab 8 Jahren</span>
    <span class='badge text-bg-secondary'>Spieler: 2 bis 8</span>
    <span class='badge text-bg-secondary'>Dauer: 15-45 Minuten</span>
</div>
<form>
    <ListField
            bind:value={players}
            addText='Spieler hinzufügen'
            placeholderPrefix='Spieler'
            bind:this={listField}
            minFields=2
            maxFields=8
    />
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
