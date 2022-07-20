<script setup>
import { transactionAPI } from "../api/transactionAPI";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const id = route.params.id;
const transactions = ref([]);

onMounted(() => {
  transactionAPI.getTransactionsByOrder(id).then((res) => {
    transactions.value = res.data;
  });
})

</script>

<template>
  <div class="container">
    <h1 class="mt-5">Transactions for order {{ id }} made on {{ new Date().toDateString() }}</h1>
    <table class="mt-3 table">
      <thead>
        <tr>
          <th>Account Type</th>
          <th>Datetime</th>
          <th>Currency</th>
          <th>Description</th>
          <th>Payment</th>
          <th>Payout</th>
          <th>Reserve</th>
          <th>Used Reserve</th>
          <th>Transaction Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transactions" key="t.id">
          <td>{{ t.accountId === 1 ? 'Cash' : 'Margin' }}</td>
          <td>{{ new Date(t.timestamp).toDateString() }}</td>
          <td>USD</td>
          <td>{{ t.text }}</td>
          <td>{{ t.payment }}</td>
          <td>{{ t.payout }}</td>
          <td>{{ t.reserve }}</td>
          <td>{{ t.usedReserve }}</td>
          <td>{{ t.transactionType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>