<template>
    <div>
        <v-layout row align-end wrap>
            <v-flex xs6><h3>Current departments</h3></v-flex>
            <v-flex xs6 class="text-xs-right">
                <v-btn small color="primary" @click="$emit('addNewDepartment')">
                    Add departments
                </v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="departments"
                :pagination.sync = "pagination"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="grey lighten-4">
                    <span class="info--text">{{ props.item.name }}</span></td>
                <td class="justify-center text-xs-center grey lighten-4 px-0">
                    <v-btn small color="info" @click="$emit('edit', props.item)">
                        Edit
                    </v-btn>
                </td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "departments-table",
        props: ['title', 'departments'],
        computed: {
            pages () {
                if (this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                ) return 0;

                return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
            }
        },
        data () {
            return {
                pagination: {
                    rowsPerPage: 3
                },
                headers: [
                    {
                        text: 'Department title',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Actions',
                        value: 'edit',
                        align: 'center',
                        sortable: false
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>