<template>
    <div>
        <v-layout justify-end>
            <v-btn color="accent" @click.native="previous = 0" v-if="previous" class="black--text">View current vat
                returns
            </v-btn>
            <v-btn color="accent" @click.native="previous = 1" v-else class="black--text">View previous vat returns
            </v-btn>
        </v-layout>
        <vat-dialog
                @create-vat="createVat"
                @update-vat="updateVat"
                v-if="showVatDialog"
                :vat="vat">
        </vat-dialog>
        <v-layout row mb-3>
            <span class="headline">
                <template v-if="previous">
                    Locked vat return periods
                </template>
                <template v-else>
                    Vat return unlocked periods
                </template>
            </span>
        </v-layout>
        <template v-for="(vat,i) in vats">
            <v-layout row align-center :mt-4="i">
                <span class="title">{{ vat.start_date | moment("DD/MM/YYYY") }} - {{ vat.end_date | moment("DD/MM/YYYY") }}</span>
                <v-tooltip top>
                    <v-btn icon slot="activator" class="mx-0" @click="editLockPeriod(vat)">
                        <v-icon color="primary">edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                </v-tooltip>

                <v-btn color="primary" @click="generateVat(vat)">Generate VAT return</v-btn>
                <v-btn color="primary" outline @click="viewWorkings(vat)">View workings</v-btn>

                <v-tooltip top v-if="vat.locked">
                    <v-btn icon slot="activator" class="mx-0" @click="unlockVat(vat)">
                        <v-icon color="warning">lock</v-icon>
                    </v-btn>
                    <span>Unlock Vat</span>
                </v-tooltip>
                <v-tooltip top v-if="!vat.locked">
                    <v-btn icon slot="activator" class="mx-0" @click="lockVat(vat)">
                        <v-icon color="warning">lock_open</v-icon>
                    </v-btn>
                    <span>Lock Vat</span>
                </v-tooltip>
            </v-layout>
            <vat-pdf v-if="vat.showPdf" @closePdf="vat.showPdf = false" :vat="vat"></vat-pdf>
            <workings v-if="vat.showWorkings" :vat="vat"></workings>
        </template>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import VatDialog from './components/dialog'
    import VatPdf from './pdf/vat'
    import * as lockPeriodService from '../lock-periods/service'
    import Workings from './components/workings'

    export default {
        data() {
            return {
                showVatDialog: false,
                previous: 0,
                vat: {
                    type: 'vat'
                },
                toPdf: false,
                vats: [],
                showWorkings: false
            }
        },

        computed: {
            ...mapGetters({
                company: 'accounting/company',
            }),
        },

        mounted() {
            if (this.company.id) {
                this.getVats()
                this.existsVatPeriod()
            }
        },

        methods: {
            getVats() {
                let params = {
                    type: 'vat',
                    previous: this.previous
                }

                lockPeriodService.getLockPeriods(params)
                    .then(response => {
                        this.vats = response.data
                    })
            },

            updateVat() {
                lockPeriodService.update(this.vat)
                    .then(response => {
                        this.getVats()

                        this.showVatDialog = false
                    })
            },

            existsVatPeriod() {
                lockPeriodService.existsVatPeriod()
                    .then(response => {
                        this.showVatDialog = !response.data
                    })
            },

            viewWorkings(vat) {
                this.$set(vat, 'showWorkings', !vat.showWorkings)
            },

            generateVat(vat) {
                this.$set(vat, 'showPdf', !vat.showPdf)
            },

            createVat() {
                lockPeriodService.create(this.vat)
                    .then(response => {
                        this.vat = {}
                        this.getVats()

                        this.showVatDialog = false
                    })
            },

            lockVat(vat) {
                lockPeriodService.lock(vat)
                    .then(response => {
                        this.getVats()
                    })
            },

            unlockVat(vat) {
                lockPeriodService.unlock(vat)
                    .then(() => this.getVats())
            },

            editLockPeriod(vat) {
                this.showVatDialog = true
                this.vat = Object.assign({}, vat)
            },
        },

        watch: {
            previous: 'getVats',
            company() {
                this.getVats()
                this.existsVatPeriod()
            }
        },

        components: {VatDialog, VatPdf, Workings},
    }
</script>