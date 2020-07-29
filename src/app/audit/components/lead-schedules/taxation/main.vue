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
                <taxes v-if="tab === 'Taxes'"></taxes>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import taxes from '../taxation/taxes/main.vue'

    export default{
        components: {
            taxes
        },
        data: () => ({
            tabs: ['Taxes',],
            active: null
        })
    }
</script>