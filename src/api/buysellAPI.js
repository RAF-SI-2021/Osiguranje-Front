import axios from "axios";

export const buysellAPI = {
  makeOrder(order) {
    return axios.post("/api/buyingmarket/orders", order, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  approveOrder(id) {
    return axios.put(`/api/buyingmarket/orders/${id}`, "APPROVED", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      }
    })
  },

  declineOrder(id) {
    return axios.put(`/api/buyingmarket/orders/${id}`, "DECLINED", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      }
    })
  }
};
