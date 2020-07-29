<template>
    <v-dialog v-model="account.showBanksAccounts" flat lazy persistent max-width="300px">
        <v-card>
            <v-card-title>
                <span class="headline">Attach the new bank</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout wrap>
                        <v-flex xx12>
                            <v-autocomplete
                                    label="Select the bank"
                                    :items="availableBankAccounts"
                                    v-model="account.bank_id"
                                    item-text="name"
                                    item-value="id"
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn color="primary" flat @click="submit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    import * as chequeService from '@/app/accountings/components/dialogs/cheques/service'

    export default {
        props: ['account'],

        computed: {
            ...mapGetters({
                bankAccounts: 'accounting/bankAccounts',
            }),

            availableBankAccounts() {
                return this.bankAccounts.filter(account => account.currency == 'EUR' && !account.options.cheque_account_id)
            }
        },

        methods: {
            cancel() {
                this.account.showBanksAccounts = false
                this.account.bank_id = null
            },

            submit() {
                if(this.account.id) {
                    chequeService.assignBankAccountToCheque(this.account, this.account.bank_id)
                }

                this.account.showBanksAccounts = false
                this.account.options.bank_id = this.account.bank_id
                this.$emit('submit')
            },
        }
    }
</script>

<style scoped>

</style>