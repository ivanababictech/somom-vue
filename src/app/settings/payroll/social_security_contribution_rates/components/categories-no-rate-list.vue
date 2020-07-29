<template>
    <v-card>
        <v-card-title>Categories without rate</v-card-title>
        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="categories"
                    hide-actions
                    class="elevation-1"
            >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">
                        <span>{{ props.item.name }}</span></td>
                    <td class="text-xs-left">
                        <v-btn color="primary" small @click="change(props.item)">set rate</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "categories-no-rate-list",
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