<script>
    import StartPage from './pages/Start.svelte';
    import GamePage from './pages/Game.svelte';
    import { playersScoreStore, roundStore } from './store.js';
    import { Navigator } from './navigator.js';

    playersScoreStore.init();
    roundStore.init();

    const page = Navigator.getPage();
</script>

<div class='d-flex flex-column min-vh-100'>
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
    <footer class="mt-auto align-self-end">
        <span class='version font-monospace text-secondary'>{__APP_VERSION__}</span>
    </footer>
</div>