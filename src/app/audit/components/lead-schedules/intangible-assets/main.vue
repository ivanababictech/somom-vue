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
                <intangibleAssets v-if="tab === 'Intangible assets'"></intangibleAssets>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import intangibleAssets from './intangible-assets/main.vue'

    export default{
        components: {
            intangibleAssets
        },
        data: () => ({
            tabs: ['Intangible assets'],
            active: null
        })
    }
</script>