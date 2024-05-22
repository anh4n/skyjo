export const getPlayersRanked = (store) => {
    let players = store.map(player => {
        let sum = player.data.reduce((sum, x) => sum + x.points, 0);
        return { player: player.id, sum, rank: null };
    });

    players.sort((a, b) => a.sum - b.sum);

    let rank = 1;
    for (let i = 0; i < players.length; i++) {
        if (i > 0 && players[i].sum > players[i - 1].sum) {
            rank = i + 1;
        }
        players[i].rank = rank;
    }

    return players;
}