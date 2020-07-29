<template>
    <v-card flat>
        <v-container fluid grid-list-md>
            <v-layout>
                <v-flex xs6>
                    <v-layout>
                        <invoice-reconciliation :invoiceType="type" v-if="isSaleOrPurchaseInovice"></invoice-reconciliation>
                        <issued-invoices
                                ref="issuedInvoice"
                                :type="type"
                                 :title="issuedInvoiceTitle"
                                 @edit-invoice="transformInvoice"
                        ></issued-invoices>
                        <v-btn flat outline color="primary"  v-if="isSaleOrPurchaseInovice">Received Invoices</v-btn>
                    </v-layout>
                </v-flex>
                <v-flex xs6 v-if="type !== isPurchaseInvoice">
                    <v-layout justify-end v-if="type === 'sale'">
                        <v-btn color="primary" @click="dialog = true">PREVIEW</v-btn>
                        <v-btn color="primary" @click="downloadInvoice">Download</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout justify-end v-if="invoice.currency !== baseCurrency">
                <div>
                    <small>Exchange rate set by ECB: <strong>1 {{ baseCurrency }} = {{ invoice.exchange_rate }} {{
                        invoice.currency }}</strong></small>
                    <br>
                    <small>Net amount {{ baseCurrency }} equivalent: <strong>{{ totalBaseNet | n }}</strong></small>
                    <br>
                    <small>VAT amount {{ baseCurrency }} equivalent: <strong>{{ totalBaseVat | n }}</strong></small>
                    <br>
                    <small>Gross amount {{ baseCurrency }} equivalent: <strong>{{ totalBaseGross | n }}</strong></small>
                </div>
            </v-layout>

            <v-layout row wrap v-if="isSaleOrPurchaseInovice">
                <v-flex xs12 sm6 md3 lg2>
                    <v-autocomplete
                            label="Search payment"
                            :items="paymentRequests"
                            v-model="paymentRequest"
                            item-value="id"
                            item-text="name"
                            @input="paymentRequestChange"
                            return-object
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2>
                    <v-autocomplete
                            label="Search quote"
                            :items="quotes"
                            v-model="quote"
                            item-value="id"
                            item-text="name"
                            @input="quotesChange"
                            return-object
                            dense
                    ></v-autocomplete>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 sm6 lg2>
                    <v-autocomplete
                            v-if="isSaleInvoice"
                            label="To"
                            :items="customers"
                            v-model="invoice.customer"
                            item-text="name"
                            item-value="id"
                            @input="customerChange"
                            return-object
                            dense
                    ></v-autocomplete>

                    <v-autocomplete
                            v-if="isPurchaseInvoice"
                            label="From"
                            :items="suppliers"
                            v-model="invoice.supplier"
                            item-text="name"
                            item-value="id"
                            @input="supplierChange"
                            return-object
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs6 sm3 lg2>
                    <date-picker
                            label="Date"
                            v-model="invoice.date"
                            @input="dateChange"
                            full-width
                            hide-details>
                    </date-picker>
                </v-flex>
                <v-flex xs6 sm3 lg2 v-if="type == 'sale' || type == 'purchase'">
                    <date-picker
                            label="Due date"
                            v-model="invoice.due_date"
                            full-width
                            hide-details>
                    </date-picker>
                </v-flex>
                <v-flex xs12 sm6 lg2>
                    <v-text-field
                            label="Invoice number"
                            v-model="invoice.no"
                            @change="noChanged"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 lg2 v-if="type == 'credit_note'">
                    <v-autocomplete
                            label="Search Invoices"
                            :items="customerInvoices"
                            item-value="id"
                            item-text="invoice.name"
                            @change="invoiceChanged"
                            return-object
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 lg2 v-else-if="type == 'debit_note'">
                    <v-autocomplete
                            label="Search Invoices"
                            :items="supplierInvoices"
                            item-value="id"
                            item-text="invoice.name"
                            @change="invoiceChanged"
                            return-object
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs6 sm3 lg2>
                    <currencies v-model="invoice.currency" label="Currency" @input="currencyChanged"></currencies>
                </v-flex>
                <v-flex xs6 sm3 lg2 v-if="type === 'sale'">
                    <v-autocomplete
                            label="Bank details"
                            :items="banks"
                            v-model="invoice.bank_id"
                            item-text="name"
                            item-value="id"
                            dense
                    ></v-autocomplete>
                </v-flex>
            </v-layout>

            <transition name="fade">
                <v-data-table
                        :headers="headers"
                        :items="invoice.items"
                        hide-actions
                        class="v-form-table reduced-gaps-table">

                    <template slot="items" slot-scope="props">
                        <td class="px-1">
                            <v-autocomplete
                                    :items="setItems"
                                    v-model="props.item.unique_id"
                                    @input="itemChange(props.item)"
                                    item-text="name"
                                    item-value="unique_id"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </td>
                        <td class="px-1">
                            <v-textarea auto-grow rows="1" v-model="props.item.description" hide-details></v-textarea>
                        </td>
                        <td class="px-1">
                            <v-autocomplete
                                    :items="accounts"
                                    @input="accountChanged(props.item)"
                                    v-model="props.item.account_id"
                                    item-text="name"
                                    item-value="id"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </td>
                        <td class="px-1">
                            <div style="width: 50px">
                                <v-text-field
                                        v-model.number="props.item.qty"
                                        @change="qtyChange(props.item)"
                                        type="number"
                                        min="1"
                                        :max="props.item.max_qty"
                                        :disabled="invoice.reconciled"
                                        hide-details>
                                </v-text-field>
                            </div>
                        </td>
                        <td class="px-1">
                            <div style="width: 50px">
                                <v-text-field
                                        v-model.number="props.item.price"
                                        @input="priceChange(props.item)"
                                        :disabled="invoice.reconciled"
                                        hide-details>
                                </v-text-field>
                            </div>
                        </td>
                        <td class="px-1">
                            <span class="subheading">{{ (itemNet(props.item)) }}</span>
                        </td>
                        <td class="px-1">
                            <span class="subheading">{{ (itemVat(props.item)) }}</span>
                        </td>
                        <td class="px-1">
                            <span class="subheading">{{ (itemGross(props.item)) }}</span>
                        </td>
                        <td class="px-1">
                            <v-layout row>
                                <v-btn
                                        v-if="props.index + 1 === invoice.items.length"
                                        icon
                                        flat
                                        small
                                        color="primary"
                                        @click="addRow">
                                    <v-icon>add</v-icon>
                                </v-btn>
                                <v-btn
                                        icon
                                        flat
                                        small
                                        color="danger"
                                        @click.prevent="deleteRow(props.index)">
                                    <v-icon>clear</v-icon>
                                </v-btn>
                            </v-layout>
                        </td>
                    </template>

                    <template slot="footer">
                        <td colspan=5><strong>Total</strong></td>
                        <td class="px-1"><strong>{{ (totalNet) }}</strong></td>
                        <td class="px-1"><strong>{{ (totalVat) }}</strong></td>
                        <td class="px-1"><strong>{{ (totalGross) }}</strong></td>
                        <td></td>
                    </template>

                </v-data-table>
            </transition>

            <v-layout wrap>

                <v-flex xs12>
                    <v-textarea
                            label="Additional comments"
                            v-model="invoice.comment"
                            hide-details
                            outline
                            rows="2">
                    </v-textarea>
                </v-flex>
                <v-flex xs12>
                    <v-btn
                            color="primary"
                            class="ml-0"
                            @click="save"
                            v-if="!deleteButton && !isInvoiceEditable">Submit
                    </v-btn>
                    <v-btn
                            color="primary"
                            class="ml-0"
                            @click="save"
                            v-else-if="isInvoiceEditable">Update
                    </v-btn>
                    <v-btn
                            color="error"
                            class="ml-0"
                            @click="deleteInvoice"
                            v-if="deleteButton"
                            :disabled="!!invoice.reconciled">Delete
                    </v-btn>
                    <v-btn
                            color="primary"
                            class="ml-0"
                            @click="showEmailDialog = true"
                            v-if="">Email Invoice
                    </v-btn>
                    <p v-if="deleteButton && invoice.reconciled">
                        Sales invoice fully paid cannot be deleted
                    </p>
                </v-flex>
            </v-layout>
        </v-container>
        <invalid-vat-number
                v-if="invoice.showNotification"
                :invoice="invoice"
                @confirm="submitInvoiceWithPay">
        </invalid-vat-number>

        <invoice-preview :show-preview-dialog="dialog"
                         v-if="dialog"
                         @closeDialog="dialog = false"
                         :company="company"
                         :invoice="invoice"
                         :vat-wording-by-code="vatWordingByCode"
                         :vat_code="vat_code"
                         :total-base-vat="totalBaseVat"
                         :total-base-gross="totalBaseGross"
                         :total-base-net="totalBaseNet"
                         :selected-bank="selectedBank"
        ></invoice-preview>

        <template v-if="isSaleInvoice">
            <send-email
                    :show-email-dialog="showEmailDialog"
                    :company="company"
                    :invoice="invoice"
                    :total-base-vat="totalBaseVat"
                    :selected-bank="selectedBank"
                    :email="email"
                    @closeDialog="showEmailDialog = false"
            ></send-email>
        </template>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import {isEUCountry, isMTVATNo, isEUVATNo} from '@/util'
    import InvoiceReconciliation from './reconciliation/index'
    import IssuedInvoices from './issued-invoices/index'
    import Reconciliation from '@/components/accounting/reconciliation'
    import * as invoiceService from './service'
    import * as currencyService from '@/app/settings/currencies/service'
    import InvalidVatNumber from './invalid-vat-number'
    import * as draftService from './../draftService'
    import sendEmail from './send-mail';
    import InvoicePreview from './invoice-preview';

    export default {

        props: ['type'],

        data: () => ({
            headers: [
                {text: 'Item', value: 'item', sortable: false, width: '75'},
                {text: 'Description', value: 'description', sortable: false, width: '225'},
                {text: 'Account', value: 'account_id', sortable: false, width: '150'},
                {text: 'Qty', value: 'qty', sortable: false, width: '50'},
                {text: 'Unit price', value: 'unit_price', sortable: false, width: '50'},
                {text: 'Net', value: 'net', sortable: false, width: '50'},
                {text: 'Vat', value: 'vat', sortable: false, width: '50'},
                {text: 'Gross', value: 'gross', sortable: false, width: '50'},
                {text: 'Actions', value: null, sortable: false, width: '75px'},
            ],
            invoice: {
                currency: this.baseCurrency,
                isEditable: false,
                items: []
            },
            paymentRequests: [],
            paymentRequest: {},
            customerInvoices: [],
            supplierInvoices: [],
            allItemsCheck: false,
            deleteButton: false,
            quotes: [],
            quote: '',
            dialog: false,
            vat_code: null,
            showEmailDialog: false,
            email: {
                to: null,
                subject: null,
                message: null
            },
            customerContactPerson: '_contact_person_name',
            selectedInvoice: null
        }),

        mounted() {
            this.init()
        },

        created() {
            draftService.getDraft(this.type)
                .then((response) => {
                    if (response.data) {
                        this.invoice = response.data.data.data || {}
                    }
                })
        },

        computed: {
            ...mapGetters({
                currencies: 'settings/currencies',
                vatRateByCode: 'settings/vatRateByCode',
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                baseCurrency: 'accounting/currency',
                saleItems: 'accounting/saleItems',
                allItems: 'accounting/allItems',
                purchaseItems: 'accounting/purchaseItems',
                banks: 'accounting/banks',
                defaultBank: 'accounting/defaultBank',
                accounts: 'accounting/accounts',
                company: 'accounting/company',
                accountById: 'accounting/accountById',
                vatRateById: 'settings/vatRateById',
                vatWordingByCode: 'settings/vatWordingByCode'
            }),

            isInvoiceEditable() {
                return this.invoice.isEditable || false
            },

            issuedInvoiceTitle() {
                var title = ''

                switch (this.type) {
                    case 'purchase':
                        title = 'Purchase invoices list';
                        break;
                    case 'payment_request':
                        title = 'Issued requests';
                        break;
                    case 'quote':
                        title = 'Issued quotes';
                        break;
                    default:
                        title = 'Issued invoices'
                }
                return title
            },

            isSaleOrPurchaseInovice() {
                return this.type == 'sale' || this.type == 'purchase'
            },

            isSaleInvoice() {
                return ['sale', 'payment_request', 'quote', 'credit_note'].indexOf(this.invoice.type) != -1
            },

            isPurchaseInvoice() {
                return ['purchase', 'purchase_order', 'purchase_quote', 'debit_note'].indexOf(this.invoice.type) != -1
            },

            setItems() {
                if (this.allItemsCheck) return this.allItems
                return this.items
            },

            selectedBank() {
                let id = this.invoice.bank_id;
                let selectedBank = {
                    name: null
                };
                if (id) {
                    selectedBank = this.banks.find(bank => bank.id === id)
                }
                return selectedBank
            },

            items() {
                return this.isSaleInvoice ? this.saleItems : this.purchaseItems
            },

            totalNet() {
                let net = 0
                this.invoice.items.forEach(item => {
                    net += this.itemNet(item)
                })
                return this.$helpers.number(net)
            },
            totalVat() {
                let vat = 0
                this.invoice.items.forEach(item => {
                    vat += this.itemVat(item)
                })
                return this.$helpers.number(vat)
            },
            totalGross() {
                return this.$helpers.number(this.totalVat + this.totalNet)
            },
            totalBaseNet() {
                let net = 0
                this.invoice.items.forEach(item => {
                    net += this.itemBaseNet(item)
                })
                return this.$helpers.number(net)
            },
            totalBaseVat() {
                let vat = 0
                this.invoice.items.forEach(item => {
                    vat += this.itemBaseVat(item)
                })
                return this.$helpers.number(vat)
            },
            totalBaseGross() {
                return this.$helpers.number(this.totalBaseNet + this.totalBaseVat)
            },


        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            ...mapActions(['setMessage']),

            deleteInvoice() {
                invoiceService.deleteInvoice(this.invoice.id)
            },

            transformInvoice(invoice) {
                if(invoice.customer_id) {
                    invoice.customer = this.customers.find(customer => customer.id === invoice.customer_id)
                    this.getSalesInvoices(invoice.customer, invoice.transaction_id)
                } else {
                    invoice.supplier = this.suppliers.find(supplier => supplier.id === invoice.supplier_id)
                    this.getPurchasesInvoices(invoice.supplier)
                }

                invoice.exchange_rate = this.formatMoney(invoice.exchange_rate, 4, 3, '')

                invoice.items.map(item => {
                    //item.period_end = this.$helpers.formatDate(invoice.period_end)
                    item.base_price = this.resetFormatMoney(item.base_price)
                    item.price = this.resetFormatMoney(item.price)
                    if(item.item) {
                        item.unique_id = item.item.unique_id
                    }
                })

                this.$set(this, 'invoice', invoice)

                // add default row if there is no items
                if(!this.invoice.items.length) {
                    this.addRow()
                }
            },

            init() {
                this.invoice = this.defaultInvoice()
            },

            saveAsDraftSale() {
                draftService.createAsDraft({data: this.invoice}, this.type);
            },

            defaultInvoice() {
                return {
                    status: 'invoice',
                    type: this.type,
                    exchange_rate: 1,
                    no: this.getNextInvoiceNumber(),
                    default_no: true,
                    currency: this.baseCurrency,
                    items: [],
                    vat_code: null,
                    showNotification: false
                }
            },

            getPaymentRequest(contactId) {
                if(this.isSaleOrPurchaseInovice) {
                    invoiceService.getPaymentRequests(this.type, contactId)
                        .then((response) => {
                            this.paymentRequests = response.data
                        })
                }
            },

            getQuotes(contactId) {
                if(this.isSaleOrPurchaseInovice) {
                    invoiceService.getQuotes(this.type, contactId)
                        .then((response) => {
                            this.quotes = response.data
                        })
                }
            },

            getSalesInvoices(customer, transactionId) {
                if(this.type == 'credit_note') {
                    let params = {
                        typeReconciled: 0,
                        type: 'sale'
                    }

                    invoiceService.getInvoicesByCustomer(customer.id, params)
                        .then((response) => {
                            this.customerInvoices = response.data.data

                            if(transactionId) {
                                this.selectedInvoice = this.customerInvoices.find(transaction => transaction.id === transactionId)
                            }
                        })
                }
            },

            getPurchasesInvoices(supplier) {
                if(this.type == 'debit_note') {
                    let params = {
                        typeReconciled: 0,
                        type: 'purchase'
                    }

                    invoiceService.getInvoicesBySupplier(supplier.id, params)
                        .then((response) => {
                            this.supplierInvoices = response.data.data
                        })
                }
            },

            getNextInvoiceNumber() {
                if (this.type === 'sale' || this.type == 'credit_note') {
                    invoiceService.getNextInvoiceNumber(this.type)
                        .then(response => {
                            this.invoice.no = response.data;
                            this.email.subject = `${this.company.name} - ${this.invoice.no}`;
                            this.setEmailMessage();
                        })
                }

            },

            setEmailMessage() {
                this.email.message = `Hi ${this.customerContactPerson}
                            Kindly find attached invoice ${this.invoice.no} ${this.invoice.currency}
                            If you have any questions, please let us know.
                            Thanks,
                            ${this.company.name}`;
            },

            addRow() {
                let item = this.invoice.items.push({
                    qty: 1,
                    description: null,
                    price: 0,
                    base_price: 0,
                    vat_rate: 0,
                    item_vat_rate_id: null
                })

                this.updateItemVatRules(this.invoice.items[item - 1])
                this.generateItemsDescription()
            },
            deleteRow(index) {
                this.invoice.items.splice(index, 1)
            },
            customerChange($event) {
                this.vat_code = this.invoice.customer.vat_code;

                this.invoice.allocation = this.invoice.customer.name;
                this.invoice.allocation_id = this.invoice.customer.id;
                this.email.to = this.invoice.customer.data.contactDetails.email;
                this.customerContactPerson = this.invoice.customer.data.contactDetails.person;
                this.setEmailMessage();
                if (this.invoice.items.length == 0) {
                    this.addRow()
                }
                this.invoice.items.forEach((item, index) => {
                    this.updateItemVatRules(item)
                })

                this.getPaymentRequest(this.invoice.customer.id)
                this.getQuotes(this.invoice.customer.id)
                this.getSalesInvoices(this.invoice.customer)

            },
            supplierChange($event) {
                this.invoice.allocation = this.invoice.supplier.name
                this.invoice.allocation_id = this.invoice.supplier.id

                if (this.invoice.items.length == 0) {
                    this.addRow()
                }
                this.invoice.items.forEach((item, index) => {
                    this.updateItemVatRules(item)
                })

                this.getPaymentRequest(this.invoice.supplier.id)
                this.getQuotes(this.invoice.supplier.id)
                this.getPurchasesInvoices(this.invoice.supplier)
            },
            dateChange(date) {
                if (!this.invoice.due_date) {
                    this.invoice.due_date = date
                }
                this.fetchExchangeRate()
            },

            currencyChanged() {
                if (this.invoice.currency != this.baseCurrency) {
                    this.fetchExchangeRate()
                } else {
                    this.invoice.exchange_rate = 1
                    this.resetPrices()
                }
            },

            noChanged(no) {
                this.invoice.default_no = false
            },

            currencyChange() {
                if (this.invoice.currency != this.baseCurrency) {
                    this.fetchExchangeRate()
                } else {
                    this.invoice.exchange_rate = 1
                    this.resetPrices()
                }
            },
            itemChange(item) {
                const invoiceItem = this.items.find(({unique_id}) => item.unique_id == unique_id)

                Object.assign(item, _.pick(invoiceItem, ['account_id', 'vat_rate_id', 'name', 'price', 'description', 'type']))

                // set item_id
                item.item_id = invoiceItem.id
                item.item_type = invoiceItem.type
                item.item_vat_rate_id = invoiceItem.vat_rate_id

                // inventory
                if (invoiceItem.type == 'inventory') {
                    item.account_id = this.type == 'sale' ? invoiceItem.sale_account_id : invoiceItem.purchase_account_id
                    item.price = invoiceItem.sale_price
                    item.max_qty = invoiceItem.qty
                }

                if (this.invoice.exchange_rate !== 1) {
                    item.price = this.$helpers.number(item.price * this.invoice.exchange_rate)
                }

                // set base price
                item.base_price = item.price = this.formatMoney(item.price, 2, 3, '')

                this.updateItemVatRules(item)
            },

            accountChanged(item) {
                let vat = 0

                if (this.vat_code) {
                    item.vat_code = this.vat_code;
                    vat = this.vatRateByCode(this.vat_code)
                }

                let account = this.accountById(item.account_id)

                if (item.item_vat_rate_id) {
                    item.vat_rate_id = item.item_vat_rate_id

                    let vatRate = this.vatRateById(item.vat_rate_id)
                    vat = vatRate.vat
                } else if (account && account.options.vat_rate_id) {
                    item.vat_rate_id = account.options.vat_rate_id

                    let vatRate = this.vatRateById(account.options.vat_rate_id)

                    if (vatRate.vat != 18) {
                        vat = vatRate.vat
                    }
                }

                item.vat_rate = vat

                this.updateItemVatRules(item)
            },

            qtyChange(item) {
                if (this.invoice.type === 'sale') {
                    if (item.max_qty !== undefined && item.qty > item.max_qty) {
                        item.qty = item.max_qty

                        this.setMessage({
                            type: 'error',
                            message: 'Sorry, you can\'t sale more then ' + item.max_qty + ' items!'
                        })
                    }
                }
            },
            invoiceChanged($event) {
                if($event) {
                    this.selectedInvoice = $event.invoice

                    this.transformInvoice(this.selectedInvoice)

                    this.invoice.type = this.type
                    this.invoice.invoice_transaction_id = this.selectedInvoice.transaction_id

                    this.generateItemsDescription()
                } else {
                    this.selectedInvoice = null
                }
            },

            /**
             * Automatic generate desc
             */
            generateItemsDescription() {
                this.invoice.items.map(item => {
                    if(this.selectedInvoice) {
                        if(this.isSaleInvoice) {
                            item.description = 'Credit note for ' + this.selectedInvoice.name + ' - ' + this.selectedInvoice.customer.name
                        } else if(this.isPurchaseInvoice) {
                            item.description = 'Debit note for ' + this.selectedInvoice.name + ' - ' + this.selectedInvoice.supplier.name
                        }
                    }
                })
            },

            priceChange(item) {
                item.base_price = this.$helpers.number(item.price / this.invoice.exchange_rate)
            },
            updatePrices() {
                this.invoice.items.forEach((item, index) => {
                    item.price = this.formatMoney(this.formatToInteger(item.base_price * this.invoice.exchange_rate), 2, 3, '')
                })
            },
            resetPrices() {
                this.invoice.items.forEach(item => item.price = item.base_price)
            },

            updateItemVatRules(item) {
                if (this.isSaleInvoice) {
                    this.updateCustomerItemVatRules(item)
                } else {
                    this.updateSupplierItemVatRules(item)
                }
            },

            updateCustomerItemVatRules(item) {
                // default vat code taken from customer
                const {country_code, vat_no, has_vat} = this.invoice.customer
                let vat_code = this.vat_code
                let customer = this.invoice.customer
                let vat_rate = this.vatRateByCode(vat_code)

                if (isEUCountry(country_code) && !vat_no && customer.country_code != 'MT') {
                    vat_code = '18'
                    vat_rate = 18
                } else
                // if vat code is 18 (customer has MT vat number or no vat number)
                // and item has special rates
                if (vat_code == '18' && item.vat_rate_id > 1) {
                    if (item.vat_rate_id == 8) { // 0 @ Electronically supplied services
                        // if customer is from EU (except Malta) and has not VAT number
                        if (customer.country_code != 'MT' && !customer.has_vat) {
                            vat_code = 2
                            vat_rate = customer.country.vat_rate
                        }
                    } else {
                        switch (item.vat_rate_id) {
                            case 2: // Reduced rate - 7%
                                vat_code = '18A'
                                break
                            case 3: // Reduced rate -5%
                                vat_code = '19'
                                break
                            case 4: // Exempt with credit
                                vat_code = '20'
                                break
                            case 5: // Exempt without credit
                                vat_code = '21'
                                break
                            default:
                                console.log('Item vat rate id is other ' + item.vat_rate_id)
                        }
                        vat_rate = this.vatRateByCode(vat_code)
                    }
                }

                if (isEUCountry(country_code)) {
                    item.vat_rate = vat_rate
                } else {
                    item.vat_rate = 0
                    item.vat_rate_id = null
                }

                item.vat_code = vat_code
            },

            updateSupplierItemVatRules(item) {
                const {country_code, has_vat, vat_no} = this.invoice.supplier
                const {account_id, vat_rate_id} = item

                let vat_code = '11' // default non EU

                if (account_id && isEUCountry(country_code)) {
                    const {assigned_account_id} = this.accountById(account_id)

                    // MT VAT NO. or NO VAT
                    if (country_code == 'MT') {
                        switch (assigned_account_id) {
                            case 13: // Direct cost
                                switch (vat_rate_id) {
                                    case 1: // Normal @ 18%
                                        vat_code = '27'
                                        break
                                    case 3: // Reduced @ 5%
                                        vat_code = '28'
                                        break
                                    case 4: // Exempt with credit
                                        vat_code = '29'
                                        break
                                    default:
                                        console.warn('Vat rate id (%s) not matching any of the expected values.', vat_rate_id)
                                }
                                break
                            case 16: // Property, plant and equipment
                                vat_code = '30'
                                break

                            case 14: // 14 selling & distribution,
                            case 15: // 15 admin expenses
                                switch (vat_rate_id) {
                                    case 1: // Normal @ 18%
                                        vat_code = '31'
                                        break
                                    case 2: // Reduced @ 7%
                                        vat_code = '31A'
                                        break
                                    case 3: // Reduced @ 5%
                                        vat_code = '32'
                                        break
                                    case 6: // Blocked vat
                                        vat_code = '33'
                                        break
                                    case 7: // No vat
                                        vat_code = '34'
                                        break
                                    default:
                                        console.warn('Vat rate id (%s) not matching any of the expected values.', vat_rate_id)
                                }
                                break
                        }
                    } else if (!has_vat) {
                        vat_code = 11
                    } else {
                        // EU VAT NO.
                        switch (assigned_account_id) {
                            case 13: // Direct cost
                                vat_code = '9'
                                break
                            case 14: // Selling and distribution expenses
                            case 15: // Administrative expenses
                                vat_code = '9A'
                                break
                            case 16: // Property, plant & equipment
                                vat_code = '10'
                                break
                            default:
                                console.warn('The assigned account id is not matching any vat code: ', assigned_account_id)
                        }

                        console.log('vat code is ' + vat_code)
                    }
                }

                let vat_rate = this.vatRateByCode(vat_code)

                item.vat_code = vat_code

                if (item.vat_rate_id && vat_rate) {
                    vat_rate = this.vatRateById(item.vat_rate_id).vat
                }

                item.vat_rate = vat_rate
            },

            fetchExchangeRate() {
                currencyService.convertFromDB(this.invoice.date, this.invoice.currency, this.baseCurrency)
                    .then(response => {
                        this.invoice.exchange_rate = response.data
                        this.updatePrices()
                    })
            },
            itemBaseNet({base_price, qty}) {
                return this.$helpers.number(base_price * qty)
            },
            itemBaseVat({base_price, qty, vat_rate}) {
                return this.$helpers.number(this.itemBaseNet({base_price, qty}) * vat_rate / 100)
            },
            itemBaseGross(item) {
                return this.itemBaseNet(item) + this.itemBaseVat(item)
            },
            itemNet({price, qty}) {
                return this.$helpers.number(qty * price)
            },
            itemVat(item) {
                return this.$helpers.number(this.itemNet(item) * item.vat_rate / 100)
            },
            itemGross(item) {
                return this.$helpers.number(this.itemNet(item) + this.itemVat(item))
            },
            save() {
                if (this.type == 'sale') {
                    invoiceService.checkVatNumber(this.invoice.customer.id)
                        .then(response => {
                            if (response.data) {
                                return this.submitInvoice()
                            }
                            this.invoice.showNotification = true

                        })
                } else {
                    this.submitInvoice()
                }
            },

            submitInvoiceWithPay() {
                this.vat_code = 18

                this.invoice.items.forEach((item, index) => {
                    this.updateItemVatRules(item)
                })

                this.submitInvoice()
            },

            submitInvoice() {

                let invoice = Object.assign({}, this.invoice)
                invoice.net = this.totalNet
                invoice.vat = this.totalVat
                invoice.gross = this.totalGross
                invoice.base_net = this.totalBaseNet
                invoice.base_vat = this.totalBaseVat
                invoice.base_gross = this.totalBaseGross

                if (this.isSaleInvoice) {
                    invoice.customer_id = invoice.customer.id
                    invoice.customer_name = invoice.customer.name
                    delete invoice.customer
                } else if(this.isPurchaseInvoice) {
                    invoice.supplier_id = invoice.supplier.id
                    invoice.supplier_name = invoice.supplier.name
                    delete invoice.supplier
                }

                if (this.isInvoiceEditable) {
                    invoiceService.updateInvoice(invoice)
                        .then(response => {
                            this.$refs.issuedInvoice.dialog = true

                            this.init()
                        })
                } else {
                    invoiceService.create(invoice)
                        .then(response => {
                            this.toggleDialog(this.type + 's')

                            this.init()
                        })
                }
            },
            paymentRequestChange() {
                this.paymentRequest.type = this.type
                this.paymentRequest.no = this.invoice.no
                this.paymentRequest.payment_request_id = this.paymentRequest.id

                this.paymentRequest.items.map(item => {
                    item.price = this.formatMoney(item.price, 2, 3, '')
                    item.base_price = this.formatMoney(item.base_price, 2, 3, '')
                    if(item.item) {
                        item.unique_id = item.item.unique_id
                    }

                    return item
                })

                this.quote = null
                this.$set(this, "invoice", this.paymentRequest)
            },
            quotesChange() {
                this.quote.type = this.type
                this.quote.no = this.invoice.no
                this.quote.quote_id = this.quote.id

                this.quote.items.map(item => {
                    item.price = this.formatMoney(item.price, 2, 3, '')
                    item.base_price = this.formatMoney(item.base_price, 2, 3, '')
                    if(item.item) {
                        item.unique_id = item.item.unique_id
                    }

                    return item
                })

                this.paymentRequest = null
                this.$set(this, "invoice", this.quote)
            },

            sendEmail() {
                invoiceService.sendInvoiceEmail(this.company, this.invoice, this.totalBaseVat, this.selectedBank, this.email)
                    .then(data => {
                        this.showEmailDialog = false;
                    })
            },

            downloadInvoice() {
                const data = {
                    invoice: this.invoice,
                    company: this.company,
                    totalBaseVat: this.totalBaseVat,
                    selectedBank: this.selectedBank
                };
                invoiceService.downloadInvoice(data);
            },
        },

        components: {sendEmail, InvoiceReconciliation, Reconciliation, InvalidVatNumber, IssuedInvoices, InvoicePreview},
    }
</script>
