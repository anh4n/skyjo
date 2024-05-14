import { writable } from 'svelte/store';

export const playersStore = writable([]);
export const currentPageStore = writable('start');

