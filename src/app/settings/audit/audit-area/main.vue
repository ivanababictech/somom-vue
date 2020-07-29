<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">Audit area</div>
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
                    :items="areas"
                    class="elevation-5"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.title }}</td>
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
                    <v-text-field
                            label="Title"
                            v-model="area.title"
                            required
                            @input="$v.area.title.$touch()"
                    ></v-text-field>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!area.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="area.deleted_at" flat success @click.native="restore">Restore</v-btn>
                    <v-btn v-else flat warning @click.native="destroy">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import { http } from '@/plugins/http/index'
    import {required} from 'vuelidate/lib/validators';
    import * as areaService from './service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title', value: 'title'},
                {text: 'Actions', value: ''}
            ],
            area: {
                id: null,
                title: ''
            },
            dialog: {
                visible: false,
                title: 'Add area',
            },
            areas: []
        }),

        validations: {
            area: {
                title: {
                    required
                }
            }
        },

        mounted() {
            this.fetchAreas()
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            fetchAreas() {
                areaService.get()
                    .then(response => {
                        this.areas = JSON.parse(response) || []
                    })
            },

            toggleDialog(area) {
                if (area.id) {
                    this.dialog.title = 'Edit Area';
                    this.area = area;
                } else {
                    this.dialog.title = 'Add Area';
                    this.area = {
                        title: null
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.area.id = this.areas.length + 1
                let areas = this.areas
                areas.push(this.area)
                areaService.create(areas)
                this.fetchAreas()
                this.dialog.visible = false;
            },
            update() {},

            destroy() {},

            restore() {

            },
        },

    }
</script>
