import axios from 'axios';

export const securitiesAPI = {
    getSecurities: () => {
        return axios.get('/api/securities/data', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
}