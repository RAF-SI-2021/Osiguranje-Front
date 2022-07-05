import axios from 'axios';

export const securitiesAPI = {
    getSecurities: () => {
        return axios.get('/api/securities/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            timeout: 5000
        });
    },

    getCurrency: (id) => {
        return axios.get('/api/securities/data/currency/' + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}