<script setup>
  import {useRoute} from "vue-router";
  import { listings, apiKey } from "../mock-data/data";
  import {computed, reactive, ref} from "vue";
  import axios from 'axios';
  import { LineChart } from 'vue-chart-3';

  const route = useRoute();
  const symbol = route.params.symbol;

  const historic_data = ref([])
  axios.get(`https://api.twelvedata.com/time_series?start_date=2017-05-06&symbol=${symbol}&interval=1day&apikey=${apiKey}`)
    .then(response => {
      historic_data.value.push(...response.data.values)
      console.log(historic_data.value)
    })
    .catch(err => {
      console.error(err)
    })

  const from_data = listings.find(el => el.stock_symbol === symbol)

  const security = reactive(from_data)

  const color = security.change > 0;

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
        <h1>{{ security.stock_symbol }}</h1>
        <h4>{{ security.description }}</h4>
        <p>{{ security.stock_market }} : {{ security.stock_symbol }}</p>
      </div>
      <div>
        <div class="d-flex justify-content-around align-items-center">
          <h1>{{ security.price }}</h1>
          <h1> | </h1>
          <h2 :class="{ 'text-success':color, 'text-danger':!color }">
            <template v-if="security.change > 0">+</template>
            <template v-else>-</template>
            {{ security.change }}
          </h2>
        </div>
        <h5><strong>Last updated:</strong> {{ new Intl.DateTimeFormat().format(security.last_updated) }}</h5>
      </div>
    </div>
    <div class="row">
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
    <LineChart class="mt-4" :chartData="line_data" />
  </div>
</template>

