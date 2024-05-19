import { get, writable } from 'svelte/store';

const createPlayerScoreStore = () => {
    const store = writable([]);
    const { subscribe, set, update } = store;

    return {
        subscribe,
        set,
        init: () => {
            const players = localStorage.getItem('players');
            set(players ? JSON.parse(players) : []);
        },
        setPlayers: (playersValues) => {
            set(playersValues);
            localStorage.setItem('players', JSON.stringify(playersValues));
        },
        updateScore: (values) => {
            update(store => {
                const newStore = store.map(player => {
                    return ({
                        ...player,
                        data: [...player.data, values[player.id]]
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
                player.data.forEach((round, index) => {
                    if (!data[index]) {
                        data[index] = [];
                    }

                    val += round;
                    const prefix = round > 0 ? '+' : '';
                    data[index].push({ sum: val, prefix, round });
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

