<template>
    <v-layout row wrap>
        <v-flex xs2>
            <subheader
                    title="B"
                    text="Period"
                    class="ml-1"
                    background="#aaceba"
                    backgroundBox="#007840">
            </subheader>
        </v-flex>
        <v-flex xs5>
            <v-layout align-center pl-2>
                <v-flex xs2>
                    <span class="fs-text">B1 From</span>
                </v-flex>
                <v-flex xs1 v-for="i in 8" :key="i">
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
            <v-layout pl-2>
                <v-flex xs2></v-flex>
                <v-flex xs1 v-for="i in 8" :key="i" class="text-xs-center">
                    <small class="fs-text ">
                        <template v-if="i < 3">
                            d
                        </template>
                        <template v-else-if="i < 5">
                            m
                        </template>
                        <template v-else>
                            y
                        </template>
                    </small>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs5>
            <v-layout align-center pl-2>
                <v-flex xs2>
                    <span class="fs-text">B1 to</span>
                </v-flex>
                <v-flex xs1 v-for="i in 8" :key="i">
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
            <v-layout pl-2>
                <v-flex xs2></v-flex>
                <v-flex xs1 v-for="i in 8" :key="i" class="text-xs-center">
                    <small class="fs-text ">
                        <template v-if="i < 3">
                            d
                        </template>
                        <template v-else-if="i < 5">
                            m
                        </template>
                        <template v-else>
                            y
                        </template>
                    </small>
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