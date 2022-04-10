<template>
    <div>
        <table class="table table-light">
        <thead>
            <tr>
                <th scope="col">Stock Symbol</th>
                <th scope="col">Price</th>
                <th scope="col">Change</th>
                <th scope="col">Volume</th>
                <th v-if="isFutureContracts" scope="col">Initial Margin Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dataRow in data" :key="dataRow.id">
                <th>
                    <router-link class="stocktable-stocksymbol-link" :to="{name:'stockInfo', params:{symbol:dataRow.symbol}}">{{dataRow.symbol}}</router-link>
                </th>
                <td>{{dataRow.price}}</td>
                <td :class="{ 'text-danger': dataRow.priceChange < 0, 'text-success': dataRow.priceChange >= 0 }">{{dataRow.priceChange}}</td>
                <td>{{dataRow.volume}}</td>
                <td v-if="isFutureContracts"> {{dataRow.initial_margin_cost}}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>
import {reactive, computed, onMounted, ref, inject } from 'vue';
import { securityStore } from '../stores/securityStore';

export default {
    name: 'StockSecuritiesTable',
    setup(props, context) {
        const store = securityStore();
        const emitter = inject('emitter');
        let isFutureContracts = false;
        if(props.isFutureContracts) {
            isFutureContracts=props.isFutureContracts;
        }

        const data = ref(store.currentList);

        emitter.on("filter-stock", (type) => {
            if(type === "stock") {
                data.value = store.stock;
            } else if(type === "futures") {
                data.value = store.futures;
            } else {
                data.value = store.forex;
            }
        });

        return {
            isFutureContracts,
            data
        }
    },
}
</script>
<style scoped>
.stocktable-stocksymbol-link {
    color:black;
}
</style>
