<template>
    <v-dialog
            v-model="showDialog"
            width="794"
    >
        <v-card>
            <v-card-title class="headline" primary-title>
                <v-layout row justify-space-between >
                    <span class="display-1" style="margin-top: 5%">INVOICE</span>
                    <img v-if="company.logo"
                         :src="company.logo.full_path"
                         :alt="company.logo.label"
                         style="max-height: 150px; max-width: 150px;"
                    />
                </v-layout>

            </v-card-title>

            <v-card-text>
                <template v-if="invoice && invoice.customer">
                    <v-layout row mb-3>
                        <v-flex xs6>
                            <p>
                                {{ invoice.customer.id_no }}<br/>
                                {{ customerAddress }} <br />
                                {{ invoice.customer.country ? invoice.customer.country.name : '' }} <br />
                                {{ invoice.customer.vat_no }}
                            </p>
                        </v-flex>
                        <v-flex xs3>
                            <p>
                                <strong>Invoice Date</strong><br/>
                                {{ invoice.date | moment('D MMMM YYYY')}}
                            </p>
                            <p>
                                <strong>Invoice Number</strong><br/>
                                {{ invoice.no }}
                            </p>
                        </v-flex>
                        <v-flex xs3>
                            <p>
                                {{ company.name }}<br/>
                                {{ company.registration_number }}<br/>
                                {{ company.details.address1 }} {{ company.details.address2 }}<br/>
                                Vat no: {{ company.details.vatNumber }}<br/>
                            </p>
                        </v-flex>
                    </v-layout>
                    <v-layout row mt-5>
                        <v-flex xs6>
                            <span class="body-2">Description</span>
                        </v-flex>
                        <v-flex xs1 class="text-xs-center">
                            <span class="body-2">Quantity</span>
                        </v-flex>
                        <v-flex xs2 class="text-xs-center">
                            <span class="body-2">Unit price</span>
                        </v-flex>
                        <v-flex xs1 class="text-xs-center">
                            <span class="body-2">Total VAT</span>
                        </v-flex>
                        <v-flex xs2 class="text-xs-center">
                            <span class="body-2">Net Amount</span>
                        </v-flex>
                    </v-layout>
                    <v-divider class="black my-1"></v-divider>
                    <v-layout row v-for="(item, i) in invoice.items" :key="i">
                        <v-flex xs6>
                            <span class="body-1">{{ item.description }}</span>
                        </v-flex>
                        <v-flex xs1 class="text-xs-center">
                            <span class="body-1">{{ item.qty }}</span>
                        </v-flex>
                        <v-flex xs2 class="text-xs-center">
                            <span class="body-1">{{ item.price }}</span>
                        </v-flex>
                        <v-flex xs1 class="text-xs-center">
                            <span class="body-1">{{ invoice.customer.vat_code }}%</span>
                        </v-flex>
                        <v-flex xs2 class="text-xs-center">
                            <span class="body-1">{{ (itemNet(item)) }}</span>
                        </v-flex>
                    </v-layout>
                    <v-divider class="my-2"></v-divider>
                    <v-layout justify-end>
                        <v-flex xs6>
                            <v-layout row>
                                <p>
                                    <strong>{{ vatWordingByCode(vat_code) }}</strong>
                                </p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout row>
                                <v-flex xs8 class="text-xs-right">
                                    <p class="mb-0 black--text">
                                        Subtotal
                                    </p>
                                </v-flex>
                                <v-flex xs4>
                                    <p class="text-xs-right black--text mb-0">
                                        {{ totalBaseNet | n }}
                                        <br/>
                                        {{ totalBaseVat | n }}
                                    </p>
                                </v-flex>
                            </v-layout>

                            <v-divider class="black my-2"></v-divider>

                            <v-layout row>
                                <v-flex xs8 class="text-xs-right">
                                    <p class="body-2 black--text">
                                        TOTAL EUR
                                    </p>
                                </v-flex>
                                <v-flex xs4>
                                    <p class="text-xs-right body-2 black--text">
                                        {{ totalBaseGross | n }}
                                    </p>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout mt-3>
                        <p>
                            <strong>Due date: {{ invoice.due_date | moment('D MMMM YYYY') }} </strong><br/>
                            COMMENTS {{ invoice.comment }} <br/>
                            BANK DETAILS:
                            <template v-if="selectedBank">{{ selectedBank.name }}</template>
                            <br/>
                        </p>
                    </v-layout>
                    <v-layout>
                        <p>
                            Account holder - {{ selectedBank.holder }}<br/>
                            Bank - {{ selectedBank.name }}<br/>
                            IBAN - {{ selectedBank.iban }}<br/>
                            SWIFT - {{ selectedBank.swift }}
                        </p>
                    </v-layout>
                </template>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: [
            'showPreviewDialog',
            'company',
            'invoice',
            'selectedBank',
            'vatWordingByCode',
            'vat_code',
            'totalBaseVat',
            'totalBaseGross',
            'totalBaseNet'
        ],

        computed: {
            customerAddress() {
                if (this.invoice.customer !== undefined) {
                    const customerAddress = this.invoice.customer.data.clientAddress;

                    return `${customerAddress.city}, ${customerAddress.streetName}, ${customerAddress.doorName}, ${customerAddress.zip}`;
                }

                return null;
            },

            showDialog: {
                get() {
                    return this.showPreviewDialog
                },

                set(value) {
                    this.$emit('closeDialog')
                }
            }
        },

        methods: {
            itemNet({price, qty}) {
                return this.$helpers.number(qty * price)
            },
        }
    }
</script>