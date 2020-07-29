<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by company name"
                    v-model="filters.company_name"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3>
            <v-autocomplete
                    multiple
                    :items="availableActivities"
                    v-model="filters.activities"
                    label="Filter by activities"
            ></v-autocomplete>
        </v-flex>
        <v-spacer></v-spacer>
        <export-button
                @export="format => exportList('company', null, format)"></export-button>
        <div class="fill-width">
            <fixed-header :items="filteredCompanies" :headers="headers"></fixed-header>

            <v-data-table
                    ref="table"
                    :headers="headers"
                    :items="filteredCompanies"
                    :hide-actions="true"
                    :search="filters.company_name"
                    :custom-filter="filterByName"
                    id="main-table"
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <b>{{ getCompanyName(props.item) }}</b>
                    </td>
                    <td>{{ getCompanyRegNumber(props.item) }}</td>
                    <td>{{ getActivities(props.item)}}</td>
                    <td v-for="result in props.item.results">
                        {{ result.score }} %
                    </td>
                </template>
            </v-data-table>
        </div>
    </v-layout>
</template>

<script>
    import companyMixin from '../mixins/company';
    import fixedHeaderMixin from '../mixins/fixed-header';
    import exportMixin from '../mixins/export';

    export default {
        props: [
            'companies',
            'activities',
            'results'
        ],

        mixins: [
            companyMixin,
            fixedHeaderMixin,
            exportMixin
        ],

        data() {
            return {
                defaultHeaders: [
                    {text: 'Company Name', value: 'name'},
                    {text: 'Company registration', value: 'registration_number'},
                    {text: 'Company activities', value: 'activities'},
                ],
                headers: [],
                // Export mixin will use it as params
                filters: {
                    company_name: null,
                    activities: []
                },
            }
        },

        computed: {
            availableActivities() {
                let activities = [];
                _.each(this.companies, company => {
                    const activity = this.getActivities(company);
                    if (! _.isEmpty(activity)) {
                        _.each(activity.split(','), item => {
                            activities.push(item);
                        })
                    }
                });

                return _.uniq(activities);
            },

            filteredCompanies() {
                if (this.filters.activities.length > 0) {
                    let filteredCompanies = [];

                    _.each(this.companies, company => {
                        const activity = this.getActivities(company);

                        if (! _.isEmpty(activity) && activity.split(',').some(r => _.includes(this.filters.activities, r))) {
                            filteredCompanies.push(company);
                        }
                    });

                    return filteredCompanies;
                }

                return this.companies;
            }
        },

        mounted() {
            this.setResultsHeader();
            this.getRisks();
        },

        methods: {
            getActivities(corporate) {
                return _.filter(this.activities, activity => _.includes(corporate.data.profile.principalActivity.activities, activity.id))
                    .map(activity => activity.name)
                    .join(',');
            },

            setResultsHeader() {
                this.headers = [];
                this.headers = this.defaultHeaders.concat(this.results.map(result => ({text: result.title, value: result.title})));

                this.setFixedHeader();
            },

            getRisks() {
                _.each(this.companies, (corporate, companyIndex) => {
                    if (! this.companies[companyIndex].hasOwnProperty('results')) {
                        this.$set(this.companies[companyIndex], 'results', []);
                    }
                    this.companies[companyIndex].results = [];
                    _.each(corporate.data.mlro.questionnaire.settings, (settings, resultId) => {
                        const resultIndex = _.findIndex(this.results, result => result.id == resultId);
                        const result = this.results[resultIndex];
                        let score = 0;

                        if (result !== undefined) {
                            let overallScore = 0;
                            result.items.forEach(item => {
                                item.options.forEach(option => {
                                    overallScore += option.mark;
                                })
                            });

                            _.each(settings, (setting, settingId) => {
                                if (setting !== null && setting.selected.length > 0) {
                                    const itemIndex = _.findIndex(result.items, item => item.id == settingId);
                                    const item = result.items[itemIndex];
                                    _.each(setting.selected, optionId => {
                                        const optionIndex = _.findIndex(item.options, option => option.id == optionId);
                                        const option = item.options[optionIndex];
                                        score += option.mark;
                                    });
                                }
                            });
                            this.companies[companyIndex].results.push({score: Math.round((score * 100 ) / overallScore)});
                            return;
                        }
                    })
                });
            },

            filterByName(items, search, filter, header) {
                let filteredCompanies = [];
                _.each(items, corporate => {
                    const name = this.getCompanyName(corporate);

                    if (_.includes(name.toLowerCase(), search.toLowerCase()))
                        filteredCompanies.push(corporate);
                });

                return filteredCompanies;
            }
        },

        watch: {
            results(results) {
                this.setResultsHeader();
                this.getRisks();
            },

            companies(companies) {
                this.setResultsHeader();
                this.getRisks();
            }
        }
    }
</script>