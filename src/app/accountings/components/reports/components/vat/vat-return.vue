<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="vatReports.length ? vatReports : []"
                hide-actions
                item-key="id"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectedVatCodeId = props.item.id;getItems(props)">
                    <td>{{ props.item.code }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ formatMoney(props.item.total_amount) }}</td>
                    <td>{{ formatMoney(props.item.total_vat_amount) }}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" hide-actions>
                    <template slot="items" slot-scope="props">
                        <tr v-if="props.item.item_type == 'invoice_item'">
                            <td>{{ props.item.item.invoice.date | formatDate }}</td>
                            <td>{{ props.item.item.invoice.no }}</td>
                            <td>{{ props.item.item.invoice.supplier ? props.item.item.invoice.supplier.name : props.item.item.invoice.customer ? props.item.item.invoice.customer.name : ''}}</td>
                            <td>{{ props.item.item.description }}</td>
                            <td>{{ formatMoney(props.item.amount) }}</td>
                            <td>{{ formatMoney(props.item.amount * props.item.item.vat_rate / 100) }}</td>
                        </tr>
                        <tr v-if="props.item.item_type == 'transaction'">
                            <td>{{ props.item.item.date | formatDate }}</td>
                            <td>{{ props.item.item.data.invoice_no }}</td>
                            <td>{{ props.item.item.allocation}}</td>
                            <td>{{ props.item.item.description }}</td>
                            <td>{{ formatMoney(props.item.amount) }}</td>
                            <td>{{ formatMoney(props.item.amount * props.item.vat.vat / 100) }}</td>
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
    export default {

        data: () => ({
            headers: [
                {text: 'Vat Code', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Amount', value: 'name'},
                {text: 'Vat Amount', value: 'amount'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Contact', value: 'contact'},
                {text: 'Description', value: 'description'},
                {text: 'Amount', value: 'amount'},
                {text: 'Vat Amount', value: 'vat_amount'},
            ],
            currentPage: 1,
            selectedVatCodeId: 0,
            type: 'vat-return'
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

                this.$emit('get-items', this.selectedVatCodeId, 'vat-codes', params)
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