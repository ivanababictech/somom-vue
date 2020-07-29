<template>
    <v-card>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="categories"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">
                        <span>{{ props.item.name }}</span>
                    </td>
                    <td class="text-xs-right">
                        <span v-if="props.item.income_tax_rates.length === 1">{{ props.item.income_tax_rates[0].rate }} %</span>
                        <rate-table
                                v-if="props.item.income_tax_rates.length > 1"
                                :rates="props.item.income_tax_rates">
                        </rate-table>
                    </td>
                    <td class="text-xs-left">
                        <v-btn color="primary" small @click="change(props.item)">Change rate</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import RateTable from "./rate-table";

    export default {
        components: {RateTable},
        name: "categories-rate-list",
        props: ['categories'],
        methods: {
            change(category) {
                this.$emit('submitted', category);
            }
        },
        data: function () {
            return {
                headers: [
                    {
                        text: 'Category Name',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Rate',
                        value: 'value',
                        sortable: false,
                    },
                    {
                        text: '',
                        value: 'options',
                        sortable: false
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>