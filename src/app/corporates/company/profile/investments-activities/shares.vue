<template>
    <div>
        <v-layout row wrap>
            <v-layout row v-for="(company, index) in type.items" :key="index">
                <v-flex xs10>
                    <v-layout row>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.name"
                                    label="Company name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.registration_number"
                                    label="Company registration number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.country"
                                    label="Company registration date"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <label>Company registered address</label>

                    <v-layout row>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.doorName"
                                    label="Door name"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.street"
                                    label="Street name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.zip"
                                    label="Post code"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.city"
                                    label="City"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <countries v-model="company.country" label="Country"></countries>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md2>
                            <v-select
                                    :items="companyActivities"
                                    v-model="company.activity"
                                    label="Company activity"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>
                        </v-flex>
                        <v-flex md2>
                            <v-text-field
                                    v-model="company.numberOfShares"
                                    label="Number of shares held"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-text-field
                                    v-model="company.ownership"
                                    label="% of ownership"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <v-text-field
                                    v-model="company.value"
                                    label="Value"
                            ></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <currencies v-model="company.currency" label="Currency"></currencies>
                        </v-flex>
                        <v-flex md3>
                            <v-checkbox
                                    v-model="company.owned"
                                    label="Tick if equity investment is already owned by the company"
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md8>
                            <span class="subheading">Are dividends expected from this investment?</span>
                        </v-flex>
                        <v-flex md4>
                            <yes-no v-model="company.dividends"></yes-no>
                        </v-flex>
                    </v-layout>
                    <v-layout row v-if="company.dividends">
                        <v-flex md4>
                            <v-text-field
                                    v-model="company.amount"
                                    label="Dividend amount"
                                    hide-details
                            ></v-text-field>
                        </v-flex>
                        <v-flex md2>
                            <currencies v-model="company.currency" label="Currency"></currencies>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex md8>
                            <span class="subheading">Are there plans to sell shares in this company? </span>
                        </v-flex>
                        <v-flex md4>
                            <yes-no v-model="company.plansToSell"></yes-no>
                        </v-flex>
                    </v-layout>
                    <v-layout row v-if="company.plansToSell">
                        <v-flex md2>
                            <v-text-field
                                    v-model="company.nameOfBuyer"
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
                                    v-model="company.reasonForSelling"
                            ></v-textarea>
                        </v-flex>
                        <v-flex md1>
                            <v-text-field
                                    v-model="company.plansToSellValue"
                                    label="Value"
                                    hide-details
                            ></v-text-field>
                        </v-flex>
                        <v-flex md1>
                            <currencies v-model="company.plansToSellCurrency" label="Currency"></currencies>
                        </v-flex>

                        <v-flex md2>
                            <countries v-model="company.buyerCountry" label="Buyer country"></countries>
                        </v-flex>

                        <v-flex md2>
                            <v-select
                                    v-model="company.methodOfPayment"
                                    label="Method of payment"
                                    :items="paymentMethods"
                                    item-text="name"
                                    item-value="id"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex md2 class="text-xs-right">
                    <v-btn fab dark small color="primary" @click="addCompany" v-if="index === 0">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="danger" v-if="type.items.length >= 2" @click="removeCompany(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-layout>

        <questions-list :section="sectionType" :data="type" v-if="sectionType"></questions-list>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Vue from 'vue';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    import * as corporateService from '@/app/corporates/service';

    export default {
        props: ['type'],

        data() {
            return {
                sectionType: corporateService.SECTION_SHARES_IN_COMPANIES,
            }
        },

        computed: {
            ...mapGetters({
                paymentMethods: 'settings/corporate_payment_methods',
                companyActivities: 'settings/company_activities',
                sectionTypes: 'settings/corporateSections',
            }),
            companyStructure() {
                return {
                    currency: 'EUR',
                    methodOfPayment: this.defaultPaymentMethod ? this.defaultPaymentMethod.id : null,
                }
            }
        },

        mounted() {
            if(!this.type.items.length) {
                this.addCompany()
            }
        },

        methods: {
            addCompany() {
                this.type.items.unshift(JSON.parse(JSON.stringify(this.companyStructure)))
            },

            removeCompany(index) {
                this.type.items.splice(index, 1)
            }
        },
        components: {QuestionsList}
    }
</script>