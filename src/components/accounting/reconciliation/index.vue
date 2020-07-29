<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" lazy :overlay="false">
        <v-btn outline color="primary" slot="activator">
            <v-badge top color="red">
                <span slot="badge">{{ totalCount }}</span>
                Reconciliations
            </v-badge>
        </v-btn>
        <v-card>
            <v-toolbar dense color="accent">
                <v-btn icon @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Reconciliations</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-btn @click="reconcile()" flat>Reconcile</v-btn>
                <v-menu
                        origin="center center"
                        transition="scale-transition"
                        bottom
                >
                    <v-btn slot="activator" flat>
                        RECONCILING THE DIFFERENCE
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="(type, index) in reconcileTypes" :key="index" @click="confirmReconcileDifference(type)">
                            <v-list-tile-title>{{ type }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>

            </v-toolbar>
            <v-tabs v-if="reconciliations" v-model="activeTab">
                <v-tab v-for="(reconciliation, index) in reconciliations" :key="reconciliation.id">
                    {{ reconciliation.title }}
                    <v-badge top color="red">
                        <span slot="badge">{{ reconciledCounts[reconciliation.type] }}</span>
                    </v-badge>
                </v-tab>

                <v-tab-item v-for="(reconciliation, index) in reconciliations" :key="reconciliation.id">
                    <v-tabs>
                        <v-tab key="unreconciled" @click="typeReconciled = 0">
                            Unreconciled
                        </v-tab>
                        <v-tab key="reconciled" @click="typeReconciled = 1">
                            Reconciled
                        </v-tab>

                        <v-tab key="all" @click="typeReconciled = 'all'">
                            All
                        </v-tab>
                    </v-tabs>

                    <tab-table
                            :key="typeReconciled"
                            v-if="index == activeTab"
                            ref="reconciliation"
                            @reconcile="reconcile"
                            @update="update"
                            :selected="selectedItems"
                            :account="account"
                            :reconciliation="reconciliation"
                            :typeReconciled="typeReconciled"
                            :confirmReconcilingDifferenceClick="confirmReconcilingDifferenceClick">
                    </tab-table>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    import TabTable from './table'
    import * as reconciliationService from './service'

    export default {
        props: ['account', 'label', 'type', 'reconciliations'],

        data: () => ({
            selectedItems: [],
            activeTab: null,
            dialog: false,
            confirmDialog: false,
            pagination: {
                sortBy: 'date'
            },
            reconcileTypes: ['Bank charges', 'Difference on exchange'],
            typeReconciled: 0,
            entries: [],
            reconciliationType: false,
            reconciledCounts: {},
            confirmReconcilingDifferenceClick: false
        }),

        computed: {
            ...mapGetters({
                accountNameById: 'accounting/accountNameById',
            }),

            totalCount() {
                var total = 0

                total += this.reconciledCounts.bank || 0
                total += this.reconciledCounts.cash || 0
                total += this.reconciledCounts.cheque_paid || 0
                total += this.reconciledCounts.cheque_received || 0

                return total
            }
        },

        mounted() {
            this.getUnreconciledCounts()
        },

        methods: {
            getUnreconciledCounts() {
                reconciliationService.counts(this.account.id)
                    .then(response => {
                        this.reconciledCounts = response.data
                    })
            },

            reconcile() {
                this.$refs.reconciliation[0].reconcile()
            },

            confirmReconcileDifference(type) {
                this.$refs.reconciliation[0].confirmReconcileDifference(type)
            },

            update() {
                this.getUnreconciledCounts()
            }
        },

        components: { TabTable },
    }
</script>
