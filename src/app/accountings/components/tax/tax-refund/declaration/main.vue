<template>
    <div class="section2 grey lighten-2 pa-2">
        <cm-header></cm-header>

        <cm-step step="DECLARATION"></cm-step>
        <cm-pink text="Contact details and signatory"></cm-pink>

        <p class="mt-3 subheading bolder">
            I hereby make a claim for refund of tax in accordance with the provisions of article 48(4) and (4A) of the
            Income Tax Management Act, 1994
        </p>
        <p class="subheading bolder underline">I declare that, to the best of my knowledge:</p>
        <p class="subheading bolder mb-2">a) &nbsp;&nbsp;The information contained in this claim(including the
            attachments thereto) is true, correct and complete;</p>
        <p class="subheading bolder mb-2">b) &nbsp;&nbsp;No refund has been made or claimed of the Malta tax in respect
            of which this claim is being made;</p>
        <p class="subheading bolder mb-2">c) &nbsp;&nbsp;All required certificates/documents (including relevant
            dividend warrants)are attached to this claim;</p>
        <p class="subheading bolder">d) &nbsp;&nbsp;I am aware of all the relevant requirements under the Income Tax
            Acts in relation to the claim being hereby made.</p>

        <v-layout row align-center mt-2>
            <v-flex xs3 offset-xs1 class="text-xs-right pr-2">
                <span class="subheading bolder">This claim is being made on</span>
            </v-flex>
            <v-flex xs4 pr-5 pl-1 class="orange lighten-4 border-big subheading bolder">behalf of the shareholder shown
                in Page 2
            </v-flex>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs2 offset-xs2>
                <span class="subheading bolder uppercase">Name:</span>
            </v-flex>
            <v-flex xs4>
                <v-text-field class="input-center pt-0 mt-0 fill-height border-big" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs2 offset-xs2>
                <span class="subheading bolder uppercase">Signature:</span>
            </v-flex>
            <v-flex xs4>
                <v-text-field class="input-center pt-0 mt-0 fill-height border-big" multi-line rows="2"
                              hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs2 offset-xs2>
                <span class="subheading bolder uppercase">Designation:</span>
            </v-flex>
            <v-flex xs4>
                <v-text-field class="input-center pt-0 mt-0 fill-height border-big orange lighten-4"
                              hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center mt-4>
            <span class="title underline">Contact Details:</span>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs4><span class="title">Telephone No:</span></v-flex>
            <v-flex xs2>
                <v-text-field class="input-center pt-0 mt-0 fill-height border-big" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs4><span class="title">E-mail:</span></v-flex>
            <v-flex xs3>
                <v-text-field class="input-center pt-0 mt-0 fill-height border-big" hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs4><span class="title">Date:</span></v-flex>
            <v-flex xs3>
                <v-text-field class="input-center pt-0 mt-0 fill-height border-big grey darken-1"
                              hide-details></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row mt-4 style="height: 4px" class="black"></v-layout>

        <v-layout row mt-4>
            <v-flex xs2 pl-2 class="white border-big subheading bolder">
                Additional Notes:
            </v-flex>
        </v-layout>

        <v-layout row mt-2>
            <v-text-field class="input-center pt-0 mt-0 fill-height border-big" multi-line rows="4"
                          hide-details></v-text-field>
        </v-layout>

        <v-layout column mt-2 class="subheading bolder">
            <span>Inland Revenue Department - International Taxation Unit</span>
            <span>C/o MFSA</span>
            <span>Notabile Road</span>
            <span>Attard BKR 14</span>
            <span>Malta</span>
            <span>Telephone: (+356) 21441155</span>
            <span>Fax: (+356) 21441197</span>
            <a href="http://www.ird.gov.mt" target="_blank">www.ird.gov.mt</a>
        </v-layout>

        <v-layout row mt-2>
            <div class="grey lighten-3 border-big subheading bolder">
                The Inland Revenue Department collects and processes information to carry out its functions under the
                Income Tax Acts.
                All data is collected and processed in accordance with the Data Protection Act 2001, the Income Tax
                Acts, other subsidiary legislation.
            </div>
        </v-layout>

        <v-layout row align-center mt-3>
            <v-flex xs4><span class="subheading bolder">Is the Claim correct and complete?</span></v-flex>
            <v-flex xs2>
                <v-select
                        :items="items"
                        :value="true"
                        append-icon=""
                        class="pt-0 mt-0 border orange lighten-4"
                        hide-details
                        single-line
                ></v-select>
            </v-flex>
        </v-layout>

        <cm-footer step="Declaration"></cm-footer>
    </div>
</template>

<script>
    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
        data() {
            return {
                items: [
                    {text: 'Yes', value: true},
                    {text: 'No', value: false}
                ]
            }
        }
    }
</script>