import axios from "axios";

export const contractAPI = {
  createContract: (contract) => {
    return axios.post("/api/otc/contracts", contract, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },

  addContractTransactionItem: (contractId, contractTransactionItem) => {
    return axios.post(`/api/otc/contracts/${contractId}/transaction-items`, contractTransactionItem, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  }
}