<script>
    let videoEl;
    let canvasEl;

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });

        videoEl.srcObject = stream;
    };

    const onModalOpen = () => {
        startCamera();
    };

    const onCaptureClick = () => {
        canvasEl.width = videoEl.videoWidth;
        canvasEl.height = videoEl.videoHeight;
        canvasEl.getContext('2d').drawImage(videoEl, 0, 0);

        canvasEl.toBlob((blob) => {
            fetch('/ocr', {
                method: 'POST',
                body: blob
            });
        }, 'image/jpeg');
    };
</script>

<div class="modal fade modal-lg" id="fotoModal" data-bs-backdrop="static" onshow.bs.modal={onModalOpen}>
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Ergebnis eintragen</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <video bind:this={videoEl} id="video" autoplay playsinline><track kind="captions" /></video>
                <canvas bind:this={canvasEl} id="canvas" hidden></canvas>
            </div>
            <div class="modal-footer">
                <button onclick={onCaptureClick} type="button" data-bs-dismiss="modal" class="btn btn-primary"
                    >Speichern
                </button>
            </div>
        </div>
    </div>
</div>
