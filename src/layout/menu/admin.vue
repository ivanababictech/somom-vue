<template>
    <menu-template :items="items"></menu-template>
</template>
<script>
    import MenuTemplate from './menu-template'

    export default {
        data: () => ({
            items: [
                { icon: 'fa-globe', text: 'Dashboard', link: 'dashboard' },
                { icon: 'account_balance', text: 'Accountings', link: 'Accountings' },
                { icon: 'fa-briefcase', text: 'Audits', link: 'audits' },
                { icon: 'fa-building', text: 'Corporates', link: 'corporates.index'},
                { icon: 'fa-users', text: 'Users', link: 'users' },
                { icon: 'settings', text: 'Settings', link: 'Settings' }
            ],
        }),

        components: { MenuTemplate }
    }
</script>