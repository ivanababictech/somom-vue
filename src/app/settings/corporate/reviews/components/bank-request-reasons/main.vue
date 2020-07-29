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
                    <v-select
                            label="Type"
                            v-model="item.type"
                            :items="['approved', 'disapproved']"
                            single-line
                    ></v-select>
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
                {text: 'Type', value: 'type'},
                {text: 'Actions', value: ''}
            ],
            item: {
                id: null,
                name: null,
                description: null,
            },
            keys: ['id', 'name', 'type'],
            title: 'Approval/disapproval reasons',
            type: 'Reason',
            service: service,
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