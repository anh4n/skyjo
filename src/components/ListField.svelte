<script>
    import { onMount, tick } from 'svelte';

    const createDefaultValue = () => ([
        { id: 1, placeholder: `${placeholderPrefix} 1`, value: '' },
        { id: 2, placeholder: `${placeholderPrefix} 2`, value: '' },
        { id: 3, placeholder: `${placeholderPrefix} 3`, value: '' }
    ]);
    /**
     * @typedef {Object} Props
     * @property {any} [minFields]
     * @property {any} [maxFields]
     * @property {string} [addText]
     * @property {string} [placeholderPrefix]
     * @property {any} [value]
     */

    /** @type {Props} */
    let {
        minFields = null,
        maxFields = null,
        addText = 'Add field',
        placeholderPrefix = 'Field',
        value = $bindable(createDefaultValue())
    } = $props();
    export const reset = () => {
        value = createDefaultValue();
    };

    let canHaveMoreFields = $derived(maxFields === null || value.length < maxFields);
    let canHaveLessFields = $derived(minFields === null || value.length > minFields);

    onMount(() => {
        if (value.length === 0) {
            value = createDefaultValue();
        }
    });

    const addField = async () => {
        if (canHaveMoreFields) {
            const lastField = value[value.length - 1];
            const id = lastField ? value[value.length - 1].id + 1 : 1;
            value = [
                ...value,
                { id, placeholder: `${placeholderPrefix} ${id}`, value: '' }
            ];
            const index = value.findIndex(field => field.id === id);
            await tick();
            value[index].input.focus();
        }
    };

    const removeField = (id) => {
        if (canHaveLessFields) {
            const index = value.findIndex(field => field.id === id);

            value = [
                ...value.slice(0, index),
                ...value.slice(index + 1)
            ];
        }
    };

    const handleKeyPress = (id, e) => {
        if ('Enter' === e.key) {
            e.preventDefault();
            const lastField = value[value.length - 1];
            if (id === lastField.id) {
                addField();
            } else {
                const index = value.findIndex(field => field.id === id);
                value[index + 1].input.focus();
            }
        }
    };
</script>

{#each value as field (field.id)}
    <div class="mb-3">
        <div class="input-group">
            <input
                    bind:value={field.value}
                    placeholder={field.placeholder}
                    onkeydown={handleKeyPress.bind(null, field.id)}
                    bind:this={field.input}
                    type="text"
                    class="form-control"
                    tabindex={field.id}
            />
            {#if canHaveLessFields}
                <button
                        onclick={removeField.bind(null, field.id)}
                        type="button"
                        class="btn"
                >
                    <i class="bi bi-x-circle" style='color: red'></i>
                </button>
            {/if}
        </div>
    </div>
{/each}
<div class="mb-3 d-grid gap-2">
    <button onclick={addField} disabled={!canHaveMoreFields} type="button"
            class="btn btn-outline-secondary add-player-button">
        {addText}
    </button>
</div>
