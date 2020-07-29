<template>
    <menu-template :items="items" :title="title"></menu-template>
</template>
<script>
    import MenuTemplate from '../menu-template'

    export default {
        data: () => ({
            title: 'Accounting settings',
            items: [
                { title: 'Accounts', description: 'View/edit global accounts', link: 'AccountsSettings'},
                { title: 'VAT Codes', description: 'View/edit VAT codes', link: 'VATCodesSettings'},
                { title: 'VAT Rates', description: 'View/edit VAT rates', link: 'VATRatesSettings'},
            ]
        }),

        components: { MenuTemplate }
    }
</script>
