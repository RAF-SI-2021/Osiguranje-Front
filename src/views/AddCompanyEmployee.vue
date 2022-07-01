<script>
import { ref, reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import router from "@/router";
export default {
  setup() {
    const form = reactive({
      company: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyPosition: "",
      note: "",
    });
    const rules = computed(() => {
      return {
        company: { required },
        firstName: { required },
        lastName: { required },
        phoneNumber: { required },
        email: { required, email },
        companyPosition: { required },
      };
    });
    const v$ = useVuelidate(rules, form);
    const ok = ref(false);
    function onSubmit(evt) {
      this.v$.$validate();
      ok.value = false;
      if (!this.v$.$error) {
        ok.value = true;
        alert("Validacija prosla");
        console.log(form);
      } else {
        evt.preventDefault();
      }
      console.log(form);
    }

    return {
      form,
      v$,
      onSubmit,
    };
  },
};
</script>

<template>
  <br />
  <form @submit="onSubmit">
    <h1>Employee contact</h1>

    <fieldset>
      <label for="company">Company:</label>
      <select id="company" name="user_company">
        <optgroup label="Companies">
          <option>Company 1</option>
          <option>Company 2</option>
          <option>Company 3</option>
          <option>...</option>
        </optgroup>
      </select>

      <div class="row">
        <div
          class="input-errors"
          v-for="error of v$.firstName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label for="firstName" class="form-label">First Name</label>
          <input
            type="text"
            v-model="form.firstName"
            class="form-control"
            id="firstName"
          />
        </div>
      </div>

      <div class="row">
        <div
          class="input-errors"
          v-for="error of v$.lastName.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">Last Name</label>
          <input
            type="text"
            v-model="form.lastName"
            class="form-control"
            id="lastName"
          />
        </div>
      </div>

      <div class="row">
        <div
          class="input-errors"
          v-for="error of v$.phoneNumber.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Phone Number</label>
          <input
            type="text"
            v-model="form.phoneNumber"
            class="form-control"
            id="phoneNumber"
          />
        </div>
      </div>

      <div class="row">
        <div
          class="input-errors"
          v-for="error of v$.email.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="text"
            v-model="form.email"
            class="form-control"
            id="email"
          />
        </div>
      </div>

      <div class="row">
        <div
          class="input-errors"
          v-for="error of v$.companyPosition.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div class="mb-3">
          <label for="companyPosition" class="form-label"
            >Company Position</label
          >
          <input
            type="text"
            v-model="form.companyPosition"
            class="form-control"
            id="companyPosition"
          />
        </div>
      </div>

      <div class="row">
        <div class="mb-3">
          <label for="note" class="form-label">Note</label>
          <textarea
            type="text"
            v-model="form.note"
            class="form-control"
            id="note"
          >
          </textarea>
        </div>
      </div>

    </fieldset>

    <button type="submit">Submit</button>
  </form>

</template>


<style scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: "Nunito", sans-serif;
  color: #384047;
}

form {
  max-width: 300px;
  margin: 10px auto;
  padding: 10px 20px;
  background: #f4f7f8;
  border-radius: 8px;
}

h1 {
  margin: 0 0 30px 0;
  text-align: center;
}

input[type="text"],
input[type="password"],
input[type="date"],
input[type="datetime"],
input[type="email"],
input[type="number"],
input[type="search"],
input[type="tel"],
input[type="time"],
input[type="url"],
textarea,
select {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  height: auto;
  margin: 0;
  outline: 0;
  padding: 15px;
  width: 100%;
  background-color: #e8eeef;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}

input[type="radio"],
input[type="checkbox"] {
  margin: 0 4px 8px 0;
}

select {
  padding: 6px;
  height: 32px;
  border-radius: 2px;
}

button {
  padding: 19px 39px 18px 39px;
  color: #fff;
  background-color: #4bc970;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #3ac162;
  border-width: 1px 1px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  margin-bottom: 10px;
}

fieldset {
  margin-bottom: 30px;
  border: none;
}

legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
}

label.light {
  font-weight: 300;
  display: inline;
}

.number {
  background-color: #5fcf80;
  color: #fff;
  height: 30px;
  width: 30px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 4px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 100%;
}

@media screen and (min-width: 480px) {
  form {
    max-width: 480px;
  }
}

.error-msg {
  color: red;
}
</style> 