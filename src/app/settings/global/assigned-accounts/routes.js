import AssignedAccounts from '@/app/settings/global/assigned-accounts/main'
import AssignedAccountsEdit from '@/app/settings/global/assigned-accounts/edit'
import AssignedAccountsCreate from '@/app/settings/global/assigned-accounts/add'

let parent = 'global'

export default [
    {
        path: parent + '/assigned-accounts',
        name: parent + '.assigned-accounts',
        component: AssignedAccounts
    },
    {
        path: parent + '/assigned-accounts/add',
        name: parent + '.assigned-accounts.create',
        component: AssignedAccountsCreate
    },
    {
        path: parent + '/assigned-accounts/:assigned_account_id',
        name: parent + '.assigned-account',
        component: AssignedAccountsEdit
    },
]
