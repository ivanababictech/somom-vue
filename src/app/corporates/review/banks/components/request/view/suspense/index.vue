<template>
    <v-flex md12>
        <v-layout row wrap>
            <v-flex xs12>
                <v-subheader>Select Allocation type</v-subheader>
            </v-flex>
            <v-flex xs12>
                <v-layout row wrap>
                    <v-flex md1>
                        <v-text-field
                                v-model="request.data.date"
                                label="Date"
                                mask="##/##/####"
                                placeholder="29/01/1999"
                                :return-masked-value="true"
                                size="50"
                                disabled
                        ></v-text-field>
                    </v-flex>
                    <v-flex md2>
                        <v-text-field
                                v-model.number="request.amount"
                                label="Amount"
                                :suffix="request.credit ? 'deposit' : request.debit ? 'withdrawal' : ''"
                                disabled
                        ></v-text-field>
                    </v-flex>
                    <v-flex md3>
                        <v-textarea
                                v-model="request.data.description"
                                label="Description"
                                auto-grow
                                rows="1"
                                disabled
                        ></v-textarea>
                    </v-flex>
                    <v-flex md2>
                        <v-autocomplete
                                v-model="request.data.allocation_type"
                                label="Allocation type"
                                :items="availableBankCorporateSections"
                                :disabled="isRequestApproved"
                        ></v-autocomplete>
                    </v-flex>
                    <v-flex md3>
                        <v-autocomplete
                                :items="requestAllocationsData(request.data)"
                                :label="'Select ' + allocationDataLabelByType(request.data.allocation_type)"
                                v-if="request.data.allocation_type"
                                v-model="request.data.allocation_id"
                                @change="allocationDataChanged(request.data)"
                                item-text="text"
                                item-value="value"
                                hide-details
                                dense
                                :disabled="isRequestApproved"
                        >
                            <v-tooltip slot="append-outer" class="mx-0" top>
                                <v-btn slot="activator" class="mx-0" icon small @click="showAllocationsData(request)">
                                    <v-icon color="primary">add</v-icon>
                                </v-btn>
                                <span>Create new {{ allocationDataLabelByType(request.data.allocation_type) }}</span>
                            </v-tooltip>
                        </v-autocomplete>

                        <allocation-files
                                v-if="request.showAllocationsFiles"
                                :entry="request.data"
                                :request="request"
                                @submit="saveDraft"
                        ></allocation-files>

                        <allocation-data
                                v-if="request.showAllocationsData && request.data.allocation_type"
                                :entry="request.data"
                                :request="request"
                        ></allocation-data>
                    </v-flex>
                    <v-flex md1>
                        <v-btn color="primary" @click="addAllocationsFiles" v-if="request.data.proof">
                            Upload evidence
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex class="pa-0 text-xs-left" v-if="request.status !== 'approved'">
                <v-btn outline color="primary" @click="saveDraft">Save as drafts</v-btn>
                <v-btn
                        color="primary"
                        @click="submit()"
                >Submit</v-btn>
            </v-flex>

            <v-flex class="pa-0 text-xs-right" v-if="request.status === 'open'">
                <v-btn
                        color="danger"
                        :dark="request.newStatus === 'disapproved'"
                        :outline="request.newStatus !== 'disapproved'"
                        @click="setStatus('disapproved')"
                >Disapprove</v-btn>
                <v-btn color="primary" :outline="request.newStatus !== 'approved'" @click="setStatus('approved')">
                    Approve
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="request.newStatus">
            <v-flex xs12>
                <v-autocomplete
                        v-model="request.data.reason_id"
                        :label="'Reason for ' + (request.newStatus === 'approved' ? 'approval' : 'disapproval')"
                        :items="request.newStatus === 'approved' ? approvedReasons : disapprovedReasons"
                        item-text="name"
                        item-value="id"
                ></v-autocomplete>
            </v-flex>
            <v-flex xs12>
                <v-textarea
                        v-model="request.data.comment"
                        label="Your comment here"
                        outline
                ></v-textarea>
            </v-flex>
            <v-flex md12 v-if="request.newStatus == 'disapproved'">
                <span class="subheading">STR required?</span>
                <yes-no v-model="request.data.strRequired"></yes-no>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import AllocationData from './allocation-data';
    import * as bankRequestService from '../../service';
    import AllocationFiles from './allocation-files';
    import * as corpoateService from '@/app/corporates/service';

    export default {
        props: ['account', 'request'],

        mixins: [AllocationsMixin],

        mounted() {
                if(this.request.data.allocation_type === corpoateService.SECTION_SUSPENSE) {
                    this.request.data.allocation_type = null;
                }
        },

        computed: {
            ...mapGetters({
                bankRequestReasons: 'settings/bankRequestReasons',
            }),

            /**
             * Check if request is approved
             *
             * @returns {boolean}
             */
            isRequestApproved() {
                return this.request.status === 'approved'
            },

            isRequestDisapproved() {
                return this.request.status === 'disapproved'
            },

            approvedReasons() {
                return this.bankRequestReasons.filter(reason => reason.type === 'approved');
            },

            disapprovedReasons() {
                return this.bankRequestReasons.filter(reason => reason.type === 'disapproved');
            },
        },

        methods: {
            ...mapActions(['setMessage']),

            addAllocationsFiles() {
                this.$set(this.request, 'showAllocationsFiles', true)
            },

            submit() {
                if(!this.request.data.allocation_id) {
                    this.setMessage({type: 'error', message: 'You must fill all allocation data before submit!'})
                    return false
                }

                this.$emit('submit', this.request.newStatus)
            },

            setStatus(status) {
                if(this.request.newStatus === status) {
                    this.request.newStatus = false;
                    return false;
                }

                if(!this.request.data.allocation_id) {
                    this.setMessage({type: 'error', message: 'You can\'t approve entry without allocation data!'})
                    return false
                }

                this.$set(this.request, 'newStatus', status);
                this.$set(this.request.data, 'strRequired', null);
                this.request.data.comment = ''
            },

            saveDraft() {
                bankRequestService.saveSuspenseRequestDraft(this.account.id, this.request)
            },

            requestAllocationsData() {
                return this.allocationsByType(this.request.data.allocation_type)
                    .concat(this.allocationsByType(this.request.data.allocation_type, this.request.data.allocations))
            },
        },

        components: {AllocationData, AllocationFiles}
    }
</script>

<style scoped>

</style>