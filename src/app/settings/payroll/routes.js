import PayrollMenu from './menu'
import { routes as categories } from './categories'
import { routes as incomeTaxRates } from './income_tax_rates'
import { routes as socialSecurityContributionRates } from './social_security_contribution_rates'

export default [
    {
        path: 'payroll',
        name: 'settings.payroll',
        component: PayrollMenu,
    },
    ...categories,
    ...incomeTaxRates,
    ...socialSecurityContributionRates
]
