<template>
    <v-card class="grey lighten-4 elevation-0 mb-3">
        <v-card-text v-for="item in items" :key="item.uuid">
            <v-data-table
                    :headers="headers"
                    :items="item.logs"
                    hide-actions
                    disable-initial-sort
            >
                <template slot="items" slot-scope="props">
                    <tr :style="{backgroundColor: getLogColor(props.item)}">
                        <td>
                            <v-avatar class="mr-3">
                                <img :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'">
                            </v-avatar>
                            {{ props.item.user.full_name }}<br>
                        </td>
                        <td>{{ props.item.created_at | formatDate }}</td>
                        <td v-html="getType(props.item)"></td>
                        <td v-html="highlight(props.item.new_values.name, props.item.old_values.name)"></td>
                        <td v-html="highlight(props.item.new_values.amount, props.item.old_values.amount)"></td>
                        <td v-html="highlight(props.item.new_values.currency, props.item.old_values.currency)"></td>
                        <td v-html="getInterestPayable(props.item)"></td>
                        <td v-html="getCapitalRepayments(props.item)"></td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as corporateService from '@/app/corporates/service';
    import Mixin from '../../mixin'

    export default {
        data () {
            return {
                headers: [
                    { text: 'User', align: 'left', value: 'name'},
                    { text: 'Date', align: 'left', value: 'date'},
                    { text: 'Borrowing type', align: 'left', value: 'name'},
                    { text: 'Name of lender', value: 'old_value'},
                    { text: 'Enter amount', value: 'new_value', width: '100px'},
                    { text: 'Currency', value: 'new_value', width: '100px'},
                    { text: 'Interest rate', value: 'new_value'},
                    { text: 'Capital repayments', value: 'new_value'},
                ],
                logs: {
                    data: []
                }
            }
        },

        mixins: [Mixin],

        computed: {
            ...mapGetters({
                corporateTypes: 'settings/corporateTypes',
                corporate: 'corporate/data',
            }),

            corporateBorrowerTypes() {
                return this.corporateTypes.filter(corporateType => corporateType.section === corporateService.SECTION_BORROWING_ACTIVITIES);
            },
        },

        props: ['items', 'section'],

        methods: {
            getType(item) {
                let oldType = this.corporateBorrowerTypes.find(type => type.id === item.old_values.type);
                let newType = this.corporateBorrowerTypes.find(type => type.id === item.new_values.type);

                if(newType) {
                    return this.highlight(newType.name, oldType ? oldType.name : null)
                }
            },

            getInterestPayable(item) {
                let oldValues = null;
                let newValues = null;

                if(item.old_values.interest) {
                    oldValues = (item.old_values.interestRate || null) + ' (' + this.getInterestType(item.old_values.interestType) + ')';
                }

                if(item.new_values.interest) {
                    newValues = (item.new_values.interestRate || null) + ' (' + this.getInterestType(item.new_values.interestType) + ')';
                }

                return this.highlight(newValues, oldValues)
            },

            getCapitalRepayments(item) {
                let oldValues = null;
                let newValues = null;

                if(item.old_values.capitalRepayments) {
                    oldValues = item.old_values.amountRepaid;
                }

                if(item.new_values.capitalRepayments) {
                    newValues = item.new_values.amountRepaid;
                }

                return this.highlight(newValues, oldValues)
            },

            getInterestType(type) {
                var text = null;

                switch (type) {
                    case 'paid':
                        text = 'Interest will be paid';
                        break;
                    case 'accrue':
                        text = 'Interest will accrue to capital';
                        break;
                }

                return text;
            }
        }
    }
</script>