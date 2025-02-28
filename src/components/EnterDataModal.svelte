<script>
    import { playersScoreStore } from '../store.js';
    import { get } from 'svelte/store';

    let roundClosed = $state();

    const { onSave } = $props();

    const onModalOpen = () => {
        playersScoreStore.update(store =>
            store.map(player => ({
                ...player,
                currentValue: null
            })));
        roundClosed = null;
    };

    const onModalRendered = () => {
        const player = get(playersScoreStore)[0];
        player.input.focus();
    };

    const onSaveClick = (event) => {
        event.preventDefault();
        const values = {};

        $playersScoreStore.forEach(player => {
            values[player.id] = player.currentValue || 0;
        });

        onSave({ roundClosed, values });
    };
</script>

<div
        class="modal fade"
        id="dataEnterModal"
        data-bs-backdrop="static"
        onshow.bs.modal={onModalOpen}
        onshown.bs.modal={onModalRendered}
>
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
                                       bind:this={player.input}
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
                <button onclick={onSaveClick} type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Speichern
                </button>
            </div>
        </div>
    </div>
</div>