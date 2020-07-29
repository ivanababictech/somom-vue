<template>
    <div>
        <v-layout row wrap v-for="(cryptocurrency, index) in type.items" :key="index">
            <v-flex xs10>
                <v-layout row>
                    <v-flex md2>
                        <v-autocomplete
                                v-model="cryptocurrency.name"
                                :items="cryptocurrencies"
                                label="Currency name"
                                item-text="name"
                                item-value="code"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md2>
                        <v-autocomplete
                                v-model="cryptocurrency.exchange"
                                :items="exchanges"
                                @change="locationChanged(cryptocurrency, $event)"
                                label="Exchange name"
                                item-text="name"
                                item-value="code"
                                return-object
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md2>
                        <v-autocomplete
                                v-model="cryptocurrency.location"
                                :items="cryptocurrency.exchange.countries"
                                label="Location of exchange"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model="cryptocurrency.amount"
                                label="Fiat amount"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md1>
                        <currencies v-model="cryptocurrency.currency" label="Currency"></currencies>
                    </v-flex>
                    <v-flex md3>
                        <v-checkbox v-model="cryptocurrency.owned">
                            <div slot="label"><i>Tick if the crptyocurrency is already owned by the company</i></div>
                        </v-checkbox>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 md4>
                        <span class="subheading">Will this crptyocurrency generate any income?</span>
                    </v-flex>
                    <v-flex xs12 md3>
                        <yes-no v-model="cryptocurrency.income"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="cryptocurrency.income">
                    <v-flex md6>
                        <v-textarea
                                v-model="cryptocurrency.incomeDescription"
                                label="Income description"
                                auto-grow
                                rows="1"
                                hide-details
                        ></v-textarea>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field
                                v-model="cryptocurrency.incomeAmount"
                                label="Income amount"
                                hide-details
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <currencies v-model="cryptocurrency.incomeCurrency" label="Currency"></currencies>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 md4>
                        <span class="subheading">Are there plans to sell this cryptocurrency? </span>
                    </v-flex>
                    <v-flex xs12 md3>
                        <yes-no v-model="cryptocurrency.plansToSell"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="cryptocurrency.plansToSell">
                    <v-flex md2>
                        <v-autocomplete
                                v-model="cryptocurrency.name"
                                :items="cryptocurrencies"
                                label="Currency name"
                                item-text="name"
                                item-value="code"
                                disabled
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md2>
                        <v-autocomplete
                                v-model="cryptocurrency.exchange"
                                :items="exchanges"
                                label="Exchange name"
                                item-text="name"
                                item-value="code"
                                return-object
                                disabled
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md2>
                        <v-autocomplete
                                v-model="cryptocurrency.location"
                                :items="cryptocurrency.exchange.countries"
                                label="Location of exchange"
                                disabled
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model="cryptocurrency.plansToSellFiatAmount"
                                label="Fiat amount"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md1>
                        <currencies v-model="cryptocurrency.plansToSellCurrency" label="Currency"></currencies>
                    </v-flex>
                    <v-flex md2>
                        <v-select
                                v-model="cryptocurrency.methodOfPayment"
                                label="Method of payment"
                                :items="paymentMethods"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex md2 class="text-xs-right">
                <v-btn fab dark small color="primary" @click="addCryptocurrency" v-if="index === 0">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="danger" v-if="type.items.length > 1" @click="removeCryptocurrency(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <questions-list :section="sectionType" :data="type" v-if="sectionType"></questions-list>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    const cryptocurrencies = require('cryptocurrencies/cryptocurrencies.json');

    const cryptocurrencyList = Object.keys(cryptocurrencies).map(code => {
        return {
            name: cryptocurrencies[code],
            code: code,
        }
    })

    const ccxt = require ('ccxt');
    const countries = require('ccxt/countries');

    let exchanges = {}

    ccxt.exchanges.forEach (id => { exchanges[id] = new (ccxt)[id] () })

    const countryName = (code) => {
        return ((countries[code] !== undefined) ? countries[code] : code)
    }

    // get exchange list with countries
    const exchangeList = (Object.values(exchanges).map (exchange => {
        let countries = Array.isArray (exchange.countries) ?
            exchange.countries.map (countryName):
            countryName (exchange.countries)

        return ({
            id: exchange.id,
            name: exchange.name,
            countries: countries,
        })

    }))

    export default {
        data() {
            return {
                cryptocurrencyStructure: {
                    name: '',
                    exchange: {},
                    exchange_name: null,
                    amount: 0,
                    income: null,
                    location: [],
                    currency: 'EUR',
                    plansToSellCurrency: 'EUR',
                    plansToSellFiatAmount: 0,
                },
                cryptocurrencies: cryptocurrencyList,
                exchanges: exchangeList,
            }
        },

        computed: {
            ...mapGetters({
                'paymentMethods': 'settings/corporate_payment_methods',
            }),
        },

        props: ['type', 'sectionType'],

        mounted() {
            if(!this.type.items.length) {
                this.addCryptocurrency()
            }
        },

        methods: {
            addCryptocurrency() {
                this.type.items.unshift(JSON.parse(JSON.stringify(this.cryptocurrencyStructure)))
            },

            removeCryptocurrency(index) {
                this.type.items.splice(index, 1)
            },

            locationChanged(cryptocurrency, $event) {
                const countries = cryptocurrency.exchange.countries

                cryptocurrency.location = countries && countries.length ? countries[0] : null
            }
        },

        components: {QuestionsList}
    }
</script>