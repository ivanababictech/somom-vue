<template>
    <div>
        <v-layout row wrap v-for="(seller, index) in sellers" :key="index">
            <v-flex xs10>
                <v-layout row>
                    <v-flex md3>
                        <v-textarea
                                v-model="seller.name"
                                label="Name of seller / supplier"
                                auto-grow
                                rows="1"
                        ></v-textarea>
                    </v-flex>
                    <v-flex md3>
                        <v-textarea
                                v-model="seller.description"
                                :label="description"
                                auto-grow
                                rows="1"
                        ></v-textarea>
                    </v-flex>
                    <v-flex md1>
                        <v-text-field
                                v-model="seller.value"
                                label="Value"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md1>
                        <currencies v-model="seller.currency" label="Currency"></currencies>
                    </v-flex>
                    <v-flex md2>
                        <countries v-model="seller.location" label="Seller country"></countries>
                    </v-flex>
                    <v-flex md3>
                        <v-checkbox v-model="seller.owned">
                            <div slot="label"><i>{{ ownedText }}</i></div>
                        </v-checkbox>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex md8>
                        <span class="subheading">{{ incomeText }}</span>
                    </v-flex>
                    <v-flex md4>
                        <yes-no v-model="seller.income" @input="incomeChanged(seller)"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-if="seller.income"
                          v-for="(customer, index) in seller.customers" :key="'customer' + index">
                    <v-flex xs10>
                        <v-layout row>
                            <v-flex md3>
                                <v-text-field
                                        v-model="customer.name"
                                        label="Customer name"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md3>
                                <countries v-model="customer.incomeCustomerLocation" label="Customer country"></countries>
                            </v-flex>
                            <v-flex md4>
                                <v-textarea
                                        label="Income description"
                                        auto-grow
                                        rows="1"
                                        v-model="customer.description"
                                ></v-textarea>
                            </v-flex>
                            <v-flex md2>
                                <v-text-field
                                        v-model="customer.amount"
                                        label="Income amount"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md2>
                                <currencies v-model="customer.currency" label="Currency"></currencies>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex md2 class="text-xs-right">
                        <v-btn fab dark small color="primary" @click="addCustomer(seller)" v-if="index === 0">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <v-icon dark>remove</v-icon>
                        <v-btn fab dark small color="danger" v-if="seller.customers.length > 1" @click="removeCustomer(seller, index)">
                            <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex md8>
                        <span class="subheading">{{ plansToSellText }}</span>
                    </v-flex>
                    <v-flex md4>
                        <yes-no v-model="seller.plansToSell" @input="plansToSellChanged(seller)"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-if="seller.plansToSell"
                          v-for="(buyer, index) in seller.buyers" :key="'buyer' + index">
                    <v-flex xs10>
                        <v-layout row>
                            <v-flex md2>
                                <v-text-field
                                        v-model="buyer.name"
                                        label="Name of buyer"
                                        hide-details
                                ></v-text-field>
                            </v-flex>
                            <v-flex md4>
                                <v-textarea
                                        label="Reason for selling"
                                        auto-grow
                                        rows="1"
                                        hide-details
                                        v-model="buyer.reason"
                                ></v-textarea>
                            </v-flex>
                            <v-flex md1>
                                <v-text-field
                                        v-model="buyer.amount"
                                        label="Sale amount"
                                        hide-details
                                ></v-text-field>
                            </v-flex>
                            <v-flex md1>
                                <currencies v-model="buyer.currency" label="Currency"></currencies>
                            </v-flex>

                            <v-flex md2>
                                <countries v-model="buyer.country" label="Buyer country"></countries>
                            </v-flex>

                            <v-flex md2>
                                <v-select
                                        v-model="buyer.methodOfPayment"
                                        label="Method of payment"
                                        :items="paymentMethods"
                                        item-text="name"
                                        item-value="id"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex md2 class="text-xs-right">
                        <v-btn fab dark small color="primary" @click="addBuyer(buyer)" v-if="index === 0">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <v-icon dark>remove</v-icon>
                        <v-btn fab dark small color="danger" v-if="seller.buyers.length > 1" @click="removeBuyer(buyer, index)">
                            <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex md2 class="text-xs-right">
                <v-btn fab dark small color="primary" @click="addAsset" v-if="index === 0">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="danger" v-if="sellers.length > 1" @click="removeAsset(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <questions-list :section="sectionType" :data="data" v-if="sectionType"></questions-list>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'

    export default {
        data() {
            return {
                sellerStructure: {
                    name: null,
                    currency: 'EUR',
                    location: [],
                    customers: [],
                    buyers: [],
                },
                customerStructure: {
                    name: null,
                    description: null,
                    amount: null,
                    currency: 'EUR',
                },
            }
        },

        props: ['sectionType', 'data', 'sellers', 'description', 'incomeText', 'plansToSellText', 'ownedText'],

        computed: {
            ...mapGetters({
                paymentMethods: 'settings/corporate_payment_methods',
                defaultPaymentMethod: 'settings/corporate_default_payment_method'
            }),

            buyerStructure() {
                return {
                    name: null,
                    reason: null,
                    amount: null,
                    currency: 'EUR',
                    country: '',
                    methodOfPayment: this.defaultPaymentMethod ? this.defaultPaymentMethod.id : null,
                }
            }
        },

        mounted() {
            if(!this.sellers.length) {
                this.addAsset()
            }
        },
        
        methods: {
            addAsset() {
                this.sellers.unshift(JSON.parse(JSON.stringify(this.sellerStructure)))
            },

            removeAsset(index) {
                this.sellers.splice(index, 1)
            },

            addCustomer(seller) {
                seller.customers.unshift(JSON.parse(JSON.stringify(this.customerStructure)))
            },

            removeCustomer(seller, index) {
                seller.customers.splice(index, 1)
            },

            addBuyer(seller) {
                seller.buyers.unshift(JSON.parse(JSON.stringify(this.buyerStructure)))
            },

            removeBuyer(seller, index) {
                seller.buyers.splice(index, 1)
            },

            incomeChanged(seller) {
                if(seller.income) {
                    this.addCustomer(seller)
                } else {
                    seller.customers = []
                }
            },

            plansToSellChanged(seller) {
                if(seller.plansToSell) {
                    this.addBuyer(seller)
                } else {
                    seller.buyers = []
                }
            },
        },

        components: {QuestionsList}
    }
</script>

<style scoped>

</style>