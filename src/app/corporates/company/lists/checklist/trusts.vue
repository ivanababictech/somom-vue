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
                @export="format => exportList('checklist', 'trust', format)"></export-button>
        <div class="fill-width">
            <fixed-header :items="filteredTrusts" :headers="headers"></fixed-header>
            <v-data-table
                    ref="table"
                    :headers="headers"
                    :items="filteredTrusts"
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
                trusts: {},
                // Export mixin will use it as params
                filters: {
                    name: null,
                },
            }
        },

        computed: {
            filteredTrusts() {
                return _.map(this.trusts, (trust, key) => {
                    return {
                        name: trust.name,
                        companies: _.uniq(trust.companies),
                        type: trust.type,
                        documents: trust.documents
                    }
                })
            }
        },

        mounted() {
            this.setHeaders();
            this.setTrustsData();
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

            setTrustsData() {
                this.trusts = {};
                _.each(this.companies, company => {
                    const trusts = _.filter(company.data.involvements.types, type => type.value === 'trust');

                    if (trusts.length > 0)
                        _.each(trusts, trust => {
                            this.addTrust(trust, trust.name, company)
                        });

                    const companyShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Corporate shareholder'));

                    if (companyShareholders.length > 0) {
                        _.each(companyShareholders, corporate => {
                            _.each(corporate.structure.types, type => {
                                if (type.value === 'trust') {
                                    this.addTrust(type, type.trustName, company)
                                }
                            });
                        });
                    }
                })
            },

            addTrust(trust, trustName, company) {
                if (! this.trusts.hasOwnProperty(trust.registrationNumber)) {
                    this.trusts[trust.registrationNumber] = {
                        name: trustName,
                        companies: [company.data.mlro.approval.mfsa_company_name],
                        type: 'trust'
                    }
                }
                else {
                    this.trusts[trust.registrationNumber].companies.push(company.data.mlro.approval.mfsa_company_name);
                }

                const documents = _.find(company.data.documents, document => document.person.name === trustName);

                this.trusts[trust.registrationNumber].documents = [];
                if (documents !== undefined) {
                    _.each(this.documents, document => {
                        const availableDocuments = document.document_names.split(',');
                        _.each(availableDocuments, availableDocument => {
                            const findDocument = _.find(documents.documents, document => document.title === availableDocument.trim());
                            if (findDocument !== undefined && findDocument.files && findDocument.files.length > 0)
                                this.trusts[trust.registrationNumber].documents.push(findDocument.document_date);
                            else
                                this.trusts[trust.registrationNumber].documents.push('No docs.');
                        })
                    });
                } else {
                    _.each(this.documents, document => {
                        _.each(document.document_names.split(','), name => {
                            this.trusts[trust.registrationNumber].documents.push('No docs.');
                        })
                    });
                }
            },
        },

        watch: {
            companies: 'setTrustsData',

            documents() {
                this.setHeaders();
                this.setTrustsData();
            }
        }
    }
</script>