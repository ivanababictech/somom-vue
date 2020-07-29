<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            A. Revenue
            <questions-create :section="section"></questions-create>
        </div>

        <v-layout row>
            <v-flex md8>
                <span class="subheading">Will the company generate revenue?</span>
                <yes-no v-model="revenue.generate"></yes-no>
            </v-flex>
        </v-layout>

        <template v-if="revenue.generate">
            <label>Select customer type</label>
            <v-btn :color="customerTypeIsB2C ? 'primary' : ''" @click="setCustomerType('b2c')">B2C</v-btn>
            <v-btn :color="customerTypeIsB2B ? 'primary' : ''" @click="setCustomerType('b2b')">B2B</v-btn>
            <v-btn :color="customerTypeIsBoth ? 'primary' : ''" @click="setCustomerType('both')">BOTH</v-btn>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                            v-model.number="revenue.saleInMalta"
                            type="number"
                            label="Sales in Malta"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                            v-model.number="revenue.saleWithinEu"
                            type="number"
                            label="Sales within EU"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                            v-model.number="revenue.saleOutsideMalta"
                            type="number"
                            label="Sales outside EU"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3>
                    <v-text-field
                            :value="formatMoney(formatToInteger(totalSales), 0, 3)"
                            label="Total sales"
                            disabled
                    ></v-text-field>
                </v-flex>

            </v-layout>

            <v-flex xs12 v-if="customerTypeIsB2C">
                <span class="subheading">B2C</span>
            </v-flex>
            <v-layout row wrap v-for="(product, index) in revenue.b2cProducts" :key="'b2cProduct' + index" v-if="customerTypeIsB2C">
                <v-flex xs11>
                    <v-layout row>
                        <v-flex xs12 sm6 md2>
                            <v-select
                                    v-model="product.type"
                                    label="Select type"
                                    :items="corporateRevenueTypes"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-textarea
                                    v-model="product.name"
                                    label="Service name or product name"
                                    :items="[]"
                                    auto-grow
                                    rows="1"
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <countries v-model="product.countries" label="Countries sold" :multiple="true"></countries>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-text-field
                                    v-model="product.estimatedSales"
                                    label="Estimated sales"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <currencies v-model="product.currencies"></currencies>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-select
                                    v-model="product.methodOfPayment"
                                    label="Method of payment"
                                    :items="paymentMethods"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex md1 class="text-xs-right">

                    <v-btn fab dark small color="primary" v-if="index === 0" @click="addB2CProduct">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="danger" v-if="revenue.b2cProducts.length > 1" @click="removeB2CProduct(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>

            <v-flex xs12 v-if="customerTypeIsB2B">
                <span class="subheading">B2B</span>
            </v-flex>
            <v-layout row wrap v-for="(product, index) in revenue.b2bProducts" :key="'b2bProduct' + index" v-if="customerTypeIsB2B">
                <v-flex xs11>
                    <v-layout row>
                        <v-flex xs12 sm6 md2>
                            <v-select
                                    v-model="product.type"
                                    label="Select type"
                                    :items="corporateRevenueTypes"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-combobox
                                    :items="customers(revenue.b2bProducts)"
                                    :value="product.customerName"
                                    @input="customerChanged(product, $event)"
                                    item-text="customerName"
                                    item-value="customerName"
                                    label="Customer name"
                            ></v-combobox>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-text-field
                                    v-model="product.name"
                                    label="Service name or product name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <countries v-model="product.country" label="Country"></countries>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-text-field v-model="product.estimatedSales" label="Estimated sales"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md1>
                            <currencies v-model="product.currencies"></currencies>
                        </v-flex>
                        <v-flex xs12 sm6 md2>
                            <v-select
                                    v-model="product.methodOfPayment"
                                    label="Method of payment"
                                    :items="paymentMethods"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex md1 class="text-xs-right">

                    <v-btn fab dark small color="primary" v-if="index === 0" @click="addB2BProduct">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="danger" v-if="revenue.b2bProducts.length > 1" @click="removeB2BProduct(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>

            <questions-list :section="section" :data="revenue"></questions-list>
        </template>
    </v-container>
</template>

<script>
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                section: 'Revenue'
            }
        },

        props: [
            'revenue',
            'activities'
        ],

        computed: {
            ...mapGetters({
                'corporateRevenueTypes': 'settings/corporateRevenueTypes',
                'corporateTypes': 'settings/corporateTypes',
                'paymentMethods': 'settings/corporate_payment_methods',
                'defaultPaymentMethod': 'settings/corporate_default_payment_method'
            }),
            b2cProductStructure() {
                return {
                    type: null,
                    name: null,
                    countries: [],
                    estimatedSales: null,
                    currencies: 'EUR',
                    methodOfPayment: this.defaultPaymentMethod ? this.defaultPaymentMethod.id : null,
                }
            },

            b2bProductStructure() {
                return {
                    type: null,
                    customerName: null,
                    name: null,
                    estimatedSales: null,
                    currencies: 'EUR',
                    methodOfPayment: this.defaultPaymentMethod ? this.defaultPaymentMethod.id : null,
                }
            },

            customerTypeIsB2C() {
                return ['b2c','both'].indexOf(this.revenue.customerType) !== -1
            },

            customerTypeIsB2B() {
                return ['b2b','both'].indexOf(this.revenue.customerType) !== -1
            },

            customerTypeIsBoth() {
                return this.revenue.customerType === 'both'
            },
            totalSales() {
                return parseFloat(this.revenue.saleInMalta || 0) + parseFloat(this.revenue.saleWithinEu || 0) + parseFloat(this.revenue.saleOutsideMalta || 0)
            }
        },

        methods: {
            setCustomerType(type) {
                switch (type) {
                    case 'b2c':
                        this.revenue.b2bProducts = []
                        this.addB2CProduct()

                        break;

                    case 'b2b':
                        this.revenue.b2cProducts = []
                        this.addB2BProduct()

                        break;

                    case 'both':
                        this.revenue.b2bProducts = []
                        this.revenue.b2cProducts = []
                        this.addB2CProduct()
                        this.addB2BProduct()

                        break;
                }

                this.revenue.customerType = type
            },

            addB2CProduct() {
                this.revenue.b2cProducts.unshift(JSON.parse(JSON.stringify(this.b2cProductStructure)))
            },

            removeB2CProduct(index) {
                this.revenue.b2cProducts.splice(index, 1)
            },

            addB2BProduct() {
                this.revenue.b2bProducts.unshift(JSON.parse(JSON.stringify(this.b2bProductStructure)))
            },

            removeB2BProduct(index) {
                this.revenue.b2bProducts.splice(index, 1)
            },

            customerChanged(product, $event) {
                if (typeof $event === 'string') {
                    product.customerName= $event
                }
                if (typeof $event === 'object') {
                    product.customerName = $event.customerName
                    product.countries = $event.countries
                }
            },

            customers(products) {
                return products.filter(product => product.customerName)
            },
        },

        components: {QuestionsList, QuestionsCreate}
    }
</script>