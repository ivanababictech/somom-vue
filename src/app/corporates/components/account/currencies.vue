<template>
    <v-dialog v-model="account.showCurrencies" flat lazy persistent max-width="300px">
        <v-card>
            <v-card-title>
                <span class="headline">Select Currency</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout wrap>
                        <v-flex xx12>
                            <currencies v-model="account.currency" label="Currency"></currencies>
                        </v-flex>
                        <v-flex xx12 v-if="account.currency != company.currency && account.isOpeningBalance">
                            <v-text-field type="number" label="Foreign currency equivalent"
                                          v-model.number="account.foreign_amount"
                            ></v-text-field>
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
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                bankers: []
            }
        },

        props: ['account'],

        computed: {
            ...mapGetters({
                company: 'corporate/company',
            })
        },

        mounted() {
            this.getBankers()
        },

        methods: {
            getBankers() {
                this.$http.get('settings/bankers')
                    .then(({data}) => {
                        this.bankers = data;
                    })
            },

            cancel() {
                this.account.showCurrencies = false
                this.account.currency = null
            },

            submit() {
                this.account.showCurrencies = false
            },
        }
    }
</script>

<style scoped>

</style>