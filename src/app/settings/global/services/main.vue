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
                        label="Title"
                        v-model="item.title"
                        @input="$v.item.title.$touch()"
                        required
                ></v-text-field>
                <v-text-field
                        label="Fee"
                        v-model="item.fee"
                        @input="$v.item.fee.$touch()"
                        required
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
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Title', value: 'title'},
                    {text: 'Service fee', value: 'fee'},
                    {text: 'Status', value: 'deleted_at'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
                item: {
                    id: null,
                    title: null,
                    fee: null,
                    deleted_at: null
                },
                keys: ['id', 'title', 'fee'],
                service: service,
                title: 'Service',
                type: 'Service'
            }
        ),
        validations: {
            item: {
                title: {
                    required
                },
                fee: {
                    required
                }
            }
        },
    }
</script>
