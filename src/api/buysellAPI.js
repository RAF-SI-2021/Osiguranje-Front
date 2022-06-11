import axios from "axios";

export const buysellAPI = {
  makeOrder(order) {
    return axios.post("/api/orders", order, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};
