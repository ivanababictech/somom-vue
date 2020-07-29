<template>
    <div>
        <v-card>
            <v-card-title>
                <v-layout row align-center>
                    <div class="headline">Is Review</div>
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
                    :items="Reviews"
                    class="elevation-5"
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.title }}</td>
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
                        <v-flex xs12>
                            <v-text-field
                                    label="Audit step title"
                                    v-model="Review.title"
                                    required
                                    @input="$v.Review.title.$touch()"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-text-field
                                label="Input question"
                                v-model="Review.inputQuestion"
                                required
                                @input="$v.Review.inputQuestion.$touch()"
                        ></v-text-field>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs6>
                            <v-textarea
                                    label="Remark if question is answered yes"
                                    v-model="Review.remarkYes"
                                    required
                                    @input="$v.Review.remarkYes.$touch()"
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs6 ml-3>
                            <v-textarea
                                    label="Remark if question is answered no"
                                    v-model="Review.remarkNo"
                                    @input="$v.Review.remarkNo.$touch()"
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions v-if="!Review.id">
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="add">Add</v-btn>
                </v-card-actions>
                <v-card-actions v-else>
                    <v-spacer></v-spacer>
                    <v-btn flat primary :disabled="$v.$invalid" @click.native="update">Update</v-btn>
                    <v-btn v-if="Review.deleted_at" flat success @click.native="restore">Restore
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
    import * as ReviewService from './service'

    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title', value: 'title'},
                {text: 'Input Question', value: 'inputQuestion'},
                {text: 'Remark Yes', value: 'remarkYes'},
                {text: 'Remark No', value: 'remarkNo'},
                {text: 'Actions', value: ''}
            ],
            Review: {
                id: null,
                title: null,
                inputQuestion: null,
                remarkYes: null,
                remarkNo: null
            },
            dialog: {
                visible: false,
                title: 'Add Review',
            },
            Reviews: []
        }),

        validations: {
            Review: {
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
            this.fetchReviews()
        },

        methods: {
            ...mapActions({
                snackbar: 'snackbar/update'
            }),

            fetchReviews() {
                ReviewService.get()
                    .then(response => this.Reviews = JSON.parse(response) || [])
            },

            toggleDialog(Review) {
                if (Review.id) {
                    this.dialog.title = 'Edit Review';
                    this.Review = Review;
                } else {
                    this.dialog.title = 'Add Review';
                    this.Review = {
                        id: null,
                        title: null,
                        inputQuestion: null,
                        remarkYes: null,
                        remarkNo: null
                    };
                }
                this.dialog.visible = true;
            },
            add() {
                this.Review.id = this.Reviews.length + 1
                let Reviews = this.Reviews
                Reviews.push(this.Review)
                ReviewService.create(Reviews)
                this.fetchReviews()
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
