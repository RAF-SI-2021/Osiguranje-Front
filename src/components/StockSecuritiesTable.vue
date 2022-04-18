<template>
    <div>
        <table class="table table-light">
        <thead>
            <tr>
                <th scope="col">Stock Symbol</th>
                <th scope="col" v-if="actions">Market</th>
                <th scope="col">Price</th>
                <th scope="col">Change</th>
                <th scope="col">Volume</th>
                <th v-if="futures" scope="col">Initial Margin Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dataRow in data" :key="dataRow.id">
                <th>
                    <router-link class="stocktable-stocksymbol-link" :to="{name:'stockInfo', query: { q: stockType }, params:{symbol:dataRow.symbol}}">{{dataRow.symbol}}</router-link>
                </th>
                <td v-if="actions">{{dataRow.market ? dataRow.market : '-'}}</td>
                <td>{{dataRow.price}}</td>
                <td :class="{ 'text-danger': dataRow.priceChange < 0, 'text-success': dataRow.priceChange >= 0 }">{{dataRow.priceChange}}</td>
                <td>{{dataRow.volume}}</td>
                <td v-if="dataRow.initialMarginCost"> {{dataRow.initialMarginCost}}</td>
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
        const futures = ref(false);
        const actions = ref(false);
        const stockType = ref('stock')
        const toast = inject('toast');
        const backup = ref([]);
        let isFutureContracts = false;
        if(props.isFutureContracts) {
            isFutureContracts=props.isFutureContracts;
        }

        const data = ref([]);

        emitter.on("data-loaded", () => {
            console.log("Data loaded");
            data.value = store.stock;
            backup.value = store.stock;
        })

        emitter.on("apply-filter", (filter) => {
            data.value = backup.value;
            // toast.success('Filters applied');
            if (filter.price > 0) {
                data.value = data.value.filter(row => row.price <= filter.price);
            }
            if (filter.bid > 0) {
                data.value = data.value.filter(row => row.bid <= filter.bid);
            }
            if (filter.ask > 0) {
                data.value = data.value.filter(row => row.ask <= filter.ask);
            }
            if (filter.volume > 0) {
                data.value = data.value.filter(row => row.volume >= filter.volume);
            }
        })

        emitter.on("filter-stock", (type) => {
            if(type === "stock") {
                data.value = store.stock;
                backup.value = store.stock;
                futures.value = false;
                actions.value = true;
                stockType.value = "stock";
            } else if(type === "futures") {
                data.value = store.futures;
                backup.value = store.futures;
                futures.value = true;
                actions.value = false;
                stockType.value = "future";
            } else {
                data.value = store.forex;
                backup.value = store.forex;
                futures.value = false;
                actions.value = false;
                stockType.value = "forex";
            }
        });

        return {
            isFutureContracts,
            data,
            futures,
            stockType,
            actions
        }
    },
}
</script>
<style scoped>
.stocktable-stocksymbol-link {
    color:black;
}
</style>
