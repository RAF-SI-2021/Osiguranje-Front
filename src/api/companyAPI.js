import axios from "axios";

export const companyAPI = {
  getCompanies: () => {
    return axios.get("/api/otc/companies", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  },

  addCompanyBankAccount: (companyId, bankAccount) => {
    return axios.post(`/api/otc/companies/${companyId}/bank-accounts`, bankAccount, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  },
  createNewCompany: (company) => {
    return axios.post("/api/otc/companies/", company, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  }
}