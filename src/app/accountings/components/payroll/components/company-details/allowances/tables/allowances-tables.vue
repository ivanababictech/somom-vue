<template>
    <v-layout row wrap>
        <v-flex md6 xs12>
            <allowances-table
                    v-if="preTaxAllowances"
                    :allowances="preTaxAllowances"
                    @edit="editPreTaxAllowance"
                    @addNewAllowance="createPreTaxAllowance"
                    title='Pre-tax monthly allowances'>
            </allowances-table>
        </v-flex>
        <v-flex md6 xs12>
            <allowances-table
                    v-if="postTaxAllowances"
                    :allowances="postTaxAllowances"
                    @edit="editPostTaxAllowance"
                    @addNewAllowance="createPostTaxAllowance"
                    title='Post-tax monthly allowances'>
            </allowances-table>
        </v-flex>
        <add-new-allowance
                :showDialog="showAllowanceForm"
                :editAllowance="allowance"
                @closeDialog="closeAddForm"
                @saveAllowance="saveAllowance">
        </add-new-allowance>
    </v-layout>
</template>

<script>
    import AllowancesTable from "./allowances-table";
    import AddNewAllowance from "./add-new-allowance";
    import {mapGetters, mapActions} from "vuex";

    export default {
        components: {
            AddNewAllowance,
            AllowancesTable
        },
        created () {
            this.fetchData();
        },
        computed: {
            ...mapGetters({
                preTaxAllowances: 'getPreTaxAllowances',
                postTaxAllowances: 'getPostTaxAllowances'
            })
        },
        methods: {
            ...mapActions({
                getPreTaxAllowances: 'loadPreTaxAllowances',
                addPreTaxAllowance: 'createPreTaxAllowance',
                updatePreTaxAllowance: 'editPreTaxAllowance',

                getPostTaxAllowances: 'loadPostTaxAllowances',
                addPostTaxAllowance: 'createPostTaxAllowance',
                updatePostTaxAllowance: 'editPostTaxAllowance'

            }),
            fetchData () {
                this.getPreTaxAllowances();
                this.getPostTaxAllowances();


            },
            editPreTaxAllowance(allowance){
                this.allowance = allowance;
                this.showDialog();
                this.allowancesService = this.updatePreTaxAllowance;
            },
            editPostTaxAllowance(allowance){
                this.allowance = allowance;
                this.showDialog();
                this.allowancesService = this.updatePostTaxAllowance;
            },
            createPreTaxAllowance() {
                this.allowance = null;
                this.allowancesService = this.addPreTaxAllowance;
                this.showDialog();
            },
            createPostTaxAllowance() {
                this.allowance = null;
                this.allowancesService = this.addPostTaxAllowance;
                this.showDialog();
            },
            showDialog: function () {
                this.showAllowanceForm = true;
            },
            closeAddForm() {
                this.showAllowanceForm = false;
            },
            saveAllowance(allowance) {
                this.closeAddForm();
                this.allowancesService(allowance);
            },
        },
        data: function () {
            return {
                allowances: null,
                // preTaxAllowances: null,
                // postTaxAllowances: null,
                allowance: null,
                taxType: null,
                showAllowanceForm: false,
                allowancesService: null
            }
        }
    }
</script>

<style scoped>

</style>