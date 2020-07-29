<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn icon :to="{ name: 'settings.corporate' }">
                    <v-icon>settings</v-icon>
                </v-btn>

                <v-btn color="primary" dark @click.prevent="startCorporate">New Company</v-btn>

                <lists></lists>

                <mfsa></mfsa>

                <v-spacer></v-spacer>

                <v-text-field
                        append-icon="search"
                        label="Search company"
                        v-model="search"
                ></v-text-field>

                <v-btn fab dark small color="primary" :to="{ name: 'companies.create' }">
                    <v-icon dark>add</v-icon>
                </v-btn>

            </v-card-title>

            <v-layout row wrap>
                <v-container>
                    <v-tabs grow show-arrows>
                        <v-tab key="registered">REGISTERED</v-tab>
                        <v-tab key="in_progress">IN PROGRESS</v-tab>
                        <v-tab key="archived">ARCHIVED</v-tab>

                        <v-tab-item key="registered">
                            <v-layout row wrap>
                                <v-container grid-list-md>
                                    <v-data-table
                                            :headers="registeredCorporatesHeader"
                                            :items="registeredCorporates"
                                            hide-actions
                                            :search="search"
                                    >
                                        <template slot="items" slot-scope="props">
                                            <td>
                                                <router-link :to="{ name: 'corporates.show', params: { corporate_id: props.item.id } }" class="black--text">
                                                    <b>{{ getCompanyName(props.item) }}</b>
                                                </router-link>
                                            </td>
                                            <td>{{ getCompanyRegNumber(props.item) }}</td>
                                            <td>{{ getVatNumber(props.item) }}</td>
                                            <td>{{ props.item.data.mlro.approval ? props.item.data.mlro.approval.applicable_year: ''}}</td>
                                            <td>
                                                <v-btn color="primary" :to="{name: 'corporate-nominal-activity', params: {corporate_id: props.item.id}}">Review</v-btn>
                                                <v-btn color="error" @click="archiveCorporate(props.item.id)">Archive</v-btn>
                                            </td>
                                        </template>
                                        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                                            From {{ pageStart }} to {{ pageStop }}
                                        </template>
                                    </v-data-table>
                                </v-container>
                            </v-layout>
                        </v-tab-item>

                        <v-tab-item key="in_progress">
                            <v-layout row wrap>
                                <v-container grid-list-md>
                                    <v-data-table
                                            :headers="headers"
                                            :items="inProgressCorporates"
                                            hide-actions
                                            :search="search"
                                    >
                                        <template slot="items" slot-scope="props">
                                            <td>
                                                <router-link :to="{ name: 'corporates.show', params: { corporate_id: props.item.id } }" class="black--text">
                                                    <b>{{ getCompanyName(props.item) }}</b>
                                                </router-link>
                                            </td>
                                            <td>{{ getCompanyRegNumber(props.item) }}</td>
                                            <td>{{ getVatNumber(props.item) }}</td>
                                            <td><v-btn color="error" @click="archiveCorporate(props.item.id)">Archive</v-btn></td>
                                        </template>
                                        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                                            From {{ pageStart }} to {{ pageStop }}
                                        </template>
                                    </v-data-table>
                                </v-container>
                            </v-layout>
                        </v-tab-item>

                        <v-tab-item key="archived">
                            <v-layout row wrap>
                                <v-container grid-list-md>
                                    <v-data-table
                                            :headers="headers"
                                            :items="archivedCorporates"
                                            hide-actions
                                            :search="search"
                                    >
                                        <template slot="items" slot-scope="props">
                                            <td>
                                                <router-link :to="{ name: 'corporates.show', params: { corporate_id: props.item.id } }" class="black--text">
                                                    {{ getCompanyName(props.item) }}
                                                </router-link>
                                            </td>
                                            <td>{{ getCompanyRegNumber(props.item) }}</td>
                                            <td>{{ getVatNumber(props.item) }}</td>
                                            <td><v-btn @click="restore(props.item.id)">Unarchive</v-btn></td>
                                        </template>
                                        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                                            From {{ pageStart }} to {{ pageStop }}
                                        </template>
                                    </v-data-table>
                                </v-container>
                            </v-layout>
                        </v-tab-item>
                    </v-tabs>
                </v-container>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
    import Lists from './lists';
    import Mfsa from './mfsa';
    import * as corporateService from '../service';

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'Company Name', value: 'name'},
                {text: 'Co. reg. no', value: 'registration_number'},
                {text: 'VAT number', value: 'vat'},
                {text: 'Actions', value: 'actions'}
            ],
            registeredCorporatesHeader: [
                {text: 'Company Name', value: 'name'},
                {text: 'Co. reg. no', value: 'registration_number'},
                {text: 'VAT number', value: 'vat'},
                {text: 'Applicable year', value: 'applicable_year'},
                {text: 'Actions', value: 'actions'}
            ],
            corporates: []
        }),

        mounted() {
            this.getCorporates()
        },

        computed: {
            registeredCorporates() {
                return _.filter(this.corporates, corporate => corporate.is_registered && corporate.deleted_at === null);
            },

            inProgressCorporates() {
                return _.filter(this.corporates, corporate => ! corporate.is_registered && corporate.deleted_at === null);
            },

            archivedCorporates() {
                return _.filter(this.corporates, corporate => corporate.deleted_at !== null);
            }
        },

        methods: {
            getCorporates() {
                corporateService.get()
                    .then(response => {
                        this.corporates = response.data
                    })
            },

            archiveCorporate(corporateId) {
                corporateService.archiveCorporate(corporateId)
                    .then((data) => {
                        const corporateIndex = _.findIndex(this.corporates, corporate => corporate.id === corporateId);
                        this.corporates[corporateIndex].deleted_at = new Date().valueOf();
                    });
            },

            restore(corporateId) {
                corporateService.restore(corporateId)
                    .then((data) => {
                        const corporateIndex = _.findIndex(this.corporates, corporate => corporate.id === corporateId);
                        this.corporates[corporateIndex].deleted_at = null;
                    })
            },

            getCompanyName(corporate) {
                const mlro = corporate.data.mlro;
                if (corporate.is_registered && mlro.hasOwnProperty('approval') && mlro.approval.mfsa_company_name !== null) {
                    return mlro.approval.mfsa_company_name;
                }

                return corporate.data.hasOwnProperty('involvements') ? corporate.data.involvements.companyName : 'N/A';
            },

            getCompanyRegNumber(corporate) {
                const mlro = corporate.data.mlro;
                if (corporate.is_registered && mlro.hasOwnProperty('approval') && mlro.approval.company_reg_no !== null) {
                    return corporate.data.mlro.approval.company_reg_no;
                }

                return '';
            },
            
            getVatNumber(corporate) {
                if (corporate.hasOwnProperty('company'))
                    return corporate.company.details.vatNumber;
                
                return '';
            },

            startCorporate() {
                corporateService.create({company: this.company})
                    .then(response => {
                        this.$router.push({ name: 'corporates.show', params: { corporate_id: response.data.id } })
                    })
            },

        },

        components: { Lists, Mfsa }
    }
</script>
