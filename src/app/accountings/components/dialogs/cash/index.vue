<template>
    <v-card>
        <accounting-toolbar
                title="Cash"
                supplier
                customer
                @toggleDialog="toggleDialog('cash_entries')"
                @saveAsDraft="saveAsDraft">
        </accounting-toolbar>

        <v-card-text class="mt-5">
            <v-tabs v-model="activeTab">
                <v-tab v-for="(account, index) in cashAccounts" :key="account.id">{{ account.name }}</v-tab>
                <account-dialog
                        :icon="!cashAccounts.length ? '' : 'add'"
                        :label="!cashAccounts.length ? 'Add a cash account' : ''"
                        :button="!cashAccounts.length"
                        :item="{type:'cash'}"
                        headline="Add a new cash account">
                </account-dialog>
                <v-tab-item v-for="(account, index) in cashAccounts" :key="account.id">
                    <cash :account="account" ref="cashes" v-if="activeTab == index"/>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Cash from './cash'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        data: () => ({
            activeTab: null
        }),
        computed: {
            ...mapGetters({
                cashAccounts: 'accounting/cashAccounts'
            })
        },
        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
            save() {
                this.$refs.cashes[this.activeTab].save()
            },
            saveAsDraft() {
                this.$bus.$emit('saveAsDraftCash');
            }
        },

        components: { Cash, AccountingToolbar },
    }
</script>