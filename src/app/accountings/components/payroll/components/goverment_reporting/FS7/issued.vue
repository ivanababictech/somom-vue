<template>
    <v-layout row wrap>
        <v-flex xs4>
            <subheader
                    title="B"
                    text="Number of FS3s Issued"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs2></v-flex>
        <v-flex xs5>
            <v-layout align-center justify-end pl-2>
                <v-flex xs2 pr-2 class="text-xs-right">
                    <span class="fs-text">B1</span>
                </v-flex>
                <v-flex xs1 v-for="i in 5" :key="i">
                    <v-text-field
                            solo
                            flat
                            hide-details
                            height="32px"
                            :class="i === 1 && 'primary-border-left'"
                            class="pt-0 mt-0 mini-input primary-border primary-border-top primary-border-bottom"
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