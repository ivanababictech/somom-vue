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
                <v-text-field
                        label="Type title"
                        v-model="item.name"
                        required
                        @input="$v.item.name.$touch()"
                ></v-text-field>
                <v-autocomplete
                        label="Applicable section"
                        v-model="item.section"
                        :items="sectionTypes"
                        single-line
                ></v-autocomplete>
                <v-flex v-if="!item.is_standard">
                    <v-select
                            :items="companyActivities"
                            v-model="item.activities_id"
                            label="Select activities"
                            item-text="name"
                            item-value="id"
                            multiple
                    ></v-select>
                </v-flex>
                <v-flex>
                    <v-checkbox v-model="item.is_standard" label="Standard activity"></v-checkbox>
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
                {text: 'Section', value: 'deleted_at'},
                {text: 'Activity', value: 'activity_id'},
                {text: 'Actions', value: ''}
            ],
            item: {
                id: null,
                name: null,
                section: null,
            },
            keys: ['id', 'name', 'section', 'activities_id'],
            title: 'Corporate Types',
            type: 'Corporate Type',
            service: service,
        }),

        computed: {
            ...mapGetters({
                sectionTypes: 'settings/corporateSections',
                companyActivities: 'settings/company_activities',
            }),
        },

        validations: {
            item: {
                name: {
                    required
                },
            }
        },

        watch: {
            'item.is_standard'() {
                if(this.item.is_standard) {
                    this.item.activities_id = []
                }
            }
        }
    }
</script>