<script setup>

const props = defineProps({
    action: {
        type: String,
        default: 'Buy'
    },
    security: {
        type: Object,
        default: {}
    }
})

</script>

<template>
    <div class="modal" id="buysellmodal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.action }}: {{ props.security.symbol }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Object: {{ props.security }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmationModal">{{ props.action }}</button>
                </div>
            </div>
        </div>
    </div>
</template>