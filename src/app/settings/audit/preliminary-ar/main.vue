<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">Preliminary AR</div>
                </v-layout>
                <v-spacer></v-spacer>

                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                ></v-text-field>

                <v-btn fab dark small class="primary" @click.native.stop="toggleDialog">
                    <v-icon dark>add</v-icon>
                </v-btn>

            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="preliminaryArs"
                    class="elevation-5"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.auditAccountingSection }}</td>
                    <td>{{ props.item.assignedAccount }}</td>
                    <td>{{ props.item.subAccount }}</td>
                    <td>{{ props.item.inputQuestion }}</td>
                    <td>{{ props.item.remarkYes }}</td>
                    <td>{{ props.item.remarkNo }}</td>
                    <td>
                        <v-btn icon @click.native.stop="toggleDialog(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    From {{ pageStart }} to {{ pageStop }}
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog.visible" absolute width="600">
            <v-card>
                <v-card-title class="headline">{{ dialog.title }}</v-card-title>
                <v-card-text>
                    <v-layout row>
                        <v-flex xs6>
                            <v-select
                                    :items="sections"
                                    label="Audit & Accounting section"
                                    item-text="name"
                                    item-value="id"
                                    v-model="preliminaryAr.auditAccountingSection"
                            ></v-select>
                        </v-flex>
                        <v-flex xs6 ml-3>
                            <v-select
                                    :items="assignedAccounts"
                                    label="Link assigned account"
                                    item-text="name"
                                    item-value="id"
                                    v-model="preliminaryAr.assignedAccount"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6>
                            <v-select
                                    :items="accounts"
                                    label="Select sub-account"
                                    item-text="sub_account.name"
                                    item-value="id"
                                    v-model="preliminaryAr.subAccount"
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-text-field
                                label="Input question"
                                v-model="preliminaryAr.inputQuestion"
                                required
                                @input="$v.preliminaryAr.inputQuestion.$touch()"
                        ></v-text-field>
                    </v-layout>

                    <v-layout row>
                        <v-textarea
                                label="Remark if question is answered yes"
                                v-model="preliminaryAr.remarkYes"
                                required
                                @input="$v.preliminaryAr.remarkYes.$touch()"
                        ></v-textarea>
                    </v-layout>
                    <v-layout row>
                        <v-textarea
                                label="Remark if question is answered no"
                                v-model="preliminaryAr.remarkNo"
                                required
                                @input="$v.preliminaryAr.remarkNo.$touch()"
                        ></v-textarea>
                    </v-layout>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!preliminaryAr.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="preliminaryAr.deleted_at" flat success @click.native="restore">Restore
                    </v-btn>
                    <v-btn v-else flat warning @click.native="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {http} from '@/plugins/http/index'
    import {required} from 'vuelidate/lib/validators';
    import * as preliminaryArService from './service'
    import * as sectionsService from '../../global/audit-accounting-section/service'
    import * as balanceService from '../../../audit/components/accounts/service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Audit & Accounting Section', value: 'auditAccountingSection'},
                {text: 'Assigned Account', value: 'assignedAccount'},
                {text: 'Sub-account', value: 'subAccount'},
                {text: 'Input Question', value: 'inputQuestion'},
                {text: 'Remark Yes', value: 'remarkYes'},
                {text: 'Remark No', value: 'remarkNo'},
                {text: 'Actions', value: ''}
            ],
            preliminaryAr: {
                id: null,
                auditAccountingSection: null,
                assignedAccount: null,
                subAccount: null,
                inputQuestion: null,
                remarkYes: null,
                remarkNo: null
            },
            dialog: {
                visible: false,
                title: 'Add preliminary AR',
            },
            preliminaryArs: [],
            sections: [],
            accounts: []
        }),

        validations: {
            preliminaryAr: {
                inputQuestion: {
                    required
                },
                remarkYes: {
                    required
                },
                remarkNo: {
                    required
                }
            }
        },

        mounted() {
            this.fetchPreliminaryArs()
            this.fetchSections();
            this.getOpeningBalancesAccounts();
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            fetchSections() {
                sectionsService.get()
                    .then(response =>  this.sections = JSON.parse(response) || [])
            },
            getOpeningBalancesAccounts() {
                balanceService.getAccounts()
                    .then(response => this.accounts = response.data)
            },

            fetchPreliminaryArs() {
                preliminaryArService.get()
                    .then(response => this.preliminaryArs = JSON.parse(response) || [])
            },

            toggleDialog(preliminaryAr) {
                if (preliminaryAr.id) {
                    this.dialog.title = 'Edit Preliminary AR';
                    this.preliminaryAr = preliminaryAr;
                } else {
                    this.dialog.title = 'Add Preliminary AR';
                    this.preliminaryAr = {
                        id: null,
                        auditAccountingSection: null,
                        assignedAccount: null,
                        subAccount: null,
                        inputQuestion: null,
                        remarkYes: null,
                        remarkNo: null
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.preliminaryAr.id = this.preliminaryArs.length + 1
                let preliminaryArs = this.preliminaryArs
                preliminaryArs.push(this.preliminaryAr)
                preliminaryArService.create(preliminaryArs)
                this.fetchPreliminaryArs()
                this.dialog.visible = false;
            }
        },
        computed: {
            ...mapGetters([
                'assignedAccounts'
            ])
        }
    }
</script>
