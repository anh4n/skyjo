<script>
    import { playersScoreStore } from '../store.js';
    import EnterDataModal from '../components/EnterDataModal.svelte';
    import { Navigator } from '../navigator.js';
    import { beforeUpdate } from 'svelte';
    import { getPlayersRanked, isGameOver } from '../calculation-service.js';

    let rounds = [];
    let gameOver = false;
    let players = [];

    beforeUpdate(() => {
        rounds = playersScoreStore.getRounds();
        players = getPlayersRanked($playersScoreStore);
        gameOver = isGameOver(players);
    });

    const onNewGameClick = () => {
        Navigator.setPage('start');
    };

    const onDataEnter = (e) => {
        const { roundClosed, values } = e.detail;
        const minValue = Math.min(...Object.values(values));

        if (minValue < values[roundClosed]) {
            values[roundClosed] *= 2;
        }

        playersScoreStore.updateScore(values);
    };
</script>

<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">#</th>
        {#each $playersScoreStore as player (player.id)}
            <th scope="col" class='text-end'>
                {player.name}
            </th>
        {/each}
    </tr>
    </thead>
    <tbody class='table-group-divider'>
    {#each rounds as round, index}
        <tr>
            <th scope="row" class='align-middle'>{index + 1}</th>
            {#each round as playerValue}
                <td class:text-bg-danger={playerValue.sum >= 100} class='align-middle'>
                    <div class='d-flex justify-content-end'>
                        <div style='width: 35px' class='text-end '>{playerValue.sum}</div>
                        <div style='width: 55px' class='text-end fst-italic'>({playerValue.prefix}{playerValue.round})
                        </div>
                    </div>
                </td>
            {/each}
        </tr>
    {/each}
    {#if gameOver}
        <tr>
            <th class='text-bg-info align-middle'>Game Over</th>
            {#each $playersScoreStore as player (player.id)}
                <th scope="col" class='text-bg-info text-end align-middle'>
                    {players.find(p => p.player === player.id).rank}.
                </th>
            {/each}
        </tr>
    {/if}
    </tbody>
</table>

<div class="d-flex mb-3">
    <button class="btn btn-outline-primary btn-lg"
            data-bs-toggle="modal" data-bs-target="#dataEnterModal">
        Eintragen
    </button>
    <div class='flex-grow-1'></div>
    <button on:click|preventDefault={onNewGameClick} type="submit" class="btn btn-outline-danger btn-lg">
        Neues Spiel
    </button>
</div>

<EnterDataModal on:enter={onDataEnter}/>