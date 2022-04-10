import { defineStore } from "pinia";

export const securityStore = defineStore("securityStore", {
    state: () => {
        return {
            stock: [],
            forex: [],
            futures: [],
        }
    },
    actions: {
        setStock(value) {
            this.stock = value;
        },
        setForex(value) {
            this.forex = value;
        },
        setFutures(value) {
            this.futures = value;
        },
    }
});