<script setup>
import { onMounted, ref } from "vue";
import { transactionAPI } from "../api/transactionAPI";
import { securitiesAPI } from "../api/securitiesAPI";

const balance = ref([]);

onMounted(() => {
  transactionAPI.getBalance()
    .then((res) => {
      for (let key of res.data) {
        if (key.securityType !== "CURRENCY") continue;
        let obj = {};
        obj.total = key.amount;
        obj.reserved = key.reserved;
        obj.available = key.available;
        securitiesAPI.getCurrency(key.securityId)
          .then((res) => {
            obj.currency = res.data.isoCode;
            balance.value.push(obj);
          })
      }
      console.log(balance.value);
    });
})

</script>

<template>
  <div class="modal" tabindex="-1" id="balanceModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Balance</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-bordered">
            <thead>
              <tr bgcolor="#80aaff">
                <th>Currency</th>
                <th>Total</th>
                <th>Reserved</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in balance">
                <td>{{ item.currency }}</td>
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