<script>
    import ListField from '@components/ListField.svelte';
    import { playersScoreStore, roundStore } from '../store.js';
    import { Navigator, Page } from '../navigator.svelte.js';
    import PopConfirm from '@components/PopConfirm.svelte';
    import { _ } from '../translations/translate.svelte.js';

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
    <span class='badge text-bg-secondary'>{_('game.age')}</span>
    <span class='badge text-bg-secondary'>{_('game.player')}</span>
    <span class='badge text-bg-secondary'>{_('game.duration')}</span>
</div>
<form>
    <ListField
            bind:value={players}
            addText={_('listfield.add.player')}
            placeholderPrefix={_('listfield.placeholder.prefix')}
            bind:this={listField}
            minFields=2
            maxFields=8
    />
    <div class="d-flex mb-3">
        <button onclick={startGame} type="submit" class="btn btn-outline-success btn-lg">
            {_('start.game')}
        </button>
        <div class='flex-grow-1'></div>
        <PopConfirm
                title='Eingaben zurücksetzen?'
                description='Sollen alle Spieler zurückgesetzt werden?'
                onConfirm={onResetClick}
        >
            {_('reset.game')}
        </PopConfirm>
    </div>
</form>


