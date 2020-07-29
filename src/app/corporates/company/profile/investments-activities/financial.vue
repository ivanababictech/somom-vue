<template>
    <div>
        <v-layout row wrap v-for="(asset, index) in type.items" :key="index">
            <v-flex xs10>
                <v-layout>
                    <v-flex md4>
                        <v-select
                                :items="corporateFinancialTypes"
                                v-model="asset.type"
                                label="Type"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                            v-model="asset.name"
                            label="Broker name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <countries v-model="asset.location" label="Location of broker"></countries>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model="asset.value"
                                label="Value"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <currencies v-model="asset.currency" label="Currency"></currencies>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 md4>
                        <span class="subheading">Will this financial asset generate any income?</span>
                    </v-flex>
                    <v-flex xs12 md3>
                        <yes-no v-model="asset.income"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="asset.income">
                    <v-flex md6>
                        <v-textarea
                                label="Income description"
                                auto-grow
                                rows="1"
                                hide-details
                                v-model="asset.incomeDescription"
                        ></v-textarea>
                    </v-flex>
                    <v-flex md4>
                        <v-text-field
                                v-model="asset.incomeAmount"
                                label="Income amount"
                                hide-details
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <currencies v-model="asset.incomeCurrency" label="Currency"></currencies>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 md4>
                        <span class="subheading">Are there plans to sell this financial asset? </span>
                    </v-flex>
                    <v-flex xs12 md3>
                        <yes-no v-model="asset.plansToSell"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="asset.plansToSell">
                    <v-flex md2>
                        <v-select
                                :items="corporateFinancialTypes"
                                v-model="asset.plansToSellType"
                                label="Type"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model="asset.brokerName"
                                label="Broker name"
                                disabled
                        ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                        <countries v-model="asset.location" label="Location of broker" disabled></countries>
                    </v-flex>
                    <v-flex md1>
                        <v-text-field
                                v-model="asset.plansToSellAmount"
                                label="Amount"
                                hide-details
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <v-select
                                v-model="asset.methodOfPayment"
                                label="Method of payment"
                                :items="paymentMethods"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex md2 class="text-xs-right">
                <v-btn fab dark small color="primary" @click="addAsset" v-if="index === 0">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="danger" v-if="type.items.length > 1" @click="removeAsset(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>

        <questions-list :section="sectionType" :data="type" v-if="sectionType"></questions-list>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as corporateService from '@/app/corporates/service';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    
    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_FINANCIAL_ASSETS,
            }
        },

        props: ['type'],

        computed: {
            ...mapGetters({
                'corporateTypes': 'settings/corporateTypes',
                'paymentMethods': 'settings/corporate_payment_methods',
                'defaultPaymentMethod': 'settings/corporate_default_payment_method'
            }),

            assetStructure() {
                return {
                    name: '',
                    value: null,
                    income: null,
                    location: [],
                    methodOfPayment: this.defaultPaymentMethod ? this.defaultPaymentMethod.id : null,
                }
            },

            corporateFinancialTypes() {
                return this.corporateTypes.filter(corporateType => corporateType.section === this.sectionType);
            },
        },

        mounted() {
            if(!this.type.items.length) {
                this.addAsset()
            }
        },

        methods: {
            addAsset() {
                this.type.items.unshift(JSON.parse(JSON.stringify(this.assetStructure)))
            },

            removeAsset(index) {
                this.type.items.splice(index, 1)
            }
        },
        components: {QuestionsList}
    }
</script>