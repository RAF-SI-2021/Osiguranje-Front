import axios from 'axios';

export const authAPI = {
    login(email, password) {
        return axios.post("/api/login", {
            username: email,
            password: password
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    }
}