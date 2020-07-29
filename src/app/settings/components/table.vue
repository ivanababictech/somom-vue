<template>
    <v-card>
        <v-card-title>
            <v-layout row align-center>
                <div class="headline">{{ title }}</div>
            </v-layout>
            <v-spacer></v-spacer>

            <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
            ></v-text-field>

            <v-btn fab class="primary white--text" small @click.native.stop="toggleDialog(false)">
                <v-icon dark>add</v-icon>
            </v-btn>

        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="items"
                :hide-actions="hideActions"
                class="elevation-5"
                :search="search"
        >
            <template slot="items" slot-scope="props">
                <template v-for="key in keys">
                    <td>{{ props.item[key] }}</td>
                </template>
                <td v-if="softDelete">{{ props.item.deleted_at ? 'Archived' : 'Active' }}</td>
                <td>
                    <v-btn icon @click.native.stop="toggleDialog(props.item)">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    <v-btn icon v-if="!props.item.deleted_at" @click="destroy(props.item)">
                        <v-icon color="danger">delete</v-icon>
                    </v-btn>
                    <v-btn icon v-else @click.native.stop="restoreLS(props.item)">
                        <v-icon color="success">restore_from_trash</v-icon>
                    </v-btn>
                </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default{
        props: {
            headers: {
                type: Array,
                required: true
            },
            items: {
                type: Array,
                required: true
            },
            keys: {
                type: Array,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            hideActions: {
                type: Boolean,
                default: false
            },
            softDelete: {
                type: Boolean,
                default: true
            },
        },
        data: () => ({
            search: ''
        }),
        methods: {
            toggleDialog (item) {
                this.$emit('toggleDialog', item)
            },
            restoreLS (item) {
                this.$emit('restoreLS', item)
            },
            destroy (item) {
                this.$emit('destroy', item)
            }
        }
    }
</script>