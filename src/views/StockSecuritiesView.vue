<script setup>
import { listings } from '../mock-data/data';
import { ref, reactive, onMounted, inject } from 'vue';
import StockSecuritiesTable from "../components/StockSecuritiesTable.vue";
import FilterStock from "../components/FilterStock.vue";
import { securitiesAPI } from '../api/securitiesAPI';
import { securityStore } from '../stores/securityStore';

const obj = reactive({
    stock_securities: [],
    filtered_stock_securities: [],
})

const emitter = inject('emitter');
const toast = inject('toast');
const loading = ref(false);
const active = ref(1);

onMounted(() => {
    loading.value = true;
    let store = securityStore();
    securitiesAPI.getSecurities().then(response => {
        store.setStock(response.data.stock);
        store.setForex(response.data.forex);
        store.setFutures(response.data.futures);
        loading.value = false;
        emitter.emit('data-loaded');
    })
    .catch(err => {
        loading.value = false;
        toast.error("Failed to get response from server.");
    });
})

function onType(e, tab) {
    active.value = tab;
    if (e.target.value === "action") {
        emitter.emit('filter-stock', 'stock')
    } else if (e.target.value === "future") {
        emitter.emit('filter-stock', 'futures')
    } else {
        emitter.emit('filter-stock', 'forex')
    }
}



</script>



<template>
    <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
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
                <FilterStock />
            </div>

            <div class="col-sm-9">
                <br />
                <div class="btn-toolbar">
                    <button @click="onType($event, 1)" value="action" type="button" :class="{ 'btn-primary': active == 1, 'btn-secondary': active != 1 }" class="btn mx-2">Action</button>
                    <button @click="onType($event, 2)" value="future" :class="{ 'btn-primary': active == 2, 'btn-secondary': active != 2 }" class="btn mx-2">Future</button>
                    <button @click="onType($event, 3)" value="forex" :class="{ 'btn-primary': active == 3, 'btn-secondary': active != 3 }" class="btn mx-2">Forex</button>
                </div>
                
                <hr />
                <StockSecuritiesTable />
            
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
    height: auto;
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