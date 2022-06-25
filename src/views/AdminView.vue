<script setup>
import { securitiesAPI } from '../api/securitiesAPI';
import securitiesAPIMock from '../mock-data/securitiesAPI-mock'

import { onMounted, reactive, ref } from "vue";
import { adminLinks } from "../consts/AdminNavs";
import { userAPI } from "../api/userAPI";

const user = ref("");
const stocksData = reactive({stocks: ""}); 
onMounted(() => {
  /*
  // When using API - This is to avoid exceeding API requests
  securitiesAPI.getSecurities().then((res) => {
    stocksData.stocks = res.data.stocks;
  })
  */
 // Change "stocks" to "futures" when they arrive from the API
 stocksData.stocks = securitiesAPIMock.stocks;
  if (localStorage.getItem("token")) {
    userAPI.getCurrentUser().then((res) => {
      user.value = res.data.firstName + " " + res.data.lastName;
    });
  }
});
</script>

<template>
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
    <div class="container">
      <table class="table table-bordered">
        <thead>
          <tr bgcolor="#80aaff">
            <th scope="col">Stock Name</th>
            <th scope="col">Stock Symbol</th>
            <th scope="col">Price (Change [Percent])</th>
            <th scope="col">Settlement date</th>
          </tr>
        </thead>
        <tbody>
          <!-- Change .stocks to .futures to match futures when being used -->
          <tr v-for="stock in stocksData.stocks" :key="stock.id">
            <td>
              {{stock.name}}
            </td>
            <td>
              {{stock.ticker}}
            </td>
            <td>
              {{stock.price}}
              ( {{stock.change }} [{{stock.changePercent.toFixed(2)}}%])
            </td>
            <td>
              {{ stock.settlementDate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
