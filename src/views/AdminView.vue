<script setup>
import { securitiesAPI } from '../api/securitiesAPI';
import securitiesAPIMock from '../mock-data/securitiesAPI-mock'

import { onMounted, reactive, ref } from "vue";
import { adminLinks } from "../consts/AdminNavs";
import { userAPI } from "../api/userAPI";
import BalanceModal from "../components/BalanceModal.vue";

const admin = ref(false);
const agent = ref(false);
const usedLimit = ref(0);
const maxLimit = ref(0);
const user = ref("");
const stocksData = reactive({stocks: ""}); 
onMounted(() => {
  // When using API - This is to avoid exceeding API requests
  securitiesAPI.getSecurities().then((res) => {
    stocksData.futures = res.data.futures
      .sort((a, b) => {
        return new Date(a.settlementDate) - new Date(b.settlementDate)
      })
      .slice(0, 10);
    
    console.log(stocksData.futures);
  }).catch((err) => {
    console.log(err);
  })
  
 // Change "stocks" to "futures" when they arrive from the API
 // stocksData.futures = securitiesAPIMock.futures;
  if (localStorage.getItem("token")) {
    userAPI.getCurrentUser().then((res) => {
      user.value = res.data.firstName + " " + res.data.lastName;
      if (res.data.permissions.admin || res.data.permissions.supervisor) admin.value = true;
      if (res.data.permissions.agent || res.data.permissions.traineeAgent) {
        agent.value = true;
        userAPI.getActuaryById(res.data.id).then((actuary) => {
          usedLimit.value = actuary.data.usedLimit;
          maxLimit.value = actuary.data.spendingLimit;
        })
      }
    });
  }
});
</script>

<template>
  <BalanceModal v-if="admin" />
  <div>
    <h1 class="text-center mt-5">Welcome, {{ user }}</h1>
    <div class="container">
      <h3 class="my-5">Navigate to:</h3>
      <div class="row row-cols-2 g-3">
        <div v-for="link in adminLinks" class="col d-flex align-items-start">
          <i
            class="bi text-muted flex-shrink-0 me-3"
            :class="link.icon"
            style="font-size: 1.75em"
          ></i>
          <div>
            <RouterLink :to="link.routeLink" class="h4">
              {{ link.routeName }}
            </RouterLink>
            <p>{{ link.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="d-flex">
        <button v-if="admin" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#balanceModal">
          Check Balance
        </button>
        <button v-if="admin" type="button" class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#">
          Check Owned Securities
        </button>
      </div>

      <div v-if="agent">
        <h2 class="mt-3">Current Limit: {{ usedLimit.toLocaleString('en') }} / {{ maxLimit.toLocaleString('en') }}</h2>
      </div>
      <h2 class="my-4">Futures approaching settlement date</h2>
      <table class="table table-bordered">
        <thead>
          <tr bgcolor="#80aaff">
            <th scope="col">Stock Name</th>
            <th scope="col">Stock Symbol</th>
            <th scope="col">Price</th>
            <th scope="col">Settlement date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocksData.futures" :key="stock.id">
            <td>
              {{stock.name}}
            </td>
            <td>
              {{stock.ticker}}
            </td>
            <td>
              {{stock.price}}
            </td>
            <td>
              {{ new Date(stock.settlementDate).toDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table > tbody > tr:hover {
  background-color: #cccccc;
  cursor: pointer;
}
</style>
