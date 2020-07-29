<template>
    <v-layout row wrap>
        <subheader title="B" text="Main Source of Emolument Income" class="ml-1"></subheader>

        <v-layout row wrap justify-end class="small-des-row">
            <span class="body-2 fs-text">(See notes overleaf and tick the correct box)</span>
            <v-flex xs12 class="ml45">
                <v-divider color="#009688"></v-divider>
            </v-flex>
        </v-layout>

        <v-flex xs12 class="ml45 pb-2">
            <tick text="“Single” rates of tax" title="B1"></tick>
            <tick text="“Married” rates of tax" title="B2"></tick>
            <tick text="“Parent” rates of tax" title="B3"></tick>
            <tick text="Overseas Employment rate of tax (15%)" title="B4"></tick>
            <tick text="Persons returning to Employment<br/> or Total Income less than € 9,500" title="B5" small></tick>
            <tick text="Highly Qualified Persons rate of tax (15%)<br/> or Qualifying Employment in Aviation rate of tax (15%)" title="B6" small></tick>
            <tick text="Main income from a qualifying sport activity (7.5%)" title="B7"></tick>
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