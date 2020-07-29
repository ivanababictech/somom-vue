<template>
    <div class="white medium page py-3">
        <v-layout row wrap pt-2 class="grey lighten-3">
            <v-flex xs1>
                <v-layout column align-center>
                    <p class="headline mb-5">TR<br/>TA2</p>
                    <p class="text-xs-center display-2" style="transform: rotate(-90deg);">Malta</p>
                    <p class="text-xs-center display-2" style="transform: rotate(-90deg);"> - </p><br/>
                    <p class="text-xs-center display-2" style="transform: rotate(-90deg);">Revenue</p>
                    <br/><br/><br/>
                    <p class="text-xs-center display-2" style="transform: rotate(-90deg);">Inland</p>
                </v-layout>
            </v-flex>
            <v-flex xs11 pl-3>
                <v-layout row>
                    <v-flex xs7>
                        <span class="display-1">Income Tax Return and Self Assessment</span>
                        <p class="body-2 mb-0 px-1" style="text-align: justify;">
                            on behalf of a Company, a Body Corporate established by Statute, a Foundation or a Trust
                            that made an election in terms of Article 27D(1)
                            or a Trading or Commercial Undertaking operated by an Entity (Article 30) whether resident
                            in Malta or not</p>
                    </v-flex>
                    <v-flex xs5>
                        <v-layout
                                row
                                justify-center
                                align-end
                                class="border-big red lighten-4 pl-1 pt-3">
                            <h2 class="subheading">TA2_e-CO_2018_Ver 1.1</h2>
                        </v-layout>
                        <div
                                class="mt-2  border-big no-border-bottom white pl-1"
                                style="min-height: 115px"
                                contenteditable="true">
                        </div>
                    </v-flex>
                </v-layout>
                <div class="red darken-1 border fill-width pt-3 pb-2"></div>
                <v-layout column class="border">
                    <v-layout row mt-2>
                        <v-flex xs4 pl-2><span>Ref. No.</span></v-flex>
                        <div>
                            <v-text-field
                                    hide-details
                                    class="white pt-0 mt-0 border-big input-center"
                                    style="width: 150px"
                                    value="998071806">
                            </v-text-field>
                        </div>
                    </v-layout>
                    <v-layout row mt-2>
                        <v-flex xs4 pl-2><span>Name</span></v-flex>
                        <v-flex xs7>
                            <v-text-field
                                    hide-details
                                    class="white pt-0 mt-0 border-big pl-2"
                                    value="ARMADA MEDIA LTD">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row mt-2>
                        <v-flex xs4 pl-2><span>Year of Assessment</span></v-flex>
                        <div>
                            <v-text-field
                                    hide-details
                                    class="red lighten-4 pt-0 mt-0 border-big input-center"
                                    value="2018"
                                    style="width: 120px !important;">
                            </v-text-field>
                        </div>
                    </v-layout>
                    <v-layout row mt-2>
                        <v-flex xs4 pl-2><span>Basis Year</span></v-flex>
                        <div>
                            <v-text-field
                                    hide-details
                                    class="red lighten-4 pt-0 mt-0 border-big input-center"
                                    value="2017"
                                    style="width: 120px !important;">
                            </v-text-field>
                        </div>
                    </v-layout>
                    <v-layout row mt-2 pa-2 class="red lighten-4 border-top border-bottom">
                        MAKE SURE THAT THE CORRECT DETAILS ARE ENTERED. DATA WILL BE COPIED TO ALL OTHER PAGES IN THE
                        RETURN.
                    </v-layout>
                </v-layout>
                <v-layout column mt-2 px-3 class="white border" style="font-size: 1.2rem">
                    <p style="line-height: 1;" class="mb-2">
                        <small>1</small>
                        <small>
                            In pursuance of the provisions of the Income Tax Acts you are hereby required to furnish me
                            on this form with a true and correct declaration of the income of the company,
                            body corporate established by statute, trading or commercial undertaking or a Trust, for the
                            basis year indicated in this return including a selfassessment computation
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>2</small>
                        <small>
                            All income of a resident company, body corporate, trading or commercial undertaking or a
                            Trust,
                            accruing in or derived from Malta or elsewhere, and whether received in Malta or not, during
                            the accounting period stated in Part 1 below, must be stated.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>3</small>
                        <small>
                            Except as provided in Article 68 of the Income Tax Act (Cap. 123), all income of a
                            non-resident company, body corporate or trading or commercial undertaking, accruing in or
                            derived from Malta,
                            whether received in Malta or not, during the accounting period stated in Part 1 below, must
                            be included.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>4</small>
                        <small>
                            Full details, attachments and documentation should be given relating to all matters required
                            to be disclosed in this return.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>5</small>
                        <small>
                            A copy of the financial statements audited by a Certified Public Accountant and Auditor MUST
                            be attached to this return.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>6</small>
                        <small>
                            No section of this return is to be left blank. Where there is nothing to report, the word
                            'NONE' should be entered.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>7</small>
                        <small>
                            The term 'Income Tax Acts' used in this return has the meaning assigned to it in Article 2
                            of the Income Tax Act (Cap. 123)
                            and, unless otherwise stated, the Articles quoted in this return refer to the Income Tax Act
                            (Cap. 123).
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>8</small>
                        <small>
                            This return is to be completed and forwarded so as to reach the Inland Revenue Department by
                            not later than the last day of the ninth month following that to which the accounts for the
                            relative financial period
                            are made or the thirty-first March of the relative year of assessment, whichever is the
                            later.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small>9</small>
                        <small>
                            A company carrying on banking business under the Banking Act or a company carrying on the
                            business of insurance under the Insurance Business Act or a company which is owned and
                            controlled, directly or indirectly, by such companies shall deliver
                            to the Commissioner a paper copy of the audited financial statements within forty-eight
                            hours of filing an electronic tax return.
                        </small>
                    </p>
                    <p style="line-height: 1" class="mb-2">
                        <small class="pl-2">
                            COMMISSIONER OF INLAND REVENUE, Floriana CMR02
                        </small>
                    </p>
                </v-layout>
                <div class="mt-2 border">
                    <v-layout
                            class="border-bottom red lighten-4 pl-3 py-1">
                        <h2 class="title">Part 1 - Company Details</h2>
                    </v-layout>
                    <v-layout row my-2>
                        <v-flex xs4>
                            <v-layout row>
                                <div>
                                    <v-layout
                                            justify-center
                                            class="border no-border-left red px-2 lighten-4 py-1">
                                        <h2 class="subheading bolder">1</h2>
                                    </v-layout>
                                </div>
                                <div>
                                    <v-layout
                                            class="border no-border-left red lighten-4 py-1 pr-4 pl-1">
                                        <h2 class="subheading bolder">Partnership Number</h2>
                                    </v-layout>
                                </div>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 ml-1>
                            <v-text-field
                                    hide-details
                                    class="white border input-center pt-0 mt-0 fill-height"
                                    value="C 76260">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs5 ml-1>
                            <v-layout row>
                                <div>
                                    <v-layout
                                            justify-center
                                            class="border red px-2 lighten-4 py-1">
                                        <h2 class="subheading bolder">2</h2>
                                    </v-layout>
                                </div>
                                <div>
                                    <v-layout
                                            class="border no-border-left red lighten-4 pa-1">
                                        <h2 class="subheading bolder">VAT Number</h2>
                                    </v-layout>
                                </div>
                                <div>
                                    <v-text-field
                                            hide-details
                                            class="white border no-border-left input-center pt-0 mt-0 fill-height"
                                            value="C 76260">
                                    </v-text-field>
                                </div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row my-2>
                        <v-flex xs4>
                            <v-layout row>
                                <div>
                                    <v-layout
                                            justify-center
                                            class="border no-border-left red px-2 lighten-4 py-1">
                                        <h2 class="subheading bolder">3</h2>
                                    </v-layout>
                                </div>
                                <div>
                                    <v-layout
                                            class="border no-border-left red lighten-4 py-1 pr-4 pl-1">
                                        <h2 class="subheading bolder">Main Trading Activity</h2>
                                    </v-layout>
                                </div>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8>
                            <v-text-field
                                    hide-details
                                    class="white border input-center pt-0 mt-0 fill-height"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row my-2>
                        <v-flex xs4>
                            <v-layout row>
                                <div>
                                    <v-layout
                                            justify-center
                                            class="border no-border-left no-border-right red px-2 lighten-4 py-1">
                                        <h2 class="subheading bolder">4</h2>
                                    </v-layout>
                                </div>
                                <div>
                                    <v-layout column
                                              class="border red lighten-4 py-1 pr-4 pl-1">
                                        <h2 class="subheading bolder">Address</h2>
                                        <p class="body-2">
                                            of registered office / place of control, management and administration</p>
                                    </v-layout>
                                </div>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8 ml-2>
                            <v-textarea
                                    hide-details
                                    class="white border input-center pt-0 mt-0 fill-height pl-1"
                                    value="KARIMA, HIGH GROVE APTRIQ IL-KAMPANELLA ATTARDATD 1480"></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row my-2>
                        <v-flex xs4 pl-1 offset-xs4>
                            <v-layout row>
                                <v-layout
                                        class="border red lighten-4 pa-1">
                                    <h2 class="subheading bolder">Tel. Number </h2>
                                </v-layout>
                                <div>
                                    <v-text-field
                                            hide-details
                                            class="white border no-border-left input-center pt-0 mt-0 fill-height"
                                                  style="max-width: 100px">

                                    </v-text-field>
                                </div>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4 ml-2>
                            <v-layout row>
                                <v-layout
                                        class="border red lighten-4 pa-1">
                                    <h2 class="subheading bolder">Fax Number </h2>
                                </v-layout>
                                <div>
                                    <v-text-field
                                            hide-details
                                            class="white border no-border-left input-center pt-0 mt-0 fill-height"
                                                  style="max-width: 100px">
                                    </v-text-field>
                                </div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row my-2>
                        <v-flex xs4>
                            <v-layout row fill-height>
                                <div>
                                    <v-layout
                                            justify-center
                                            class="border no-border-left no-border-right red px-2 lighten-4 py-1">
                                        <h2 class="subheading bolder">5</h2>
                                    </v-layout>
                                </div>
                                <v-layout column fill-height
                                          class="border red lighten-4 py-1 pr-4 pl-1">
                                    <h2 class="subheading bolder">Names and address/es</h2>
                                    <p class="body-2">
                                        of establishments from which business activities are carried on</p>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8 ml-2>
                            <v-layout column>
                                <v-layout row>
                                    <v-flex xs5 class="border red lighten-4 subheading bolder pl-1">
                                        Name
                                    </v-flex>
                                    <v-flex xs7 class="border red lighten-4 subheading bolder pl-1">Address</v-flex>
                                </v-layout>
                                <v-layout row class="white">
                                    <v-flex xs5 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">1</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field
                                                    class="white pt-0 mt-0"
                                                    hide-details>
                                            </v-text-field>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs7 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">1</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout row class="white">
                                    <v-flex xs5 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">2</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs7 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">2</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout row class="white">
                                    <v-flex xs5 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">3</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs7 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">3</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout row class="white">
                                    <v-flex xs5 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">4</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs7 class="subheading bolder">
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">4</h2>
                                                </v-layout>
                                            </div>
                                            <v-text-field class="white pt-0 mt-0" hide-details></v-text-field>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout column my-2>
                        <v-layout>
                            <v-flex xs4>
                                <v-layout row>
                                    <div>
                                        <v-layout
                                                justify-center
                                                class="border no-border-left red px-2 lighten-4 py-1">
                                            <h2 class="subheading bolder">6</h2>
                                        </v-layout>
                                    </div>
                                    <v-layout
                                            class="border no-border-left red lighten-4 py-1 pr-4 pl-1">
                                        <h2 class="subheading bolder">Accounting Date</h2>
                                    </v-layout>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <p class="body-2 pl-4">
                            If the basis year in respect of which this return is being made is a period other than the
                            1st January to 31st December, state the period covered,
                            date and number (if available) of the permit issued by the IRD
                        </p>
                        <v-layout row pl-4>
                            <v-flex xs3
                                    class="border red lighten-4 subheading bolder pl-1 uppercase text-xs-center">
                                From
                            </v-flex>
                            <v-flex xs3
                                    class="border red lighten-4 subheading bolder pl-1 uppercase text-xs-center">
                                To
                            </v-flex>
                            <v-flex xs3 class="border red lighten-4 subheading bolder pl-1 text-xs-center">
                                Permit Number
                            </v-flex>
                            <v-flex xs3 class="border red lighten-4 subheading bolder pl-1 text-xs-center">
                                Date Issued
                            </v-flex>
                        </v-layout>
                        <v-layout row pl-4>
                            <v-flex xs3>
                                <v-text-field class="white pt-0 mt-0 pl-2" hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field class="white pt-0 mt-0 pl-2" hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field class="white pt-0 mt-0 pl-2" hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs3>
                                <v-text-field class="white pt-0 mt-0 pl-2" hide-details></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs3 offset-xs9>
                                <v-layout justify-center>
                                    <span class="body-2">dd/mm/yyyy</span>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                    <v-layout row my-2>
                        <v-flex xs10>
                            <v-layout column>
                                <v-layout>
                                    <v-flex xs5>
                                        <v-layout row>
                                            <div>
                                                <v-layout
                                                        justify-center
                                                        class="border no-border-left red px-2 lighten-4 py-1">
                                                    <h2 class="subheading bolder">7</h2>
                                                </v-layout>
                                            </div>
                                            <v-layout
                                                    class="border no-border-left red lighten-4 py-1 pr-4 pl-1">
                                                <h2 class="subheading bolder">Currency</h2>
                                            </v-layout>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <p class="body-2 pl-4">
                                    State the Currency used in this return and the financial statements in accordance
                                    with the denomination of the company's share capital
                                </p>
                            </v-layout>
                        </v-flex>
                        <v-flex xs2>
                            <v-layout column class="border-big">
                                <v-flex xs12 class="red darken-2 pt-3 pb-2 border-bottom"></v-flex>
                                <v-flex xs12 class="red lighten-4 border-top">
                                    <v-layout align-center justify-center py-1>
                                        <span class="body-2">Currency</span>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 class="orange lighten-4 border-top">
                                    <v-layout align-center justify-center py-1>
                                        <span class="body-2">Euro Currency</span>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </div>
                <v-layout row justify-space-between mt-2>
                    <span class="title">IRD - Malta</span>
                    <span class="title">page 1</span>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>