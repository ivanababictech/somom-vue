<template>
    <menu-template :items="items"></menu-template>
</template>
<script>
    import MenuTemplate from './menu-template'

    export default {
        data: () => ({
            items: [
                {icon: 'fa-tasks', text: 'Assignments', link: 'assignments'},
            ],
        }),

        components: { MenuTemplate }
    }
</script>