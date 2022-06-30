<script setup>
import { useRoute, useRouter } from "vue-router";
import { apiKey, API_KEYS } from "../mock-data/data";
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { LineChart } from "vue-chart-3";
import { securityStore } from "../stores/securityStore";

import { marketauxCacheResponse } from "../mock-data/marketaux-cache";

import StockInfoNewsItem from "../components/StockInfoNewsItem.vue";
import SecurityModal from "../components/SecurityModal.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import OptionList from "../components/OptionsList.vue";

// Change this to use the LIVE API - Pazite na broj zahteva, maximum 100 *na dan*, znaci 100 refreshova strane
const USE_MARKETAUX_API = true;

const loading = ref(false);

const route = useRoute();
const router = useRouter();
var symbol = route.params.symbol;
const type = route.query.q;
const store = securityStore();

const historic_data = ref([]);
const historic_data_copy = ref([]);
const active = ref(1);

const security = ref({});

const color = ref(false);

const chartFlag = ref(true);

let marketauxNewsData = reactive({});

const action = ref("Buy");

onMounted(() => {
  console.log("STORE -> ",store);
  loading.value = true;

  if (type === "stock") {
    security.value = store.stock.find((el) => el.ticker === symbol);
  } else if (type === "future") {
    security.value = store.futures.find((el) => el.ticker === symbol);
  } else if (type === "forex") {
    // symbol = symbol.substring(0, 3) + '/' + symbol.substring(3);
    security.value = store.forex.find((el) => el.ticker === symbol);
  }

  if (type === "forex") {
    symbol = symbol.substring(0, 3) + "/" + symbol.substring(3);
  }

  color.value = security.value.change > 0;
  myInput.securityId = security.value.id;

  axios
    .get(
      `https://api.twelvedata.com/time_series?start_date=2017-05-06&symbol=${symbol}&interval=1day&apikey=${apiKey}`
    )
    .then((response) => {
      if (response.data.code === 400) {
        chartFlag.value = false;
      }
      for (let v of response.data.values) {
        historic_data.value.unshift(v);
        historic_data_copy.value.unshift(v);
      }
      loading.value = false;
    })
    .catch((err) => {
      console.error(err);
      loading.value = false;
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

const myInput = reactive({
  securityId: 0,
  amount: 0,
  limitValue: 0,
  stopValue: 0,
  allOrNone: false,
  margin: false,
  type: type,
});

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

function filterData(e, tab) {
  active.value = tab;
  const currentDate = new Date();
  let previous = new Date(currentDate.getTime());

  if (e.target.value === "5 days") {
    previous.setDate(currentDate.getDate() - 5); //last 5 days
  } else if (e.target.value === "week") {
    previous.setDate(currentDate.getDate() - 7); //last week
  } else if (e.target.value === "month") {
    previous.setMonth(currentDate.getMonth() - 1); //last month
  } else if (e.target.value === "year") {
    previous.setYear(currentDate.getFullYear() - 1); //last year
  } else {
    let date = new Date(historic_data_copy.value[0].datetime);
    previous = new Date(date.getTime());
  }

  historic_data.value = historic_data_copy.value.filter((element) => {
    let date = new Date(element.datetime);
    if (date >= previous) {
      return element;
    }
  });
}

let showOptions = false;
</script>

<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />

  <div class="container mt-3">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1>{{ security.ticker }}</h1>
        <h4>{{ security.name }}</h4>
        <button @click="router.go(-1)" class="btn btn-primary">Go Back</button>
      </div>
      <div>
        <div class="d-flex justify-content-around align-items-center">
          <h1>{{ security.price }}</h1>
          <h1>|</h1>
          <h2 :class="{ 'text-success': color, 'text-danger': !color }">
            <template v-if="security.change > 0">+</template>
            {{ security.change }}
          </h2>
        </div>
        <h5><strong>Last updated:</strong> {{ security.lastUpdated }}</h5>
      </div>
      <button
        type="button"
        class="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target="#optionsModal"
      >
        Options
      </button>
      <div
        class="modal fade"
        id="optionsModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Stock Options</h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <OptionList />
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="infoModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Option Information</h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Symbol: {{ security.ticker }}</p>
              <p>Contract: {{ security.ticker }} 2208D3325</p>
              <p>Type:</p>
              <p>Expiration date:</p>
              <p>Strike:</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#optionsModal"
              >
                Go Back
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#detailedModal"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="detailedModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Detailed Option Information</h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Symbol: {{ security.ticker }}</p>
              <p>Contract: {{ security.ticker }} 2208D3325</p>
              <p>Type:</p>
              <p>Expiration date:</p>
              <p>Strike:</p>
              <hr />
              <p>Last bid: {{ security.price }}</p>
              <p>Change: {{ security.price_change }}</p>
              <p>Bid: {{ security.bid }}</p>
              <p>Ask: {{ security.ask }}</p>
              <p>Volume: {{ security.volume }}</p>
              <p>Open Interest:</p>
              <p>Daily price range:</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#optionsModal"
              >
                Go Back
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#buyOptionModal"
              >
                Buy Option
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="buyOptionModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Buy Option Form</h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group" style="padding-bottom: 12px">
                  <p>Action:</p>
                  <input
                    class="form-check-input"
                    type="radio"
                    id="actionInput"
                    checked
                    v-model="action"
                  />
                  <label class="form-check-label" for="actionInput"> Buy To Open</label>
                </div>
                <div class="form-group" style="padding-bottom: 12px">
                  <p>Target price:</p>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="target_price"
                    id="market"
                    checked
                    v-model="target_price"
                  />
                  <label class="form-check-label" for="market"> Market </label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    class="form-check-input"
                    type="radio"
                    name="target_price"
                    id="limit"
                    v-model="target_price"
                  />
                  <label class="form-check-label" for="limit"> Limit </label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    class="form-check-input"
                    type="radio"
                    name="target_price"
                    id="stop"
                    v-model="target_price"
                  />
                  <label class="form-check-label" for="stop"> Stop </label>
                </div>
                <div class="form-group" style="padding-bottom: 12px">
                  <p>Price:</p>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="0"
                    id="price"
                    v-model="price_"
                  />
                </div>
                <div class="form-group" style="padding-bottom: 12px">
                  <p>Contract Number:</p>
                  <input
                    class="form-control"
                    type="number"
                    placeholder="0"
                    id="contract"
                    v-model="contract_number"
                  />
                </div>
                <div class="form-group">
                  <p>Duration:</p>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="duration"
                    id="day_order"
                    v-model="duration_"
                  />
                  <label class="form-check-label" for="day_order"> Day Order </label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    class="form-check-input"
                    type="radio"
                    name="duration"
                    id="good_until"
                    checked
                    v-model="duration_"
                  />
                  <label class="form-check-label" for="good_until">
                    Good Until Cancelled
                  </label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    class="form-check-input"
                    type="radio"
                    name="duration"
                    id="cancelled"
                    v-model="duration_"
                  />
                  <label class="form-check-label" for="cancelled"> Cancelled </label>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#optionsModal"
              >
                Go Back
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#previewModal"
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="previewModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Preview Information</h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Contract number: {{ security.ticker }} 2208D3325</p>
              <p>
                Contract description: <br />
                Target price: {{ target_price }} <br />
                Action: {{ action }}
              </p>
              <p>Duration: {{ duration_ }}</p>
              <p>Price: {{ price_ }}</p>
              <p>Quantity:</p>
              <p>Total Price:</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#buyOptionModal"
              >
                Go Back
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                Submit
              </button>
            </div>
          </div>
        </div>
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
        v-if="security.settlementDate"
        class="col mx-1 border border-dark d-flex justify-content-between"
      >
        <p><strong>Settlement Date:</strong></p>
        <p>{{ new Date(security.settlementDate) }}</p>
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
        v-if="security.contractUnit"
        class="col mx-1 border border-dark d-flex justify-content-between"
      >
        <p><strong>Contract Unit:</strong></p>
        <p>
          {{
            security.contractUnit.charAt(0).toUpperCase() + security.contractUnit.slice(1)
          }}
        </p>
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
    <br />
    <div
      v-if="chartFlag"
      class="btn-toolbar"
      role="toolbar"
      aria-label="Toolbar with button groups"
    >
      <div class="btn-group me-2" role="group" aria-label="Second group">
        <button
          @click="filterData($event, 5)"
          value="5 days"
          :class="{
            'btn btn-secondary': active == 5,
            'btn btn-outline-secondary': active != 5,
          }"
        >
          Last 5 days
        </button>
        <button
          @click="filterData($event, 2)"
          value="week"
          :class="{
            'btn btn-secondary': active == 2,
            'btn btn-outline-secondary': active != 2,
          }"
        >
          Last week
        </button>
        <button
          @click="filterData($event, 3)"
          value="month"
          :class="{
            'btn btn-secondary': active == 3,
            'btn btn-outline-secondary': active != 3,
          }"
        >
          Last month
        </button>
        <button
          @click="filterData($event, 4)"
          value="year"
          :class="{
            'btn btn-secondary': active == 4,
            'btn btn-outline-secondary': active != 4,
          }"
        >
          Last year
        </button>
        <button
          @click="filterData($event, 1)"
          value="all"
          :class="{
            'btn btn-secondary': active == 1,
            'btn btn-outline-secondary': active != 1,
          }"
        >
          Start of selling
        </button>
      </div>
    </div>

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

  <SecurityModal :action="action" :security="security" :my-input="myInput" />
  <ConfirmationModal :security="security" :my-input="myInput" />
</template>
