<template>
    <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>

            <v-flex xs12>
                <v-card v-if="assigned_account" flat>

                    <v-toolbar card class="white" prominent>
                        <v-toolbar-title class="grey--text">Edit Assigned Account</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-card-text>

                        <v-layout row wrap>
                            <v-flex md4>
                                <v-text-field
                                        label="Assigned Account Name"
                                        v-model="assigned_account.name"
                                        required
                                        @input="$v.assigned_account.name.$touch()"
                                ></v-text-field>
                            </v-flex>

                            <!--<v-flex md2>-->
                                <!--<v-text-field-->
                                        <!--label="Tax code"-->
                                        <!--v-model="assigned_account.tax_code"-->
                                        <!--type="number"-->
                                <!--&gt;</v-text-field>-->
                            <!--</v-flex>-->

                            <!--<v-flex md6>-->
                                <!--<v-text-field-->
                                        <!--label="Description"-->
                                        <!--v-model="assigned_account.description"-->
                                <!--&gt;</v-text-field>-->
                            <!--</v-flex>-->

                            <!--<v-flex xs12>-->
                                <!--<v-select-->
                                        <!--label="Audit sections"-->
                                        <!--:items="sections"-->
                                        <!--v-model="assigned_account.audit_sections"-->
                                        <!--item-text="name"-->
                                        <!--item-value="id"-->
                                        <!--multiple-->
                                <!--&gt;</v-select>-->
                            <!--</v-flex>-->

                        </v-layout>

                        <small>*indicates required field</small>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="primary" flat :disabled="$v.assigned_account.$invalid" @click="update">Update
                        </v-btn>
                        <v-btn v-if="assigned_account.deleted_at" color="warning" flat @click="restore">Restore</v-btn>
                        <v-btn v-else color="warning" flat @click="destroy">Delete</v-btn>
                        <v-btn flat active-class="" to="/assigned-accounts">Cancel</v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>

            <v-flex xs12>
                <v-card flat>
                    <v-toolbar card class="white" prominent>
                        <v-toolbar-title class="grey--text">Sub Accounts</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-text-field
                                append-icon="search"
                                label="Search sub account"
                                single-line
                                v-model="search.sub_account"
                        ></v-text-field>

                        <v-btn fab dark small color="primary" @click="toggleSubAccountDialog()">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-data-table
                            :headers="headers.sub_accounts"
                            :items="assigned_account.sub_accounts"
                            :search="search.sub_account">

                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.id }}</td>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.type }}</td>
                            <td>
                                <v-btn icon @click.stop="toggleSubAccountDialog(props.item)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                            From {{ pageStart }} to {{ pageStop }}
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>

            <!--<v-flex xs12>-->
                <!--<v-card flat>-->

                    <!--<v-toolbar card class="white" prominent>-->
                        <!--<v-toolbar-title class="grey&#45;&#45;text">Wordings</v-toolbar-title>-->

                        <!--<v-spacer></v-spacer>-->

                        <!--<v-text-field-->
                                <!--append-icon="search"-->
                                <!--label="Search wording"-->
                                <!--single-line-->
                                <!--v-model="search.wording"-->
                        <!--&gt;</v-text-field>-->

                        <!--<v-btn fab dark small color="primary" @click.stop="toggleWordingDialog">-->
                            <!--<v-icon dark>add</v-icon>-->
                        <!--</v-btn>-->
                    <!--</v-toolbar>-->

                    <!--<v-divider></v-divider>-->

                    <!--<v-data-table-->
                            <!--v-bind:headers="headers.wordings"-->
                            <!--v-bind:items="assigned_account.wordings"-->
                            <!--v-bind:search="search.wording"-->
                    <!--&gt;-->
                        <!--<template slot="items" slot-scope="props">-->
                            <!--<td>{{ props.item.id }}</td>-->
                            <!--<td>{{ props.item.section_id }}</td>-->
                            <!--<td>{{ props.item.wording }}</td>-->
                            <!--<td>-->
                                <!--<v-btn icon @click.stop="toggleWordingDialog(props.item)">-->
                                    <!--<v-icon>edit</v-icon>-->
                                <!--</v-btn>-->
                            <!--</td>-->
                        <!--</template>-->
                        <!--<template slot="pageText" slot-scope="{ pageStart, pageStop }">-->
                            <!--From {{ pageStart }} to {{ pageStop }}-->
                        <!--</template>-->
                    <!--</v-data-table>-->
                <!--</v-card>-->
            <!--</v-flex>-->

        </v-layout>

        <v-dialog v-model="dialog.sub_account.visible" absolute max-width="600">
            <v-card>
                <v-card-title class="headline">{{ dialog.sub_account.title }}</v-card-title>

                <v-card-text>
                    <v-text-field
                            label="Sub Account name"
                            v-model="sub_account.name"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Tax code"
                            v-model="sub_account.tax_code"
                    ></v-text-field>
                    <v-text-field
                            label="Description"
                            v-model="sub_account.description"
                    ></v-text-field>
                    <v-select
                            label="Type"
                            :items="subAccountTypes"
                            v-model="sub_account.type"
                            required
                    ></v-select>
                    <small>*indicates required field</small>
                </v-card-text>

                <v-card-actions v-if="sub_account.id">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" :disabled="$v.sub_account.$invalid" @click="updateSubAccount">Update
                    </v-btn>
                    <v-btn flat color="warning" @click="destroySubAccount">Delete</v-btn>
                </v-card-actions>

                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="dialog.sub_account.visible = false">Close</v-btn>
                    <v-btn flat color="primary" :disabled="$v.sub_account.$invalid" @click="addSubAccount">Add</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog.wording.visible" max-width="600">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ dialog.wording.title }}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                            label="Wording"
                            v-model="wording.wording"
                            required
                            @input="$v.wording.wording.$touch()"
                    ></v-text-field>
                    <v-autocomplete
                            label="Section"
                            :items="sections || []"
                            v-model="wording.section_id"
                            item-text="name"
                            item-value="id"
                            required
                            @input="$v.wording.section_id.$touch()"
                    ></v-autocomplete>
                    <small>*indicates required field</small>
                </v-card-text>

                <v-card-actions v-if="wording.id">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" :disabled="$v.wording.$invalid" @click="updateWording">Update</v-btn>
                    <v-btn flat color="warning" @click="destroyWording">Delete</v-btn>
                </v-card-actions>

                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="dialog.wording.visible = false">Close</v-btn>
                    <v-btn flat color="primary" :disabled="$v.wording.$invalid" @click="addWording">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import { http } from '@/plugins/http/index';
    import {fetchAuditSections} from '@/api/audit'
    import {required} from 'vuelidate/lib/validators'
    import _ from 'lodash'
    import { fetchAssignedAccounts } from '@/api/settings'

    export default {
        data: () => ({
            assigned_account: {
                sub_accounts: []
            },
            search: {
                sub_account: '',
                wording: '',
            },
            headers: {
                sub_accounts: [
                    {text: 'ID', value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Type', value: 'type'},
                    {text: 'Actions', value: null}
                ],
                wordings: [
                    {text: 'ID', value: 'id'},
                    {text: 'Section', value: 'section_id'},
                    {text: 'Wording', value: 'wording'},
                    {text: null, value: null}
                ]
            },
            dialog: {
                sub_account: {
                    visible: false,
                    title: ''
                },
                wording: {
                    visible: false,
                    title: ''
                },
                question: {
                    visible: false,
                    title: ''
                }
            },
            sub_account: {},
            wording: {},
            subAccountTypes: ['Balance sheet', 'Profit & Loss']
        }),

        validations: {
            assigned_account: {
                name: {
                    required
                },
            },
            sub_account: {
                name: {
                    required
                },
                type: {
                    required
                }
            },
            wording: {
                wording: {
                    required
                },
                section_id: {
                    required
                }
            }
        },

        asyncComputed: {
            sections: {
                default: [],
                get: () => fetchAuditSections(),
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            update() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id
                const assigned_account = this.assigned_account
                assigned_account.audit_sections = _.map(assigned_account.audit_sections, section => {
                    if (section.section_id) {
                        return section.section_id;
                    }
                    return section;
                });

                http.put(url, assigned_account)
                    .then(({data}) => {
                        fetchAssignedAccounts()

                        this.setMessage({ type: 'success', message: data.message })
                    })
            },

            destroy() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id
                http.delete(url)
                    .then(({data}) => {
                        fetchAssignedAccounts()

                        this.setMessage({ type: 'success', message: data.message })
                    })
            },

            restore() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/restore';
                http.put(url)
                    .then(({data}) => {fetchAssignedAccounts()

                        this.setMessage({ type: 'success', message: data.message })
                    });
            },

            // Sub Accounts

            toggleSubAccountDialog(sub_account) {
                if (sub_account && sub_account.id) {
                    this.dialog.sub_account.title = 'Edit sub account';
                    this.sub_account = sub_account;
                } else {
                    this.dialog.sub_account.title = 'Add sub account';
                    this.sub_account = {}
                }
                this.dialog.sub_account.visible = true;
            },

            addSubAccount() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/sub-accounts'
                http.post(url, this.sub_account)
                    .then(({data}) => {
                        if (data.success) {
                            this.dialog.sub_account.visible = false;
                            this.assigned_account.sub_accounts.push(data.sub_account);
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        });
                    })
            },

            updateSubAccount() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/sub-accounts/' + this.sub_account.id
                http.put(url, this.sub_account)
                    .then(({data}) => {
                        if (data.success) {
                            // hide dialog
                            this.dialog.sub_account.visible = false;
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
            },

            destroySubAccount() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/sub-accounts/' + this.sub_account.id
                http.delete(url)
                    .then(({data}) => {
                        if (data.success) {
                            // hide dialog
                            this.dialog.sub_account.visible = false;
                            // remove sub account
                            _.remove(this.assigned_account.sub_accounts, ({id}) => id === this.sub_account.id)
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
            },

            // Wordings

            toggleWordingDialog(wording) {
                if (wording.id) {
                    this.dialog.wording.title = 'Edit wording';
                    this.wording = wording;
                } else {
                    this.dialog.wording.title = 'Add wording';
                    this.wording = {
                        section_id: null,
                        wording: null
                    };
                }
                this.dialog.wording.visible = true;
            },

            addWording() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/wordings';
                http.post(url, this.wording)
                    .then(({data}) => {
                        if (data.success) {
                            this.dialog.wording.visible = false;
                            this.assigned_account.wordings.push(data.wording);
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        });
                    })
            },

            updateWording() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/wordings/' + this.wording.id;
                http.put(url, this.wording)
                    .then(({data}) => {
                        if (data.success) {
                            // hide dialog
                            this.dialog.wording.visible = false;
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
            },

            destroyWording() {
                const url = 'settings/assigned-accounts/' + this.assigned_account.id + '/wordings/' + this.wording.id;
                http.delete(url)
                    .then(({data}) => {
                        if (data.success) {
                            // hide dialog
                            this.dialog.wording.visible = false;
                            // remove wording
                            _.remove(this.assigned_account.wordings, ({id}) => id === this.wording.id)
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });
                    })
            }
        },

        mounted() {
            const url = 'settings/assigned-accounts/' + this.$route.params.assigned_account_id + '?with[]=auditSections&with[]=wordings&with[]=subAccounts';
            http.get(url).then(({data}) => {
                if (data) {
                    this.assigned_account = data
                }
            })
        }
    }
</script>

<style scoped>
    .input-group {
        padding-bottom: 0;
    }
</style>
