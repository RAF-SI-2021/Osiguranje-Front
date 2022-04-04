<template>
    <div>
        <table class="table table-dark">
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
                    <router-link class="stocktable-stocksymbol-link" :to="{name:'stockInfo', params:{symbol:dataRow.stock_symbol}}">{{dataRow.stock_symbol}}</router-link>
                </th>
                <td>{{dataRow.price}}</td>
                <td>{{dataRow.change}}</td>
                <td>{{dataRow.volume}}</td>
                <td v-if="isFutureContracts"> {{dataRow.initial_margin_cost}}</td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>
import {reactive, computed, onMounted } from 'vue';

export default {
    name: 'StockSecuritiesTable',
    props: [
        "data",
        "isFutureContracts"
    ],
    setup(props, context) {
        console.log(props.data)
        let isFutureContracts = false;
        if(props.isFutureContracts) {
            isFutureContracts=props.isFutureContracts;
        }

        return {
            isFutureContracts,
            data: props.data
        }
    },
}
</script>
<style scoped>
.stocktable-stocksymbol-link {
    color:white;
}
</style>
