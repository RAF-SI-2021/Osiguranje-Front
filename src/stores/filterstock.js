import {defineStore} from "pinia";

export const filterStockStore = defineStore('filterStockStore',{
    state: () =>{
        return {
            stock: this.data.selection,
            price: 0,
            bid: 0,
            ask: 0,
            volume: 0,
            margin: 0,
            settlement_date: this.currentDate
        }
    },
    actions:{
        setStock(value){
            this.stock= value;
        },
        setPrice(value){
            this.price=value;
        },
        setBid(value){
            this.bid = value;
        },
        setAsk(value){
            this.ask=value;
        },
        setVolume(value){
            this.volume=value;
        },
        setMargin(value){
            this.margin=value;
        },
        setSettlementDate(value){
            this.settlement_date = value;
        }
    }
})
