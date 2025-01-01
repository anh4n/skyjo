<script>
    import { v7 as uuidv7 } from 'uuid';

    export let title = '';
    export let description = '';
    export let okText = 'OK';
    export let cancelText = 'Abbrechen';
    export let icon = 'bi bi-exclamation-circle-fill text-warning';
    export let onConfirm = () => {
    };
    export let onCancel = () => {
    };

    const modalId = uuidv7();
</script>

<button class="btn btn-outline-danger btn-lg" data-bs-toggle="modal" data-bs-target="#{modalId}">
    <slot />
</button>

<div class="modal fade" id="{modalId}">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5"><i class="{icon}"></i> {title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                {description}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={onCancel}>
                    {cancelText}
                </button>
                <button type="button" class="btn btn-primary" on:click={onConfirm}>
                    {okText}
                </button>
            </div>
        </div>
    </div>
</div>