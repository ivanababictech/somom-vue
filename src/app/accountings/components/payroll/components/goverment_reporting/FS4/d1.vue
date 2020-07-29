<template>
    <v-layout row wrap>
        <subheader title="D" text="Other Emolument Income" class="ml-1"></subheader>
        <v-layout row wrap justify-end class="small-des-row">
            <span class="body-2 fs-text">(Tick either box D2 or D3)</span>
            <v-flex xs12 class="ml45">
                <v-divider color="#009688"></v-divider>
            </v-flex>
        </v-layout>
        <v-flex xs12 class="ml45 pb-2">
            <tick text="Deduct at the prescribed rate (20%)" title="D1"></tick>
            <tick text="Deduct at a higher rate<br/><small>(You may indicate rate or leave blank and payer will calculate)</small>"
                  title="D2" small></tick>
            <tick text="Deduct at a lower rate<br/><small>if pensioner or full-time student, indicate rate</small>"
                  title="D3" small hideDivider></tick>
            <tick text="<small style='display: block;'>if not a pensioner or full-time student, tick this box to<br/>request CIR’s permission</small>"
                  title="D4" small></tick>
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