// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const TYPES = [
    {name: 'Opening balance', value: 'opening_balance',},
    {name: 'Journal entry', value: 'journal_entry',},
    {name: 'Auditor adjustments', value: 'auditor_adjustments',},
    {name: 'Pledges', value: 'pledges',},
    {name: 'Sale', value: 'sale',},
    {name: 'Purchase', value: 'purchase',},
    {name: 'Bank', value: 'bank',},
    {name: 'Cash', value: 'cash',},
    {name: 'Direct entry', value: 'direct_entry',},
    {name: 'Cheque', value: 'cheque',},
    {name: 'Cheque paid', value: 'cheque_paid',},
    {name: 'Cheque received', value: 'cheque_received',},
    {name: 'Reconciling', value: 'reconciling',},
    {name: 'Credit note', value: 'credit_note',},
    {name: 'Debit note', value: 'debit_note',},
    {name: 'Stock movement', value: 'stock_movement',}
];

export const SALES_TYPES = [
    {name: 'Opening balance', value: 'opening_balance'},
    {name: 'Sale', value: 'sale',},
    {name: 'Bank', value: 'bank',},
    {name: 'Cash', value: 'cash',},
    {name: 'Cheque paid', value: 'cheque_paid',},
    {name: 'Cheque received', value: 'cheque_received',},
    {name: 'Reconciling', value: 'reconciling',},
    {name: 'Credit note', value: 'credit_note',},
]

export const PURCHASES_TYPES = [
    {name: 'Opening balance', value: 'opening_balance'},
    {name: 'purchase', value: 'purchase',},
    {name: 'Bank', value: 'bank',},
    {name: 'Cash', value: 'cash',},
    {name: 'Cheque paid', value: 'cheque_paid',},
    {name: 'Cheque received', value: 'cheque_received',},
    {name: 'Reconciling', value: 'reconciling',},
    {name: 'Debit note', value: 'debit_note'},
]

