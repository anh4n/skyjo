<script>
    import StartPage from './pages/Start.svelte';
    import GamePage from './pages/Game.svelte';
    import { playersStore, currentPageStore } from './store.js';

    const players = localStorage.getItem('players');
    playersStore.set(players ? JSON.parse(players) : []);
</script>

<div class="container">
    <div class='text-center p-1'>
        <img src='/logo.jpeg' alt='logo' style='max-height: 50px'/>
    </div>
    {#if $currentPageStore === 'start' }
        <StartPage/>
    {:else if $currentPageStore === 'game'}
        <GamePage/>
    {/if}
</div>
