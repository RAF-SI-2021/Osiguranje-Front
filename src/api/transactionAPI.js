import axios from 'axios';

export const transactionAPI = {
  getBalance: () => {
    return axios.get('/api/account-transaction/balance/all', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  },

  getTransactionsByCurrency: (currencyId) => {
    return axios.get('/api/account-transaction/transaction/currency?currency=' + currencyId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    })
  },

  getTransactionsByOrder: (orderId) => {
    return axios.get(`/api/account-transaction/transaction/order?order=${orderId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }


}