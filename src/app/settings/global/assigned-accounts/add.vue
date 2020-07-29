<template>
    <v-card>
        <v-card-text>
            <form @submit.prevent="add">
                <h2 class="title mb-3">Add assigned account</h2>
                <v-container fluid grid-list-md>

                    <v-layout wrap>
                        <v-flex xs6 md3>
                            <v-text-field
                                    label="Name"
                                    v-model="assigned_account.name"
                                    required
                                    @input="$v.assigned_account.name.$touch()"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs6 md3>
                            <v-text-field
                                    label="Tax code"
                                    v-model="assigned_account.tax_code"
                                    type="number"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 md6>
                            <v-text-field
                                    label="Description"
                                    v-model="assigned_account.description"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-select
                                    label="Audit sections"
                                    :items="sections"
                                    v-model="assigned_account.audit_sections"
                                    item-text="name"
                                    item-value="id"
                                    multiple
                            ></v-select>
                        </v-flex>
                    </v-layout>

                </v-container>
                <small>*indicates required field</small>

                <div class="mt-3">
                    <v-btn color="green" :dark="!$v.$invalid" :disabled="$v.$invalid" type="submit">Add Assigned Account</v-btn>
                    <v-btn flat to="/settings/assigned-accounts">Cancel</v-btn>
                </div>

            </form>
        </v-card-text>
    </v-card>
</template>

<script>

    import { mapActions } from 'vuex'
    import {http} from '@/plugins/http';
    import {fetchAuditSections} from '@/api/audit'
    import {required} from 'vuelidate/lib/validators'
    import { fetchAssignedAccounts } from '@/api/settings'

    export default {
        data: () => ({
            assigned_account: {},
        }),

        validations: {
            assigned_account: {
                name: {
                    required
                },
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

            resetForm() {
                this.assigned_account = {}
            },

            add() {
                http.post('settings/assigned-accounts', this.assigned_account)
                    .then(({data}) => {
                        fetchAssignedAccounts()

                        this.setMessage({ type: 'success', message: data.message })

                        this.$router.push({
                            name: 'global.assigned-accounts',
                            params: {id: data.data.id}
                        })
                    })
            },
        },
    }
</script>

<style scoped>
    .input-group {
        padding-bottom: 0;
    }
</style>