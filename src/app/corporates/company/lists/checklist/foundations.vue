<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                label="Filter by name"
                v-model="filters.name"
            ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <export-button
                @export="format => exportList('checklist', 'foundation', format)"></export-button>
        <div class="fill-width">
            <fixed-header :items="filteredFoundations" :headers="headers"></fixed-header>
            <v-data-table
                    ref="table"
                    :headers="headers"
                    :items="filteredFoundations"
                    :hide-actions="true"
                    :search="filters.name"
                    id="main-table"
            >
                <template slot="items" slot-scope="props">
                    <td v-text="props.item.name"></td>
                    <td>
                        <p v-for="company in props.item.companies">{{ company }}</p>
                    </td>
                    <td v-text="props.item.type"></td>
                    <td v-for="document in props.item.documents" v-text="document"></td>
                </template>
            </v-data-table>
        </div>
    </v-layout>
</template>

<script>
    import fixedHeaderMixin from '../mixins/fixed-header';
    import exportMixin from '../mixins/export';

    export default {
        mixins: [fixedHeaderMixin, exportMixin],

        props: [
            'companies',
            'documents'
        ],

        data() {
            return {
                defaultHeaders: [
                    {text: 'Name', value: 'name'},
                    {text: 'Companies involved with', value: 'company'},
                    {text: 'Type', value: 'type'}
                ],
                headers: [],
                foundations: {},
                filters: {
                    name: null,
                },
            }
        },

        computed: {
            filteredFoundations() {
                return _.map(this.foundations, (foundation, key) => {
                    return {
                        name: foundation.name,
                        companies: _.uniq(foundation.companies),
                        type: foundation.type,
                        documents: foundation.documents
                    }
                })
            }
        },

        mounted() {
            this.setHeaders();
            this.setFoundationsData();
        },

        methods: {
            setHeaders() {
                this.headers = [];
                let headers = [];
                _.each(this.documents, document => {
                    _.each(document.document_names.split(','), name => {
                        headers.push({text: name, value: name})
                    })
                });

                this.headers = this.defaultHeaders.concat(headers);

                this.setFixedHeader();
            },

            setFoundationsData() {
                this.foundations = {};
                _.each(this.companies, company => {
                    const foundations = _.filter(company.data.involvements.types, type => type.value === 'foundation');

                    if (foundations.length > 0)
                        _.each(foundations, foundation => {
                            this.addFoundation(foundation, foundation.name, company)
                        });

                    const companyShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Corporate shareholder'));

                    if (companyShareholders.length > 0) {
                        _.each(companyShareholders, corporate => {
                            _.each(corporate.structure.types, type => {
                                if (type.value === 'foundation') {
                                    this.addFoundation(type, type.foundationName, company)
                                }
                            });
                        });
                    }
                })
            },

            addFoundation(foundation, foundationName, company) {
                if (! this.foundations.hasOwnProperty(foundation.registrationNumber)) {
                    this.foundations[foundation.registrationNumber] = {
                        name: foundationName,
                        companies: [company.data.mlro.approval.mfsa_company_name],
                        type: 'foundation'
                    }
                }
                else {
                    this.foundations[foundation.registrationNumber].companies.push(company.data.mlro.approval.mfsa_company_name);
                }

                const documents = _.find(company.data.documents, document => document.person.name === foundationName);

                this.foundations[foundation.registrationNumber].documents = [];
                if (documents !== undefined) {
                    _.each(this.documents, document => {
                        const availableDocuments = document.document_names.split(',');
                        _.each(availableDocuments, availableDocument => {
                            const findDocument = _.find(documents.documents, document => document.title === availableDocument.trim());
                            if (findDocument !== undefined && findDocument.files && findDocument.files.length > 0)
                                this.foundations[foundation.registrationNumber].documents.push(findDocument.document_date);
                            else
                                this.foundations[foundation.registrationNumber].documents.push('No docs.');
                        })
                    });
                } else {
                    _.each(this.documents, document => {
                        _.each(document.document_names.split(','), name => {
                            this.foundations[foundation.registrationNumber].documents.push('No docs.');
                        })
                    });
                }
            },
        },

        watch: {
            companies: 'setFoundationsData',

            documents() {
                this.setHeaders();
                this.setFoundationsData();
            }
        }
    }
</script>