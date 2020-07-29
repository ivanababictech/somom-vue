<template>
    <div>
        <v-layout row align-end wrap>
            <v-flex xs6><h3>{{title}}</h3></v-flex>
            <v-flex xs6 class="text-xs-right">
                <v-btn small color="primary" @click="$emit('addNewAllowance')">
                    Add allowance
                </v-btn>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="allowances"
                :pagination.sync = "pagination"
                hide-actions
                class="elevation-1"
        >
        <template slot="items" slot-scope="props">
            <td class="grey lighten-4">
                <span class="info--text">{{ props.item.name }}</span></td>
            <td class="text-xs-left grey lighten-4">
                <span class="info--text">{{ props.item.value }}</span></td>
            <td class="text-xs-left grey lighten-4">
                <span class="info--text">{{ props.item.frequency }}</span></td>
            <td class="justify-center grey lighten-4 px-0">
                <v-btn small color="primary" @click="$emit('edit', props.item)">
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
        name: "allowances-table",
        props: ['title', 'allowances'],
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
                        text: 'Allowance title',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: 'Default value',
                        value: 'defaultValue',
                        sortable: false,

                    },
                    {
                        text: 'Frequency',
                        value: 'frequency',
                        sortable: false
                    },
                    {
                        text: 'Actions',
                        value: 'edit',
                        sortable: false
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>