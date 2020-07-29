<template>
    <v-dialog v-model="request.showAllocationsData" scrollable>
        <v-card>
            <v-toolbar color="accent">
                <v-icon @click="close">close</v-icon>
                <v-toolbar-title>Add new allocation data - {{ entry.allocation_type }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save()">Save</v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 600px;" v-if="request.data.allocations">
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="primary">access_time</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ entry.date }}</v-list-tile-title>
                                        <v-list-tile-sub-title>bank entry date</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs4>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="primary">money</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ entry.amount }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Entry amount</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <v-flex xs4>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="primary">description</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ entry.description }}</v-list-tile-title>
                                        <v-list-tile-sub-title>Description</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                    </v-layout>
                    <v-divider class="my-4"></v-divider>
                    <borrowers :borrowers="request.data.allocations.profile.borrowers" v-if="isBorrowingActivities(entry.allocation_type)"></borrowers>
                    <lenders :lenders="request.data.allocations.profile.lenders" v-if="isLendingActivities(entry.allocation_type)" @added="addedItem"></lenders>
                    <payroll :payroll="request.data.allocations.profile.trading.payroll" v-if="isPayroll(entry.allocation_type)"></payroll>
                    <cost-of-sales :section="request.data.allocations.profile.trading.costOfSales" estimatedLabel="Estimated COS"
                                   v-if="isCostOfSales(entry.allocation_type)"
                    ></cost-of-sales>
                    <selling-expenses :section="request.data.allocations.profile.trading.sellingExpenses" estimatedLabel="Estimated expense"
                                   v-if="isSellingExpenses(entry.allocation_type)"
                    ></selling-expenses>
                    <administrative-expenses :section="request.data.allocations.profile.trading.administrativeExpenses" estimatedLabel="Estimated expense"
                                   v-if="isAdministrativeExpenses(entry.allocation_type)"
                    ></administrative-expenses>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Borrowers from '@/app/corporates/company/profile/borrowers/borrowers';
    import Lenders from '@/app/corporates/company/profile/lenders/lenders';
    import Payroll from '@/app/corporates/company/profile/trading-activities/payroll/payroll';
    import CostOfSales from '@/app/corporates/company/profile/trading-activities/components/suppliers';
    import SellingExpenses from '@/app/corporates/company/profile/trading-activities/components/suppliers';
    import AdministrativeExpenses from '@/app/corporates/company/profile/trading-activities/components/suppliers';
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import CompanyStructure from '@/app/corporates/company/company-structure';
    import AllocationFiles from './allocation-files'
    import * as corporateService from '@/app/corporates/service';

    export default {
        data() {
            return {
                files: [],
                corporateData: {
                    data: null
                },
            }
        },

        mixins: [AllocationsMixin],

        props: {
            entry: {
                type: Object,
            },
            request: {
                type: Object,
            },
        },

        mounted() {
            if(!this.request.data.allocations) {
                this.$set(this.request.data, 'allocations', {profile: CompanyStructure.data.profile})
            }
        },

        computed: {
            ...mapGetters({
                corporate: 'corporate/data',
            }),
        },

        methods: {
            save() {
                this.close()
            },

            close() {
                this.request.showAllocationsData = false
            },

            addedItem() {
                switch (this.request.data.allocation_type) {
                    case corporateService.SECTION_BORROWING_ACTIVITIES:
                        if(this.request.data.allocations.profile.borrowers.items.length) {
                            this.request.data.allocation_id = this.request.data.allocations.profile.borrowers.items[0].id;
                        }
                        break;

                    case corporateService.SECTION_LENDING_ACTIVITIES:
                        if(this.request.data.allocations.profile.lenders.items.length) {
                            this.request.data.allocation_id = this.request.data.allocations.profile.lenders.items[0].id;
                        }
                        break;

                    case corporateService.SECTION_PAYROLL:
                        if(this.request.data.allocations.profile.trading.payroll.items.length) {
                            this.request.data.allocation_id = this.request.data.allocations.profile.trading.payroll.items[0].id;
                        }
                        break;
                }
            }
        },

        watch: {
            'request.data.allocations.profile': {
                handler() {
                    this.addedItem();
                },
                deep: true
            },
        },

        components: {
            Borrowers,
            Lenders,
            Payroll,
            CostOfSales,
            SellingExpenses,
            AdministrativeExpenses,
            AllocationFiles
        }
    }
</script>