<template>
    <v-card>
        <accounting-toolbar
                title="Cheques"
                customer
                supplier
                @toggleDialog="toggleDialog('cheque_entries')"
                @saveAsDraft="saveAsDraft">
        </accounting-toolbar>

        <v-card-text class="mt-5">
            <v-tabs v-model="activeTab">
                <v-tab v-for="(cheque, index) in accounts" :key="cheque.id">
                    <span v-if="cheque.assigned_account_id === 34">Cheque Received</span>
                    <span v-else>{{ cheque.name }}</span>
                </v-tab>
                <account-dialog
                        :icon="!accounts.length ? '' : 'add'"
                        :label="!accounts.length ? 'Add a cheque account' : ''"
                        :button="!accounts.length"
                        :item="{type:'cash'}"
                        headline="Add a new cheque account">
                </account-dialog>
                <v-tab-item v-for="(cheque, index) in accounts" :key="cheque.id">
                    <cheque :account="cheque" ref="cheques"  v-if="activeTab === index"></cheque>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Cheque from './cheque'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        data: () => ({
            activeTab: null
        }),
        computed: {
            ...mapGetters({
                chequeAccounts: 'accounting/chequeAccounts',
                chequeReceivedAccount: 'accounting/chequeReceivedAccount',
            }),

            accounts() {
                // get cheque accounts exept  Cheques paid control
                let accounts = this.chequeAccounts.filter(account => account.name !== 'Cheques paid control a/c').slice(0)

                if(this.chequeReceivedAccount && this.chequeReceivedAccount.id) {
                    accounts.unshift(Object.assign({}, this.chequeReceivedAccount))
                }

                return accounts
            }
        },
        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
            save() {
                this.$refs.cheques[this.activeTab].save()
            },
            saveAsDraft() {
                this.$bus.$emit('saveAsDraftCheque');
            }
        },

        components: { Cheque, AccountingToolbar },
    }
</script>