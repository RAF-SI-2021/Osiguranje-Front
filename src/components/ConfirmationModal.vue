<script setup>


const props = defineProps({
    security: {
        type: Object,
        default: {}
    },
    myInput:{
        type: Object,
        default:{
            amount: 0,
            limitValue: 0,
            stopValue: 0,
            allOrNone: false,
            margin:false,
            orderType: ""
        },
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
                    <p>The quantity: {{props.myInput.amount}}</p>
                    <p>Order type: {{props.myInput.orderType}}</p>
                    <p>Approximate price: {{props.security.price * props.myInput.amount}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>        
</template>