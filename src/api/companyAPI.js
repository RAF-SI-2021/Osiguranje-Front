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

  searchCompanies: (searchObject) => {
    let { name, registrationID, taxID } = searchObject;
    let url = '/api/otc/companies?';
    if (name) {
      url += `name=${name}&`;
    }
    if (registrationID) {
      url += `registrationID=${registrationID}&`;
    }
    if (taxID) {
      url += `taxID=${taxID}&`;
    }
    return axios.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  }
}