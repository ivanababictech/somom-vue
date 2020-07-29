<template>
    <v-layout row wrap>
        <v-flex xs7></v-flex>
        <v-flex xs5>
            <v-layout>
                <v-flex xs3></v-flex>
                <v-flex xs7 class="text-xs-center">
                    <span class="fs-text">€</span>
                </v-flex>
                <v-flex xs2 class="text-xs-center">
                    <span class="fs-text">c</span>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs7>
            <subheader
                    title="E2"
                    text="Maternity Fund Contributions due to IRD as per FS3s attached"
                    class="ml-1"
                    background="#aaceba"
                    small
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs5>
            <v-layout align-center>
                <v-flex xs3 class="text-xs-right" pr-2>
                    <span class="fs-text">E2</span>
                </v-flex>
                <v-flex xs1 v-for="i in 9" :key="i">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            :class="i === 1 && 'primary-border-left'"
                            class="pt-0 mt-0 mini-input primary-border-top primary-border-bottom primary-border"
                            type="number"
                            max="9">
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
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