<script setup>
import { listings } from '../mock-data/data';
import { ref, reactive } from 'vue';

const obj = reactive({
    stock_securities: listings,
    filtered_stock_securities: listings,
})


function onType(e){
    if(e.target.value === "action") obj.filtered_stock_securities = obj.stock_securities.filter(security => security.listing_type === "ACTION");
    else if(e.target.value === "future") obj.filtered_stock_securities = obj.stock_securities.filter(security => security.listing_type === "FUTURE");
    else obj.filtered_stock_securities = obj.stock_securities.filter(security => security.listing_type === "FOREX");
}



</script>



<template>

    <div class="container-fluid">
        <div class="row content">
            <div class="col-sm-3 sidenav">
                <br />
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search" />
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
                <br>
                <h4>Filter component here...</h4>
            </div>

            <div class="col-sm-9">
                <br />
                <div class="btn-toolbar">
                    <button @click="onType" value="action" type="button" class="btn btn-primary mx-2">Action</button>
                    <button @click="onType" value="future" class="btn btn-primary mx-2">Future</button>
                    <button @click="onType" value="forex" class="btn btn-primary mx-2">Forex</button>
                </div>
                
                <hr />
                <h4>Table component here...</h4>
            
            </div>
        </div>
    </div>
</template>


<style scoped>
.row.content {
    height: 1500px;
}

.sidenav {
    background-color: #f1f1f1;
    height: 100%;
}


@media screen and (max-width: 767px) {
    .sidenav {
        height: auto;
        padding: 15px;
    }
    .row.content {
        height: auto;
    }
}
</style>