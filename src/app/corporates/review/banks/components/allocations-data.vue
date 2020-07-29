<template>
    <v-dialog v-model="item.showAllocationsData" scrollable>
        <v-card v-if="corporateData.data">
            <v-toolbar color="accent">
                <v-icon @click="item.showAllocationsData = false">close</v-icon>
                <v-toolbar-title>Add new allocation data - {{ item.allocation_type }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save()">Save</v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="height: 600px;">
                <v-container grid-list-md>
                    <borrowers :borrowers="corporateData.data.profile.borrowers" v-if="isBorrowingActivities(item.allocation_type)"></borrowers>
                    <lenders :lenders="corporateData.data.profile.lenders" v-if="isLendingActivities(item.allocation_type)"></lenders>
                    <payroll :payroll="corporateData.data.profile.trading.payroll" v-if="isPayroll(item.allocation_type)"></payroll>
                    <cost-of-sales :section="corporateData.data.profile.trading.costOfSales" estimatedLabel="Estimated COS"
                                   v-if="isCostOfSales(item.allocation_type)"
                    ></cost-of-sales>
                    <selling-expenses :section="corporateData.data.profile.trading.sellingExpenses" estimatedLabel="Estimated expense"
                                   v-if="isSellingExpenses(item.allocation_type)"
                    ></selling-expenses>
                    <administrative-expenses :section="corporateData.data.profile.trading.administrativeExpenses" estimatedLabel="Estimated expense"
                                   v-if="isAdministrativeExpenses(item.allocation_type)"
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
    import * as corporateService from '@/app/corporates/service';
    import AllocationsMixin from '@/app/corporates/mixins/allocations';

    export default {
        data() {
            return {
                corporateData: {
                    data: null
                }
            }
        },

        mixins: [AllocationsMixin],

        props: {
            section: {
                type: String,
                default: null
            },
            item: {
                type: Object,
            }
        },

        computed: {
            ...mapGetters({
                corporate: 'corporate/data',
            }),
        },

        mounted() {
            this.corporateData.data = JSON.parse(JSON.stringify(this.corporate))
        },

        methods: {
            save() {
                corporateService.update(this.corporateData)
                    .then(() => this.item.showAllocationsData = false)
            },
        },

        components: {
            Borrowers,
            Lenders,
            Payroll,
            CostOfSales,
            SellingExpenses,
            AdministrativeExpenses,
        }
    }
</script>