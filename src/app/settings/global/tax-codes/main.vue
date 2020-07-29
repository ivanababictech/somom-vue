<template>
    <div>
        <settings-table
                :headers="headers"
                :items="items"
                :title="title"
                :keys="keys"
                @toggleDialog="toggleDialog"
                @destroy="destroy"
                @restoreLS="restore">
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
                        label="Name"
                        v-model="item.name"
                        @input="$v.item.name.$touch()"
                        required
                ></v-text-field>
            </template>
        </settings-dialog>
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import * as taxCodeService from './service'
    import isSettings from '../../mixins/isSettings'

    export default {
        mixins: [isSettings],
        data: () => ({
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Status', value: 'status'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
                item: {
                    id: null,
                    name: null,
                    deleted_at: null
                },
                keys: ['id', 'name'],
                service: taxCodeService,
                title: 'Tax Codes',
                type: 'Tax Codes'
            }
        ),
        validations: {
            item: {
                name: {
                    required
                },
            }
        },
    }
</script>
