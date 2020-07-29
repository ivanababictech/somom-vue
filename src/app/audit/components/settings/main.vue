<template>
    <div v-if="loaded">
        <router-view></router-view>
    </div>
    <v-progress-linear v-else :indeterminate="true"></v-progress-linear>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                loaded: 'accounting/loaded'
            })
        }
    }
</script>