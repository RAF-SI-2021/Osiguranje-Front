<script setup>
import { useRoute } from "vue-router";
import { listings, apiKey, API_KEYS } from "../mock-data/data";
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { LineChart } from "vue-chart-3";
import { securityStore } from "../stores/securityStore";

import { marketauxCacheResponse } from "../mock-data/marketaux-cache";

import StockInfoNewsItem from "../components/StockInfoNewsItem.vue";
import SecurityModal from "../components/SecurityModal.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";

// Change this to use the LIVE API - Pazite na broj zahteva, maximum 100 *na dan*, znaci 100 refreshova strane
const USE_MARKETAUX_API = false;

const route = useRoute();
//   var symbol = route.params.symbol;
const symbol = ref("TSLA");
const type = route.query.q;
const store = securityStore();

const historic_data = ref([]);

const security = ref({
  id: 352,
  ask: 765.25,
  bid: 764.7,
  contract_size: 1,
  last_updated: "29/05/2022 15:45:38",
  name: "Tesla, Inc.",
  price: 759.63,
  price_change: 51.9,
  ticker: "TSLA",
  volume: 29764994,
  dividend_yield: 0,
  outstanding_shares: 1036009984,
  exchange_id: {
    id: 330,
    mic: "XNAS",
    acronym: "NASDAQ",
    closed: "16:00",
    name: "Nasdaq",
    open: "09:30",
    time_zone: "-5",
    currency_id: {
      id: 14,
      iso_code: "USD",
      name: "United States dollar",
      symbol: "$",
      region_id: 10,
    },
    region_id: 10,
  },
});

const color = ref(false);

const chartFlag = ref(true);

let marketauxNewsData = reactive({});

const action = ref("Buy");

onMounted(() => {
  console.log("INFO:", security);
  // if (type === "stock") {
  //   security.value = store.stock.find(el => el.symbol === symbol)
  // } else if (type === "future") {
  //   security.value = store.futures.find(el => el.symbol === symbol)
  // } else if (type === "forex") {
  //   // symbol = symbol.substring(0, 3) + '/' + symbol.substring(3);
  //   security.value = store.forex.find(el => el.symbol === symbol)
  // }

  // if (type === 'forex') {
  //   symbol = symbol.substring(0, 3) + '/' + symbol.substring(3);
  // }

  console.log(security.value);

  color.value = security.value.price_change > 0;

  axios
    .get(
      `https://api.twelvedata.com/time_series?start_date=2017-05-06&symbol=TSLA&interval=1day&apikey=${apiKey}`
    )
    .then((response) => {
      if (response.data.code === 400) {
        chartFlag.value = false;
      }
      for (let v of response.data.values) {
        historic_data.value.unshift(v);
      }
      //console.log(historic_data);
      // console.log(historic_data.value)
    })
    .catch((err) => {
      console.error(err);
    });
});

function fetchMarketauxNews() {
  if (USE_MARKETAUX_API) {
    axios
      .get(
        `https://api.marketaux.com/v1/news/all?symbols=${symbol}&api_token=${API_KEYS.marketaux}&language=en`
      )
      .then((response) => {
        marketauxNewsData.data = response.data.data;
        marketauxNewsData.meta = response.data.meta;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    marketauxNewsData.data = marketauxCacheResponse.data;
    marketauxNewsData.meta = marketauxCacheResponse.meta;
  }
}

fetchMarketauxNews();

const line_data = computed(() => ({
  labels: historic_data.value.map((el) => el.datetime),
  datasets: [
    {
      label: "Price",
      data: [...historic_data.value.map((el) => el.open)],
    },
  ],
}));
</script>

<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1>{{ security.ticker }}</h1>
        <h4>{{ security.name }}</h4>
      </div>
      <div>
        <div class="d-flex justify-content-around align-items-center">
          <h1>{{ security.price }}</h1>
          <h1>|</h1>
          <h2 :class="{ 'text-success': color, 'text-danger': !color }">
            <template v-if="security.price_change > 0">+</template>
            {{ security.price_change }}
          </h2>
        </div>
        <h5><strong>Last updated:</strong> {{ security.last_updated }}</h5>
      </div>
    </div>
    <div class="row mb-3 mt-3">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          @click="action = 'Buy'"
          type="button"
          class="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#buysellmodal"
        >
          Buy
        </button>
        <button
          @click="action = 'Sell'"
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#buysellmodal"
        >
          Sell
        </button>
      </div>
    </div>
    <div class="row mb-3">
      <div
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Ask:</strong></p>
        <p>{{ security.ask }}</p>
      </div>
      <div class="col mx-1 border border-dark d-flex justify-content-between">
        <p><strong>Bid:</strong></p>
        <p>{{ security.bid }}</p>
      </div>
      <div
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Volume:</strong></p>
        <p>{{ new Intl.NumberFormat("en-EN").format(security.volume) }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <div
        v-if="security.baseCurrency"
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Base:</strong></p>
        <p>{{ security.baseCurrency }}</p>
      </div>
      <div
        v-if="security.quoteCurrency"
        class="col mx-1 border border-dark d-flex justify-content-between"
      >
        <p><strong>Quote:</strong></p>
        <p>{{ security.quoteCurrency }}</p>
      </div>
      <div
        v-if="security.contract_size"
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Contract Size:</strong></p>
        <p>{{ security.contract_size }}</p>
      </div>
      <div
        v-if="security.contractUnit"
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Contract Unit:</strong></p>
        <p>{{ security.contractUnit }}</p>
      </div>
    </div>
    <div class="row mb-3">
      <div
        v-if="security.maintenanceMargin"
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Maintenance Margin:</strong></p>
        <p>{{ security.maintenanceMargin }}</p>
      </div>
      <div
        v-if="security.settlementDate"
        class="col mx-1 border border-dark d-flex justify-content-between"
      >
        <p><strong>Settlement Date:</strong></p>
        <p>{{ security.settlementDate }}</p>
      </div>
      <div
        v-if="security.initialMarginCost"
        class="col mx-1 border border-dark d-flex justify-content-between"
        style="background: lightgrey"
      >
        <p><strong>Initial Margin:</strong></p>
        <p>{{ security.initialMarginCost }}</p>
      </div>
    </div>
    <LineChart v-if="chartFlag" class="mt-4" :chartData="line_data" :label="'Price'" />

    <hr />
    <div class="row justify-content-center">
      <StockInfoNewsItem
        v-for="marktauxNewsItem in marketauxNewsData.data"
        :title="marktauxNewsItem.title"
        :snippet="marktauxNewsItem.snippet"
        :published_at="marktauxNewsItem.published_at"
        :image_url="marktauxNewsItem.image_url"
        :description="marktauxNewsItem.description"
        :url="marktauxNewsItem.url"
      ></StockInfoNewsItem>
    </div>
  </div>

  <SecurityModal :action="action" :security="security" />
  <ConfirmationModal />
</template>
