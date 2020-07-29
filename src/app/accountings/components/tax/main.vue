<template>
    <section>
        <v-toolbar dense flat class="mb-3" height="38">
            <v-toolbar-items>
                <v-btn
                        flat
                        @click="tab = 'return'"
                        :color="tab === 'return' ? 'primary' : 'black'">Tax Return</v-btn>        <v-btn
                        flat
                        @click="tab = 'refund'"
                        :color="tab === 'refund' ? 'primary' : 'black'">Tax Refund</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <tax-return v-show="tab === 'return'"></tax-return>
        <tax-refund v-show="tab === 'refund'"></tax-refund>

    </section>
</template>

<script>
    import TaxReturn from './tax-return/main'
    import TaxRefund from './tax-refund/main'

    export default{
        components: {
            TaxReturn, TaxRefund
        },
        data: () => ({
            tab: 'return',
        })
    }
</script>

<style scoped>
    div, span {
        color: black;
    }

    .width-auto {
        width: auto !important;
    }

    .input-center input {
        text-align: center !important;
    }

    .input-right input {
        text-align: right !important;
    }

    .input-red input {
        color: red !important;
    }

    .tax .border {
        border: 1px solid !important;
        border-color: black !important;;
    }

    .tax .border-big {
        border: 2px solid !important;
        border-color: black !important;;
    }

    .tax .border-left-big {
        border-left: 2px solid !important;
        border-color: black !important;;
    }

    .tax .border-right-big {
        border-right: 2px solid !important;
        border-color: black !important;;
    }

    .tax .border-bottom-big {
        border-bottom: 2px solid !important;
        border-color: black !important;
    }

    .tax .border-left {
        border-left: 1px solid !important;
        border-color: black !important;;
    }

    .tax .border-right {
        border-right: 1px solid !important;
        border-color: black !important;;
    }

    .tax .border-top {
        border-top: 1px solid !important;
        border-color: black !important;;
    }

    .tax .border-bottom {
        border-bottom: 1px solid !important;
        border-color: black !important;;
    }

    .tax .no-border {
        border: 0px !important;
    }

    .tax .v-select__selection{
    }
    .tax .v-select__selections input{
        display: none

    }
    .tax .v-select__selections{
        justify-content: center;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .tax .input-group__input {
        background: transparent !important;
    }

    .inline-block {
        display: inline-block;
    }

    .underline {
        text-decoration: underline;
    }

    .width-auto {
        width: auto !important;
    }

    .tax.input-group__details {
        display: none !important;
    }



    .tax .v-input--hide-details {
        border: 1px solid #000 !important;
        background: white;
    }



    .tax .no-border-right, .no-border-right + .v-input--hide-details {
        border-right: 0px solid !important;
    }

    .tax .no-border-left, .no-border-left + .v-input--hide-details {
        border-left: 0px solid !important;
    }

    .tax .no-border-top, .no-border-top + .v-input--hide-details{
        border-top: 0px solid !important;
    }

    .tax .no-border-bottom, .tax .no-border-bottom + .v-input--hide-details{
        border-bottom: 0px solid !important;
    }


    .double-height{
        height: 51px !important;
    }
    .normal-height{
        height: 25px !important;
    }

    .tax .input-group__selections {
        justify-content: center !important;
    }

    .bolder {
        font-weight: 700;
    }

    .fill-height input {
        height: 100% !important;
    }

    .custom-row .flex {
        background: white;
        border-color: black !important;
    }

    input {
        font-weight: 500 !important;
    }

    .body-1 input {
        font-weight: 400 !important;
        font-size: 14px !important;
    }

    .mt-6 {
        margin-top: 64px !important;
    }

    .medium {
        font-size: 21px;
    }

    .page {
        padding: 96px 128px;
        margin-bottom: 32px;
        min-height: 1555px
    }
    .hide-tax-borders .v-input--hide-details{
        border: none !important;;
    }
</style>