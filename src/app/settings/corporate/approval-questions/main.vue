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
                        label="Approval Question Name"
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
                {text: 'Name', value: 'name'},
                {text: 'Status', value: 'deleted_at'},
                {text: 'Actions', value: ''}
            ],
            item: {
                id: null,
                name: null
            },
            keys: ['id', 'name'],
            title: 'Approval questions',
            type: 'Approval question',
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