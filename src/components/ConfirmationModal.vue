<script setup>
    const props = defineProps({
    myInput:{
        type: Object,
        default:{
            amount: 0,
            limitValue: 0,
            stopValue: 0,
            allOrNone: false,
            margin:false
        }
    }
})

</script>

<template>
    <div class="modal" data-bs-backdrop="static" id="confirmationModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Purchase Overview</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Amount of securities: {{props.myInput.amount}}</p>
                    <p>Limit Value: {{props.myInput.limitValue}}</p>
                    <p>Stop Value: {{props.myInput.stopValue}}</p>
                    <p>All or none: {{props.myInput.allOrNone}}</p>
                    <p>Margin: {{props.myInput.margin}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Confirm</button>
                </div>
            </div>
        </div>
    </div>        
</template>