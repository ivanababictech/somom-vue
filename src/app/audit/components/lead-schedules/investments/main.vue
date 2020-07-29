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
                <investments v-if="tab === 'Investments'"></investments>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import investments from './investments/main.vue'

    export default{
        components: {
            investments
        },
        data: () => ({
            tabs: ['Investments'],
            active: null
        })
    }
</script>