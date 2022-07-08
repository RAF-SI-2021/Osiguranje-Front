<script setup>
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import { transactionAPI } from "../api/transactionAPI";

    const route = useRoute();
    var id = route.params.id

    let withdraw = ref(0)
    let deposit = ref(0)

    const transactions = ref([]);

    onMounted(() => {
        document.getElementsByClassName("modal-backdrop")[0].remove();
        transactionAPI.getTransactionsByCurrency(id)
        .then((res)=>{
            //transactions.value=res
            for(let key of res.data) {
              let obj = {}
              obj.id = key.id
              obj.timestamp = key.timestamp
              obj.text = key.text
              obj.payment = key.payment
              obj.payout = key.payout
              obj.transactionType = key.transactionType

              transactions.value.push(obj)
              deposit.value += key.payment;
              withdraw.value += key.payout;
            }
        },
        (err)=>{
            console.log(err);
        })
        
    });

    // function getDeposit(){
    //     deposit = 0
    //     for(item in transactions.value){
    //         deposit += item.payment
    //     }

    //     return deposit;
    // }

    // function getWithdraw(){
    //     withdraw = 0
    //     for(item in transactions.value){
    //         withdraw += item.payout;
    //     }

    //     return withdraw
    // }


</script>

<template>
    <div class="container">

      <table class="table table-bordered mt-5">
        <thead>
        <tr bgcolor="#80aaff">
          <th>Timestamp</th>
          <th>Text</th>
          <th>Payment</th>
          <th>Payout</th>
          <th>TransactionType</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in transactions" :key="item.id">
          <td>{{ item.timestamp}}</td>
          <td>{{ item.text }}</td>
          <td>{{ item.payment }}</td>
          <td>{{ item.payout }}</td>
          <td>{{ item.transactionType }}</td>
        </tr>
        </tbody>
      </table>

      <label>Deposit: {{deposit}}</label>
      <br>
      <label>Withdraw: {{withdraw}}</label>
    </div>



</template>