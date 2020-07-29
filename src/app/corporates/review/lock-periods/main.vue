<template>
    <v-card>
        <v-card-title>
            <div class="text-xs-center">
                <v-btn color="accent" class="black--text" @click.native="switchNextYear()">Switch to the next year</v-btn>
            </div>
        </v-card-title>
        <v-card-text>
            <year-end :switchedNextYear="switchedNextYear"></year-end>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import YearEnd from "./components/year-end"
    import * as lockPeriodService from './service'

    export default {
        data: () => ({
            switchedNextYear: false
        }),

        computed: {
            ...mapGetters({
                showBalances: 'accounting/showBalances',
                dialogs: 'accounting/dialogs',
                company: 'accounting/company',
            }),
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            switchNextYear() {
                lockPeriodService.switchNextYear(this.type)
                    .then(response => {
                        this.switchedNextYear = true
                    })
            }
        },

        components: { YearEnd },

    }
</script>
