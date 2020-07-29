<template>
    <div class="white title page py-3 px-5">
        <div class="grey lighten-3">
            <v-layout row justify-space-between mb-3>
                <span>Ref:  998071806</span>
                <span>Name: ARMADA MEDIA LTD</span>
                <span>Y/A 2018</span>
            </v-layout>
            <span class="purple--text text--darken-2">B A C K&nbsp;&nbsp;&nbsp;T O&nbsp;&nbsp;&nbsp;I N D E X</span>
            <v-layout row class="red lighten-4 " mt-2>
                <div class="px-2 border">
                    <v-layout align-center justify-center fill-height>9</v-layout>
                </div>
                <v-layout
                        class="border pa-1">
                    <h2 class="medium">Financial Statements</h2>
                </v-layout>
            </v-layout>
            <v-layout column class="border-left-big border-right-big" px-4 pt-4>
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="subheading bolder">A</span>
                        <span class="subheading bolder ml-2">Preparation and Audit</span>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row justify-end pt-2 pr-1 class="border-right-big border-left-big">
                <span>(mark (Y)es or (N)o as appropriate</span>
            </v-layout>
            <v-layout column class="border-left-big border-right-big" px-4 pt-4>
                <v-layout row mt-1>
                    <v-flex xs7>
                        <v-layout fill-height pt-1>
                            <span class="subheading bolder">1</span>
                            <span class="subheading bolder ml-2">Have the annual accounts been prepared in accordance with the provisions and requirements of the Companies Act [CAP 386]?</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                        <v-checkbox v-model="checkbox1"></v-checkbox>
                    </v-flex>
                    <v-flex xs2>
                        <v-layout fill-height align-center>
                            <span class="subheading bolder red--text">Required!</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>

            <v-layout column px-4 pt-4 class="border-left-big border-right-big border-bottom">
                <v-flex xs8>
                    <v-layout fill-height pt-1>
                        <span class="subheading bolder">B</span>
                        <span class="subheading bolder ml-2">Notes to the financial statements</span>
                    </v-layout>
                </v-flex>
                <v-layout row mt-1>
                    <v-flex xs7>
                        <v-layout fill-height pt-1>
                            <span class="subheading bolder">1</span>
                            <span class="subheading bolder ml-2">Were notes to the financial statements prepared in accordance with the requirements of the Companies Act?</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                        <v-checkbox v-model="checkbox4"></v-checkbox>
                    </v-flex>
                    <v-flex xs2>
                        <v-layout fill-height align-center>
                            <span class="subheading bolder red--text">Required!</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-layout>
        </div>
        <p class="text-xs-center red--text mt-1">COMPLETE, ACCURATE AND CORRECT INFORMATION IS REQUIRED</p>
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
                checkbox1: ''
            }
        }
    }
</script>