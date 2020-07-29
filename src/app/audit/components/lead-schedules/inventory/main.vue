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
                <inventory v-if="tab === 'Inventory'"></inventory>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
    import inventory from './inventory/main.vue'

    export default{
        components: {
            inventory
        },
        data: () => ({
            tabs: ['Inventory'],
            active: null
        })
    }
</script>