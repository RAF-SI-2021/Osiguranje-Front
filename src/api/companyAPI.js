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


  addCompanyEmployeeContact: (companyId, employee) => {
    return axios.post(`/api/otc/companies/${companyId}/employees`, employee, {
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
  },

  getCompanyById: (companyId) => {
    return axios.get(`/api/otc/companies/${companyId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  },

  deleteEmployee: (companyId, employeeId) => {
    return axios.delete(`/api/otc/companies/${companyId}/employees/${employeeId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  },

  deleteBankAccount: (companyId, bankAccountId) => {
    return axios.delete(`/api/otc/companies/${companyId}/bank-accounts/${bankAccountId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  },

  updateCompany: (company) => {
    return axios.put(`/api/otc/companies`, company, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
  }
}