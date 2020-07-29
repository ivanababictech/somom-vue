<template>
    <v-card>
        <accounting-toolbar
                title="Pledges"
                :saveDraft="false"
                saveNormal
                @toggleDialog="toggleDialog('donations')"
                @save="save">
        </accounting-toolbar>

        <v-card-text class="mt-5">

            <v-data-table
                    :headers="headers"
                    :items="donations"
                    hide-actions
                    class="v-form-table">

                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="px-1">
                            <v-text-field v-model="props.item.data.name" hide-details></v-text-field>
                        </td>
                        <td class="px-1">
                            <v-text-field v-model="props.item.data.email" hide-details></v-text-field>
                        </td>
                        <td class="px-1">
                            <v-text-field v-model="props.item.data.mobile_number" hide-details></v-text-field>
                        </td>
                        <td class="px-1">
                            <date-picker v-model="props.item.date" full-width hide-details></date-picker>
                        </td>
                        <td class="px-1">
                            <v-text-field v-model="props.item.receipt_number" hide-details></v-text-field>
                        </td>
                        <td class="px-1">
                            <v-text-field v-model.number="props.item.amount" hide-details></v-text-field>
                        </td>
                        <td class="px-1">
                            <v-checkbox v-model="props.item.data.email_receipt" @change="emailAll = false"></v-checkbox>
                        </td>
                    </tr>
                </template>

                <template slot="no-data">
                    <v-alert :value="true" color="grey lighten-4">
                        <p class="grey--text">No data</p>
                    </v-alert>
                </template>

                <template slot="footer">
                    <td><strong>Total</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>{{ total | n }}</strong></td>
                    <td>
                        <v-checkbox v-model="emailAll" @change="thickAll"></v-checkbox>
                    </td>
                </template>

            </v-data-table>

        </v-card-text>

    </v-card>
</template>

<script>
    import _ from 'lodash'
    import {saveDonations} from '@/api/accounting'
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as donationService from './service'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        components: {
            AccountingToolbar
        },

        data: () => ({
            donations: [],
            headers: [
                {text: 'Name', value: 'name', sortable: false},
                {text: 'Email', value: 'email', sortable: false},
                {text: 'Mobile number', value: 'mobile_number', sortable: false},
                {text: 'Date', value: 'date', sortable: false},
                {text: 'Receipt no.', value: 'receipt_no', sortable: false},
                {text: 'Amount', value: 'amount', sortable: false},
                {text: 'Email receipt', value: 'email_receipt', sortable: false},
            ],
            temp: {},
            emailAll: false,
        }),

        computed: {
            ...mapGetters({
                donors: 'accounting/donors',
            }),

            total() {
                let total = 0
                this.donations.forEach(donation => {
                    if (!isNaN(donation.amount)) {
                        total += parseFloat(donation.amount)
                    }
                })
                return total
            },
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            addRow() {
                this.donations.push({data: {}, email_receipt: false})
            },
            addRows(no = 5) {
                for (let i = 0; i < no; i++) {
                    this.addRow()
                }
            },
            thickAll($event) {
                this.donations.forEach(donation => donation.email_receipt = $event)
            },
            donorChange(item, donor) {
                if (typeof donor == 'string') {
                    this.$set(item, 'donor', donor)
                    this.$set(item, 'donor_id', null)
                }
                if (typeof donor == 'object') {
                    this.$set(item, 'donor', donor.name)
                    this.$set(item, 'donor_id', donor.id)
                }
            },
            save() {
                const donations = this.donations.reduce((filtered, donation, index) => {
                    if (donation.date && donation.receipt_number && donation.amount) {
                        filtered.push(donation)
                    }
                    return filtered
                }, [])

                donationService.create({donations})
                    .then(response => {
                        this.reset()
                    })
            },
            reset() {
                this.toggleDialog('donations')
                setTimeout(() => {
                    this.donations = []
                    this.addRows()
                }, 350)
            }
        },

        mounted() {
            this.addRows()
        }
    }
</script>