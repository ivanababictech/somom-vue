<template>
    <div class="mt-3">
        <v-tabs slider-color="accent" v-model="active">
            <v-tab
                    v-for="tab in tabs"
                    :key="tab"
                    ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item v-for="tab in tabs" :key="tab">
                <equity v-if="tab === 'Equity'"></equity>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import equity from './equity/main.vue'

    export default{
        components: {
            equity
        },
        data: () => ({
            tabs: ['Equity'],
            active: null
        })
    }
</script>