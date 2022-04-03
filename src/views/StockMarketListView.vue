<script>
import { stocks } from "../mock-data/data";
import { reactive } from "vue";

export default {
  setup() {
    console.log(stocks);

    const obj = reactive({
      market: stocks
    });
    return {obj}
  },
};
</script>

<template>
  <div class="align-middle">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Stock Name</th>
          <th scope="col">Stock Symbol</th>
          <th scope="col">Country</th>
          <th scope="col">Currency</th>
          <th scope="col">Time Zone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in obj.market" :key="stock.id">
          <th scope="row"></th>
          <td>{{stock.stock_name}}</td>
          <td>{{stock.symbol}}</td>
          <td>{{stock.country}}</td>
          <td>{{stock.currency}}</td>
          <td>{{stock.time_zone}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
