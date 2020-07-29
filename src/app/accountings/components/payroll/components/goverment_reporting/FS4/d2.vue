<template>
    <v-layout row wrap ml-2 mb-3>
        <subheader title="D" text="FSS Other Emoluments Tax Deduction"></subheader>
        <v-flex xs12 mb-5>
            <v-layout row align-center mt-5>
                <v-flex xs9>
                    <span class="title fs-text" style="font-weight: 400">Tax deduction rate on <br/> other Emoluments</span>
                </v-flex>
                <div>
                    <v-layout>
                        <strong class="fs-text">D5</strong>
                        <div>
                            <v-layout column align-center>
                                <v-checkbox hide-details class="mt-0 pt-0"></v-checkbox>
                                <small class="fs-text">(insert rate)</small>
                            </v-layout>
                        </div>
                        <strong class="fs-text">%</strong>
                    </v-layout>
                </div>
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