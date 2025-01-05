<script>
    import StartPage from './pages/Start.svelte';
    import GamePage from './pages/Game.svelte';
    import { playersScoreStore, roundStore } from './store.js';
    import { Navigator } from './navigator.js';
    import { get } from 'svelte/store';

    playersScoreStore.init();
    roundStore.init();

    let page = Navigator.getPage();

    if (page === 'start' && get(roundStore).length > 0) {
        page = Navigator.setPage('game');
    }
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
        <a href="https://github.com/anh4n/skyjo" target='_blank' rel='noopener noreferrer'
           class="link-secondary link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover"
        >GitHub <i class="bi bi-github"></i>
        </a>
        <span class='version font-monospace text-secondary'>{__APP_VERSION__}</span>
    </footer>
</div>