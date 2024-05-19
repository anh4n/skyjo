<script>
    import { onMount } from 'svelte';

    export let addText = 'Add field';
    export let placeholderPrefix = 'Field';
    const defaultValue = [
        { id: 1, placeholder: `${placeholderPrefix} 1`, value: '' },
        { id: 2, placeholder: `${placeholderPrefix} 2`, value: '' },
        { id: 3, placeholder: `${placeholderPrefix} 3`, value: '' }
    ];
    export let value = defaultValue;
    export const reset = () => {
        value = defaultValue;
    };

    onMount(() => {
        if (value.length === 0) {
            value = defaultValue;
        }
    });

    const addField = () => {
        const id = value[value.length - 1].id + 1;
        value = [
            ...value,
            { id, placeholder: `${placeholderPrefix} ${id}`, value: '' }
        ];
    };

    const removeField = (id) => {
        const index = value.findIndex(field => field.id === id);

        value = [
            ...value.slice(0, index),
            ...value.slice(index + 1)
        ];
    };

    const handleKeyPress = (e) => {
        if ('Enter' === e.key) {
            addField();
        }
    };
</script>

{#each value as field (field.id)}
    <div class="mb-3">
        <div class="input-group">
            <input
                    bind:value={field.value}
                    placeholder={field.placeholder}
                    on:keypress|preventDefault={handleKeyPress}
                    autofocus
                    type="text"
                    class="form-control"
                    tabindex={field.id}
            />
            <button
                    on:click={removeField.bind(null, field.id)}
                    type="button"
                    class="btn"
            >
                <i class="bi bi-x-circle" style='color: red'></i>
            </button>
        </div>
    </div>
{/each}
<div class="mb-3 d-grid gap-2">
    <button on:click={addField} type="button" class="btn btn-outline-secondary add-player-button">
        {addText}
    </button>
</div>
