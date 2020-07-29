<template>
    <menu-template :items="items"></menu-template>
</template>
<script>
    import MenuTemplate from './menu-template'

    export default {
        data: () => ({
            items: [
                {icon: 'fa-users', text: 'Users', link: 'users'},
            ],
        }),

        components: { MenuTemplate }
    }
</script>