export class Navigator {
    static setPage(page) {
        const searchParams = new URLSearchParams();
        searchParams.set('page', page);
        window.location.search = searchParams.toString();
        return page;
    }

    static getPage() {
        const searchParams = new URLSearchParams(window.location.search);
        let page = searchParams.get('page');
        if (!page) {
            page = this.setPage('start');
        }

        return page;
    }
}