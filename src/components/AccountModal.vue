<script setup>
import { reactive, computed, onMounted, ref, watch } from "vue";
import { minValue, numeric, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const rules = computed(() => {
  return {
    amount: {
      numeric,
      required,
    },
    currency: {
        required,
    }
  };
});

const disabled = ref(true);

const props = defineProps({
  myInput: {
    type: Object,
    default: {
      amount: 0,
      currency: "",
    },
  },
});

const v$ = useVuelidate(rules, props.myInput);

function paymentOrWithdraw() {
    if(props.myInput.amount > 0){
        //Payment
    }
    else{
        //Withdraw
    }

}

watch(props.myInput, (newInput) => {
  // console.log(v$.value.$invalid);
  disabled.value = v$.value.$invalid;
});
</script>

<template>
  <div class="modal" id="paymentmodal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Payment/Withdraw</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <label for="amount">Amount: </label>
            <input
              v-model="props.myInput.amount"
              type="number"
              class="form-control"
              id="amount"
              min="0"
            />
            <div v-for="error in v$.amount.$errors" :key="error.$uid">
              <span class="test-error">{{ error.$message }}</span>
            </div>
          </div>
          <br>
          <div>
            <label for="currency">Currency: </label>
            <select class="form-select mb-3" id="currency" v-model="props.myInput.currency">
              <option>RSD</option>
              <option>EUR</option>
              <option>USD</option>
            </select>
            
            <div v-for="error in v$.currency.$errors" :key="error.$uid">
              <span class="test-error">{{ error.$message }}</span>
            </div>
            
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="paymentOrWithdraw()"
            id="action-button"
            :disabled="disabled"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
