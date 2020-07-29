export const navDrawer = state => {
    return state.navDrawer;
}

export const appName = state => state.app.name;

// Assigned accounts
export const assignedAccounts = ({assigned_accounts}) => {
    return assigned_accounts
}

export const assignedAccountsByType = ({assigned_accounts}) => (type) => {
    switch (type) {
        case 'sale':
            return assigned_accounts.filter(({id}) => id == 12) // Sales assignned account id is 12
        case 'purchase':
            return assigned_accounts.filter(({id}) => [13, 14, 15, 16].indexOf(id) >= 0) // purchase assigned accounts ids are 13, 14, 15, 16
        case 'bank':
            return assigned_accounts.filter(({id}) => id == 21) // bank assigned account id is 21
        case 'cash':
            return assigned_accounts.filter(({id}) => id == 19) // cash assigned account id is 19
        case 'bank_entry':
            return assigned_accounts.filter(({id}) => [6, 7, 8, 9, 10, 11, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].indexOf(id) >= 0) // bank assigned account id is 21
        case 'donation':
            return assigned_accounts.filter(({id}) => id == 29) // donation assigned account id is 29
        case 'cheque':
            return assigned_accounts.filter(({id}) => id == 20) // cheque control ac
        case 'cash_entry':
            return assigned_accounts.filter(({id}) => [6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28].indexOf(id) >= 0)
        case 'cheque_entry':
            return assigned_accounts.filter(({id}) => [9, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 25, 26, 27, 28].indexOf(id) >= 0)
        default:
            return assigned_accounts
    }
}

export const assignedAccountByName = ({assigned_accounts}) => (name) => {
    return assigned_accounts.find((assigned_account) => assigned_account.name == name)
}