<template>
    <div>
        <StockSecuritiesTable :data="listings" :isFutureContracts="true"></StockSecuritiesTable>
    </div>
</template>

<script setup>
import { listings, apiKey } from "../mock-data/data";


</script>
<script>
import StockSecuritiesTable from "../components/StockSecuritiesTable.vue";

export default {
    components: { StockSecuritiesTable }    
}
</script>

<style scoped>

</style>

