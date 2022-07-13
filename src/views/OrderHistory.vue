<script setup>
import { ordersAPI } from "../api/ordersAPI";
import { inject, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { securityStore } from "../stores/securityStore";
import { buysellAPI } from "../api/buysellAPI";
import { userStore } from "../stores/userStore";

const orders = reactive({});
const route = useRoute();
const user = userStore();
const ticker = route.query.ticker || "";
const tickerFlag = !!ticker;
const type = route.query.type || "";
const typeFlag = !!type;
const store = securityStore();
const loading = ref(false);
const toast = inject("toast");

function userOrders() {
  if (user.user.permissions.supervisor) {
    return ordersAPI.getAllOrders();
  } else if (user.user.permissions.agent || user.user.permissions.traineeAgent) {
    return ordersAPI.getOrdersForCurrentAgent();
  }
}

onMounted(() => {
  userOrders().then((res) => {
    orders.data = res.data;

    if (store.stock.length === 0 && store.futures.length === 0 && store.forex.length === 0) {
      store.getSecurities();
    }

    if (tickerFlag && typeFlag) {
      switch (type) {
        case "stock":
          let stockId = store.stock.find((stock) => stock.ticker === ticker).id;
          orders.data = orders.data.filter((order) => order.securityId === stockId);
          break;
        case "forex":
          let forexId = store.forex.find((forex) => forex.ticker === ticker).id;
          orders.data = orders.data.filter((order) => order.securityId === forexId);
          break;
        case "future":
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

function approveOrder(id) {
  loading.value = true;
  buysellAPI.approveOrder(id).then(() => {
    toast.success("Order approved");
    loading.value = false;
  })
}

function declineOrder(id) {
  loading.value = true;
  buysellAPI.declineOrder(id).then(() => {
    toast.success("Order denied");
    loading.value = false;
  })
}

</script>

<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
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
                  <th>Order State</th>
                  <th v-if="user.user.permissions.supervisor">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders.data" key="order.orderId">
                  <td>{{ new Date(order.modificationDate).toDateString() }}</td>
                  <td v-if="!tickerFlag">{{ order.symbol }}</td>
                  <td>{{ order.actionType }}</td>
                  <td>{{ order.limitPrice }}</td>
                  <td>{{ order.amount }}</td>
                  <td>{{ order.amount * order.limitPrice }}</td>
                  <td>{{ order.orderState }}</td>
                  <td v-if="user.user.permissions.supervisor">
                    <div v-if="order.orderState === 'WAITING'">
                      <button class="btn btn-sm btn-success mx-1" @click="approveOrder(order.orderId)">Approve</button>
                      <button class="btn btn-sm btn-danger" @click="declineOrder(order.orderId)">Deny</button>
                    </div>
                    <div v-else-if="order.orderState === 'APPROVED'">
                      <i class="bi bi-check-square-fill text-success"></i>
                    </div>
                    <div v-else-if="order.orderState === 'DECLINED'">
                      <i class="bi bi-x-square-fill text-danger"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>