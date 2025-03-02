import './styles/index.scss';
import 'bootstrap';
import App from './App.svelte';
import { mount } from 'svelte';

const app = mount(App, {
    target: document.getElementById('app'),
    props: {
        locale: navigator.language
    }
});

export default app;
