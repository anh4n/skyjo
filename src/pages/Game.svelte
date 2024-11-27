<script>
    import { playersScoreStore, roundStore } from '../store.js';
    import EnterDataModal from '../components/EnterDataModal.svelte';
    import { Navigator } from '../navigator.js';
    import { beforeUpdate } from 'svelte';

    beforeUpdate(() => {
    });

    const onNewGameClick = () => {
        Navigator.setPage('start');
    };

    const onDataEnter = (e) => {
        const { roundClosed, values } = e.detail;
        const minValue = Math.min(...Object.values(values));
        let doublePoints = false;

        if (minValue < values[roundClosed]) {
            values[roundClosed] *= 2;
            doublePoints = true;
        }
        playersScoreStore.updateSum(values);
        roundStore.addRound(values, roundClosed, doublePoints);
    };

    const checkCloser = (playerId, round) => {
        const id = parseInt(playerId, 10);
        return $roundStore.some((roundData, index) => {
            return roundData.roundClosed === id && index === round;
        });
    };
</script>

<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">#</th>
        {#each $playersScoreStore as player (player.id)}
            <th scope="col" class='text-end'>
                {player.name}
                {#if $roundStore.length > 0}
                    <span
                            class="badge rounded-pill "
                            class:first-place={player.rank === 1}
                            class:second-place={player.rank === 2}
                            class:third-place={player.rank === 3}
                            class:text-bg-dark={player.rank > 3}
                    >{player.rank}.</span>
                {/if}
            </th>
        {/each}
    </tr>
    </thead>
    <tbody class='table-group-divider'>
    {#each $roundStore as round, index}
        <tr>
            <th scope="row">{index + 1}</th>
            {#each Object.keys(round.values) as playerId}
                <td>
                    <div class='d-flex justify-content-end'>
                        <div
                                class='text-end points'
                                class:text-primary={checkCloser(playerId, index) && !round.doublePoints}
                                class:text-danger={checkCloser(playerId, index) && round.doublePoints}
                        >
                            {round.values[playerId]}
                        </div>
                        <div style='width: 35px' class='text-end'>
                            {#if checkCloser(playerId, index) && round.doublePoints}({round.values[playerId] / 2}){/if}
                        </div>
                    </div>
                </td>
            {/each}
        </tr>
    {/each}
    </tbody>
    <tfoot class='table-group-divider'>
    <tr>
        <th scope="col">Summe</th>
        {#each $playersScoreStore as player (player.id)}
            <td>
                <div class='d-flex justify-content-end'>
                    <div class='text-end fw-bold points' class:text-bg-danger={player.sum >= 100}>
                        { player.sum }
                    </div>
                    <div style='width: 35px' class='text-end'></div>
                </div>
            </td>
        {/each}
    </tr>
    </tfoot>
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