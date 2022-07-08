import axios from "axios";

export const ordersAPI = {
  getAllOrders() {
    return axios.get("/api/buyingmarket/orders", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  }
};