<template>
    <v-container grid-list-md>
        <v-form @submit.prevent="submit()" lazy-validation>
            <v-layout row>
                <v-flex xs4>
                    <v-text-field
                            label="Question title"
                            v-model="item.title"
                            required
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <h3>Dropdown selection</h3>
                    <v-data-table
                            :headers="headers"
                            :items="items"
                            v-if="items"
                            class="elevation-0"
                            :hide-actions="true"
                            :disable-initial-sort="true"
                    >
                        <template slot="items" slot-scope="props">
                            <td>
                                <v-text-field
                                        label="Title"
                                        v-model="props.item.title"
                                        required
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                        label="Mark"
                                        v-model="props.item.mark"
                                        required
                                ></v-text-field>
                            </td>
                            <td>
                                <v-btn icon class="mx-0">
                                    <v-icon color="teal" @click="addItem">add</v-icon>
                                </v-btn>
                                <v-btn icon class="mx-0">
                                    <v-icon color="danger" @click="removeItem(item)" v-if="items.indexOf(item)" :disabled="!(items.length > 1)">delete</v-icon>
                                </v-btn>
                            </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-btn type="submit" color="info">Submit</v-btn>
                    <v-btn :to="{ name: 'corporate.corporate-settings.items', params: { corporateSettingsId: corporateSetting.id } }">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        props: ['type', 'item', 'items', 'corporateSetting'],

        data() {
            return {
                headers: [
                    {text: 'Title', value: 'title'},
                    {text: 'Mark', value: 'mark'},
                    {text: 'Actions', value: 'name', sortable: false}
                ],
            }
        },

        methods: {
            isNumber(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            checkElement(el) {
                return (typeof el.title !== 'undefined' && typeof el.mark !== 'undefined' &&
                    el.title !== null && this.isNumber(el.mark))
            },
            submit() {
                if (this.type === 'create') {
                    this.$bus.$emit('createSettingsItem', {
                        title: this.item.title,
                        items: this.items.filter((el) => {
                            if (this.checkElement(el)) return el
                        }),
                    });
                }
                if (this.type === 'edit') {
                    this.$bus.$emit('editSettingsItem', {
                        id: this.item.id,
                        title: this.item.title,
                        items: this.items.filter((el) => {
                            if (this.checkElement(el)) return el
                        })
                    });
                }
            },
            addItem() {
                this.items.push({
                    id: null,
                    title: null,
                    mark: null
                });
            },
            removeItem(item) {
                this.items.splice(this.items.indexOf(item), 1);
            }
        }
    }
</script>