<template>
    <section>
        <v-toolbar dense color="accent">
            <v-toolbar-items>
                <v-btn flat :to="{ name: 'audit.trial-balances' }">Trial Balance</v-btn>
                <v-btn flat :to="{ name: 'audit.planning' }">Audit Planning</v-btn>
                <v-btn flat>Audit Programme</v-btn>
                <v-btn flat :to="{ name: 'audit.lead-schedules' }">Lead Schedules</v-btn>
                <v-btn flat>Finalisation</v-btn>
                <v-btn flat>Letters</v-btn>
                <v-btn flat :to="{ name: 'audit.company-details' }">Company Details</v-btn>
                <v-btn flat @click="toggleDialog('audit.journal_entries')">Journal Entries</v-btn>
                <v-btn flat @click="toggleDialog('audit.queries')">Queries</v-btn>
                <!--<account-dialog type="audit"></account-dialog>-->
            </v-toolbar-items>
        </v-toolbar>

        <router-view class="mt-3"></router-view>

        <template v-if="isDialogOpen">
            <v-dialog
                    :value="dialogs.journal_entries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.journal_entries">
                <journal-entries-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.queries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.queries">
                <queries-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.balances"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.balances">
                <balances-dialog/>
            </v-dialog>
        </template>

    </section>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'

    import JournalEntriesDialog from './dialogs/journal-entries/index'
    import QueriesDialog from './dialogs/queries'
    import BalancesDialog from './dialogs/balances'

    export default {
        computed: {
            ...mapGetters({
                showBalances: 'accounting/showBalances',
                dialogs: 'accounting/dialogs'
            }),
            isDialogOpen() {
                let dialog = false
                let self = this
                Object.keys(this.dialogs).forEach(key => {
                    if (self.dialogs[key]) {
                        return dialog = true
                    }
                });
                return dialog
            }
        },
        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
        },
        components: {
            JournalEntriesDialog,
            QueriesDialog,
            BalancesDialog
        }
    }
</script>