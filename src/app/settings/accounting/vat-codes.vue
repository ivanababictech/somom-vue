<template>
    <section>
        <v-card class="grey lighten-4 elevation-0">

            <v-card-title>
                <h3>VAT Codes</h3>
                <v-spacer></v-spacer>
                <v-btn fab dark small class="primary" @click="editVatCode({})">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-card-title>

            <v-subheader>
                <span class="subheading">Sales</span>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        v-model="search1"
                        single-line
                        clearable
                        style="max-width: 250px"
                ></v-text-field>
            </v-subheader>

            <v-data-table
                    :headers="headers"
                    :items="salesVatCodes"
                    :search="search1"
                    hide-actions>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.vat }}%</td>
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.wording }}</td>
                    <td>
                        <v-btn icon flat small color="primary" @click="editVatCode(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon flat small color="warning" @click="deleteVatCode(props.item)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>

            <v-subheader>
                <span class="subheading">Purchases</span>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        v-model="search2"
                        single-line
                        clearable
                        style="max-width: 250px"
                ></v-text-field>
            </v-subheader>

            <v-data-table
                    :headers="headers"
                    :items="purchasesVatCodes"
                    :search="search2"
                    hide-actions>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.vat }}%</td>
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.wording }}</td>
                    <td>
                        <v-btn icon flat small color="primary" @click="editVatCode(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon flat small color="warning" @click="deleteVatCode(props.item)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-card>

        <v-dialog v-model="dialog" persistent max-width="100%">
            <v-card>
                <v-card-title>
                    <span v-if="vat_code.id" class="headline">Edit VAT Code #{{ vat_code.id }}</span>
                    <span v-else class="headline">Add new VAT Code</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-radio-group label="Type*" v-model="vat_code.type" row hide-details>
                                    <v-radio label="Sales" value="sales"></v-radio>
                                    <v-radio label="Purchases" value="purchases"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm12 lg6>
                                <v-text-field label="VAT code name" required v-model="vat_code.name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg3>
                                <v-text-field label="VAT %" required v-model="vat_code.vat"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg3>
                                <v-text-field label="Box no." required v-model="vat_code.code"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea label="Wording" v-model="vat_code.wording" outline rows="2"
                                              hide-details></v-textarea>
                            </v-flex>
                        </v-layout>
                        <small>*indicates required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveVatCode">{{ vat_code.id ? 'Save' : 'Add' }}</v-btn>
                    <v-btn flat @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </section>
</template>

<script>
    import { http } from '@/plugins/http/index'
    import {fetchVatCodes} from '@/api/settings'

    export default {
        data: () => ({
            search1: '',
            search2: '',
            headers: [
                {text: 'VAT code name', value: 'name'},
                {text: 'VAT %', value: 'vat'},
                {text: 'Box no.', value: 'code'},
                {text: 'Wording', value: 'wording'},
                {text: 'Actions', value: null},
            ],
            dialog: false,
            vat_codes: [],
            vat_code: {}
        }),

        computed: {
            salesVatCodes() {
                return this.vat_codes.filter(vr => vr.type == 'sales')
            },
            purchasesVatCodes() {
                return this.vat_codes.filter(vr => vr.type == 'purchases')
            },
        },

        methods: {
            async fetchVatCodes() {
                this.vat_codes = await fetchVatCodes()
            },
            editVatCode(vat_code) {
                this.vat_code = Object.assign({}, vat_code)
                this.dialog = true
            },
            updateVatCode(vat_code) {
                this.$set(this.vat_codes, vat_code.id, vat_code)
                sessionStorage.setItem('vat_codes', JSON.stringify(this.vat_codes))
            },
            saveVatCode() {
                const vat_code = Object.assign({}, this.vat_code)

                let url = 'settings/vat-codes'

                if (!vat_code.id) {
                    // add
                    http.post(url, vat_code).then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.updateVatCode(data.data)
                            this.vat_code = {}
                            this.dialog = false
                        }
                    })
                } else {
                    // update
                    url += '/' + vat_code.id
                    http.put(url, vat_code).then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.updateVatCode(data.data)
                            this.vat_code = {}
                            this.dialog = false
                        }
                    })
                }
            },
            deleteVatCode({id}) {
                const url = `settings/vat-codes/${id}`
                http.delete(url)
                    .then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.$delete(this.vat_codes, this.vat_codes.findIndex(vr => vr.id == id))
                        }
                    })
            },
        },

        mounted() {
            this.fetchVatCodes()
        }

    }
</script>