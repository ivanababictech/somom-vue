<template>
    <v-card class="grey lighten-4 elevation-0 mb-3">
        <v-card-text v-for="item in items" :key="item.uuid">
            <v-layout row class="text-xs-center">
                <v-data-table
                        :headers="headers"
                        :items="item.logs"
                        class="elevation-1"
                        hide-actions
                        disable-initial-sort
                >
                    <template slot="items" slot-scope="props">
                        <tr :style="{backgroundColor: getLogColor(props.item)}" @click="getLogs(props)">
                            <td>
                                <v-avatar class="mr-3">
                                    <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'">
                                </v-avatar>
                                {{ props.item.user.full_name }}<br>
                            </td>
                            <td>{{ props.item.created_at | formatDate }}</td>
                            <td v-html="highlight(props.item.new_values.type, props.item.old_values.type)"></td>
                            <td v-html="highlight(props.item.new_values.name, props.item.old_values.name)"></td>
                            <td v-html="highlight(props.item.new_values.goodName, props.item.old_values.goodName)"></td>
                            <td v-html="highlight(props.item.new_values.countries.join(), props.item.old_values.countries.join())"></td>
                            <td v-html="highlight(props.item.new_values.estimatedAmount, props.item.old_values.estimatedAmount)"></td>
                            <td v-html="highlight(props.item.new_values.currency, props.item.old_values.currency)"></td>
                            <td v-html="highlight(props.item.new_values.methodOfPayment, props.item.old_values.methodOfPayment)"></td>
                        </tr>
                    </template>
                </v-data-table>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as corporateService from '@/app/corporates/service';
    import * as LogService from '../../service'
    import Mixin from '../../mixin'

    export default {
        data () {
            return {
                headers: [
                    { text: 'User', align: 'left', value: 'name'},
                    { text: 'Date', align: 'left', value: 'date'},
                    { text: 'Type', align: 'left', value: 'name'},
                    { text: 'Supplier name', value: 'old_value'},
                    { text: 'Good name', value: 'new_value'},
                    { text: 'Supplier country', value: 'new_value'},
                    { text: 'Estimated expense', value: 'new_value'},
                    { text: 'Currency', value: 'new_value', width: '100px'},
                    { text: 'Method of payment', value: 'new_value', width: '100px'},
                ],
                logs: {
                    data: []
                }
            }
        },

        mixins: [Mixin],

        props: ['items', 'section'],

        methods: {
            getLogs(item) {
                return false;

                item.expanded = !item.expanded;

                LogService.getByUuid(this.section, item.item.uuid)
                    .then(response => this.items = response.data)
            },
        }
    }
</script>