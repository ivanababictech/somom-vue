<template>
    <div>
        <settings-table
                :headers="headers"
                :title="title"
                :items="items"
                hide-actions
                :softDelete="false"
                :keys="keys"
                @toggleDialog="toggleDialog"
                @destroy="destroy"
                @restoreLS="restoreLS">
        </settings-table>

        <settings-dialog
                :dialog="dialog"
                :invalid="$v.$invalid"
                :isUpdate="!!item.id || false"
                :type="type"
                @update="update"
                @add="add"
                @closeDialog="closeDialog"
        >
            <template slot="form">

                <v-flex md12>
                    <v-text-field
                            label="Name"
                            v-model="item.name"
                            required
                            @input="$v.item.name.$touch()"
                    ></v-text-field>
                </v-flex>
                <v-flex md12>
                    <v-checkbox v-model="item.is_default" label="Default"></v-checkbox>
                </v-flex>
            </template>
        </settings-dialog>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {required} from 'vuelidate/lib/validators';
    import isSettings from '@/app/settings/mixins/isSettings'
    import * as service from './service'

    export default {
        mixins: [isSettings],
        data: () => ({
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Actions', value: ''}
            ],
            item: {
                id: null,
                name: null,
                description: null,
            },
            keys: ['id', 'name'],
            title: 'Payment methods',
            type: 'Payment method',
            service: service,
        }),
        computed: {
            ...mapGetters({
                'paymentMethods': 'settings/corporate_payment_methods',
                'defaultPaymentMethod': 'settings/corporate_default_payment_method'
            }),
        },

        validations: {
            item: {
                name: {
                    required
                },
            }
        },
    }
</script>