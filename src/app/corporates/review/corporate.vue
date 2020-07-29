<template>
    <section>
        <v-toolbar dense color="accent">
            <v-toolbar-items>
                <v-btn flat :to="{ name: 'corporate-nominal-activity' }">Nominal activity</v-btn>
                <v-btn flat :to="{ name: 'corporate-banks' }">Banks</v-btn>
                <v-btn flat :to="{ name: 'corporate-lock-periods' }">Lock Periods</v-btn>
                <v-btn flat :to="{ name: 'corporate-opening-balances' }">Opening Balances</v-btn>
                <v-btn flat to="#">Reporting</v-btn>
                <v-btn flat :to="{ name: 'corporate-audit-trail' }">Audit Trail</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
        </v-toolbar>
        <router-view></router-view>
    </section>
</template>

<script>
    import * as corporateService from '../service'

    export default {

        created() {
            this.getCorporate()
        },

        methods: {
            getCorporate() {
                corporateService.show()
                    .then(response => {
                        this.$store.dispatch('corporate/init', response.data)
                    })
            },
        },

    }
</script>