<template>
    <v-card>
        <v-card-text>
            <v-tabs v-model="activeTab">
                <v-tab v-for="(bank, index) in bankAccounts" :key="bank.id">{{ bank.name }}</v-tab>
                <account
                        :icon="!bankAccounts.length ? '' : 'add'"
                        :label="!bankAccounts.length ? 'Add a bank account' : ''"
                        :button="!bankAccounts.length"
                        :item="{type:'bank'}"
                        headline="Add a new bank account">
                </account>
                <v-tab-item lazy v-for="(bank, index) in bankAccounts" :key="bank.id">
                    <bank :account="bank" :ref="'bank' + index" v-if="activeTab === index"/>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Bank from './components/bank'
    import Account from '../../components/account'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false
        }),

        computed: {
            ...mapGetters({
                bankAccounts: 'corporate/bankAccounts'
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

        components: { Bank, Account },
    }
</script>