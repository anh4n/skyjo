<script>
    import ListField from '@components/ListField.svelte';
    import { playersScoreStore, roundStore } from '../store.js';
    import { Navigator, Page } from '../navigator.svelte.js';
    import PopConfirm from '@components/PopConfirm.svelte';

    let listField = $state();
    let players = $state([]);

    if ($playersScoreStore.length > 0) {
        players = $playersScoreStore.map(player => ({
            id: player.id,
            placeholder: player.name,
            value: ''
        }));
    }

    const startGame = (event) => {
        event.preventDefault();
        const playersValues = players.map(player => ({
            id: player.id,
            name: player.value || player.placeholder,
            sum: 0
        }));
        playersScoreStore.setPlayers(playersValues);
        roundStore.reset();
        Navigator.setPage(Page.GAME);
    };

    const onResetClick = () => {
        listField.reset();
        playersScoreStore.reset();
        roundStore.reset();
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
        <button onclick={startGame} type="submit" class="btn btn-outline-success btn-lg">
            Spiel starten
        </button>
        <div class='flex-grow-1'></div>
        <PopConfirm
                title='Eingaben zurücksetzen?'
                description='Sollen alle Spieler zurückgesetzt werden?'
                onConfirm={onResetClick}
        >
            Zurücksetzen
        </PopConfirm>
    </div>
</form>


