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
            amount: 0,
            limitValue: 0,
            stopValue: 0,
            allOrNone: false,
            margin:false,
            orderType: ""
        },
    }

})

          function  determineOrderType(){
                if(props.myInput.amount !== 0 && props.myInput.limitValue === 0 && props.myInput.stopValue === 0){
                    props.myInput.orderType = prefix() + " Market Order"
                }
                if(props.myInput.amount !== 0 && props.myInput.limitValue !== 0 && props.myInput.stopValue === 0){
                    props.myInput.orderType = prefix() + " Limit Order"
                }
                if(props.myInput.amount !== 0 && props.myInput.limitValue === 0 && props.myInput.stopValue !== 0){
                   props.myInput.orderType = prefix() + " Stop Order"
                }
                if(props.myInput.amount !== 0 && props.myInput.limitValue !== 0 && props.myInput.stopValue !== 0){
                    props.myInput.orderType = prefix() + " Stop-Limit Order"
                }   
            
        }

        function  prefix(){
                    if(props.myInput.allOrNone === false && props.myInput.margin === false){
                        return ""
                    }else if(props.myInput.allOrNone !== false){
                        return "All or none "
                    }else if(props.myInput.margi !== false){
                        return "Margine "
                    }
        }



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
                        <label for="security_amount">Enter the amount of securities to {{props.action}}: </label>
                        <input v-model="props.myInput.amount" type="number" class="form-control" id="security_amount" min="0">
                    </div>

                    <div>
                        <label for="limit_value">Enter limit value: </label>
                        <input v-model="props.myInput.limitValue" type="number" class="form-control" id="limit_value" min="0">
                    </div>

                    <div>
                        <label for="stop_value">Enter stop value: </label>
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="determineOrderType()">{{ props.action }}</button>
                </div>
            </div>
        </div>
    </div>
</template>