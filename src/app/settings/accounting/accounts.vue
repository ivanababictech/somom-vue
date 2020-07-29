<template>
    <section>
        <v-card class="grey lighten-4 elevation-0">

            <v-subheader>
                <span class="subheading">Accounts settings</span>
                <v-spacer></v-spacer>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        v-model="search"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn fab dark small class="primary" @click="editAccount({})">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-subheader>

            <v-data-table
                    :headers="headers"
                    :items="accounts"
                    :search="search"
                    hide-actions
                    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.assigned_account ? props.item.assigned_account.name : '' }}</td>
                    <td>{{ props.item.sub_account ? props.item.sub_account.name : '' }}</td>
                    <td>{{ props.item.fs_title }}</td>
                    <td>{{ props.item.tax_code }}</td>
                    <td>
                        <v-btn icon flat small color="primary" @click.prevent="editAccount(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon flat small color="warning" @click.prevent="deleteAccount(props.item.id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-card>

        <v-dialog v-model="dialog" persistent max-width="100%">
            <v-card>
                <v-card-title>
                    <span v-if="account.id" class="headline">Edit {{ account.name }} account</span>
                    <span v-else class="headline">Add new account</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex sm12 lg4>
                                <v-text-field label="Account name" v-model="account.name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-select
                                        label="Assigned account"
                                        :items="assigned_accounts"
                                        v-model="account.assigned_account"
                                        item-text="name"
                                        item-value="id"
                                        autocomplete
                                        return-object
                                        required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-select
                                        label="Sub account"
                                        :items="account.assigned_account ? account.assigned_account.sub_accounts : []"
                                        v-model="account.sub_account_id"
                                        item-text="name"
                                        item-value="id"
                                        no-data-text="No sub account available"
                                        autocomplete
                                        required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field label="FS Title" v-model="account.fs_title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field label="Tax code" v-model="account.tax_code"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Keywords" v-model="account.keywords" textarea></v-text-field>
                            </v-flex>
                        </v-layout>
                        <small>*indicates required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="saveAccount">{{ account.id ? 'Save' : 'Add' }}</v-btn>
                    <v-btn flat @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </section>
</template>

<script>
    import _ from 'lodash'
    import {http} from '@/plugins/http/index'
    import {mapGetters} from 'vuex'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Account', value: 'name'},
                {text: 'Assigned account', value: 'assigned_account.name'},
                {text: 'Sub account', value: 'sub_account.name'},
                {text: 'FS title', value: 'fs_title'},
                {text: 'Tax code', value: 'tax_code'},
                {text: 'Actions', value: null},
            ],
            dialog: false,
            account: {}
        }),

        computed: {
            ...mapGetters({
                accounts: 'settings/accounts',
                assigned_accounts: 'assignedAccounts'
            }),
        },

        methods: {
            editAccount(account = {}) {
                this.account = Object.assign({}, account)
                this.dialog = true
            },
            updateAccount(account) {
                const key = this.accounts.findIndex(({id}) => id == account.id)
                this.$set(this.accounts, key, account)
            },
            saveAccount() {
                const account = Object.assign({}, this.account)
                account.assigned_account_id = account.assigned_account.id
                delete account.assigned_account

                let url = 'accounts'

                if (!account.id) {
                    // add
                    http.post(url, account).then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.accounts.push(data.account)
                            this.account = {}
                            this.dialog = false
                        }
                    })
                } else {
                    // update
                    url = url + '/' + account.id
                    http.put(url, account).then(({data}) => {
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.updateAccount(data.account)
                            this.account = {}
                            this.dialog = false
                        }
                    })
                }
            },
            deleteAccount(id) {
                const url = `accounts/${id}`
                http.delete(url)
                    .then(({data}) => {
                        // show success notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            this.$delete(this.accounts, this.accounts.findIndex(account => account.id == id))
                        }
                    })
            },
        },
    }
</script>