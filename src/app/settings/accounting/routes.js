//import { routes as documentTypes } from './document-types'
import AccountingSettingsMenu from '@/app/settings/accounting/main'
import AccountsSettings from '@/app/settings/accounting/accounts'
import VATCodesSettings from '@/app/settings/accounting/vat-codes'
import VATRatesSettings from '@/app/settings/accounting/vat-rates'

export default [
    {
        path: 'accounting',
        name: 'AccountingSettingsMenu',
        component: AccountingSettingsMenu
    },
    {
        path: 'accounting/accounts',
        name: 'AccountsSettings',
        component: AccountsSettings
    },
    {
        path: 'accounting/vat-codes',
        name: 'VATCodesSettings',
        component: VATCodesSettings
    },
    {
        path: 'accounting/vat-rates',
        name: 'VATRatesSettings',
        component: VATRatesSettings
    },
]
