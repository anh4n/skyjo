import { get, writable } from 'svelte/store';

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
        updateScore: (values, roundClosed) => {
            update(store => {
                const newStore = store.map(player => {
                    return ({
                        ...player,
                        data: [...player.data, { points: values[player.id], hasClosedRound: player.id === roundClosed }]
                    });
                });

                localStorage.setItem('players', JSON.stringify(newStore));
                return newStore;
            });
        },
        getRounds: () => {
            const data = [];
            get(store).forEach(player => {
                let val = 0;
                player.data.forEach(({points, hasClosedRound}, index) => {
                    if (!data[index]) {
                        data[index] = [];
                    }

                    val += points;
                    const prefix = points > 0 ? '+' : '';
                    data[index].push({ sum: val, prefix, round: points, hasClosedRound });
                });
            });

            return Object.values(data);
        },
        reset: () => {
            set([]);
            localStorage.removeItem('players');
        }
    };
};

export const playersScoreStore = createPlayerScoreStore();

