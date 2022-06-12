import axios from "axios";

export const buysellAPI = {
  makeOrder(order) {
    return axios.post("/api/buying-market/orders", order, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};
