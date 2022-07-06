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
    return axios.put(`/api/buyingmarket/orders/${id}`, {}, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  },

  declineOrder(id) {
    return axios.delete(`/api/buyingmarket/orders/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  }
};
