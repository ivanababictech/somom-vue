import GlobalMenu from "./main"
import { routes as activities } from "./activities"
import { routes as bankers } from "./bankers"
import { routes as letterTemplates } from "./letter-templates"
import { routes as serviceProviders } from "./service-providers"
import { routes as services } from "./services"
import { routes as taxCodes } from "./tax-codes"
import { routes as assignedAccounts } from './assigned-accounts'
import {routes as typeOfShares} from './type-of-shares/index'
import {routes as staffInvolvements} from './staff-involvements/index'
import {routes as auditAccountingSection} from './audit-accounting-section/index'
import {routes as profitLossTitle} from './profit-loss-title/index'
import {routes as balanceSheetTitle} from './balance-sheet-title/index'
import {routes as malteseBanks} from './maltese-banks/index'

export default [
    {
        path: 'global',
        name: 'settings.global',
        component: GlobalMenu,
    },
    ...bankers,
    ...activities,
    ...letterTemplates,
    ...serviceProviders,
    ...services,
    ...taxCodes,
    ...assignedAccounts,
    ...typeOfShares,
    ...staffInvolvements,
    ...auditAccountingSection,
    ...profitLossTitle,
    ...balanceSheetTitle,
    ...malteseBanks
]
