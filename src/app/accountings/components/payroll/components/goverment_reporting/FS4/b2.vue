<template>
    <v-layout row wrap ml-2>
        <subheader title="B" text="FSS Main Tax Deduction"></subheader>

        <v-layout row wrap justify-end class="small-des-row primary-bg-light">
            <span class="body-2 fs-text">(Tick the correct box)</span>
            <v-flex xs12>
                <v-divider color="#009688"></v-divider>
            </v-flex>
        </v-layout>

        <v-flex xs12 class="pb-2">
            <tick
                    text="Use “single” rates if payee ticked B1"
                    title="B8"
                    background="#c4e1dd">
            </tick>
            <tick text="Use “married” rates if payee ticked B2" title="B9" background="#c4e1dd"></tick>
            <tick text="Use “parent” rates if payee ticked B3" title="B10" background="#c4e1dd"></tick>
            <tick text="Withhold 15% tax if payee ticked B4" title="B11" background="#c4e1dd"></tick>
            <tick text="Do not withhold tax if payee ticked B5" title="B12" background="#c4e1dd"></tick>
            <tick text="Withhold 15% tax if payee ticked B6" title="B13" background="#c4e1dd"></tick>
            <tick text="Withhold 7.5% tax if payee ticked B7" title="B14" background="#c4e1dd"></tick>
        </v-flex>
    </v-layout>
</template>

<script>
    import Subheader from '../components/subheader'
    import Tick from '../components/tick.vue'

    export default {
        components: {
            Subheader,
            Tick
        }
    }
</script>