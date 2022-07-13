import axios from "axios";

export const ordersAPI = {
  getAllOrders() {
    return axios.get("/api/buyingmarket/orders/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },

  getOrdersForCurrentAgent() {
    return axios.get(`/api/buyingmarket/orders/user`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
  }
};