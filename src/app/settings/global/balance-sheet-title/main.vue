<template>
    <div>
        <settings-table
                :headers="headers"
                :items="items"
                :title="title"
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
                        label="Sheet Name"
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
    import * as service from './service'
    import isSettings from '../../mixins/isSettings'

    export default {
        mixins: [isSettings],
        data: () => ({
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title name', value: 'name'},
                {text: 'Status', value: 'deleted_at'},
                {text: 'Actions', value: ''}
            ],
            item: {
                id: null,
                name: null,
                deleted_at: null
            },
            keys: ['id', 'name'],
            service: service,
            title: 'Balance sheet title',
            type: 'Sheet'
        }),

        validations: {
            item: {
                name: {
                    required
                },
            }
        },
    }
</script>