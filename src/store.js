import { derived, writable } from 'svelte/store';

const createRoundStore = () => {
    const store = writable([]);
    const { subscribe, set, update } = store;

    return {
        subscribe,
        set,
        update,
        init: () => {
            const rounds = localStorage.getItem('rounds');
            set(rounds ? JSON.parse(rounds) : []);
        },
        reset: () => {
            set([]);
            localStorage.removeItem('rounds');
        },
        addRound: (values, roundClosed, doublePoints) => {
            update(store => {
                const newStore = store.map(v => v);
                newStore.push({ values, roundClosed, doublePoints });
                localStorage.setItem('rounds', JSON.stringify(newStore));
                return newStore;
            });
        }
    };
};

const createPlayerScoreStore = () => {
    const store = writable([]);
    const { subscribe, set, update } = store;

    return {
        subscribe,
        set,
        update,
        init: () => {
            const players = localStorage.getItem('players');
            set(players ? JSON.parse(players) : []);
        },
        setPlayers: (playersValues) => {
            set(playersValues);
            localStorage.setItem('players', JSON.stringify(playersValues));
        },
        updateSum: (values) => {
            update(store => {
                const newStore = store.map(player =>
                    ({
                        ...player,
                        sum: (player.sum || 0) + values[player.id]
                    }));

                localStorage.setItem('players', JSON.stringify(
                    newStore.map(({ id, name, sum }) => ({ id, name, sum }))
                ));
                return newStore;
            });
        },
        reset: () => {
            set([]);
            localStorage.removeItem('players');
        }
    };
};

export const playersScoreStore = createPlayerScoreStore();
export const roundStore = createRoundStore();

export const sortedPlayerScoreStore = derived(playersScoreStore, ($store) => {
    const store = [...$store].sort((a, b) => a.sum - b.sum);
    let currentRank = 1;

    // rank player
    return store.map((player, index) => {
        if (index > 0 && player.sum !== store[index - 1].sum) {
            currentRank = index + 1;
        }

        return {
            ...player,
            rank: currentRank
        };
    });
});
