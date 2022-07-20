<script setup>
import { onMounted, ref } from "vue";
import { transactionAPI } from "../api/transactionAPI";
import { securityStore } from "../stores/securityStore";

const secBalance = ref([]);
const store = securityStore();
onMounted(() => {
  transactionAPI.getBalance()
    .then(resp => {
      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].securityType === 'CURRENCY') continue;
        let obj = {};
        obj.accountId = resp.data[i].accountId;
        obj.securityId = resp.data[i].securityId;
        obj.total = resp.data[i].amount;
        obj.reserved = resp.data[i].reserved;
        obj.available = resp.data[i].available;

        switch (resp.data[i].securityType) {
          case "STOCKS":
            store.stock.find(item => {
              if (item.id === resp.data[i].securityId) {
                obj.ticker = item.ticker;
              }
            });
            break;
          case "FUTURES":
            store.futures.find(item => {
              if (item.id === resp.data[i].securityId) {
                obj.ticker = item.ticker;
              }
            });
            break;
          case "FOREX":
            store.forex.find(item => {
              if (item.id === resp.data[i].securityId) {
                obj.ticker = item.ticker;
              }
            });
            break;
        }

        secBalance.value.push(obj);
      }
    })
})

</script>

<template>
  <div class="modal fade" tabindex="-1" id="securityBalanceModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Owned Securities</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered">
            <thead>
            <tr bgcolor="#80aaff">
              <th>Security</th>
              <th>Total</th>
              <th>Reserved</th>
              <th>Available</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in secBalance" :key="item.securityId">
              <!-- <td>{{ item.currency}}</td> -->
              <td>{{ item.ticker }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.reserved }}</td>
              <td>{{ item.available }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>