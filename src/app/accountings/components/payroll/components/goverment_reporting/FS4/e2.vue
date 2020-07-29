<template>
    <v-layout row wrap ml-2 mt-4>
        <subheader title="E" text="Payer’s Name and Signature" class="mt-1"></subheader>
        <v-flex xs12 px-2 pt-1 class="border-left border-right border-bottom" style="background-color: #e3efe8 ">
            <v-layout align-center>
                <span class="title fs-text" style="font-weight: 400">Full name and position</span>
                <v-text-field hide-details solo flat class="pt-0 mt-0 ml-2 mini-input" background-color="#e3efe8"></v-text-field>
            </v-layout>
            <v-layout align-center mt-3 mb-2>
                <span class="title fs-text" style="font-weight: 400">Signature</span>
                <v-text-field hide-details solo flat class="pt-0 mt-0 ml-2 mini-input" background-color="#e3efe8"></v-text-field>
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