<script>
    import { v7 as uuidv7 } from 'uuid';

    const emptyFn = () => {
    };

    /**
     * @typedef {Object} Props
     * @property {string} [title]
     * @property {string} [description]
     * @property {string} [okText]
     * @property {string} [cancelText]
     * @property {string} [icon]
     * @property {any} [onConfirm]
     * @property {any} [onCancel]
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let {
        title = '',
        description = '',
        okText = 'OK',
        cancelText = 'Abbrechen',
        icon = 'bi bi-exclamation-circle-fill text-warning',
        onConfirm = emptyFn,
        onCancel = emptyFn,
        children
    } = $props();

    const modalId = uuidv7();

    const onClick = (event) => {
        event.preventDefault();
    };
</script>

<button class="btn btn-outline-danger btn-lg" data-bs-toggle="modal" data-bs-target="#{modalId}" onclick={onClick}>
    {@render children?.()}
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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick={onCancel}>
                    {cancelText}
                </button>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick={onConfirm}>
                    {okText}
                </button>
            </div>
        </div>
    </div>
</div>