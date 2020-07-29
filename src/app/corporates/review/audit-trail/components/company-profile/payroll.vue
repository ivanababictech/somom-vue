<template>
    <v-card class="grey lighten-4 elevation-0 mb-3">
        <v-card-text v-for="item in items" :key="item.uuid">
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
                        <td v-html="highlight(props.item.new_values.number, props.item.old_values.number)"></td>
                        <td v-html="highlight(props.item.new_values.locations.join(), props.item.old_values.locations.join())"></td>
                        <td v-html="highlight(props.item.new_values.yearly_wage, props.item.old_values.yearly_wage)"></td>
                        <td v-html="highlight(props.item.new_values.yearly_director, props.item.old_values.yearly_director)"></td>
                    </tr>
                </template>
            </v-data-table>
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
                    { text: 'User', align: 'left', value: 'name', width: '250px'},
                    { text: 'Date', align: 'left', value: 'date', width: '100px'},
                    { text: 'Number of employees', align: 'left', value: 'name', width: '200px'},
                    { text: 'Location of employees', value: 'old_value', width: '300px'},
                    { text: 'Expected yearly wage cost', value: 'new_value', width: '100px'},
                    { text: 'Expected yearly director fees', value: 'new_value', width: '100px'},
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