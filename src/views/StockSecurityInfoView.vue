<script setup>
  import {useRoute} from "vue-router";
  import { listings, apiKey } from "../mock-data/data";
  import {computed, onMounted, reactive, ref} from "vue";
  import axios from 'axios';
  import { LineChart } from 'vue-chart-3';
  import { securityStore } from '../stores/securityStore';

  const route = useRoute();
  var symbol = route.params.symbol;
  const type = route.query.q
  const store = securityStore();

  const historic_data = ref([])
  
  const security = ref({})

  const color = ref(false);

  const chartFlag = ref(true);

  onMounted(() => {
    if (type === "stock") {
      security.value = store.stock.find(el => el.symbol === symbol)
    } else if (type === "future") {
      security.value = store.futures.find(el => el.symbol === symbol)
    } else if (type === "forex") {
      // symbol = symbol.substring(0, 3) + '/' + symbol.substring(3);
      security.value = store.forex.find(el => el.symbol === symbol)
    }

    if (type === 'forex') {
      symbol = symbol.substring(0, 3) + '/' + symbol.substring(3);
    }

    console.log(security.value);

    color.value = security.value.priceChange > 0;

    axios.get(`https://api.twelvedata.com/time_series?start_date=2017-05-06&symbol=${symbol}&interval=1day&apikey=${apiKey}`)
      .then(response => {
        if (response.data.code === 400) {
          chartFlag.value = false;
        }
        historic_data.value.push(...response.data.values)
        // console.log(historic_data.value)
      })
      .catch(err => {
        console.error(err)
      })
  })

  const line_data = computed(() => ({
    labels: historic_data.value.map(el => el.datetime),
    datasets: [
      {
        data: [...historic_data.value.map(el => el.open)]
      }
    ]
  }))
</script>

<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1>{{ security.symbol }}</h1>
        <h4>{{ security.description }}</h4>
      </div>
      <div>
        <div class="d-flex justify-content-around align-items-center">
          <h1>{{ security.price }}</h1>
          <h1> | </h1>
          <h2 :class="{ 'text-success':color, 'text-danger':!color }">
            <template v-if="security.priceChange > 0">+</template>
            {{ security.priceChange }}
          </h2>
        </div>
        <h5><strong>Last updated:</strong> {{ security.lastUpdated }}</h5>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Ask:</strong></p>
        <p>{{ security.ask }}</p>
      </div>
      <div class="col mx-1 border border-dark d-flex justify-content-between">
        <p><strong>Bid:</strong></p>
        <p>{{ security.bid }}</p>
      </div>
      <div class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Volume:</strong></p>
        <p>{{ new Intl.NumberFormat('en-EN').format(security.volume) }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <div v-if="security.baseCurrency" class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Base:</strong></p>
        <p>{{ security.baseCurrency }}</p>
      </div>
      <div v-if="security.quoteCurrency" class="col mx-1 border border-dark d-flex justify-content-between">
        <p><strong>Quote:</strong></p>
        <p>{{ security.quoteCurrency }}</p>
      </div>
      <div v-if="security.contractSize" class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Contract Size:</strong></p>
        <p>{{ security.contractSize }}</p>
      </div>
      <div v-if="security.contractUnit" class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Contract Unit:</strong></p>
        <p>{{ security.contractUnit }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <div v-if="security.maintenanceMargin" class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Maintenance Margin:</strong></p>
        <p>{{ security.maintenanceMargin }}</p>
      </div>
      <div v-if="security.settlementDate" class="col mx-1 border border-dark d-flex justify-content-between">
        <p><strong>Settlement Date:</strong></p>
        <p>{{ security.settlementDate }}</p>
      </div>
      <div v-if="security.initialMarginCost" class="col mx-1 border border-dark d-flex justify-content-between" style="background: lightgrey">
        <p><strong>Initial Margin:</strong></p>
        <p>{{ security.initialMarginCost }}</p>
      </div>
    </div>
    <LineChart v-if="chartFlag" class="mt-4" :chartData="line_data" />
  </div>
</template>

