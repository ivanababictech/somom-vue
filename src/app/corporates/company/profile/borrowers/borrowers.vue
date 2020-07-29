<template>
    <v-layout row wrap>
        <v-layout row v-for="(borrower, index) in borrowers.items" :key="index">
            <v-flex xs10>
                <v-layout>
                    <v-flex xs2>
                        <v-select
                                :items="corporateBorrowerTypes"
                                v-model="borrower.type"
                                label="Borrowing type"
                                item-text="name"
                                item-value="id"
                        ></v-select>
                    </v-flex>
                    <v-flex md3>
                        <v-text-field
                                v-model="borrower.name"
                                label="Name of lender"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model="borrower.amount"
                                label="Enter amount"
                        ></v-text-field>
                    </v-flex>
                    <v-flex md1>
                        <currencies v-model="borrower.currency" label="Currency"></currencies>
                    </v-flex>
                    <v-flex md2>
                        <countries v-model="borrower.location" label="Location of borrower" :multiple="true"></countries>
                    </v-flex>
                    <v-flex md2>
                        <v-checkbox v-model="borrower.borrowed" label="Already borrowed such funds"></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 md12>
                        <v-textarea
                                label="Reason for borrowing funds"
                                auto-grow
                                multi-line
                                rows="1"
                                hide-details
                                v-model="borrower.borrowingFunds"
                        ></v-textarea>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs3>
                        <span class="subheading">Are there any interest payable?</span>
                    </v-flex>
                    <v-flex xs4>
                        <yes-no v-model="borrower.interest"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="borrower.interest">
                    <v-flex md2>
                        <v-text-field
                                v-model="borrower.interestRate"
                                label="Interest rate"
                        ></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-btn :color="borrower.interestType == 'paid' ? 'primary' : ''"
                               @click="borrower.interestType = 'paid'">
                            Interest will be paid
                        </v-btn>
                        <v-btn :color="borrower.interestType == 'accrue' ? 'primary' : ''"
                               @click="borrower.interestType = 'accrue'">
                            Interest will accrue to capital
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs3>
                        <span class="subheading">Will there be any capital repayments?</span>
                    </v-flex>
                    <v-flex xs4>
                        <yes-no v-model="borrower.capitalRepayments"></yes-no>
                    </v-flex>
                </v-layout>
                <v-layout row v-if="borrower.capitalRepayments">
                    <v-flex md3>
                        <v-text-field
                                v-model="borrower.amountRepaid"
                                label="Amount repaid by lender"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex md2>
                <v-flex xs12 class="text-xs-right">
                    <v-btn fab dark small color="primary" @click="addBorrower" v-if="index === 0">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="danger" v-if="borrowers.items.length > 1"
                           @click="removeBorrower(index)">
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
                defaultStructure: {
                    id: uuidv4(),
                    type: null,
                    name: null,
                    amount: null,
                    borrowed: null,
                    interestType: null,
                    files: [],
                }
            }
        },

        props: {
            borrowers: {
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

            corporateBorrowerTypes() {
                return this.corporateTypes.filter(corporateType => corporateType.section === corporateService.SECTION_BORROWING_ACTIVITIES);
            },
        },

        mounted() {
            if (! this.borrowers.items.length) {
                this.addBorrower();
            }
        },

        methods: {
            addBorrower() {
                this.defaultStructure.id = uuidv4()

                this.borrowers.items.unshift(JSON.parse(JSON.stringify(this.defaultStructure)));
            },

            removeBorrower(index) {
                this.borrowers.items.splice(index, 1)
            },
        },
    }
</script>

<style scoped>

</style>