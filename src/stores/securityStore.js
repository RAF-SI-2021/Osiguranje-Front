import { defineStore } from "pinia";
import { securitiesAPI } from "../api/securitiesAPI";

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
        getSecurities() {
            const response = securitiesAPI.getSecurities()
              .then((response) => {
                  this.setStock(response.data.stocks);
                  this.setForex(response.data.forex);
                  this.setFutures(response.data.futures);
              })
        }
    }
});