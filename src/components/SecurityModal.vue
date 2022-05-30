<script setup>

const props = defineProps({
    action: {
        type: String,
        default: 'Buy'
    },
    security: {
        type: Object,
        default: {}
    },
    myInput:{
        type: Object,
        default:{
            brojHartija: 0,
            limitValue: 0,
            stopValue: 0,
            allOrNone: false,
            margin:false
        }
    }
})


</script>

<template>
    <div class="modal" id="buysellmodal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.action }}: {{ props.security.symbol }}</h5>
                    <h1>{{props.myInput.brojHartija}}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <label for="broj_hartija">Unesite broj hartija: </label>
                        <input v-model="props.myInput.brojHartija" type="number" class="form-control" id="broj_hartija" min="0">
                    </div>

                    <div>
                        <label for="limit_value">Unesite limit value: </label>
                        <input v-model="props.myInput.limitValue" type="number" class="form-control" id="limit_value" min="0">
                    </div>

                    <div>
                        <label for="stop_value">Unesite stop value: </label>
                        <input v-model="props.myInput.stopValue" type="number" class="form-control" id="stop_value" min="0">
                    </div>
                    
                    <div>
                        <label for="all_or_none_cb">
                            All or none:
                            <input v-model="props.myInput.allOrNone" type="checkbox" id="all_or_none_cb"> 
                        </label>
                    </div>

                    <div>
                        <label for="margin_cb">
                            Margin: 
                            <input v-model="props.myInput.margin" type="checkbox" id="margin_cb"> 
                        </label>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmationModal">{{ props.action }}</button>
                </div>
            </div>
        </div>
    </div>
</template>