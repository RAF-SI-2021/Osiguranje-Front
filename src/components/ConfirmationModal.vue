<script setup>
import { computed, inject, reactive, ref } from "vue";
import { userStore } from "../stores/userStore";
import { buysellAPI } from "../api/buysellAPI";
import { numeric, required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const loading = ref(false);
const store = userStore();
const toast = inject('toast');

const props = defineProps({
  security: {
    type: Object,
    default: {},
  },
  myInput: {
    type: Object,
    default: {
      securityId: 0,
      amount: 0,
      limitValue: 0,
      stopValue: 0,
      allOrNone: false,
      margin: false,
      orderType: "",
      actionType: "Buy",
    },
  },
});

function getSecurityType(type) {
  switch (type) {
    case "stock":
      return "STOCKS";
    case "forex":
      return "FOREX";
    case "future":
      return "FUTURES";
  }
}

function makeOrder() {
  loading.value = true;
  const order = {
    securityId: props.myInput.securityId,
    amount: props.myInput.amount,
    securityType: getSecurityType(props.myInput.type),
    allOrNone: props.myInput.allOrNone,
    limitPrice: props.myInput.limitValue,
    stopPrice: props.myInput.stopValue,
    actionType: props.myInput.actionType.toUpperCase()
  };

  console.log("ORDER -> ", order);

  buysellAPI
    .makeOrder(order)
    .then((response) => {
      console.log(response);
      loading.value = false;
      toast.success("Order made successfully.")
    })
    .catch((error) => {
      loading.value = false;
      if (error.response.status === 400 && error.response.data === "bound must be positive") {
        toast.success("Order made successfully.")
      } else if (error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong.")
      }
    });
}
</script>

<template>
  <vue-element-loading :active="loading" spinner="bar-fade-scale" style="height: 100vh" />
  <div class="modal" data-bs-backdrop="static" id="confirmationModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Purchase Overview</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>The quantity: {{ props.myInput.amount }}</p>
          <p>Order type: {{ props.myInput.orderType }}</p>
          <p>Approximate price: {{ props.security.price * props.myInput.amount }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            @click="makeOrder()"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            id="confirm-order"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
