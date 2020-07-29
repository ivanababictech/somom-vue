<template>
    <div class="white title page py-3 px-5">
        <v-layout row justify-space-between>
            <span>IRD - Malta</span>
            <span>6</span>
        </v-layout>
        <v-layout mt-3 pl-3 row justify-space-between>
            <span>Ref:  998071806</span>
            <span>Name: ARMADA MEDIA LTD</span>
            <span>Y/A 2018</span>
        </v-layout>
        <v-layout column pl-3 mt-3>
            <v-layout row>
                <v-flex xs7 pr-1 class="border red lighten-4 text-xs-right">
                    <span class="subheading">INCOME STATEMENT FOR THE YEAR ENDED 2017 </span>
                </v-flex>
                <v-flex xs1 class="border no-border-left orange lighten-4"></v-flex>
                <v-flex xs2 class="border no-border-left orange lighten-4"></v-flex>
                <v-flex xs2 pl-1 class="border no-border-left red lighten-4">
                    <span class="subheading">2017</span>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top" red lighten-4>
                    <span class="body-1 purple--text text--darken-2">NAME OF THE OPERATING ESTABLISHMENT</span>
                </v-flex>
                <v-flex xs1 red lighten-4 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">4500</span>
                </v-flex>
                <v-flex xs2 class="border-right border-bottom grey lighten-2 body-1">
                    <v-layout fill-height justify-center align-center>
                        <span class="red--text">Descriptions!</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top" red lighten-4>
                    <span class="body-1 purple--text text--darken-2">OPERATION DESCRIPTION</span>
                </v-flex>
                <v-flex xs1 red lighten-4 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">4501</span>
                </v-flex>
                <v-flex xs2 class="border-right border-bottom grey lighten-2 body-1">
                    <v-layout fill-height justify-center align-center>
                        <span class="red--text">Descriptions!</span>
                    </v-layout>
                </v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top" red lighten-4>
                    <span class="body-1 purple--text text--darken-2">ACTIVITY NUMBER</span>
                </v-flex>
                <v-flex xs1 red lighten-4 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">4502</span>
                </v-flex>
                <v-flex xs2 class="border-right border-bottom grey lighten-2 body-1">
                </v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="red lighten-4 input-center border no-border-top no-border-left pt-0 mt-0 pl-2" value="1"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top" red lighten-4>
                    <span class="body-1 blue--text">Item Description</span>
                </v-flex>
                <v-flex xs1 red lighten-4 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1 blue--text">Code</span>
                </v-flex>
                <v-flex xs2 class="border-right border-bottom grey lighten-2 body-1">
                </v-flex>
                <v-flex xs2 class="red lighten-4 border-bottom text-xs-center">
                    <span class="body-1 blue--text">  Dr ( + ) or Cr ( - )</span>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Sale of goods and rendering of services</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5000</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Export Sales </span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5001</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Wholesale Sales </span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5002</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Retail Sales</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5003</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Sale of goods to related parties</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5004</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interdivisional sales</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5005</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from production and / or processing - local</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5006</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from production and / or processing - foreign</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5007</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from production and / or processing - related parties</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5008</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from the rendering of services - local</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5009</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from the rendering of services - overseas</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5010</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from the rendering of services to related parties</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5011</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1 blue--text">Total sales of goods and services</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1 blue--text">5099</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="red lighten-4 input-center border no-border-top no-border-left pt-0 mt-0 pl-2" value="0"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from Investments </span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5100</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interest from Maltese banks</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5101</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interest received or receivable from shareholders and / or directors</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5102</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interest received or receivable from related parties</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5103</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Loan interest - from local sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5104</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Securities interest - from local sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5105</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interest from other Maltese sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5106</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interest from foreign banks</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5107</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Loan interest - from foreign sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5108</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Securities interest - from foreign sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5109</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Interest from other foreign sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5110</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Dividends from Maltese sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5111</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Dividends from foreign sources</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5112</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Commission Income</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5190</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Commission income on real estate transactions</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5191</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Rental income</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5200</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Real estate rental Income</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5201</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from ground rents and / or laudemium</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5202</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Film rental</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5203</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Vehicle leasing</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5204</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Amounts received by non-profit making organisations [NPOs]</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5250</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Membership fees received</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5251</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Donations and gifts received </span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5252</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Gross sales and Income from organizational activities </span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5253</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realised Gains or losses on disposal of fixed assets</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5280</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realised gains or losses on disposal of intangible assets</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5281</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realised gains or losses on disposal of tangible assets</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5282</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realised gains or losses on disposal of immovable property</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5283</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realised gains or losses on sale of investments</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5284</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Other Income</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5300</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realised Profit or loss on exchange</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5301</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Unrealised Profit or loss on exchange</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5302</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Profit or loss from joint ventures and partnerships</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5303</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Realisation of deferred Income</span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5304</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs7 pl-1 class="border no-border-top">
                    <span class="body-1">Income from royalties, patents, rights, etc. </span>
                </v-flex>
                <v-flex xs1 class="border no-border-top no-border-left text-xs-center">
                    <span class="body-1">5305</span>
                </v-flex>
                <v-flex xs2 class="border-right grey lighten-2"></v-flex>
                <v-flex xs2>
                    <v-text-field hide-details class="white border no-border-top no-border-left pt-0 mt-0 pl-2"></v-text-field>
                </v-flex>
            </v-layout>

        </v-layout>
    </div>
</template>