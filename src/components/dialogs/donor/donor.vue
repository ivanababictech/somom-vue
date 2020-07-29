<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="700px">
        <v-btn :icon="icon" :small="small" :flat="flat" color="primary" dark slot="activator">
            <v-icon v-if="icon">{{ label }}</v-icon>
            <template v-else>{{ label }}</template>
        </v-btn>
        <v-card>
            <v-card-title>
                <span v-if="donor.id" class="headline">Edit donor #{{ donor.id }}</span>
                <span v-else class="headline">Add new pledgor</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs4>
                            <v-text-field label="Name" v-model="donor.name" required></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field label="Email" v-model="donor.email" required></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field label="Mobile number" v-model="donor.mobile_number" required></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn color="primary" flat @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import {saveDonor} from '@/api/accounting'
    import {mapGetters} from 'vuex'

    export default {
        name: 'DonorDialog',
        componentName: 'DonorDialog',
        props: {
            label: {
                type: String,
                default: 'Add pledgor'
            },
            icon: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            flat: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                default: () => ({})
            },
        },
        data() {
            return {
                dialog: false,
                donor: Object.assign({}, this.item)
            }
        },
        computed: {
            ...mapGetters({
                donationAccounts: 'accounting/donationAccounts',
            })
        },
        watch: {
            item(item) {
                this.donor = Object.assign({}, item)
            }
        },
        methods: {
            reset() {
                setTimeout(() => {
                    this.donor = Object.assign({}, this.item)
                }, 200)
            },
            cancel() {
                this.dialog = false
                this.reset()
            },
            save() {
                saveDonor(this.donor).then(({data}) => {
                    if (data.success) {
                        this.dialog = false
                        if (!this.donor.id) {
                            this.reset()
                        }
                    }
                })
            },
        },
    }
</script>
