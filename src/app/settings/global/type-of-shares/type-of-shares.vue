<template>
    <div>
        <settings-table
                :headers="headers"
                :title="title"
                :items="items"
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
                <v-text-field
                        label="Share type"
                        v-model="item.name"
                        required
                        @input="$v.item.name.$touch()"
                ></v-text-field>
            </template>
        </settings-dialog>

    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import isSettings from '../../mixins/isSettings'
    import * as service from './service'

    export default {
        mixins: [isSettings],
        data: () => ({
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Share type', value: 'name'},
                {text: 'Status', value: 'deleted_at'},
                {text: 'Actions', value: ''}
            ],
            keys: ['id', 'name'],
            item: {
                id: null,
                name: null,
                deleted_at: null
            },
            service: service,
            type: 'Share',
            title: 'Type of shares'
        }),

        validations: {
            item: {
                name: {
                    required
                }
            }
        }
    }
</script>