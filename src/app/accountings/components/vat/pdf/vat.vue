<template>
    <v-app id="inspire">
        <v-container id="toPdf" ref="toPdf" grid-list-xs>
            <v-layout row wrap class="my-header" align-center>
                <v-flex xs3>
                    <img src="../../../../../assets/image/vat_logo.png" alt="not yet">
                </v-flex>
                <v-flex xs6>
                    <v-layout row wrap>
                        <v-flex xs10 offset-xs1>
                            <v-card color="grey">
                                <v-card-text class="card-bordered1">
                                    <b>DEPARTAMENT OF VALUE ADDED TAX</b>
                                    <span class="table-span">Centre Point Building, Triq Ta` Paris, Birkirkara BKR 4633</span>
                                    <span class="table-span">Tel: 21499330/4</span>
                                    <span class="table-span">E-mail: vat@gov.mt</span>
                                    <span class="table-span">Website: http://www.vat.gov.mt</span>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <!--left col-->
                <v-flex xs9>
                    <v-layout row wrap>
                        <v-flex xs9>
                            <v-card class="box-margin">
                                <v-card-text class="cart-reg-no card-bordered1">
                                    <span class="middle-text">{{ company.name }}</span>
                                    <span class="middle-text">{{ company.details.address1 }}</span>
                                    <span class="middle-text">{{ company.details.address2 }}</span>
                                    <span class="middle-text">{{ company.details.city }}</span>
                                    <v-layout row wrap>
                                        <v-flex xs8 offset-xs4>
                                            <v-layout row wrap>
                                                <v-flex xs6 class="reg-no-label">
                                                    REGISTRATION No
                                                </v-flex>
                                                <v-flex xs6 class="reg-no-no">
                                                    {{ company.details.vatNumber }}
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs3>
                            <v-card class="box-margin">
                                <v-card-text class="card-bordered1">
                                    <span class="middle-text">* See notes at the back of copy and VAT website</span>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-layout row wrap class="thead" text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">INTRA-COMUNITY and NON-EU TRADE</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">VALUE - €</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">OUTPUT TAX - €</span>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Exempt IC Supplies of Goods and Supplies of Services where customer is liable for the tax*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    1
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[1])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalVatAmount(vats[1])">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Supplies of Goods and Services where Place of Supply is outside Malta - EU and not EU*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    2
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[2])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalVatAmount(vats[2])">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">IC Acquisitions of Goods and Services received from other EU Member States*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    3
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get3Box()">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    6
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get6Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Goods and Services received where Place of Supply is Malta other than those reported in Box 3*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    4
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get4Box()">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    7
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get7Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">SUB-TOTAL</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    5
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get5Box()">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    8
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get8Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap class="thead" text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">REVERSE CHARGE</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">VALUE - €</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">INPUT TAX - €</span>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">IC Acquiusitions of Goods for re-sale *</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    9
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[9])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    13
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get13Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Services received from EU Member States where the purchaser is liable for VAT *</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    9A
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats['9A'])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    13A
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get13ABox()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">IC Acquisitions of Capital Goods *</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    10
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[10])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    14
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get14Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Goods and Services Received where Place of Supply is Malta*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    11
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[11])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    15
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get15Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">SUB-TOTAL</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    12
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get12Box()">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    16
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get16Box()">
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap class="table-margin">
                        <v-flex xs12>
                            <v-layout row wrap class="thead" text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">DOMESTIC SUPPLIES & EXPORTS</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">VALUE - €</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">OUTPUT TAX - €</span>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Taxable Goods/Services @ 18%*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    18
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[18])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    23
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get23Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Taxable Services @ 7%*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    18A
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats['18A'])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    23A
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get23ABox()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Taxable Goods/Services @ 5%*</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    19
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[19])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    24
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get24Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Exempt with Credit/Exports</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    20
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[20])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalVatAmount(vats[20])">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Exempt without Credit</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    21
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[21])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalVatAmount(vats[21])">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">SUB-TOTAL</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    22
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get22Box()">
                                </v-flex>
                                <v-flex xs1></v-flex>
                                <v-flex xs2></v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-layout row wrap class="thead" text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">DOMESTIC PURCHASES & IMPORTS</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">VALUE - €</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <span class="my-bold">INPUT TAX - €</span>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Taxable Purchases for re-sale @ 18%</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    27
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[27])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    34
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get34Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Taxable Purchases for re-sale @ 5%</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    28
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[28])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    35
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get35Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Taxable Purchases for re-sale</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    29
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[29])">
                                </v-flex>
                                <v-flex xs1 class="td"></v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalVatAmount(vats[29])">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Capital Goods</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    30
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[30])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    36
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get36Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Services & Overheads @ 18%</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    31
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[31])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    37
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get37Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Services & Overheads @ 7%</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    31A
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats['31A'])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    37A
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get37ABox()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="table-span">Services & Overheads @ 5%</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    32
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="getTotalAmount(vats[32])">
                                </v-flex>
                                <v-flex xs1 class="td">
                                    38
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get38Box()">
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap text-xs-center>
                                <v-flex xs6 class="td">
                                    <span class="my-bold">SUB-TOTAL</span>
                                </v-flex>
                                <v-flex xs1 class="td">
                                    33
                                </v-flex>
                                <v-flex xs2 class="td">
                                    <input type="text" readonly  placeholder="NIL" :value="get33Box()">
                                </v-flex>
                                <v-flex xs1></v-flex>
                                <v-flex xs2></v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <div class="pad"></div>
                    <v-layout row wrap text-xs-center class="card-bordered">
                        <v-flex xs12>
                            <v-layout row wrap text-xs-center>
                                <v-flex xs4 class="thead">
                                    PAYMENT SLIP
                                </v-flex>
                                <v-flex xs8>
                                    <span class="middle-text">(completed for cash/cheque payments att the Departament)</span>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap text-xs-center>
                                <v-flex xs6>
                                    <v-layout row wrap text-xs-center>
                                        <v-flex xs7>
                                            <span class="middle-text">Amound Due (BOX 45): E</span>
                                        </v-flex>
                                        <v-flex xs5>
                                            <input type="text" readonly  class="underlined-input" :value="get45Box()">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6>
                                    <v-layout row wrap text-xs-center>
                                        <v-flex xs7>
                                            <span class="middle-text">Amound Paid: E</span>
                                        </v-flex>
                                        <v-flex xs5>
                                            <input type="number" class="underlined-input">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap text-xs-center>
                                <v-flex xs4>
                                    <v-layout row wrap text-xs-center>
                                        <v-flex xs6>
                                            <span class="middle-text">Bank</span>
                                        </v-flex>
                                        <v-flex xs6>
                                            <input type="text" readonly  class="underlined-input">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs4>
                                    <v-layout row wrap text-xs-center>
                                        <v-flex xs6>
                                            <span class="middle-text">Account No:</span>
                                        </v-flex>
                                        <v-flex xs6>
                                            <input type="text" readonly  class="underlined-input">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs4>
                                    <v-layout row wrap text-xs-center>
                                        <v-flex xs6>
                                            <span class="middle-text">Cheque No:</span>
                                        </v-flex>
                                        <v-flex xs6>
                                            <input type="text" readonly  class="underlined-input">
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap text-xs-center>
                                <v-flex xs6>
                                    <b><span class="middle-text">Pay online at www.vat.gov.mt or through Internet Banking using Payment Reference</span></b>
                                </v-flex>
                                <v-flex xs6>
                                    <b></b>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-center class="card-bordered">
                        <v-flex xs12>
                            <v-layout row wrap text-xs-center>
                                <v-flex xs1>
                                    I,
                                </v-flex>
                                <v-flex xs4>
                                    <input type="text" readonly  class="underlined-input">
                                </v-flex>
                                <v-flex xs3>
                                    <span class="table-span">(Full Name in BLOCK LETTERS)</span>
                                </v-flex>
                                <v-flex xs1>
                                    ID No:
                                </v-flex>
                                <v-flex xs3>
                                    <input type="text" readonly  class="underlined-input">
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap text-xs-center>
                                <v-flex xs8>
                                    <span class="table-span">declare that all details provided are complete and correct</span>
                                </v-flex>
                                <v-flex xs1>
                                    Tel:
                                </v-flex>
                                <v-flex xs3>
                                    <input type="text" readonly  class="underlined-input">
                                </v-flex>
                            </v-layout>
                            <br>
                            <v-layout row wrap text-xs-left>
                                <v-flex xs4>
                                    <span class="table-span">Signed:_______________________________</span>
                                </v-flex>
                                <v-flex xs4>
                                    <span class="table-span">Designation:_______________________________</span>
                                </v-flex>
                                <v-flex xs4>
                                    <span class="table-span">Date:</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!--/left col-->

                <!--right col-->
                <v-flex xs3 class="right-col">
                    <v-card color="grey">
                        <v-card-text class="card-bordered pad1">
                            <span class="my-bold">TAX RETURN</span><br>
                            <span class="middle-text">In terms of article 27 of the VAT Act. Cap 406</span>
                        </v-card-text>
                    </v-card>

                    <v-layout row wrap text-xs-left class="pad">
                        <v-flex xs6 class="td thead">
                            <span class="table-span">Start date:</span>
                        </v-flex>
                        <v-flex xs6 class="td">
                            <span>{{ vat.start_date | formatDate}}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-left>
                        <v-flex xs6 class="td thead">
                            <span class="table-span">End date:</span>
                        </v-flex>
                        <v-flex xs6 class="td">
                            <span>{{ vat.end_date | formatDate }}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-left>
                        <v-flex xs6 class="td thead">
                            <span class="table-span">Due date:</span>
                        </v-flex>
                        <v-flex xs6 class="td">
                            <span>{{ vat.due_date | formatDate }}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs12>
                            <span class="middle-text">This Tax Retutn can be sent via website www.vat.gov.mt</span>
                            <span class="middle-text pad">Tax Return with missing details is invalid and will be sent back.</span>
                        </v-flex>
                    </v-layout>
                    <v-card height="130px">
                        <v-card-text class="bank-stamp-container">
                            <span class="bank-stamp-text">BANK RUBBER STAMP</span>
                        </v-card-text>
                    </v-card>
                    <v-layout row wrap text-xs-center class="pad">
                        <v-flex xs12 class="card-bordered">
                            <span class="middle-text">Tax Computation</span>
                        </v-flex>
                    </v-layout>
                    <br>
                    <div class="text-xs-center">
                        <span class="my-bold">(BOX 8 - BOX 16)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td">
                            17
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get17Box()">
                        </v-flex>
                    </v-layout>
                    <div class="text-xs-center">
                        <span class="my-bold">(BOXES 23 + 23A +24)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td">
                            25
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get25Box()">
                        </v-flex>
                    </v-layout>
                    <div class="text-xs-center">
                        <span class="my-bold">(BOX 17 + BOX 25)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td">
                            26
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get26Box()">
                        </v-flex>
                    </v-layout>
                    <div class="text-xs-center">
                        <span class="my-bold">(BOXES 34+35+36+37+37A+38)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td">
                            39
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get39Box()">
                        </v-flex>
                    </v-layout>
                    <br>
                    <span class="thead table-span">Adjustment in favour of VAT Department</span>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td thead">
                            40
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="number">
                        </v-flex>
                    </v-layout>
                    <span class="thead table-span">Adjustment in favour of Registered Person</span>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td thead">
                            41
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="number">
                        </v-flex>
                    </v-layout>
                    <br>
                    <div class="thead text-xs-center">
                        <span class="my-bold">EXCESS CREDIT</span><br>
                        <span class="my-bold">(BOX 39 - 26)+(BOX 41 - 40)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td thead">
                            42
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get42Box()">
                        </v-flex>
                    </v-layout>
                    <div class="thead text-xs-center">
                        <span class="thead my-bold">(BOX 26 - 39)+(BOX 40 - 41)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td thead">
                            43
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get43Box()">
                        </v-flex>
                    </v-layout>
                    <div class="thead text-xs-center">
                        <span class="thead my-bold">EXCESS CREDIT B/F</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td thead">
                            44
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="0">
                        </v-flex>
                    </v-layout>
                    <div class="thead text-xs-center">
                        <span class="my-bold">TAX PAYABLE</span><br>
                        <span class="my-bold">(BOX 43 - BOX 44)</span>
                    </div>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs2 class="td thead">
                            45
                        </v-flex>
                        <v-flex xs10 class="td">
                            <input type="text" readonly  :value="get45Box()">
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!--/right col-->
                <v-layout row wrap>
                    <v-flex xs4>
                        TAXPAYERS COPY
                    </v-flex>
                    <v-flex xs4>
                        {{ company.details.vatNumber }}
                    </v-flex>
                    <v-flex xs4 text-xs-right>
                        VAT Form 003/2011
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-container>
        <v-container v-if="showPrintButton">
            <v-btn color="primary" class="white--text" @click="download">Download</v-btn>
        </v-container>
    </v-app>
</template>

<script>
    import jsPDF from "jspdf"
    import html2canvas from 'html2canvas'
    import {mapGetters, mapActions} from 'vuex'
    import * as lockPeriodService from '../../lock-periods/service'

    export default {
        data() {
            return {
                name: 0,
                showPrintButton: true,
                document: {},
                vats: []
            }
        },

        props: {
            vat: {
                type: Object,
                required: true
            }
        },

        computed: {
            ...mapGetters({
                currencies: 'settings/currencies',
                vatRateByCode: 'settings/vatRateByCode',
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                baseCurrency: 'accounting/currency',
                saleItems: 'accounting/saleItems',
                purchaseItems: 'accounting/purchaseItems',
                banks: 'accounting/banks',
                defaultBank: 'accounting/defaultBank',
                accounts: 'accounting/accounts',
                company: 'accounting/company',
                accountById: 'accounting/accountById',
            }),
        },

        mounted() {
            this.getTotalVats()
            //setTimeout(function(){
            //window.html2canvas = html2canvas;
            //let pdf = new jsPDF('p','pt','a4');
            //html2canvas(document.body).then(function(canvas) {
            //    pdf.addHTML(canvas, function() {
            //        pdf.output('datauri.pdf');
            //    });
            //});}, 3000);
            //
            //    document.body.appendChild(canvas);
            //});
            //this.showPrintButton = false;
            //let htmlText = this.$refs.pdfApp.$el.innerHTML;
            //let pdfName = 'test';
            //var doc = new jsPDF();

            //var doc = new jsPDF('p', 'pt', 'a4', true);
            //    doc.fromHTML(htmlText, 15, 15, {
            //      'width': 500
            //    }, function (dispose) {
            //    doc.save('thisMotion.pdf');
            //    });
            //doc.fromHTML(htmlText, 20, 20);
            //doc.save(pdfName + '.pdf');
        },
        methods: {
            ...mapActions(['setFetching', 'setMessage']),

            getTotalVats() {
                lockPeriodService.totals(this.vat)
                    .then(response => {
                        this.vats = response.data
                        this.toPdf()
                    })
            },

            /**
             * Get formatted amount
             *
             * @param total
             * @param format
             * @returns {*}
             */
            getAmount(total, format = true) {
                if(format) {
                    return this.formatMoney(total)
                }

                return parseInt(total)
            },

            /**
             * Get total amount from vat code
             *
             * @param value
             * @param format
             * @returns {*}
             */
            getTotalAmount(value, format = true) {
                let amount = 0

                if(value) {
                    amount = value.total_amount
                }
                if(format) {
                    return this.formatMoney(amount)
                }

                return parseInt(amount)
            },

            /**
             * Get vat total amount from vat code
             *
             * @param value
             * @returns {*}
             */
            getTotalVatAmount(value) {
                let amount = 0

                if(value) {
                    amount = value.total_vat_amount
                }
                return this.formatMoney(amount)
            },

            get3Box(format = true) {
                let total = this.getTotalAmount(this.vats['9'], false) + this.getTotalAmount(this.vats['9A'], false) +
                            this.getTotalAmount(this.vats[10], false)

                return this.getAmount(total, format)
            },

            get4Box(format = true) {
                let total = this.getTotalAmount(this.vats[11], false)

                return this.getAmount(total, format)
            },

            get5Box(format = true) {
                let total = this.getTotalAmount(this.vats[1], false) + this.getTotalAmount(this.vats[2], false) +
                            this.get3Box(false) + this.get4Box(false)

                return this.getAmount(total, format)
            },

            get6Box(format = true) {
                let total = this.getTotalAmount(this.vats[3], false) * 0.18

                return this.getAmount(total, format)
            },

            get7Box(format = true) {
                let total = this.getTotalAmount(this.vats[7], false)

                return this.getAmount(total, format)
            },

            get8Box(format = true) {
                let total = this.get6Box(false) + this.get7Box(false)

                return this.getAmount(total, format)
            },

            get12Box(format = true) {
                let total = this.getTotalAmount(this.vats[9], false) + this.getTotalAmount(this.vats['9A'], false) +
                            this.getTotalAmount(this.vats[10], false) + this.getTotalAmount(this.vats[11], false);

                return this.getAmount(total, format)
            },

            get13Box(format = true) {
                let total = this.getTotalAmount(this.vats[9], false) * 0.18

                return this.getAmount(total, format)
            },

            get13ABox(format = true) {
                let total = this.getTotalAmount(this.vats['9A'], false) * 0.18

                return this.getAmount(total, format)
            },

            get14Box(format = true) {
                let total = this.getTotalAmount(this.vats['10'], false) * 0.18

                return this.getAmount(total, format)
            },

            get15Box(format = true) {
                let total = this.getTotalAmount(this.vats[11], false) * 0.18

                return this.getAmount(total, format)
            },

            get16Box(format = true) {
                let total = this.getTotalAmount(this.vats[13], false) +
                            this.getTotalAmount(this.vats['13A'], false) + this.getTotalAmount(this.vats[14], false) +
                            this.getTotalAmount(this.vats[15], false) + this.getTotalAmount(this.vats[16], false)

                return this.getAmount(total, format)
            },

            get17Box(format = true) {
                let total = this.getTotalAmount(this.vats[8], false) - this.get16Box(false)

                return this.getAmount(total, format)
            },

            get22Box(format = true) {
                let total = this.getTotalAmount(this.vats[18], false) + this.getTotalAmount(this.vats['18A'], false) +
                            this.getTotalAmount(this.vats[19], false) + this.getTotalAmount(this.vats[20], false) +
                            this.getTotalAmount(this.vats[21], false)

                return this.getAmount(total, format)
            },

            get23Box(format = true) {
                let total = this.getTotalAmount(this.vats[18], false) * 0.18

                return this.getAmount(total, format)
            },

            get23ABox(format = true) {
                let total = this.getTotalAmount(this.vats['18A'], false) * 0.07

                return this.getAmount(total, format)
            },

            get24Box(format = true) {
                let total = this.getTotalAmount(this.vats[19], false) * 0.05

                return this.getAmount(total, format)
            },

            get25Box(format = true) {
                let total = this.getTotalAmount(this.vats[23], false) + this.getTotalAmount(this.vats['23A'], false) +
                            this.getTotalAmount(this.vats[24], false)

                return this.getAmount(total, format)
            },

            get26Box(format = true) {
                let total = this.get17Box(false) + this.get25Box(false)

                return this.getAmount(total, format)
            },

            get33Box(format = true) {
                let total = this.getTotalAmount(this.vats[27], false) + this.getTotalAmount(this.vats[28], false) +
                    this.getTotalAmount(this.vats[29], false) + this.getTotalAmount(this.vats[30], false) +
                    this.getTotalAmount(this.vats[31], false) + this.getTotalAmount(this.vats['31A'], false) +
                    this.getTotalAmount(this.vats[32], false)

                return this.getAmount(total, format)
            },

            get34Box(format = true) {
                let total = this.getTotalAmount(this.vats[27], false) * 0.18

                return this.getAmount(total, format)
            },

            get35Box(format = true) {
                let total = this.getTotalAmount(this.vats[28], false) * 0.05

                return this.getAmount(total, format)
            },

            get36Box(format = true) {
                let total = this.getTotalAmount(this.vats[30], false) * 0.18

                return this.getAmount(total, format)
            },

            get37Box(format = true) {
                let total = this.getTotalAmount(this.vats[31], false) * 0.18

                return this.getAmount(total, format)
            },

            get37ABox(format = true) {
                let total = this.getTotalAmount(this.vats['31A'], false) * 0.07

                return this.getAmount(total, format)
            },

            get38Box(format = true) {
                let total = this.getTotalAmount(this.vats[32], false) * 0.05

                return this.getAmount(total, format)
            },

            get39Box(format = true) {
                let total = this.getTotalAmount(this.vats[34], false) + this.getTotalAmount(this.vats[35], false) +
                    this.getTotalAmount(this.vats[36], false) + this.getTotalAmount(this.vats[37], false) +
                    this.getTotalAmount(this.vats['37A'], false) + this.getTotalAmount(this.vats[38], false)

                return this.getAmount(total, format)
            },

            get40Box(format = true) {
                let total = 0

                return this.getAmount(total, format)
            },

            get41Box(format = true) {
                let total = 0

                return this.getAmount(total, format)
            },

            get42Box() {
                let total = this.get39Box(false) - this.get26Box(false) + this.get40Box(false) - this.get41Box()

                return this.formatMoney(total)
            },

            get43Box() {
                let total = this.get26Box(false) - this.get39Box(false) + this.get40Box(false) - this.get41Box()

                return this.formatMoney(total)
            },

            get44Box() {
                let total = 0

                return this.formatMoney(total)
            },

            get45Box() {
                let total = this.get43Box(false) - this.get44Box(false)

                return this.formatMoney(total)
            },

            toPdf() {
                var that = this

                that.$refs.toPdf.style.width = '100%';
                that.$refs.toPdf.style.paddingLeft = '15mm';
                that.$refs.toPdf.style.paddingTop = '15mm';
            },

            print() {
                this.showPrintButton = false;
                setTimeout(() => {
                    window.print();
                    this.showPrintButton = true;
                }, 0);
            },

            download() {
                this.setFetching({ fetching: true })
                this.$refs.toPdf.style.width = '20cm';

                var that = this
                html2canvas(this.$refs.toPdf).then(function (canvas) {
                    let img = canvas.toDataURL("image/png");
                    let doc = new jsPDF('p', 'mm');
                    doc.addImage(img, 'JPEG', 0, 0);
                    doc.save('tmp.pdf')

                    that.setMessage({ type: 'success', message: 'You have been successfully downloaded document!' })
                    that.$refs.toPdf.style.width = '100%';

                    that.setFetching({ fetching: false })
                });
            },
        },
    }
</script>

<style scoped>
    @media print {
        .thead {
            background-color: #9e9e9e;
        }
    }

    .thead {
        background-color: #9e9e9e;
    }

    .cart-reg-no {
        padding-bottom: unset;
        padding-right: unset;
    }

    .reg-no-label {
        background-color: #9e9e9e;
        border-top: solid;
        border-left: solid;
    }

    .reg-no-no {
        border-top: solid;
        border-left: solid;
    }

    .card-bordered {
        border: solid 2px;
    }

    .card-bordered1 {
        border: solid 1px;
    }

    .td {
        border: solid 1px;
        max-height: 21px;
    }

    .table-span {
        font-size: 11px;
        line-height: 9px;
        display: block;
        text-align: left;
        padding-left: 4px;
    }

    .box-margin {
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .my-bold {
        font-size: 11px;
        font-weight: bolder;
    }

    .right-col {
        padding-left: 10px !important;
    }

    .middle-text {
        font-size: 12px;
        line-height: 12px;
        display: block;
    }

    .bank-stamp-container {
        text-align: center
    }

    .bank-stamp-text {
        color: rgba(0, 0, 0, 0.25);
    }

    .my-header {
        height: 100px;
    }

    input {
        width: 100%;
    }

    .underlined-input {
        border-bottom: solid 1px;
    }

    .pad {
        padding-top: 10px;
    }

    .pad1 {
        padding: 5px;
    }
</style>
