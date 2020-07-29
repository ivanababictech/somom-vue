<template>
    <div class="mt-2">
        <p class="display-1">Auditor details</p>
        <span class="body-2">A. Engagement letter</span>
        <v-layout>
            <v-flex xs6 md3>
                <v-select
                        :items="serviceProviders"
                        item-text="data.name"
                        item-value="id"
                        label="Service provider"
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <v-select
                        :items="auditEmployee"
                        item-text="name"
                        item-value="id"
                        label="Audit employee"
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <v-select
                        :items="auditManager"
                        item-text="name"
                        item-value="id"
                        label="Audit manager"
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <v-select
                        :items="auditPartner"
                        item-text="name"
                        item-value="id"
                        label="Audit partner"
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <v-text-field
                        label="Engagement date"
                        type="date"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <v-text-field
                        label="Year end date"
                        type="date"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <v-select
                        :items="services"
                        item-text="title"
                        item-value="id"
                        label="Service"
                ></v-select>
            </v-flex>
            <v-flex xs6 md3 ml-2>
                <v-text-field
                        label="Price"
                        type="number"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout mb-2>
            <v-flex xs6 md3>
                <v-btn class="ml-0 primary white--text">Generate engagement letter</v-btn>
            </v-flex>
        </v-layout>
        <span class="body-2">B. Audit details</span>
        <v-layout>
            <v-flex xs6 md3>
                <v-text-field
                        label="Start date"
                        type="date"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <span>First time audit</span>
                <v-radio-group v-model="audit.first_time" row>
                    <v-radio
                            label="Yes"
                            :value="1"
                    ></v-radio>
                    <v-radio
                            label="No"
                            :value="0"
                    ></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout v-if="audit.first_time">
            <v-flex xs6 md3>
                <v-text-field
                        label="Last year audit period"
                        type="date"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs6 md3>
                <span>Was there a different auditor last year?</span>
                <v-radio-group v-model="audit.different_auditor" row>
                    <v-radio
                            label="Yes"
                            :value="1"
                    ></v-radio>
                    <v-radio
                            label="No"
                            :value="0"
                    ></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout v-if="audit.different_auditor === 0">
            <v-flex xs6 md3>
                <v-btn class="ml-0 primary white--text">Generate engagement letter</v-btn>
            </v-flex>
        </v-layout>
        <div class="mt-2">
            <span class="body-2">C. Bank details</span>
        </div>
        <v-layout>
            <v-flex xs6 md3>
                <!--{{ banks }}-->
                <v-select
                        :items="banks"
                        item-text="banker_name"
                        item-value="id"
                        label="Banks"
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout mb-2>
            <v-flex xs6 md3>
                <v-btn class="ml-0 primary white--text">Generate bank request</v-btn>
            </v-flex>
        </v-layout>

        <v-layout mb-2>
            <v-flex xs6 md3>
                <v-btn class="ml-0 primary white--text">Generate bank authorisation</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import * as serviceProviderService from '@/app/settings/global/service-providers/service.js'
    import * as staffInvolvementsService from '@/app/settings/global/staff-involvements/service.js'
    import * as servicesService from '@/app/settings/global/services/service.js'
    import * as bankersService from '@/app/settings/global/bankers/service.js'

    export default {
        data: () => ({
            serviceProviders: [],
            staff: [],
            services: [],
            banks: [],
            audit: {
                first_time: null,
                different_auditor: null
            }
        }),
        mounted() {
            this.fetchServiceProviders()
            this.fetchStaff()
            this.fetchServices()
            this.fetchBanks()
        },
        methods: {
            fetchServiceProviders() {
                serviceProviderService.get()
                    .then(response => {
                        this.serviceProviders = response.data
                    })
            },
            fetchStaff () {
                staffInvolvementsService.get()
                    .then(response => {
                        this.staff = JSON.parse(response)
                    })
            },
            fetchServices() {
                servicesService.get()
                    .then(response => {
                        this.services = response.data
                    })
            },
            fetchBanks() {
                bankersService.get()
                    .then(response => {
                        this.banks = response
                    })
            }
        },
        computed: {
            auditEmployee () {
                return this.staff.filter(person => person.type === 'Audit Employee')
            },
            auditManager () {
                return this.staff.filter(person => person.type === 'Audit Manager')
            },
            auditPartner () {
                return this.staff.filter(person => person.type === 'Audit Partner')
            },
        }
    }
</script>