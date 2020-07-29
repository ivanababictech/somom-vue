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
                :isUpdate="!!item.banker_id || false"
                :type="type"
                @update="update"
                @add="add"
                @closeDialog="closeDialog"
        >
            <template slot="form">
                <v-text-field
                        label="Title"
                        v-model="item.banker_name"
                        @input="$v.item.banker_name.$touch()"
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
                    {text: 'Id', align: 'left', value: 'banker_id'},
                    {text: 'Name', value: 'banker_name'},
                    {text: 'Status', value: 'deleted_at'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
                item: {
                    banker_id: null,
                    banker_name: null,
                    deleted_at: null
                },
                keys: ['banker_id', 'banker_name'],
                service: service,
                title: 'Bankers',
                type: 'banker'
            }
        ),
        validations: {
            item: {
                banker_name: {
                    required
                }
            }
        }
    }
</script>