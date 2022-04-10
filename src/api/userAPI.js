import axios from 'axios';

export const userAPI = {
    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (token) {
            return axios.get('/api/currentUser', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    },

    getAllUsers: () => {
        const token = localStorage.getItem('token');
        if (token) {
            return axios.get('/api/user/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    },

    createNewUser: (user) => {
        const token = localStorage.getItem('token');
        if (token) {
            return axios.post('/api/user', user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    },

    updateUser: (user) => {
        const token = localStorage.getItem('token');
        if (token) {
            return axios.put('/api/user', user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    }
}