<script>
    import { createEventDispatcher } from 'svelte';
    import { playersScoreStore } from '../store.js';

    let roundClosed;

    const dispatch = createEventDispatcher();

    const onModalOpen = () => {
        playersScoreStore.update(store =>
            store.map(player => ({
                ...player,
                currentValue: null
            })));
        roundClosed = null;
    };

    const onSaveClick = () => {
        const values = {};

        $playersScoreStore.forEach(player => {
            values[player.id] = player.currentValue;
        });

        dispatch('enter', {
            roundClosed,
            values
        });
    };
</script>

<div class="modal fade" id="dataEnterModal" on:show.bs.modal={onModalOpen}>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Ergebnis eintragen</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Spieler</th>
                        <th scope="col">Punkte</th>
                        <th scope="col">beendet?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each $playersScoreStore as player (player.id)}
                        <tr>
                            <th class='align-middle' scope="col">{player.name}</th>
                            <td>
                                <input bind:value={player.currentValue}
                                       class="align-middle form-control"
                                       type="number"
                                       tabindex={player.id}
                                >
                            </td>
                            <td class='text-center'>
                                <input bind:group={roundClosed}
                                       value={player.id}
                                       class="align-middle form-check-input"
                                       type="radio"
                                >
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button on:click|preventDefault={onSaveClick} type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Speichern
                </button>
            </div>
        </div>
    </div>
</div>