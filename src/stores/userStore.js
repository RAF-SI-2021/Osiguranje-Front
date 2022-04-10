import { defineStore } from 'pinia';

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            user: {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                phoneNumber: '',
                active: false,
                permissions: {
                    stockTrading: false,
                    stockOverview: false,
                    contractConclusion: false,
                    admin: false
                }
            }
        }
    },
    actions: {
        setUser(value) {
            this.user = value;
        }
    }
});