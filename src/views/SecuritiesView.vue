<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import { securitiesAPI } from '../api/securitiesAPI';
import { securityStore } from '../stores/securityStore';

const sum = reactive({
    sumStocks: 0,
    sumForex: 0,
    sumFutures: 0,
})

const toast = inject('toast');
const loading = ref(false);

onMounted(() => {
    loading.value = true;
    let store = securityStore();
    securitiesAPI.getSecurities().then(response => {
        store.setStock(response.data.stocks);
        store.setForex(response.data.forex);
        store.setFutures(response.data.futures);
        loading.value = false;

        for(let i=0; i<store.stock.length; i++) sum.sumStocks += store.stock[i].price;   
        for(let i=0; i<store.forex.length; i++) sum.sumForex += store.forex[i].price;
        for(let i=0; i<store.futures.length; i++) sum.sumFutures += store.futures[i].price;
        sum.sumStocks = sum.sumStocks.toFixed(2);
        sum.sumForex = sum.sumForex.toFixed(2);
        sum.sumFutures = sum.sumFutures.toFixed(2);
        
    })
    .catch(err => {
        loading.value = false;
        toast.error("Failed to get response from server.");
    });
})


</script>



<template>
    <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
    <br />
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-8">
            <table class="table table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Stock Type</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Stocks</th>
                        <td>{{sum.sumStocks}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Forex</th>
                        <td>{{sum.sumForex}}</td>
                    </tr>
                    <tr>
                        <th scope="row">Futures</th>
                        <td>{{sum.sumFutures}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>



</template>


<style scoped>

</style>