<template>
    <v-container fluid grid-list-md>
        <v-form @submit.prevent lazy-validation>
            <template v-for="key in Object.keys(structure)">
                <v-layout align-center row>
                    <div
                        class="headline"
                        v-if="key === 'bank'">
                        Request for bank reference letter details requirement.
                    </div>
                    <div class="headline"
                         v-else>
                        Request for professional reference letter details requirement.
                    </div>
                </v-layout>
                <template v-for="type in types">
                    <v-layout align-center row>
                        <v-flex md2>
                            <p class="pt-3 title">{{ type }}</p>
                        </v-flex>
                        <v-flex md4 v-if="involvementsAvailable(type)">
                            <v-select
                                :disabled="structure[key][type].for_all"
                                :items="involvements(type)"
                                label="Select involvement"
                                multiple
                                v-model="structure[key][type].involvements"
                            ></v-select>
                        </v-flex>
                        <v-flex md1>
                            <v-checkbox
                                @change="structure[key][type].involvements = []"
                                label="ALL"
                                v-model="structure[key][type].for_all"
                            >
                            </v-checkbox>
                        </v-flex>
                    </v-layout>
                </template>
            </template>
            <v-layout align-center row>
                <v-spacer></v-spacer>
                <v-btn @click="save()"
                       color="primary"
                       type="submit">
                    Save
                </v-btn>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    import formMixin from '../../mixins/form';

    export default {
        props: ['references'],

        mixins: [formMixin],

        data()
        {
            return {
                structure: {
                    bank: {
                        Individual: {
                            involvements: [],
                            for_all: false
                        },
                        Corporate: {
                            involvements: [],
                            for_all: false
                        },
                        Trust: {
                            involvements: [],
                            for_all: false
                        },
                        Foundation: {
                            involvements: [],
                            for_all: false
                        },
                    },
                    professional: {
                        Individual: {
                            involvements: [],
                            for_all: false
                        },
                        Corporate: {
                            involvements: [],
                            for_all: false
                        },
                        Trust: {
                            involvements: [],
                            for_all: false
                        },
                        Foundation: {
                            involvements: [],
                            for_all: false
                        },
                    },
                }
            }
        },
        beforeMount()
        {
            for (let key in this.references) {
                for (let index in this.references[key]) {
                    let type = this.references[key][index].type;
                    this.structure[key][type].involvements = this.references[key][index].involvements;
                    this.structure[key][type].for_all = this.references[key][index].for_all;
                }
            }
        },
        methods: {
            involvements(type)
            {
                return this[`involvements${type}`];
            },
            involvementsAvailable(type)
            {
                return (type !== 'Trust' && type !== 'Foundation');
            },
            save()
            {
                let data = [];

                for (let key in this.structure) {
                    for (let type in this.structure[key]) {
                        data.push({
                            reference_type: key,
                            type,
                            for_all: this.structure[key][type].for_all,
                            involvements: this.structure[key][type].involvements
                        })
                    }
                }

                this.$emit('save', data)
            }
        },
    }
</script>