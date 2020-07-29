<template>
    <div class="white title page py-3 px-5 mini-input">
        <div class="grey lighten-3 pt-2">
            <v-layout row justify-space-between mb-3>
                <span>Ref:  998071806</span>
                <span>Name: ARMADA MEDIA LTD</span>
                <span>Y/A 2018</span>
            </v-layout>
            <span class="purple--text text--darken-2">B A C K&nbsp;&nbsp;&nbsp;T O&nbsp;&nbsp;&nbsp;I N D E X</span>
            <v-layout row mt-2>
                <v-layout
                        class="border red lighten-4 pa-1">
                    <h2 class="medium"> Part 1 - Company Details</h2>
                </v-layout>
                <v-flex xs3>
                    <v-text-field
                            hide-details
                            class="white border no-border-left input-center pt-0 mt-0 fill-height"
                            value="TA2_e-CO_2018_Ver 1.1">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row class="red lighten-4 ">
                <div class="px-2 border">
                    <v-layout align-center justify-center fill-height>8</v-layout>
                </div>
                <v-layout
                        class="border pa-1">
                    <h2 class="medium">Taxation Data</h2>
                </v-layout>
            </v-layout>
            <v-layout row justify-end pt-2 pr-1 class="border-right-big border-left-big">
                <span>(mark (Y)es or (N)o as appropriate</span>
            </v-layout>
            <v-layout column class="border-left-big border-right-big" px-4 pt-4>
                <v-flex xs11 offset-xs1>
                    <span class="title">State whether the Company</span>
                </v-flex>
                <v-layout row mt-1 v-for="(question, i) in questions" :key="i">
                    <v-flex xs8>
                        <v-layout fill-height pt-1>
                            <span class="body-1 bolder">{{ i + 1 }}</span>
                            <span class="body-1 bolder ml-2">{{ question.text }}</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2>
                        <v-checkbox
                                style="border: none !important;background: transparent !important;"
                                v-model="question.checkbox"
                                hide-details
                                class="mt-0 pt-0">
                        </v-checkbox>
                    </v-flex>
                    <v-flex xs2>
                        <v-layout fill-height align-center>
                            <span class="body-1 bolder red--text">Required!</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>

            <v-layout column px-4 pt-4 class="border-left-big border-right-big border-bottom">
                <span class="title">Other Information</span>
                <v-layout row mt-1>
                    <v-flex xs8>
                        <v-layout fill-height pt-1>
                            <span class="body-1 bolder">Please indicate the country of residence for tax purposes</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2 pr-3>
                        <v-text-field hide-details class="pt-0 mt-0 orange lighten-4 border"></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                        <v-layout fill-height align-center>
                            <span class="body-1 bolder red--text">Required!</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row mt-1>
                    <v-flex xs8>
                        <v-layout fill-height pt-1>
                            <span class="body-1 bolder">Please indicate the average number of employees, including office holders of the company during the accounting period</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2 pr-3>
                        <v-text-field hide-details class="mt-0 pt-0 white border"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row mt-1>
                    <v-flex xs8>
                        <v-layout fill-height pt-1>
                            <span class="body-1 bolder">Have all the wages, salaries and directors' remuneration been reported under the Final Settlement System?</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2 pr-3>
                        <v-text-field hide-details class="mt-0 pt-0 orange lighten-4 border"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-layout>
        </div>
        <v-layout row class="red lighten-4 ">
            <div class="px-2 border">
                <v-layout align-center justify-center fill-height>9</v-layout>
            </div>
            <v-layout
                    class="border pa-1">
                <h2 class="medium">Financial Statements</h2>
            </v-layout>
        </v-layout>

        <v-layout row px-4 grey lighten-3 class="border-left-big border-right-big">
            <v-flex xs8>
                <v-layout fill-height pt-1>
                    <span class="body-1 bolder">A</span>
                    <span class="body-1 bolder ml-2">Preparation and Audit</span>
                </v-layout>
            </v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs2></v-flex>
        </v-layout>
        <v-layout row justify-end grey lighten-3 pt-2 pr-1 class="border-right-big border-left-big">
            <span>(mark (Y)es or (N)o as appropriate</span>
        </v-layout>
        <v-layout column grey lighten-3 class="border-left-big border-right-big" px-4 pt-4>
            <v-layout row mt-1 v-for="(question, i) in questions2" :key="i">
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="body-1 bolder">{{ i + 1 }}</span>
                        <span class="body-1 bolder ml-2">{{ question.text }}</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2>
                    <v-checkbox
                            hide-details
                            style="border: none !important;background: transparent !important;"
                            class="mt-0 pt-0"
                            v-model="question.checkbox"></v-checkbox>
                </v-flex>
                <v-flex xs2>
                    <v-layout fill-height align-center>
                        <span class="body-1 bolder red--text">Required!</span>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-layout row mt-1>
                <v-flex xs8>
                    <v-layout fill-height pt-1 ml-3>
                       <v-text-field hide-details class="white border pt-0 mt-0 pl-2"></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2>
                    <v-layout fill-height align-center>
                        <span class="body-1 bolder red--text">Required!</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="body-1 bolder">5</span>
                        <span class="body-1 bolder ml-2">Is the audit report qualified or was there any emphasis of matter?</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2 pr-3>
                    <v-text-field hide-details class="orange lighten-4 border pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
                <v-flex xs2>
                    <v-layout fill-height align-center>
                        <span class="body-1 bolder red--text">Required!</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row mt-1>
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="body-1 bolder">6</span>
                        <span class="body-1 bolder ml-2">If the answer to question 5 is yes please indicate below the reason(s) for qualification or emphasis</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2 ></v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8>
                    <v-layout fill-height ml-3>
                        <v-text-field hide-details class="white border pt-0 mt-0 pl-2"></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2>
                    <v-layout fill-height align-center>
                        <span class="body-1 bolder red--text">Required!</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8>
                    <v-layout fill-height ml-3>
                        <v-text-field hide-details class="white border no-border-top mt-0 pt-0 pl-2"></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8>
                    <v-layout fill-height ml-3>
                        <v-text-field hide-details class="white border no-border-top mt-0 pt-0 pl-2"></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs8>
                    <v-layout fill-height ml-3>
                        <v-text-field hide-details class="red border no-border-top pt-0 mt-0  pl-2"></v-text-field>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
        </v-layout>
        <v-layout column grey lighten-3 class="border-left-big border-right-big border-bottom-big" px-4 >
            <v-layout row mb-3>
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="body-1 bolder">B</span>
                        <span class="body-1 bolder ml-2">Notes to the financial statements</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs2></v-flex>
            </v-layout>
            <v-layout row mt-1 v-for="(question, i) in questions3" :key="i">
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="body-1 bolder">{{ i + 1 }}</span>
                        <span class="body-1 bolder ml-2">{{ question.text }}</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2>
                    <v-checkbox
                            hide-details
                            style="border: none !important;background: transparent !important;"
                            class="mt-0 pt-0"
                            v-model="question.checkbox"></v-checkbox>
                </v-flex>
                <v-flex xs2>
                    <v-layout fill-height align-center>
                        <span class="body-1 bolder red--text">Required!</span>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-layout>
        <v-layout row justify-center>
            <span class="red--text">
                COMPLETE, ACCURATE AND CORRECT INFORMATION IS REQUIRED!
            </span>
        </v-layout>
        <v-layout row justify-space-between mt-2>
            <span class="title">IRD - Malta</span>
            <span class="title">page 2</span>
        </v-layout>
    </div>
</template>

<script>
    export default{
        data () {
            return {
                questions: [
                    {
                        text: 'is claiming benefits under the Business Promotion Act (Cap. 325) and Regulations',
                        checkbox: ''
                    },
                    {
                        text: 'is claiming other fiscal benefits [legislation other than the BPA]',
                        checkbox: ''
                    },
                    {
                        text: 'is claiming any scientific research or research and development expenditure',
                        checkbox: ''
                    },
                    {
                        text: 'operates a foreign income account (FIA) OR is using the FIA in this return to claim FRFTC',
                        checkbox: ''
                    },
                    {
                        text: 'has elected NOT to allocate distributable profits to the MTA and FIA [Rule 9 of LN 79 of 2008 as amended by LN 247 of 2011]',
                        checkbox: ''
                    },
                    {
                        text: 'is owned in whole or in part by non-resident shareholders',
                        checkbox: ''
                    },
                    {
                        text: 'is exercising the option referred to in Articles 48(4A)(b)(i)(1) or 48(4A)(b)(i)(2) of the ITMA',
                        checkbox: ''
                    },
                    {
                        text: 'forms part of a group as defined in Article 16 of the Income Tax Act',
                        checkbox: ''
                    },
                    {
                        text: 'has paid out dividends during the year',
                        checkbox: ''
                    },
                    {
                        text: 'has carried out trading activities during the year',
                        checkbox: ''
                    },
                    {
                        text: 'was engaged in more than one trading activity during the year',
                        checkbox: ''
                    },
                    {
                        text: 'is in liquidation',
                        checkbox: ''
                    },
                    {
                        text: 'has filed the final scheme of distribution with this return, if the answer to 12 is yes',
                        checkbox: ''
                    },
                    {
                        text: 'has any investments in joint venture(s) or partnership(s)',
                        checkbox: ''
                    },
                    {
                        text: 'is an Investment Services Company as defined in Article 15 of the Income Tax Act',
                        checkbox: ''
                    },
                    {
                        text: 'is an Insurance Company or a non-resident or acting on behalf of a non-resident and receives dividends as its sole income',
                        checkbox: ''
                    },
                    {
                        text: 'is claiming as a deduction any interest, discount or premium paid or payable to a person not resident in Malta [Art 26(h) of the ITA]',
                        checkbox: ''
                    },
                    {
                        text: 'has relied on the written advice of a tax professional in terms of the Schedule to the Income Tax Act',
                        checkbox: ''
                    },
                    {
                        text: 'is a Collective Investment Scheme',
                        checkbox: ''
                    },
                    {
                        text: 'is claiming the participation exemption under article 12(1)(u) of the Income Tax Act',
                        checkbox: ''
                    },
                    {
                        text: 'is benefitting under the provisions of articles 5(9), 5(14), or 5A(4)(f) of the Income Tax Act',
                        checkbox: ''
                    },
                    {
                        text: 'is a securitisation vehicle and is claiming deductions under LN 324 of 2011',
                        checkbox: ''
                    },
                    {
                        text: 'is engaged in the business of exploration and the production of petroleum as regulated by Article 23 of the Income Tax Act',
                        checkbox: ''
                    },
                    {
                        text: 'has received any passive interest or royalties that are allocated either to the Foreign Income Account or the Maltese Taxed Account',
                        checkbox: ''
                    },
                    {
                        text: 'is claiming the Audit report waiver or additional audit fee deduction under Art 19(4)(a) of the ITMA or LN 306 of 2017',
                        checkbox: ''
                    },

                    {
                        text: 'is claiming the Notional Interest Deduction or reporting Deemed Notional Interest received or both LN 37 of 2018',
                        checkbox: ''
                    },
                ],
                questions2: [
                    {
                        text: 'Have the annual accounts been prepared in accordance with the provisions and requirements of the Companies Act [CAP 386]?',
                        checkbox: ''
                    },
                    {
                        text: 'Are the annual accounts approved and signed?',
                        checkbox: ''
                    },
                    {
                        text: 'Has the audit report been prepared and signed ?',
                        checkbox: ''
                    },
                    {
                        text: 'Please indicate below the name of the holder of the auditing practicing certificate. ',
                        checkbox: ''
                    },
                ],
                questions3: [
                    {
                        text: 'Were notes to the financial statements prepared in accordance with the requirements of the Companies Act?',
                        checkbox: ''
                    },
                    {
                        text: 'Have there been any changes in accounting policies from the last return?',
                        checkbox: ''
                    },
                    {
                        text: 'Are any values presented other than cost?\n',
                        checkbox: ''
                    },
                    {
                        text: 'Were there any post-balance sheet events mentioned in the notes?',
                        checkbox: ''
                    },
                    {
                        text: 'Was there any revaluation of assets during the year?',
                        checkbox: ''
                    },
                    {
                        text: 'Were there any contingent liabilities at year end?',
                        checkbox: ''
                    },
                    {
                        text: 'Was there any change in the authorised share capital during the year?',
                        checkbox: ''
                    },
                    {
                        text: 'Was there any change in the issued share capital during the year?',
                        checkbox: ''
                    },
                    {
                        text: 'Was there any change in shareholding during the year?',
                        checkbox: ''
                    },
                    {
                        text: 'Were there any changes among directors during the year?',
                        checkbox: ''
                    },
                ],
            }
        }
    }
</script>