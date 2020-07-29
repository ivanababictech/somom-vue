<template>
    <div>reports</div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        data: () => ({
            activeTab: null,
            newAccount: false
        }),

        props: ['check'],


        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
        },
    }
</script>