<script>
    import StartPage from './pages/Start.svelte';
    import GamePage from './pages/Game.svelte';
    import { playersScoreStore, roundStore } from './store.js';
    import { Navigator } from './navigator.js';

    playersScoreStore.init();
    roundStore.init();

    const page = Navigator.getPage();
</script>

<div class="container">
    <div class='text-center p-1'>
        <img src='/logo.jpeg' alt='logo' style='max-height: 50px'/>

    </div>
    {#if page === 'start' }
        <StartPage/>
    {:else if page === 'game'}
        <GamePage/>
    {/if}
</div>
<div class="fixed-bottom d-flex justify-content-end">
    <span class='font-monospace text-secondary p-1'>{__APP_VERSION__}</span>
</div>