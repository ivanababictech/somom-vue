<template>
    <section>
        <v-card class="grey lighten-4 elevation-0">
            <v-card-title>
                <h3>VAT Rates</h3>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        v-model="search"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn fab dark small class="primary" @click="editVatRate({})">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="vat_rates"
                    :search="search"
                    hide-actions
                    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.vat }}%</td>
                    <td>
                        <v-btn icon flat small color="primary" @click="editVatRate(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon flat small color="danger" @click="deleteVatRate(props.item)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-card>

        <v-dialog v-model="dialog" persistent max-width="100%">
            <v-card>
                <v-card-title>
                    <span v-if="vat_rate.id" class="headline">Edit VAT Rate #{{ vat_rate.id }}</span>
                    <span v-else class="headline">Add new VAT Rate</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex xs8>
                                <v-text-field label="VAT rate name" required v-model="vat_rate.name"></v-text-field>
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field label="VAT rate %" required v-model="vat_rate.vat"></v-text-field>
                            </v-flex>
                        </v-layout>
                        <small>*indicates required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveVatRate">{{ vat_rate.id ? 'Save' : 'Add' }}</v-btn>
                    <v-btn flat @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </section>
</template>

<script>
    import {http} from '@/plugins/http/index';
    import {fetchVatRates} from '@/api/settings'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Vat rate', value: 'vat'},
                {text: 'Actions', value: null},
            ],
            dialog: false,
            vat_rates: [],
            vat_rate: {}
        }),

        methods: {
            async fetchVatRates() {
                this.vat_rates = await fetchVatRates()
            },
            editVatRate(vat_rate) {
                this.vat_rate = Object.assign({}, vat_rate)
                this.dialog = true
            },
            updateVatRate(vat_rate) {
                const key = this.vat_rates.findIndex(({id}) => id == vat_rate.id)
                this.$set(this.vat_rates, key, vat_rate)
            },
            saveVatRate() {
                const vat_rate = Object.assign({}, this.vat_rate)

                let url = 'settings/vat-rates'

                if (!vat_rate.id) {
                    // add
                    http.post(url, vat_rate).then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.vat_rates.push(data.vat_rate)
                            this.vat_rate = {}
                            this.dialog = false
                        }
                    })
                } else {
                    // update
                    url += '/' + vat_rate.id
                    http.put(url, vat_rate).then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.updateVatRate(data.vat_rate)
                            this.vat_rate = {}
                            this.dialog = false
                        }
                    })
                }
            },
            deleteVatRate({id}) {
                const url = `settings/vat-rates/${id}`
                http.delete(url)
                    .then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.$delete(this.vat_rates, this.vat_rates.findIndex(vr => vr.id == id))
                        }
                    })
            },
        },

        mounted() {
            this.fetchVatRates()
        }

    }
</script>