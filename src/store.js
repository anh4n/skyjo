import { writable } from 'svelte/store';

const rankPlayers = (players) => {
    // Kopie des Arrays erstellen und nach `sum` sortieren
    const sortedPlayers = [...players].sort((a, b) => a.sum - b.sum);

    // Ränge berechnen
    let currentRank = 1;
    sortedPlayers.forEach((player, index) => {
        if (index > 0 && player.sum !== sortedPlayers[index - 1].sum) {
            currentRank = index + 1;
        }
        player.rank = currentRank;
    });

    // Ränge in das ursprüngliche Array übertragen
    players.forEach(player => {
        const rankedPlayer = sortedPlayers.find(p => p.id === player.id);
        player.rank = rankedPlayer.rank;
    });
};

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

                rankPlayers(newStore);

                localStorage.setItem('players', JSON.stringify(newStore));
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

