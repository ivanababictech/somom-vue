<template>
    <v-card>
        <v-card-title>Categories with rate</v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="categories"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left grey lighten-4">
                        <span class="info--text">{{ props.item.name }}</span>
                    </td>
                    <td class="text-xs-right grey lighten-4">
                        <span>{{ props.item.social_security_contribution_rates.weekly_rate }} %</span>
                    </td>
                    <td class="text-xs-right grey lighten-4">
                        <span>{{ props.item.social_security_contribution_rates.weekly_max }}</span>
                    </td>
                    <td class="text-xs-left grey lighten-4">
                        <v-btn color="info" small @click="change(props.item)">Change rate</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "categories-rate-list",
        props: ['categories'],
        methods: {
            change (category) {
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
                        text: 'Weekly rate',
                        align: 'right',
                        value: 'weekly_rate',
                        sortable: false,
                    },
                    {
                        text: 'Weekly maximum',
                        align: 'right',
                        value: 'weekly_max',
                        sortable: false,
                    },
                    {
                        text: '',
                        align: 'right',
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