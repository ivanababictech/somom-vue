<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="vatReports.data"
                hide-actions
                item-key="id"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectedItem = props.item;getItems(props)">
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ getSupplierCountry(props.item.items_purchase) }}</td>
                    <td>{{ getCustomerCountries(props.item.items_sale) }}</td>
                    <td>{{ props.item.ratings }}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions :disable-initial-sort="true">
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>{{ props.item.invoice.date | formatDate }}</td>
                            <td>{{ props.item.invoice.no }}</td>
                            <td>{{ props.item.account.name }}</td>
                            <td>{{ props.item.invoice.supplier ? props.item.invoice.supplier.name : props.item.invoice.customer ? props.item.invoice.customer.name : ''}}</td>
                            <td>{{ props.item.qty }}</td>
                            <td>{{ formatMoney(props.item.price) }}</td>
                            <td>{{ props.item.vat_rate_item ? props.item.vat_rate_item.name : '' }}</td>
                            <td>{{ props.item.description }}</td>
                            <td>{{ props.item.rating_text }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <div class="text-xs-center" v-if="items.last_page > 1">
                    <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data: () => ({
            headers: [
                {text: 'Item Code', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Supplier Country', value: 'name'},
                {text: 'Customer Countries', value: 'name'},
                {text: 'Customer Ratings', value: 'ratings'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Account', value: 'account'},
                {text: 'Contact', value: 'contact'},
                {text: 'Quantity', value: 'qty'},
                {text: 'Amount', value: 'amount'},
                {text: 'Vat Rate', value: 'vat_rate'},
                {text: 'Description', value: 'description'},
                {text: 'Rating', value: 'qty'},
            ],
            currentPage: 1,
            selectedItem: 0,
            type: 'triangulation-trade'
        }),

        props: ['vatReports', 'items'],

        computed: {
            ...mapGetters({
                company: 'accounting/company',
            }),
        },

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

                this.$emit('get-items', this.selectedItem.id, 'inventories', params)
            },

            getSupplierCountry(purchases) {
                return purchases.map(item => item.invoice.supplier.country.name).filter((v, i, a) => a.indexOf(v) === i).pop()
            },

            getCustomerCountries(sales) {
                return sales.map(item => item.invoice.customer.country.name).filter((v, i, a) => a.indexOf(v) === i).join(', ')
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