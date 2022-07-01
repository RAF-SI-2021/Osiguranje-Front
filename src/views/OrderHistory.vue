<script setup>
import { ordersAPI } from "../api/ordersAPI";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { securityStore } from "../stores/securityStore";

const orders = reactive({});
const route = useRoute();
const ticker = route.query.ticker || "";
const tickerFlag = !!ticker;
const type = route.query.type || "";
const typeFlag = !!type;
const store = securityStore();

onMounted(() => {
  ordersAPI.getAllOrders().then((res) => {
    orders.data = res.data;

    if (store.stock.length === 0 && store.futures.length === 0 && store.forex.length === 0) {
      store.getSecurities();
    }

    if (tickerFlag && typeFlag) {
      switch (type) {
        case "stock":
          console.log("STOCK DAMN IT", ticker);
          let stockId = store.stock.find((stock) => stock.ticker === ticker).id;
          orders.data = orders.data.filter((order) => order.securityId === stockId);
          break;
        case "forex":
          console.log("FOREX SHIT");
          let forexId = store.forex.find((forex) => forex.ticker === ticker).id;
          orders.data = orders.data.filter((order) => order.securityId === forexId);
          break;
        case "future":
          console.log("FUTURE FUCK");
          let futureId = store.futures.find((future) => future.ticker === ticker).id;
          orders.data = orders.data.filter((order) => order.securityId === futureId);
          break;
      }
    }

    if (!typeFlag) {
      for (let i = 0; i < orders.data.length; i++) {
        switch (orders.data[i].securityType) {
          case "STOCKS":
            let sec1 = store.stock.find((sec) => sec.id === orders.data[i].securityId);
            if (sec1) {
              orders.data[i].symbol = sec1.ticker;
            }
            break;
          case "FOREX":
            let sec2 = store.forex.find((sec) => sec.id === orders.data[i].securityId);
            if (sec2) {
              orders.data[i].symbol = sec2.ticker;
            }
            break;
          case "FUTURES":
            let sec3 = store.futures.find((sec) => sec.id === orders.data[i].securityId);
            if (sec3) {
              orders.data[i].symbol = sec3.ticker;
            }
            break;
        }
        console.log(orders.data);
      }
    }
  })


})

</script>

<template>
  <div class="container">
    <h1 class="mt-5 text-center">Order History</h1>
    <h1>{{ ticker }}</h1>
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Datetime</th>
                  <th v-if="!tickerFlag">Ticker</th>
                  <th>Order Type</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders.data" key="order.orderId">
                  <td>datetime placeholder</td>
                  <td v-if="!tickerFlag">{{ order.symbol }}</td>
                  <td>BUY/SELL</td>
                  <td>{{ order.limitPrice }}</td>
                  <td>{{ order.amount }}</td>
                  <td>{{ order.cost }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>