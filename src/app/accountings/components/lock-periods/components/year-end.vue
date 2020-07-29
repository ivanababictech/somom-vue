<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="lockPeriods"
                class="elevation-5"
                hide-actions
                :disable-initial-sort="true"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.label }}</td>
                <td>{{ props.item.start_date }}</td>
                <td>{{ props.item.end_date }}</td>
                <td>
                    <v-tooltip top v-if="props.item.locked">
                        <v-btn icon slot="activator" class="mx-0" @click="unlockPeriod(props.item)">
                            <v-icon color="danger">lock</v-icon>
                        </v-btn>
                        <span>Unlock Period</span>
                    </v-tooltip>
                    <v-tooltip top v-if="!props.item.locked">
                        <v-btn icon slot="activator" class="mx-0" @click="lockPeriod(props.item)">
                            <v-icon color="danger">lock_open</v-icon>
                        </v-btn>
                        <span>Lock Period</span>
                    </v-tooltip>
                </td>
                <td>
                    <v-tooltip top>
                        <v-btn icon slot="activator" class="mx-0" @click="editLockPeriod(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <span>Edit</span>
                    </v-tooltip>

                    <v-btn :color="props.item.locked ? 'primary' : 'default'" @click="openAuditorAdjustments(props.item)">
                        Auditor adjustments
                    </v-btn>

                    <v-btn color="primary" v-if="props.item.locked" @click="viewAuditorAdjustments(props.item)">
                        View
                    </v-btn>
                </td>
            </template>
        </v-data-table>
        <v-dialog v-model="showEditForm" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Period</span>
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex md6>
                                <date-picker label="Start Date" v-model="period.start_date" full-width hide-details clearable></date-picker>
                            </v-flex>
                            <v-flex md6>
                                <date-picker label="End Date" v-model="period.end_date" full-width hide-details clearable></date-picker>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog :value="dialogs.auditor_adjustments" lazy fullscreen transition="dialog-bottom-transition"
                  :overlay="false" v-if="dialogs.auditor_adjustments">
            <auditor-adjustments-dialog :lockPeriod="auditorLockPeriod" :viewAdjustments="viewAdjustments"></auditor-adjustments-dialog>
        </v-dialog>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import * as lockPeriodService from '../service'
    import AuditorAdjustmentsDialog from '@/app/accountings/components/dialogs/auditor-adjustments/index'

    export default {
        data: () => ({
            headers: [
                {text: 'Label', value: 'start_date'},
                {text: 'Start Date', value: 'start_date'},
                {text: 'End Date', value: 'end_date'},
                {text: 'Locked', value: 'locked'},
                {text: 'Action', value: 'action'},
            ],
            lockPeriods: [],
            showEditForm: false,
            auditorLockPeriod: {},
            viewAdjustments: false,
            period: {}
        }),

        props: ['switchedNextYear'],

        computed: {
            ...mapGetters({
                company: 'accounting/company',
                companyId: 'accounting/companyId',
                dialogs: 'accounting/dialogs',
            }),
        },

        asyncComputed: {
            company2: {
                default: {},
                get: () => this.company,
            }
        },

        mounted() {
            this.init()
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),

            ...mapActions(['setMessage']),

            init() {
                this.getLockPeriods()
            },

            openAuditorAdjustments(item) {
                if(!item.locked) {
                    this.setMessage({ type: 'error', message: 'Auditor adjustments are not allowed as the period is not closed yet' })
                    return
                }

                this.viewAdjustments = false
                this.auditorLockPeriod = item
                this.toggleDialog('auditor_adjustments')
            },

            viewAuditorAdjustments(item) {
                this.viewAdjustments = true
                this.auditorLockPeriod = item
                this.toggleDialog('auditor_adjustments')
            },

            getLockPeriods() {
                lockPeriodService.getLockPeriods()
                    .then(response => {
                        this.lockPeriods = response.data
                    })
            },

            lockPeriod(lockPeriod) {
                lockPeriodService.lock(lockPeriod)
                    .then(response => {
                        this.getLockPeriods()
                    })
            },

            unlockPeriod(lockPeriod) {
                lockPeriodService.unlock(lockPeriod)
                    .then(response => {
                        this.getLockPeriods()
                    })
            },

            editLockPeriod(lockPeriod) {
                this.showEditForm = true
                this.period = Object.assign({}, lockPeriod)
            },

            close() {
                this.showEditForm = false
            },

            save() {
                lockPeriodService.update(this.period)
                    .then(() => {
                        this.getLockPeriods()
                        this.close()
                    })
            },
        },

        watch: {
            switchedNextYear: 'getLockPeriods',
            showEditForm (val) {
                val || this.close()
            }
        },

        components: { AuditorAdjustmentsDialog }
    }
</script>

<style scoped>

</style>