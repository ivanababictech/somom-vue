<template>
    <v-card>
        <v-card-title>
            <h2>{{category.name}}</h2>
            <v-spacer/>
            <v-btn color="primary" @click="$emit('add', category)">Add</v-btn>
        </v-card-title>
        <v-divider/>
        <v-data-table
                :items="category.items"
                hide-actions
                hide-headers
                class="elevation-1">
            <template
                    slot="items"
                    slot-scope="props"
            >
                <td>
                    <template v-for="(field, i) in fields">
                        <template v-if="i > 0">  -</template>
                        {{props.item[field.name]}}
                    </template>
                </td>

                <td class="justify-center text-xs-right">
                    <v-btn color="primary" @click="$emit('edit', category, props.item)">Edit</v-btn>
                    <v-btn color="error" @click="$emit('destroy', category, props.item)">Delete</v-btn>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "crud-table",
        props: {
            category: {
                type: Object,
                required: true
            }
        },
        computed: {
            fields() {
                return this.category.fields.filter(field => field.display)
            }
        }
    }
</script>

<style scoped>

</style>