export const Page = {
    START: 'start',
    GAME: 'game'
};

export class Navigator {
    static setPage(page) {
        const searchParams = new URLSearchParams();
        searchParams.set('page', page);
        window.location.search = searchParams.toString();
        currentPage.page = page;
    }

    static isCurrentPage(page) {
        return currentPage.page === page;
    }

    static setInitialPage() {
        const searchParams = new URLSearchParams(window.location.search);
        let page = searchParams.get('page');
        if (!page) {
            this.setPage(Page.START);
        }

        return page;
    }
}

export let currentPage = $state({ page: Navigator.setInitialPage() });