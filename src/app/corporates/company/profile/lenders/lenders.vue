<template>
    <v-layout row wrap>
        <v-layout row v-for="(lender, index) in lenders.items" :key="index">
            <v-flex xs10>
                <v-layout>
                    <v-flex xs2>
                        <v-select
                                :items="corporateLenderTypes"
                                v-model="lender.type"
                                label="Lending type"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                    <v-flex md3>
                        <v-text-field
                                v-model="lender.name"
                                label="Name of borrower"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model="lender.amount"
                                label="Enter amount"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md1>
                        <currencies v-model="lender.currency" label="Currency"></currencies>
                    </v-flex>
                    <v-flex md2>
                        <countries v-model="lender.location" label="Location of lender"
                                   :multiple="true"></countries>
                    </v-flex>
                    <v-flex md2>
                        <v-checkbox v-model="lender.lent" label="Already lent such funds"></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 md12>
                        <v-textarea label="Reason for lending funds"
                                    auto-grow
                                    multi-line
                                    rows="1"
                                    hide-details
                                    v-model="lender.lendingFunds"></v-textarea>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs3>
                        <span class="subheading">Are there any interest payable?</span>
                    </v-flex>
                    <v-flex xs4>
                        <yes-no v-model="lender.interest"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="lender.interest">
                    <v-flex md2>
                        <v-text-field
                                v-model="lender.interestRate"
                                label="Interest rate"
                        ></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-btn :color="lender.interestType == 'paid'? 'primary' : ''"
                               @click="lender.interestType = 'paid'">
                            Interest will be paid
                        </v-btn>
                        <v-btn :color="lender.interestType == 'accrue' ? 'primary' : ''"
                               @click="lender.interestType = 'accrue'">
                            Interest will accrue to capital
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs3>
                        <span class="subheading">Will there be any capital repayments?</span>
                    </v-flex>
                    <v-flex xs4>
                        <yes-no v-model="lender.capitalRepayments"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="lender.capitalRepayments">
                    <v-flex md3>
                        <v-text-field
                                v-model="lender.amountRepaid"
                                label="Amount repaid by lender"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex md2>
                <v-flex xs12 class="text-xs-right">
                    <v-btn fab dark small color="primary" @click="addLender" v-if="index === 0">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="danger" v-if="lenders.items.length > 1"
                           @click="removeLender(index)">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as corporateService from '@/app/corporates/service';

    const uuidv4  = require('uuid/v4');

    export default {
        data() {
            return {
                sectionType: corporateService.SECTION_LENDING_ACTIVITIES,
                defaultStructure: {
                    id: uuidv4(),
                    type: null,
                    name: null,
                    amount: null,
                    borrowed: null,
                    interestType: null
                }
            }
        },


        props: {
            lenders: {
                type: Object,
                default: {}
            },
            suspense: {
                type: Boolean,
                default: false
            },
        },

        computed: {
            ...mapGetters({
                'corporateTypes': 'settings/corporateTypes',
            }),

            corporateLenderTypes() {
                return this.corporateTypes.filter(corporateType => corporateType.section === this.sectionType);
            },
        },
        mounted() {
            if (! this.lenders.items.length) {
                this.addLender();
            }
        },

        methods: {
            addLender() {
                this.defaultStructure.id = uuidv4();

                this.lenders.items.unshift(JSON.parse(JSON.stringify(this.defaultStructure)));
            },

            removeLender(index) {
                this.lenders.items.splice(index, 1)
            },
        }
    }
</script>

<style scoped>

</style>