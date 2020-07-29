<template>
    <div>
        <v-card>
            <v-card-title>
                <h4 class="card-title">Company activities</h4>

                <v-spacer></v-spacer>

                <v-text-field
                        append-icon="search"
                        label="Search"
                        v-model="search"
                ></v-text-field>

                <v-btn fab dark small primary @click="toggleDialog">
                    <v-icon dark>add</v-icon>
                </v-btn>

            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="company_activities"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-right">{{ props.item.ca_id }}</td>
                    <td class="text-xs-right">{{ props.item.name }}</td>
                    <td class="text-xs-right">
                        <v-btn icon @click="toggleDialog(props.item)">
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
                    <v-text-field
                            label="Company activity"
                            v-model="company_activity.name"
                            required
                            @input="$v.company_activity.name.$touch()"
                    ></v-text-field>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!company_activity.ca_id">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" :disabled="$v.$invalid" @click="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" :disabled="$v.$invalid" @click="update">Update</v-btn>
                    <v-btn flat color="warning" @click="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import { http } from '@/plugins/http/index';
    import {required} from 'vuelidate/lib/validators';

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'ca_id'},
                {text: 'Company activity', value: 'name'},
            ],
            company_activities: [],
            company_activity: {
                name: null,
            },
            dialog: {
                visible: false,
                title: 'Add company activity',
            }
        }),

        validations: {
            company_activity: {
                name: {
                    required
                },
            }
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            toggleDialog(company_activity) {
                if (company_activity.ca_id) {
                    this.dialog.title = 'Edit company activity';
                    this.company_activity = company_activity;
                } else {
                    this.dialog.title = 'Add company activity';
                    this.company_activity = {
                        name: null,
                    };
                }
                this.dialog.visible = true;
            },

            add() {
                http.post('settings/company-activities', this.company_activity)
                    .then(({data}) => {
                        if (data.success) {
                            // hide form
                            this.dialog.visible = false
                            this.company_activities.push(data.company_activity)
                        }
                        // show notification
                        this.snackbar({
                            visible: true,
                            success: data.success,
                            text: data.message,
                        })
                    })
            },

            update() {
                const url = 'settings/company-activities/' + this.company_activity.ca_id

                http.put(url, this.company_activity)
                    .then(({data}) => {
                        if (data.success) {
                            // hide form
                            this.dialog.visible = false;
                        }
                        // show success notification
                        this.snackbar({
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                    })
            },

            destroy() {
                const url = 'settings/company-activities/' + this.company_activity.ca_id
                http.delete(url)
                    .then(({data}) => {
                        if (data.success) {
                            this.dialog.visible = false
                            this.$delete(this.company_activities, _.findIndex(this.company_activities, (ca) => ca.ca_id == this.company_activity.ca_id))
                        }
                        // show success notification
                        this.snackbar({
                            visible: true,
                            success: data.success,
                            text: data.message
                        });
                    })
            },
        },

        created() {
            http.get('settings/company-activities')
                .then(({data}) => {
                    if (data.success) {
                        this.company_activities = data.company_activities
                    }
                })
        }

    }
</script>
