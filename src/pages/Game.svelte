<script>
    import { playersScoreStore } from '../store.js';
    import EnterDataModal from '../components/EnterDataModal.svelte';
    import { Navigator } from '../navigator.js';
    import { beforeUpdate } from 'svelte';
    import { getPlayersRanked } from '../calculation-service.js';

    let rounds = [];
    let players = [];

    beforeUpdate(() => {
        rounds = playersScoreStore.getRounds();
        players = getPlayersRanked($playersScoreStore);
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

        playersScoreStore.updateScore(values, roundClosed);
    };

    const getRank = (player) => {
        return players.find(p => p.player === player.id).rank
    }
</script>

<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">#</th>
        {#each $playersScoreStore as player (player.id)}
            <th scope="col" class='text-end'>
                {player.name}
                {#if rounds.length > 0}
                    <span
                            class="badge rounded-pill "
                            class:first-place={getRank(player) === 1}
                            class:second-place={getRank(player) === 2}
                            class:third-place={getRank(player) === 3}
                            class:text-bg-dark={getRank(player) > 3}
                    >{getRank(player)}.</span>
                {/if}
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
                    <div class='d-flex justify-content-end' class:fw-bold={playerValue.hasClosedRound}>
                        <div style='width: 35px' class='text-end '>{playerValue.sum}</div>
                        <div style='width: 55px' class='text-end fst-italic'>({playerValue.prefix}{playerValue.round})
                        </div>
                    </div>
                </td>
            {/each}
        </tr>
    {/each}
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