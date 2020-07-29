<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" lazy :overlay="false">
        <v-btn outline color="primary" slot="activator">
            <v-badge top color="red">
                <span v-if="countUnreconciled" slot="badge">{{ countUnreconciled }}</span>
                Reconcile
            </v-badge>
        </v-btn>
        <v-card>
            <v-toolbar dense color="accent">
                <v-btn icon @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Reconciliation</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn @click="reconcile()" flat>Reconcile</v-btn>
                <v-menu
                        origin="center center"
                        transition="scale-transition"
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
            <reconciliation-table ref="reconciliation" :key="typeReconciled" :invoiceType="invoiceType" :typeReconciled="typeReconciled"/>
        </v-card>
    </v-dialog>
</template>

<script>
    import ReconciliationTable from './table'
    import * as invoiceService from '../service'

    export default {
        data: () => ({
            filters: {},
            countUnreconciled: 0,
            typeReconciled: 0,
            dialog: false,
            saleReconcileTypes: ['Bank charges', 'Difference on exchange', 'Provision for bad debts', 'Bad debts'],
            purchaseReconcileTypes: ['Bank charges', 'Difference on exchange'],
        }),

        props: ['invoiceType'],

        mounted() {
            this.getCountUnreconciled()
        },

        computed: {
            reconcileTypes() {
                return this.invoiceType == 'sale' ? this.saleReconcileTypes : this.purchaseReconcileTypes
            }
        },

        methods: {
            getCountUnreconciled() {
                let params = {
                    type: this.invoiceType,
                    typeReconciled: this.typeReconciled,
                }

                invoiceService.count(params)
                    .then(response => this.countUnreconciled = response.data)
            },

            reconcile() {
                this.$refs.reconciliation.reconcile()
            },

            confirmReconcileDifference(type) {
                this.$refs.reconciliation.confirmReconcileDifference(type)
            },
        },

        components: {ReconciliationTable},
    }
</script>
