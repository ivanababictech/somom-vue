<template>
    <menu-template :items="items" :title="title"></menu-template>
</template>
<script>
    import MenuTemplate from './menu-template'

    export default {
        data: () => ({
            title: 'All settings',
            items: [
                { title: 'Global', description: 'Global settings', link: 'settings.global' },
                { title: 'Accounting', description: 'Accounting settings', link: 'AccountingSettingsMenu' },
                { title: 'Corporate', description: 'Corporate settings', link: 'settings.corporate' },
                { title: 'Audit', description: 'Audit settings', link: 'AuditSettings' },
                { title: 'Payroll', description: 'payroll settings', link: 'settings.payroll' },
            ]
        }),
        components: { MenuTemplate }
    }
</script>