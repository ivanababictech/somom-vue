<template>
    <div class="section2 grey lighten-2 pa-2">
        <cm-header></cm-header>

        <cm-step step="ATTACHMENTS"></cm-step>
        <cm-pink text="Original documentations to be attached with the claim"></cm-pink>

        <v-layout row ml-2 mt-2>
            <v-flex xs1>
                <v-layout row justify-center class="border-big red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">No.</h2>
                </v-layout>
            </v-flex>
            <v-flex xs9 ml-2>
                <v-layout row class="border-big red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">Details of documentation.</h2>
                </v-layout>
            </v-flex>
            <v-flex xs1 ml-2>
                <v-layout row justify-center class="border-big red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">Attached?</h2>
                </v-layout>
            </v-flex>
            <v-flex xs1 ml-2>
                <v-layout row justify-center class="border-big red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder">Doc Ref:</h2>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row ml-2 mt-2 v-for="(attachment, i) in attachments" :key="i">
            <v-flex xs1 :class="attachment.text && 'white border-big'">
                <v-layout row align-center fill-height justify-center v-if="attachment.text">
                    <span class="body-2" >{{ i + 1 }}</span>
                </v-layout>
            </v-flex>
            <v-flex xs9 ml-2>
                <v-text-field class="pt-0 mt-0 pl-3 fill-height" v-model="attachment.text" hide-details></v-text-field>
            </v-flex>
            <v-flex xs1 ml-2>
                <v-select
                        :items="[ { text: 'Yes' , value: true } , { text: 'No' , value: false } ]"
                        :value="true"
                        :append-icon="''"
                        class="input-group--focused pt-0 mt-0 border orange lighten-4 fill-height"
                        v-if="attachment.text"
                ></v-select>
            </v-flex>
            <v-flex xs1 ml-2>
                <v-text-field class="pt-0 mt-0 fill-height input-center" hide-details read-only v-if="attachment"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout row ml-2 mt-5>
            <v-flex xs1></v-flex>
            <v-flex xs9 ml-2>
                <v-layout row class="border red lighten-4 pl-1 py-1">
                    <h2 class="subheading bolder underline">Other Documentation that would facilitate the refund process:</h2>
                </v-layout>
            </v-flex>
            <v-flex xs1 ml-2></v-flex>
            <v-flex xs1 ml-2></v-flex>
        </v-layout>
        <template v-for="i in 2">
            <v-layout row ml-2 mt-2>
                <v-flex xs1>
                    <v-text-field class="pt-0 mt-0 fill-height input-center" hide-details read-only></v-text-field>
                </v-flex>
                <v-flex xs9 ml-2>
                    <v-text-field class="pt-0 mt-0 pl-3 fill-height" hide-details></v-text-field>
                </v-flex>
                <v-flex xs1 ml-2>
                </v-flex>
                <v-flex xs1 ml-2>
                </v-flex>
            </v-layout>
        </template>

        <cm-footer step="Attachments"></cm-footer>
    </div>
</template>

<script>
    import isStep from '../mixins/isStep.js'

    export default {
        mixins: [isStep],
        data () {
            return{
                attachments: [
                    {text: ''},
                    {text: ''},
                    {text: ''},
                    {text: ''},
                    {text: ''},
                    {text: ''},
                    {text: ''},
                    {text: ''},
                    {text: ''},
                ]
            }
        }
    }
</script>