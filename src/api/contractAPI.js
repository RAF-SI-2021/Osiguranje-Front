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
  },

  getContracts: () => {
    return axios.get("/api/otc/contracts", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },

  getContractById: (contractId) => {
    return axios.get(`/api/otc/contracts/${contractId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  },

  finalizeContract: (contractId) => {
    return axios.post(`/api/otc/contracts/${contractId}/finalize`, {}, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  }
}