<template>
    <div class="white title page py-1 px-5">
        <div class="grey lighten-3 pt-2">
            <v-layout row justify-space-between mb-2>
                <span>Ref:  998071806</span>
                <span>Name: ARMADA MEDIA LTD</span>
                <v-flex xs4></v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs8 offset-xs1>
                    <span class="body-1">Please indicate whether company wishes to receive any eventual overpayment of tax to its bank account as a SEPA transfer</span>
                </v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border pt-0 mt-0"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-2>
                <v-flex xs9 pl-2>
                    <p class="body-1">
                        I hereby authorise the Commissioner for Revenue to transfer the aforementioned refund to the following bank account: <br/>
                        Note: The Bank Account Number (Current or Savings) should belong to the company and not to directors or shareholders
                    </p>
                </v-flex>
            </v-layout>

            <v-layout row mt-3>
                <v-flex xs5>
                    <v-layout align-center justify-end fill-height>
                        <span class="subheading">Bank </span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-2>
                    <v-text-field hide-details class="pt-0 mt-0 pl-2 border"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                    <v-layout align-center justify-end fill-height>
                        <span class="subheading">BIC</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-2>
                    <v-text-field hide-details class="pt-0 mt-0 pl-2 border"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                    <v-layout align-center justify-end fill-height>
                        <span class="subheading">IBAN</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-2>
                    <v-text-field hide-details class="pt-0 mt-0 pl-2 border"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                    <v-layout align-center justify-end fill-height>
                        <span class="subheading">Mobile Number</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-2>
                    <v-text-field hide-details class="pt-0 mt-0 pl-2 border"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                    <v-layout align-center justify-end fill-height>
                        <span class="subheading">BIC</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-2>
                    <v-text-field hide-details class="pt-0 mt-0 pl-2 border"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                    <v-layout align-center justify-end fill-height>
                        <span class="subheading">Email Address</span>
                    </v-layout>
                </v-flex>
                <v-flex xs4 pl-2>
                    <v-text-field hide-details class="pt-0 mt-0 pl-2 border"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row mt-5>
                <v-flex xs9 pl-2>
                    <p class="body-1">
                        I understand that if the account number provided above is incorrect or given with the intention to defraud the Inland Revenue Department, I shall be liable to charges in terms of the provision of the Criminal Code (Chapter 9 of the Laws of Malta) <br/>
                        I hereby agree that if there were to be any changes to the account number provided above, I shall immediately inform the Commissioner for Revenue; <br/>
                        I hereby authorise the Commissioner for Revenue to verify with the above mentioned Bank that the above mentioned company is the beneficial owner of the bank account indicated on this application
                    </p>
                </v-flex>
            </v-layout>
            <v-layout row mt-4 class="border">
                <v-flex xs5 pl-3 class="border-right">
                    <span class="body-2">Name of person making declaration (BLOCKS)</span>
                </v-flex>
                <v-flex xs2 pl-3 class="border-right text-xs-center">
                    <span class="body-2">Designation</span>
                </v-flex>
                <v-flex xs3 pl-3 class="border-right text-xs-center">
                    <span class="body-2">Signature</span>
                </v-flex>
                <v-flex xs2 pl-3 class="text-xs-center">
                    <span class="body-2">Date</span>
                </v-flex>
            </v-layout>
            <v-layout row class="border no-border-top body-1">
                <v-flex xs5 class="border-right subheading">
                    <div contenteditable="true" style="min-height: 50px;width: 100%"></div>
                </v-flex>
                <v-flex xs2 class="border-right text-xs-center">
                    <div contenteditable="true" style="min-height: 50px;width: 100%"></div>
                </v-flex>
                <v-flex xs3 class="border-right text-xs-center">
                    <div contenteditable="true" style="min-height: 50px;width: 100%"></div>
                </v-flex>
                <v-flex xs2 class="text-xs-center">
                    <v-layout fill-height column justify-space-between>
                        <div contenteditable="true" style="min-height: 50px;width: 100%"></div>
                        <v-layout class="border-top body-2" justify-center py-1>
                            dd/mm/yyyy
                        </v-layout>
                    </v-layout>
                </v-flex>
            </v-layout>
        </div>
        <v-layout row justify-space-between mt-5>
            <span class="title">IRD - Malta</span>
            <span class="title">page 5</span>
        </v-layout>
    </div>
</template>