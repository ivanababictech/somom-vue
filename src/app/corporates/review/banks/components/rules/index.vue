<template>
    <v-dialog v-model="display" max-width="1024px" persistent>
        <v-card>
            <v-toolbar color="accent">
                <v-icon @click="closeDialog()">close</v-icon>
                <v-toolbar-title>Rules</v-toolbar-title>
                <v-btn icon color="primary" @click="openNewRule">
                    <v-icon>add</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <materiality></materiality>
                <v-btn color="primary" @click="generateRules">AUTOMATIC RULES</v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-data-table
                            :headers="headers"
                            :items="rules.data"
                            hide-actions
                            class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td>{{ splitKeywords(props.item.keywords) }}</td>
                            <td>{{ props.item.allocation_type }}</td>
                            <td>{{ props.item.allocation }}</td>
                            <td>
                                <v-btn flat small color="primary" @click="editRule(props.item)">EDIT</v-btn>
                                <v-btn flat small color="danger" @click="removeRule(props.item)">DELETE</v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="closeDialog">Close</v-btn>
                <v-spacer></v-spacer>
                <div class="text-xs-center" v-if="rules.last_page > 1">
                    <v-pagination :length="rules.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                </div>
            </v-card-actions>
        </v-card>
        <create-rule
                :editItem="editRuleItem || {}"
                v-if="newRuleDialog"
                @save="save"
                @update="update"
                @close="newRuleDialog = false"
        >
        </create-rule>
    </v-dialog>
</template>

<script>
    import CreateRule from './create'
    import Materiality from './materiality'
    import * as rulesService from './service'

    export default {
        data() {
            return {
                headers: [
                    {text: 'Keywords', value: 'keywords'},
                    {text: 'Allocation Type', value: 'allocation_type'},
                    {text: 'Allocation', value: 'allocation'},
                    {text: 'Actions', value: ''},
                ],
                display: true,
                editRuleItem: null,
                newRuleDialog: false,
                rules: [],
                currentPage: 1,
                generatedRules: false
            }
        },

        mounted() {
            this.getRules()
        },

        methods: {
            getRules() {
                const params = {
                    page: this.currentPage,
                    generated: this.generatedRules,
                }

                rulesService.get(params)
                    .then(response => {
                        this.rules = response.data
                    })
            },

            closeDialog() {
                this.$emit('close')
            },
            splitKeywords(keywords) {
                return keywords.join()
            },

            openNewRule() {
                this.editRuleItem = null
                this.newRuleDialog = true
            },
            removeRule(rule) {
                rulesService.remove(rule)
                    .then(response => {
                        this.getRules()
                    })
            },
            editRule(rule) {
                this.editRuleItem = rule
                this.editRuleItem.allocation = this.editRuleItem.allocation_id
                this.newRuleDialog = true
            },
            update() {
                rulesService.update(this.editRuleItem)
                this.newRuleDialog = false
            },
            save(rules) {
                rulesService.create(rules)
                    .then(response => {
                        this.getRules()
                        this.$emit('updated-rules')

                        this.newRuleDialog = false
                    })
            },
            isRuleValid(rule) {
                return rule.keywords && rule.allocation_type
            },

            generateRules() {
                this.generatedRules = !this.generatedRules
            }
        },

        watch: {
            generatedRules: 'getRules',
            currentPage: 'getRules',
        },

        components: {CreateRule, Materiality},
    }
</script>