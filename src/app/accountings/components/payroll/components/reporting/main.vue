<template>
    <section>
        <v-toolbar dense flat class="mb-3" height="38">
            <v-toolbar-items>
                <v-btn
                        flat
                        @click="tab = 'payroll'"
                        :color="tab === 'payroll' ? 'primary' : 'black'">Payroll
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'leave'"
                        :color="tab === 'leave' ? 'primary' : 'black'">Leave
                </v-btn>
                <v-btn
                        flat
                        @click="tab = 'overtime'"
                        :color="tab === 'overtime' ? 'primary' : 'black'">Overtime
                </v-btn>

                <v-dialog
                        v-model="fs5dialog"
                        fullscreen
                        class="fs-dialog"
                >
                    <v-btn flat slot="activator" class="fill-height">FS5</v-btn>
                    <v-card>
                        <v-card-title class="grey lighten-4">
                            <span class="title">FS5</span>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="fs5print = !fs5print">Create PDF</v-btn>
                            <v-icon @click="fs5dialog = false">close</v-icon>
                        </v-card-title>
                        <v-card-text>
                            <fs5 :print="fs5print" v-if="fs5dialog"></fs5>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <v-dialog
                        v-model="fs3dialog"
                        fullscreen
                        class="fs-dialog"
                >
                    <v-btn flat slot="activator" class="fill-height">FS3</v-btn>
                    <v-card>
                        <v-card-title class="grey lighten-4">
                            <span class="title">FS3</span>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="fs3print = !fs3print">Create PDF</v-btn>
                            <v-icon @click="fs3dialog = false">close</v-icon>
                        </v-card-title>
                        <v-card-text>
                            <fs3 :print="fs3print" v-if="fs3dialog"></fs3>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-dialog
                        v-model="fs7dialog"
                        fullscreen
                        class="fs-dialog"
                >
                    <v-btn flat slot="activator" class="fill-height">FS7</v-btn>
                    <v-card>
                        <v-card-title class="grey lighten-4">
                            <span class="title">FS7</span>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="fs7print = !fs7print">Create PDF</v-btn>
                            <v-icon @click="fs7dialog = false">close</v-icon>
                        </v-card-title>
                        <v-card-text>
                            <fs7 :print="fs7print" v-if="fs7dialog"></fs7>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-btn
                        flat
                        @click="tab = 'employment history'"
                        :color="tab === 'employment history' ? 'primary' : 'black'">Employment history
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <payroll v-if="tab === 'payroll'"></payroll>
        <overtime v-if="tab === 'overtime'"></overtime>
        <leave v-if="tab === 'leave'"></leave>
        <employment-history v-if="tab === 'employment history'"></employment-history>
    </section>
</template>

<script>
    import Payroll from './payroll/main.vue'
    import Overtime from './overtime/main.vue'
    import Leave from './leave/main.vue'
    import EmploymentHistory from './employment-history/main.vue'
    import Fs3 from '../goverment_reporting/FS3.vue'
    import Fs5 from '../goverment_reporting/FS5.vue'
    import Fs7 from '../goverment_reporting/FS7.vue'

    export default{
        components: {
            Payroll,
            Overtime,
            Leave,
            EmploymentHistory,
            Fs3,
            Fs5,
            Fs7
        },
        data: () => ({
            fs3dialog: false,
            fs5dialog: false,
            fs7dialog: false,
            tab: 'payroll',
            fs3print: false,
            fs5print: false,
            fs7print: false,
        })
    }
</script>

<style>
    .fs-dialog .v-dialog__activator{
        height: 100%;
    }
</style>