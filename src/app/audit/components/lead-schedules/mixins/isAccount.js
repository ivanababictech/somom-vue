import * as balanceService from '@/app/audit/components/accounts/service'

export default{
    data: () => ({
        accounts: []
    }),
    mounted() {
        this.getOpeningBalancesAccounts()
    },
    methods: {
        getOpeningBalancesAccounts() {
            balanceService.getAccounts()
                .then(response => {
                    this.accounts = response
                    this.accounts.map(account => {
                        account.amount = 35
                        account.audit_adjustments = 42
                    })
                })
        },
        checkSubaccount(name) {
            return this.accounts.find(account => account.sub_account.name === name)
        },
        getSubaccount (name) {
            return this.subAccounts.find(subAccount => subAccount.name === name)
        }
    },
    computed: {
        matchSubAccount () {
            let total = 0;
            this.accounts.forEach(account => {
                if (this.subAccounts.find(subAccount => subAccount.name === account.sub_account.name)){
                    total++
                }
            })
            return total
        },
        totalBalancePerTrail() {
            let total = 0
            this.accounts.forEach(account => {
                let subAccount = this.subAccounts.find(subAccount => subAccount.name === account.sub_account.name)
                if (subAccount) total += account.amount + account.audit_adjustments
            })
            return total
        },
        totalBalancePerAudit() {
            let total = 0
            this.accounts.forEach(account => {
                let subAccount = this.subAccounts.find(subAccount => subAccount.name === account.sub_account.name)
                if (subAccount) {
                    total += subAccount.custom ? parseInt(subAccount.rate_used_by_client) - parseInt(subAccount.rate_used_by_ecb) : parseInt(subAccount.amount.value)
                }
            })
            return total
        },
        totalDifference() {
            return this.totalBalancePerTrail - this.totalBalancePerAudit
        }
    }
}