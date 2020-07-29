<template>
    <section>
        <v-toolbar dense flat height="38">
            <v-toolbar-items>
                <v-btn flat :to="{ name: 'BankDetails' }">Bank details</v-btn>
                <v-btn flat>Logo</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-btn small outline color="primary" @click="editBank({})">Add bank details</v-btn>
        </v-toolbar>

        <v-card class="grey lighten-4 elevation-0">

            <el-table
                    :data="banks"
                    max-height="400"
                    style="width: 100%">
                <el-table-column
                        label="Bank internal reference"
                        prop="reference">
                </el-table-column>
                <el-table-column
                        label="Bank name"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="SWIFT code"
                        prop="swift">
                </el-table-column>
                <el-table-column
                        label="IBAN"
                        prop="iban">
                </el-table-column>
                <el-table-column
                        label="Account holder name"
                        prop="holder">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="Operations">
                    <template slot-scope="scope">
                        <div class="text-xs-center">
                            <v-btn icon flat small color="primary" @click="editBank(Object.assign({}, scope.row))">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn icon flat small color="warning" @click="deleteBank(scope.row)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </v-card>

        <bank-details :bank="bank" @submit="submitBank"></bank-details>
    </section>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as banksService from './service'
    import BankDetails from './bank'

    export default {
        data() {
            return {
                dialog: false,
                search: '',
                bank: {},
                banks: [],
            }
        },

        mounted() {
            this.getBanks()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            toggleDialog() {
                this.dialog = !this.dialog
            },

            editBank(bank = {}) {
                this.bank = Object.assign({}, bank)

                this.toggleDialog()
            },

            getBanks() {
                this.setFetching({ fetching: true })

                banksService.get()
                    .then(response => {
                        this.banks = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            submitBank() {
                if(this.bank.id) {
                    return this.updateBank()
                }

                return this.createBank()
            },

            createBank() {
                banksService.create(this.bank)
                    .then(response => {

                        this.toggleDialog()
                        this.getBanks()
                    })
            },

            updateBank() {
                banksService.update(this.bank)
                    .then(response => {
                        this.setMessage({ type: 'success', message: response.message })
                        this.toggleDialog()
                        this.getBanks()
                    })
            },

            deleteBank(bank) {
                this.setFetching({ fetching: true })

                banksService.remove(bank)
                    .then(response => {
                        this.setMessage({ type: 'success', message: response.message })

                        this.getBanks()
                    })
            },

        },

        components: { BankDetails }
    }
</script>
