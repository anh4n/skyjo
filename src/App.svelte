<script>
    import StartPage from './pages/Start.svelte';
    import GamePage from './pages/Game.svelte';
    import { playersStore, currentPageStore } from './store.js';

    const players = localStorage.getItem('players');
    playersStore.set(players ? JSON.parse(players) : []);
</script>

<div class="container">
    <h1 class="text-center">SKYJO</h1>
    {#if $currentPageStore === 'start' }
        <StartPage/>
    {:else if $currentPageStore === 'game'}
        <GamePage/>
    {/if}
</div>
