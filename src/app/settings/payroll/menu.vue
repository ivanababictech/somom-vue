<template>
    <menu-template :items="items" :title="title"></menu-template>
</template>
<script>
    import MenuTemplate from '../menu-template'

    export default {
        data: () => ({
            title: 'Payroll settings',
            items: [
                { title: 'Payroll categories', description: 'View/edit categories types', link: 'payroll.categories'},
                { title: 'Payroll Income tax rates', description: 'View/edit Income tax rates', link: 'payroll.incometaxrates'},
                { title: 'Payroll Social Security contribution rates', description: 'View/edit Social Security contribution rates', link: 'payroll.socialsecuritycontributionrates'}
            ]
        }),

        components: { MenuTemplate }
    }
</script>