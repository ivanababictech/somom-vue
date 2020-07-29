<template>
    <v-layout row wrap>
        <subheader title="E" text="Payee’s Declaration" class="ml-1"></subheader>
        <v-layout row py-2 class="pl45">
            <div class="w7">
                <v-layout fill-height align-center pl-1>
                    <span class="fs-text" style="line-height: 1">I, the undersigned, certify that the<br/>
                        information given on this form is<br/>
                        true and correct.
                    </span>
                </v-layout>
            </div>
            <div class="w1" v-for="i in 8" :key="i">
                <v-text-field
                        solo
                        flat
                        hide-details
                        height="32px"
                        class="pt-0 mt-0 mini-input primary-border primary-border-bottom primary-border-top"
                        :class="i === 1 && 'primary-border-left'"
                        type="number"
                        max="9">
                </v-text-field>
            </div>
        </v-layout>
        <v-layout>
            <v-flex xs4>
                <v-layout row fill-height align-end justify-end>
                    <span class="title fs-text" style="font-weight: 400">Signature</span>
                </v-layout>
            </v-flex>
            <v-flex xs8 ml-2>
                <v-text-field hide-details class="mt-0 pt-0"></v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
    import Subheader from '../components/subheader'

    export default {
        components: {
            Subheader
        }
    }
</script>