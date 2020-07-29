<template>
            <v-tabs grow v-model="currentSection">
                <v-tab
                        v-for="section in sections"
                        :key="section"
                        :href="'#' + section"
                >
                    {{ section }}
                </v-tab>
                <v-tab-item
                        v-for="section in sections"
                        :key="section"
                        :value="section"
                        v-if="currentSection == section"
                >
                    <borrowing-activities :items="items" :section="section" v-if="isBorrowingActivities(currentSection)"></borrowing-activities>
                    <lending-activities :items="items" :section="section" v-if="isLendingActivities(currentSection)"></lending-activities>
                    <payroll :items="items" :section="section" v-if="isPayroll(currentSection)"></payroll>
                    <cost-of-sales :items="items" :section="section" v-if="isCostOfSales(currentSection)"></cost-of-sales>
                    <selling-expenses :items="items" :section="section" v-if="isSellingExpenses(currentSection)"></selling-expenses>
                    <administrative-expenses :items="items" :section="section" v-if="isAdministrativeExpenses(currentSection)"></administrative-expenses>
                </v-tab-item>
            </v-tabs>
</template>

<script>
    import * as LogService from '../../service';
    import BorrowingActivities from './borrowing-activities';
    import LendingActivities from './lending-activities';
    import Payroll from "./payroll";
    import CostOfSales from "./cost-of-sales";
    import SellingExpenses from "./selling-expenses";
    import AdministrativeExpenses from "./administrative-expenses";
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import * as corporateService from '@/app/corporates/service';

    export default {
        data () {
            return {
                currentSection: corporateService.SECTION_BORROWING_ACTIVITIES,
                items: [],
                item: {
                    allocation_type: corporateService.SECTION_BORROWING_ACTIVITIES
                },
                sections: [
                    corporateService.SECTION_BORROWING_ACTIVITIES,
                    corporateService.SECTION_LENDING_ACTIVITIES,
                    corporateService.SECTION_PAYROLL,
                    corporateService.SECTION_COST_OF_SALES,
                    corporateService.SECTION_SELLING_DISTRIBUTION,
                    corporateService.SECTION_ADMINISTRATIVE_EXPENSES,
                ]
            }
        },

        mixins: [AllocationsMixin],

        mounted() {
            this.getLogs()
        },

        methods: {
            getLogs() {
                this.items = []

                LogService.get(this.currentSection)
                    .then(response => this.items = response.data)
            },
        },

        components: {
            BorrowingActivities,
            LendingActivities,
            Payroll,
            CostOfSales,
            SellingExpenses,
            AdministrativeExpenses
        },

        watch: {
            currentSection: 'getLogs'
        }
    }
</script>