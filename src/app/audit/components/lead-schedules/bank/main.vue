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
                <banks v-if="tab === 'Banks'"></banks>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import banks from './banks/main.vue'

    export default{
        components: {
            banks,
        },
        data: () => ({
            tabs: ['Banks'],
            active: null
        })
    }
</script>