<template>
    <div>
        <v-card>
            <v-card-title>
                <h4 class="card-title">Audit sections</h4>
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
                    :items="sections"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td> {{ props.item.id }}</td>
                    <td> {{ props.item.name }}</td>
                    <td>
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
                            label="Section name"
                            v-model="section.name"
                            required
                            @input="$v.section.name.$touch()"
                    ></v-text-field>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!section.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="section.deleted_at" flat warning @click.native="restore">Restore</v-btn>
                    <v-btn v-else flat warning @click.native="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import { http } from '@/plugins/http/index';
    import {fetchAuditSections} from '@/api/audit'
    import {required} from 'vuelidate/lib/validators'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: '#ID', value: 'id'},
                {text: 'Section name', value: 'name'},
                {text: 'Actions', value: null},
            ],
            section: {},
            dialog: {
                visible: false,
                title: 'Add section',
            }
        }),

        validations: {
            section: {
                name: {
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

            toggleDialog(section) {
                if (section.id) {
                    this.dialog.title = 'Edit section';
                    this.section = section;
                } else {
                    this.dialog.title = 'Add section';
                    this.section = {}
                }
                this.dialog.visible = true;
            },

            add() {
                http.post('audit-sections', this.section)
                    .then(({data}) => {
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        });

                        if (data.success) {
                            // hide dialog
                            this.dialog.visible = false
                            this.sections.push(data.audit_section)
                        }
                    })
            },

            update() {
                const url = 'audit-sections/' + this.section.id
                http.put(url, this.section)
                    .then(({data}) => {
                        // show success notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })
                        if (data.success) {
                            // hide dialog
                            this.dialog.visible = false;
                        }
                    })
            },

            destroy() {
                const url = 'audit-sections/' + this.section.id;
                http.delete(url)
                    .then(({data}) => {
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message,
                        })

                        if (data.success) {
                            this.dialog.visible = false
                            this.section.deleted_at = true
                        }
                    })
            },

            restore() {
                const url = 'audit-sections/' + this.section.id + '/restore';
                http.put(url)
                    .then(({data}) => {
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        })

                        if (data.success) {
                            this.dialog.visible = false
                            this.section.deleted_at = null
                        }
                    })
            },
        },

    }
</script>
