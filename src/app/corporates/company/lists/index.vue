<template>
    <div>
        <v-tabs grow color="accent" v-model="tab">
            <v-btn icon @click="$router.push({name: 'corporates.index'})">
                <v-icon>close</v-icon>
            </v-btn>
            <v-tab key="checklist">CHECKLIST</v-tab>
            <v-tab key="companies">COMPANIES LIST</v-tab>
            <v-tab key="ubo">UBO'S LIST</v-tab>
            <v-tab key="col">CUSTOMER OVERVIEW LIST</v-tab>
            <v-tab key="gol">GEOGRAPHY OVERVIEW LIST</v-tab>

            <v-tab-item key="checklist">
                <checklist v-if="tab === 0"
                    :companies="registeredCompanies"></checklist>
            </v-tab-item>
            <v-tab-item key="companies">
                <companies v-if="tab === 1"
                    :activities="activities"
                    :results="results"
                    :companies="registeredCompanies"></companies>
            </v-tab-item>
            <v-tab-item key="ubo_list">
                <ubo-list v-if="tab === 2"
                    :companies="registeredCompanies"
                    :wealth-sources="wealthSources"></ubo-list>
            </v-tab-item>
            <v-tab-item key="customer_list">
                <customer-overview-list v-if="tab === 3"
                    :results="results"
                    :companies="registeredCompanies"></customer-overview-list>
            </v-tab-item>
            <v-tab-item key="geography_list">
                <geography-overview-list v-if="tab === 4"
                     :companies="registeredCompanies"></geography-overview-list>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script scoped>
    import {mapGetters} from 'vuex'
    import Checklist from './checklist';
    import Companies from './companies';
    import UboList from './ubo';
    import CustomerOverviewList from './customer';
    import GeographyOverviewList from './geography';
    import * as service from '../../service';
    import * as settingsService from '@/app/settings/corporate/corporate-settings/service';

    export default {
        data() {
            return {
                tab: 'companies',
                companies: [],
                results: [],
                wealthSources: []
            }
        },

        mounted() {
            this.getCorporates();
            this.getResults();
            this.getWealthSources();
        },

        components: {
            Companies,
            UboList,
            CustomerOverviewList,
            GeographyOverviewList,
            Checklist
        },

        computed: {
            ...mapGetters({
                activities: 'settings/company_activities',
            }),

            registeredCompanies() {
                return _.filter(this.companies, company => company.is_registered && _.isEmpty(company.deleted_at));
            }
        },

        methods: {
            getCorporates() {
                service.get()
                    .then(({data}) => {
                        this.companies = data;
                    })
            },

            getResults() {
                settingsService.getSettings()
                    .then(({data}) => {
                        this.results = data;
                    })
            },

            getWealthSources() {
                this.$http.get('settings/wealth-sources')
                    .then(({data}) => {
                        this.wealthSources = data
                })
            }
        }
    }
</script>