<script>
    import { currentPageStore, playersStore } from '../store.js';
    import EnterDataModal from '../components/EnterDataModal.svelte';

    let rounds = [];

    const onNewGameClick = (e) => {
        currentPageStore.set('start');
    };

    const onDataEnter = (e) => {
        const { roundClosed, values } = e.detail;
        const data = [];
        const minValue = Math.min(...Object.values(values));

        if (minValue < values[roundClosed]) {
            values[roundClosed] *= 2;
        }

        playersStore.update(store => {
            return store.map(player => {
                return ({
                    ...player,
                    data: [...player.data, values[player.id]]
                });
            });
        });

        $playersStore.forEach(player => {
            let val = 0;
            player.data.forEach((round, index) => {
                if (!data[index]) {
                    data[index] = [];
                }

                val += round;
                const prefix = round > 0 ? '+' : '';
                data[index].push({ sum: val, prefix, round });
            });
        });

        rounds = Object.values(data);
    };
</script>

<table class="table table-striped">
    <thead>
    <tr>
        <th scope="col">#</th>
        {#each $playersStore as player (player.id)}
            <th scope="col" class='text-end'>
                {player.name}
            </th>
        {/each}
    </tr>
    </thead>
    <tbody class='table-group-divider'>
    {#each rounds as round, index}
        <tr>
            <th scope="row">{index + 1}</th>
            {#each round as playerValue}
                <td>
                    <div class='d-flex justify-content-end'>
                        <div style='width: 35px' class='text-end'>{playerValue.sum}</div>
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