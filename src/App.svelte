<script>
    import StartPage from '@pages/Start.svelte';
    import GamePage from '@pages/Game.svelte';
    import { playersScoreStore, roundStore } from './store.js';
    import { Navigator, Page } from './navigator.svelte.js';
    import { get } from 'svelte/store';
    import { onMount } from 'svelte';
    import BuyMeACoffee from '@components/BuyMeACoffee.svelte';

    playersScoreStore.init();
    roundStore.init();

    onMount(() => {
        if (Navigator.isCurrentPage(Page.START) && get(roundStore).length > 0) {
            Navigator.setPage(Page.GAME);
        }
    });
</script>

<div class='d-flex flex-column min-vh-100'>
    <div class="container">
        <div class='text-center p-1'>
            <img src='/logo.jpeg' alt='logo' style='max-height: 50px'/>
        </div>
        {#if Navigator.isCurrentPage(Page.START)}
            <StartPage/>
        {:else if Navigator.isCurrentPage(Page.GAME)}
            <GamePage/>
        {/if}
        <div class='text-center p-1'>
            <BuyMeACoffee/>
        </div>
    </div>

    <footer class="">
        <a href="https://github.com/anh4n/skyjo" target='_blank' rel='noopener noreferrer'
           class="github link-secondary link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover"
        >GitHub <i class="bi bi-github"></i>
        </a>
        <span class='font-monospace text-secondary'>{__APP_VERSION__}</span>
    </footer>
</div>
