<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by company name"
                    v-model="filters.company_name"
            ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <export-button
                @export="format => exportList('customer', null, format)"></export-button>
        <div class="fill-width">
            <fixed-header :items="companies" :headers="headers"></fixed-header>
            <v-data-table
                    ref="table"
                    :headers="headers"
                    :items="companies"
                    :hide-actions="true"
                    :search="filters.company_name"
                    :custom-filter="filterByCompanyName"
                    id="main-table"
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <b>{{ getCompanyName(props.item) }}</b>
                    </td>
                    <td>{{ getCompanyRegNumber(props.item) }}</td>
                    <td v-for="result in props.item.results">
                        <p v-for="question in result"> {{ question }}</p>
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
                ],
                headers: [],
                // Export mixin will use it as params
                filters: {
                    company_name: null,
                },
            }
        },

        mounted() {
            this.setResultsHeader();
            this.setResultsAnswers();
        },

        methods: {

            setResultsHeader() {
                this.headers = [];
                let headers = [];
                _.each(this.results, result => {
                     _.each(result.items, item => {
                         if (item.include_in_col) {
                             headers.push({text: item.title, value: item.title});
                         }
                     })
                });
                this.headers = this.defaultHeaders.concat(headers);

                this.setFixedHeader();
            },

            setResultsAnswers() {
                _.each(this.companies, (corporate, companyIndex) => {
                    if (! this.companies[companyIndex].hasOwnProperty('results')) {
                        this.$set(this.companies[companyIndex], 'results', {});
                    }
                    this.companies[companyIndex].results = {};
                    _.each(this.results, (result, resultId) => {
                        _.each(result.items, item => {
                            if (item.include_in_col) {
                                this.companies[companyIndex].results[item.title] = [];
                                _.each(corporate.data.mlro.questionnaire.settings, (settings, settingId) => {
                                    if (settingId == result.id) {
                                        _.each(settings, setting => {
                                            _.each(setting.selected, optionId => {
                                                const optionIndex = _.findIndex(item.options, option => option.id == optionId);
                                                const option = item.options[optionIndex];
                                                if (option !== undefined)
                                                    this.companies[companyIndex].results[item.title].push(option.title);
                                            });
                                        })
                                    }
                                });
                            }
                        })
                    })
                });
            },

            filterByCompanyName(items, search, filter, header) {
                let filteredItems = [];

                _.each(items, company => {
                    const name = this.getCompanyName(company);

                    if (_.includes(name.toLowerCase(), search.toLowerCase()))
                        filteredItems.push(company);
                });

                return filteredItems;
            }
        },

        watch: {
            companies() {
                this.setResultsHeader();
                this.setResultsAnswers();
            },

            results() {
                this.setResultsHeader();
                this.setResultsAnswers();
            }
        }
    }
</script>