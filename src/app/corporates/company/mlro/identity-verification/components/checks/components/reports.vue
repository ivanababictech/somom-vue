<template>
    <v-container fluid grid-list-md>
        <v-card flat>
            <v-expansion-panel>
                <v-expansion-panel-content
                        v-for="(report, index) in reports"
                        :key="index"
                        expand-icon="mdi-menu-down"
                        class="p-3"
                >
                    <div slot="header">
                        <span v-if="report.name == 'identity'">Identity Report ({{ report.variant.toUpperCase() }})</span>
                        <span v-if="report.name == 'watchlist'">Watchlist Report: {{ report.variant.toUpperCase() }}</span>
                        <span v-if="report.name == 'facial_similarity'">Facial Similarity Report</span>
                        <span v-if="report.name == 'document'">Document Report</span>
                        <v-btn class="right white--text" :color="report.result == 'clear' ? 'success' : 'red'">{{ report.result }}</v-btn>
                    </div>
                    <v-card>
                        <v-card-text class="grey lighten-3">
                            <v-layout wrap row>
                                <v-flex
                                        v-for="(breakdownList, key) in report.breakdown"
                                        :key="key"
                                        xs12
                                        sm6
                                        md4
                                >
                                    <v-card>
                                        <template>
                                            <v-card-title>
                                                <h4>{{ $helpers.titleize(key) }}:
                                                    <span class="success--text" v-if="breakdownList.result == 'clear'">passed</span>
                                                    <span class="error--text" v-else>failed</span>
                                                </h4>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-list dense>
                                                <v-list-tile
                                                        v-for="(breakdown, name) in breakdownList.breakdown"
                                                        :key="'name' + name"
                                                >
                                                    <template>

                                                        <v-list-tile-avatar>
                                                            <v-icon color="success" v-if="breakdown.result == 'clear'">check</v-icon>
                                                            <v-icon color="error" v-if="breakdown.result == 'unidentified'">cancel</v-icon>
                                                            <v-icon color="warning" v-if="breakdown.result == 'consider'">block</v-icon>
                                                            <v-icon color="warning" v-if="!breakdown.result">fa fa-block</v-icon>
                                                        </v-list-tile-avatar>
                                                        <v-list-tile-content class="align-left">

                                                            {{ $helpers.titleize(name) }}
                                                            <v-list-tile-sub-title
                                                                    v-for="(property, propertyName) in breakdown.properties"
                                                                    :key="'property' + propertyName"
                                                            >
                                                                {{ $helpers.titleize(propertyName) }}: {{ property }}
                                                            </v-list-tile-sub-title>
                                                        </v-list-tile-content>
                                                    </template>
                                                </v-list-tile>
                                            </v-list>
                                        </template>
                                    </v-card>
                                </v-flex>
                            </v-layout>

                            <v-divider></v-divider>
                            <template v-if="report.properties && report.properties">
                                <span class="subheading">Details</span>
                                <v-layout row wrap>
                                    <v-flex md6 v-for="(property, name) in report.properties" :key="name">
                                        <b>{{ name }}</b>: {{ property }}
                                    </v-flex>
                                </v-layout>
                            </template>

                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-container>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import * as IdentityService from '../../../service'
    import {isArray} from 'lodash'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false,
            reports: [],
        }),

        props: ['check'],

        mounted() {
            this.getReports()
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            getReports() {
                IdentityService.getReports(this.check.id)
                    .then(response => {
                        this.reports = response.data
                    })
            },

            isPropertyArray(value) {
                return isArray(value)
            }
        },
    }
</script>