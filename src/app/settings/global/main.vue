<template>
    <menu-template :items="items" :title="title"></menu-template>
</template>
<script>
    import MenuTemplate from '../menu-template'

    export default {
        data: () => ({
            title: 'Global settings',
            items: [
                { title: 'Services', description: 'Services settings', link: 'global.services' },
                { title: 'Tax Codes', description: 'Tax Codes', link: 'global.tax-codes' },
                { title: 'Company activities', description: 'Company activities', link: 'global.activities' },
                { title: 'Engagement letter template', description: 'Engagement letter template settings', link: 'global.letter-templates' },
                { title: 'Service providers', description: 'bankers settings', link: 'global.service-providers' },
                { title: 'Bankers', description: 'bankers settings', link: 'global.bankers' },
                { title: 'Assigned accounts', description: 'Assigned accounts', link: 'global.assigned-accounts' },
                { title: 'Type of shares', description: 'Type of shares', link: 'global.type-of-shares' },
                { title: 'Staff involvements', description: 'Staff involvements', link: 'global.staff-involvements' },
                { title: 'Audit & Accounting Section', description: 'Audit & Accounting Section', link: 'global.audit-accounting-section' },
                { title: 'Profit & Loss Titles', description: 'Profit & Loss Titles', link: 'global.profit-loss-title' },
                { title: 'Balance Sheet Titles', description: 'Balance Sheet Titles', link: 'global.balance-sheet-title' },
                { title: 'Maltese Banks', description: 'Maltese Banks', link: 'global.maltese-banks' },
            ]
        }),

        components: { MenuTemplate }
    }
</script>