import axios from 'axios';

export const transactionAPI = {
  getBalance: () => {
    return axios.get('http://localhost:8093/api/balance/all', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}