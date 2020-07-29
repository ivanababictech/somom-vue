<template>
    <div v-if="item">
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
                <v-layout row>
                    <v-flex>
                        <v-text-field
                                label="Question title"
                                v-model="item.title"
                                required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex>
                        <v-select
                                :items="sectionTypes"
                                v-model="item.section"
                                label="Select section"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex v-if="! item.is_standard">
                        <v-select
                                :items="companyActivities"
                                v-model="item.data.activities"
                                label="Select activities"
                                item-text="name"
                                item-value="id"
                                multiple
                        ></v-select>
                    </v-flex>
                    <v-flex>
                        <v-checkbox v-model="item.is_standard" label="Standard question"></v-checkbox>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-label>Select Answer format</v-label>
                </v-layout>
                <v-layout>
                    <v-btn :color="isActiveFormat('y_n') ? 'primary' : ''"
                           @click="setFormat('y_n')">Y/N Format</v-btn>
                    <v-btn :color="isActiveFormat('textarea') ? 'primary' : ''"
                           @click="setFormat('textarea')">Textarea</v-btn>
                    <v-btn :color="isActiveFormat('dropdown') ? 'primary' : ''"
                           @click="setFormat('dropdown')">Dropdown</v-btn>
                </v-layout>
                <div v-if="item.format === 'dropdown'">
                    <v-label>Input dropdown list</v-label>
                    <v-btn fab dark small color="primary" @click="addDropdownItem()">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-layout v-for="(dropdownItem, index) in item.data.dropdownItems" :key="index">
                        <v-text-field label="Input dropdown item value"
                                      v-model="item.data.dropdownItems[index].value"></v-text-field>
                        <v-btn v-if="index > 0"
                               fab dark small color="error" @click="removeDropdownItem(index)">
                            <v-icon dark>remove</v-icon>
                        </v-btn>
                    </v-layout>
                </div>
            </template>
        </settings-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {required} from 'vuelidate/lib/validators';
    import isSettings from '@/app/settings/mixins/isSettings'
    import * as service from './service'

    export default {
        mixins: [isSettings],
        data: () => ({
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Title', value: 'name'},
                {text: 'Section', value: 'deleted_at'},
                {text: 'Actions', value: ''}
            ],
            item: {
                title: null,
                section: null,
                data: {
                    activities: [],
                    dropdownItems: [
                        {value: null}
                    ]
                },
                is_standard: false,
                format: null
            },
            itemStructure: {
                title: null,
                section: null,
                data: {
                    activities: [],
                    dropdownItems: [
                        {value: null}
                    ]
                },
                is_standard: false,
                format: null
            },
            keys: ['id', 'title', 'section'],
            title: 'Questions',
            type: 'Question',
            service: service,
            corporateQuestions: [],
        }),

        computed: {
            ...mapGetters({
                sectionTypes: 'settings/corporateSections',
                companyActivities: 'settings/company_activities',
            }),
        },

        validations: {
            item: {
                title: {
                    required
                },
            }
        },

        methods: {
            setFormat(format) {
                this.item.format = format;
            },

            isActiveFormat(format) {
                return this.item.format === format;
            },

            addDropdownItem() {
                this.item.data.dropdownItems.push({value: null})
            },

            removeDropdownItem(index) {
                this.item.data.dropdownItems.splice(index, 1);
            },

            resetItem() {
                this.item = this.itemStructure
            },
        },

        watch: {
           /* 'item.is_standard': {
                handler(newVal) {
                    if (! newVal)
                        this.item.data.activities = [];
                }
            }*/
        }
    }
</script>