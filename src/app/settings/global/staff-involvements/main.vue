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
                        label="Person Name & Surname"
                        v-model="item.name"
                        required
                        @input="$v.item.name.$touch()"
                ></v-text-field>
                <v-select
                        :items="types"
                        v-model="item.type"
                        label="Type"
                ></v-select>
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
                {text: 'Name & surname', value: 'name'},
                {text: 'Type', value: 'type'},
                {text: 'Status', value: 'deleted_at'},
                {text: 'Actions', value: ''}
            ],
            item: {
                id: null,
                name: null,
                type: null
            },
            types: [
                'Audit Employee',
                'Audit Manager',
                'Audit Partner',
            ],
            keys: ['id', 'name', 'type'],
            title: 'Staff Involvements',
            type: 'Person',
            service: service
        }),
        validations: {
            item: {
                name: {
                    required
                },
            }
        }
    }
</script>