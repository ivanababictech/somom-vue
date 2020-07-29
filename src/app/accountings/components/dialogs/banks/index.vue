<template>
    <v-card>
        <accounting-toolbar
                title="Banks"
                supplier
                customer
                directEntrySupplier
                @toggleDialog="toggleDialog('bank_entries')"
                @saveAsDraft="saveAsDraft">
        </accounting-toolbar>

        <v-card-text class="mt-5">
            <v-tabs v-model="activeTab">
                <v-tab v-for="(bank, index) in bankAccounts" :key="bank.id">{{ bank.name }}</v-tab>
                <account-dialog
                        :icon="!bankAccounts.length ? '' : 'add'"
                        :label="!bankAccounts.length ? 'Add a bank account' : ''"
                        :button="!bankAccounts.length"
                        :item="{type:'bank'}"
                        headline="Add a new bank account">
                </account-dialog>
                <v-tab-item lazy v-for="(bank, index) in bankAccounts" :key="bank.id">
                    <bank :account="bank" :ref="'bank' + index" v-if="activeTab === index"/>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Bank from './bank'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false
        }),

        computed: {
            ...mapGetters({
                bankAccounts: 'accounting/bankAccounts'
            })
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
            saveAsDraft(){
                this.$refs['bank' + this.activeTab][0].saveAsDraft()
            }
        },

        components: { Bank, AccountingToolbar },
    }
</script>