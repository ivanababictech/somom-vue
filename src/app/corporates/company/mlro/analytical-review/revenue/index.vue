<template>
    <div>
        <v-card>
            <v-toolbar dense color="primary" dark>
                <v-toolbar-title>Revenue</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-data-table :items="types.revenue.data" :headers="headers" hide-actions>
                    <template slot="items" slot-scope="props">
                        <template v-for="(type, itemIndex) in props.item">
                            <tr style="background: #eee;">
                                <td>
                                    <v-subheader>{{ $helpers.titleize(itemIndex) }}</v-subheader>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr v-for="item in type">
                                <td>{{ item.name }}</td>
                                <td>{{ item.countries }}</td>
                                <td>{{ item.local }}</td>
                                <td>{{ item.eu }}</td>
                                <td>{{ item.non_eu }}</td>
                                <td>{{ item.total }}</td>
                            </tr>
                        </template>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import * as analyticalReviewService from '../service'

    export default {
        data() {
            return {
                types: {
                    revenue: {
                        data: []
                    }
                },
                headers: [
                    {text: 'Name', value: 'name'},
                    {text: 'Countries', value: 'companies'},
                    {text: 'Local', value: 'local'},
                    {text: 'Eu', value: 'eu'},
                    {text: 'Non Eu', value: 'non_eu'},
                    {text: 'Total', value: 'total'},
                ],
            }
        },

        mounted() {
            this.getAnalyticalReview()
        },

        methods: {
            getAnalyticalReview() {
                analyticalReviewService.get()
                    .then(response => this.types = response.data)
            }
        }
    }
</script>

<style scoped>

</style>