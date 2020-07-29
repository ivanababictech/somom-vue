<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="vatReports.data"
                hide-actions
                item-key="country_code"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectedCountryId = props.item.country.id;getItems(props)">
                    <td>{{ props.item.country.name }}</td>
                    <td>{{ props.item.country.vat_rate }}</td>
                    <td>{{ formatMoney(props.item.total_net) }}</td>
                    <td>{{ formatMoney(props.item.total_vat) }}</td>
                    <td>{{ formatMoney(props.item.total_gross) }}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions>
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>{{ props.item.invoice.date | formatDate }}</td>
                            <td>{{ props.item.invoice.no }}</td>
                            <td>{{ props.item.invoice.supplier ? props.item.invoice.supplier.name : props.item.invoice.customer ? props.item.invoice.customer.name : ''}}</td>
                            <td>{{ formatMoney(props.item.base_price) }}</td>
                            <td>{{ formatMoney(props.item.base_price * props.item.vat_rate / 100) }}</td>
                            <td>{{ props.item.name }}</td>
                        </tr>
                    </template>
                </v-data-table>

                <div class="text-xs-center" v-if="items.last_page > 1">
                    <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                </div>
            </template>
            <template slot="footer">
                <!--<td class="text-xs-right"><strong>Total</strong></td>
                <td></td>
                <td><strong>{{ formatMoney(vatReports.totals.net) }}</strong></td>
                <td><strong>{{ formatMoney(vatReports.totals.vat) }}</strong></td>
                <td><strong>{{ formatMoney(vatReports.totals.gross) }}</strong></td>-->
            </template>
        </v-data-table>

        <div class="text-xs-center" v-if="vatReports.last_page > 1">
            <v-pagination :length="vatReports.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </div>
</template>

<script>
    export default {

        data: () => ({
            headers: [
                {text: 'Country', value: 'id'},
                {text: 'Vat rate', value: 'vat_rate'},
                {text: 'Net', value: 'net'},
                {text: 'Vat', value: 'vat'},
                {text: 'Gross', value: 'gross'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Contact', value: 'contact'},
                {text: 'Net', value: 'vat_rate'},
                {text: 'Vat', value: 'vat_rate'},
                {text: 'Item Name', value: 'description'},
            ],
            currentPage: 1,
            selectedCountryId: 0,
            type: 'moss'
        }),

        props: ['vatReports', 'items'],

        mounted() {
            this.getVatReports()
        },

        methods: {
            getVatReports() {
                this.$emit('get-vat-reports', this.type)
            },

            getItems(item) {
                if(item) {
                    item.expanded = !item.expanded
                }

                const params = {
                    page: this.currentPage
                }

                this.$emit('get-items', this.selectedCountryId, 'countries', params)
            },
        },

        watch: {
            currentPage() {
                this.getItems()
            },
        },
    }
</script>

<style scoped>

</style>