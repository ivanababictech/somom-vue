<template>
    <v-data-table
            :headers="headers"
            :items="creditors.data"
            hide-actions
            item-key="id"
            class="table-reports"
            :disable-initial-sort="true">

        <template slot="items" slot-scope="props">
            <tr>
                <td>{{ props.item.name }}</td>
                <td>{{ formatMoney(props.item.balance.balance) }}</td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
            <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.invoice.date | formatDate }}</td>
                        <td>{{ props.item.invoice.no }}</td>
                        <td>{{ props.item.invoice.comment }}</td>
                        <td>{{ formatMoney(props.item.amount) }}</td>
                    </tr>
                </template>
            </v-data-table>

            <div class="text-xs-center" v-if="items.last_page > 1">
                <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
            </div>
        </template>
    </v-data-table>
</template>

<script>
    export default {

        data: () => ({
            headers: [
                {text: 'Supplier Name', value: 'supplier_name'},
                {text: 'Amount Due', value: 'amount'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Description', value: 'description'},
                {text: 'Amount', value: 'amount'},
            ],
            currentPage: 1,
            selectedSupplierId: 0,
            type: 'vat-return'
        }),

        props: ['creditors', 'items'],

        mounted() {
            this.getReports()
        },

        methods: {
            getReports() {
                this.$emit('get-reports', this.type)
            },

            getItems(item) {
                if(item) {
                    item.expanded = !item.expanded
                }

                const params = {
                    page: this.currentPage
                }

                this.$emit('get-items', this.selectedSupplierId, 'suppliers', params)
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