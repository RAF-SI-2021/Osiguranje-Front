<template>
    <div id="filter-stock-sidebar" class="container">
        <h3> Filters:</h3>
        <br>
        <div>
            <div v-if="actionsFlag">
            <h5> Stock market: </h5>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <vue3-simple-typeahead :items="stock_markets" :placeholder="options.stock_placeholder" @selectItem="selectItem" @onInput="onInput" @onBlur="onBlur" :minInputLength="options.minInputLength" />
                </div>
            <br>
            </div>
            
            <h5> Price: </h5>
            <div class="col-lg-8 col-md-8 col-sm-8">
                <Slider
                        v-model="value_price"
                        :min=0.00
                        :max=2000.00
                        :step=0.01
                        :format="format_price"
                        class="slider-grey"
                />
            </div>
            <br>
            <h5> Bid: </h5>
            <div class="col-lg-8 col-md-8 col-sm-8">
                <Slider
                        v-model="value_bid"
                        :min=0.00
                        :max=2000.00
                        :step=0.01
                        :format="format_price"
                />
            </div>
            <br>
            <h5> Ask: </h5>
            <div class="col-lg-8 col-md-8 col-sm-8">
                <Slider
                        v-model="value_ask"
                        :min=0.00
                        :max=2000.00
                        :step=0.01
                        :format="format_price"
                />
            </div>
            <br>
            <h5> Volume: </h5>
            <div class="col-lg-8 col-md-8 col-sm-8">
                <Slider
                        v-model="value_volume"
                        :min=0
                        :max=5000000
                />
            </div>
            <hr class="col-lg-8 col-md-8 col-sm-8">
            <div id="future_contracts" v-if="futureFlag">
                <h4>For future contracts: </h4>
                <br>
                <h5>Maintainance margin: </h5>
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <Slider
                            v-model="value_margin"
                            :min=0
                            :max=10000
                    />
                </div>
                <br>
                <h5>Settlement Date: </h5>
                <input type="date" class="form-control col-lg-6 col-md-6 col-sm-6" v-model="value_date" id="settlement_date">
            </div>
            <div>
                <button class="btn btn-primary mt-3" @click="filter">Apply Filters</button>
            </div>

        </div>
    </div>


</template>

<script>
    import Slider from '@vueform/slider'
    export default {
        components: {
            Slider,
        },
        created() {
            this.listFiltered = this.stock_markets;
            this.$emitter.on("filter-stock", (type) => {
                if (type == "futures") {
                    this.actionsFlag = false;
                    this.futureFlag = true;
                } else if (type == "stock") {
                    this.actionsFlag = true;
                    this.futureFlag = false;
                } else {
                    this.actionsFlag = false;
                    this.futureFlag = false;
                }
            });
        },
        data() {
            return {
                value_price: [0, 0],
                value_bid: [0, 0],
                value_ask: [0, 0],
                value_volume: [0, 0],
                value_margin: [0, 0],
                value_date: '',

                format_price: {
                   decimals: 2
                },
                options: {
                    stock_placeholder: 'Choose a stock',
                    minInputLength: 1,
                },
                stock_markets: [
                    'NYSE', 'NASDAQ'
                ],
                listFiltered: [],
                data: {
                    input: '',
                    selection: null,
                },
                futureFlag: false,
                actionsFlag: true,
            };
        },
        methods: {
            selectItem(item) {
                this.data.selection = item;
            },
            onInput(event) {
                this.data.selection = null;
                this.data.input = event.input;
                this.listFiltered = event.items;
            },
            onBlur(event) {
                this.data.input = event.input;
                this.listFiltered = event.items;
            },
            currentDate(){
                const current = new Date();
                const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
                return date;
            },
            filter() {
                this.$emitter.emit("apply-filter", {
                    price: this.value_price,
                    bid: this.value_bid,
                    ask: this.value_ask,
                    volume: this.value_volume,
                    futureFlag: this.futureFlag,
                    margin: this.value_margin,
                    date: this.value_date,
                    stockTerm: this.data.selection,
                });
            }
        },
    };
</script>
<style src="@vueform/slider/themes/default.css">
</style>
