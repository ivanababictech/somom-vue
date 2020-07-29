<template>
    <section>
        <v-toolbar dense flat height="38">
        <v-toolbar-items>
            <v-btn flat :to="{ name: 'AccountingProducts' }">Products</v-btn>
            <v-btn flat :to="{ name: 'AccountingServices' }">Services</v-btn>
            <v-btn flat :to="{ name: 'AccountingInventories' }">Inventory</v-btn>
            <v-btn flat :to="{ name: 'AccountingAssetRegistrar' }">Asset Registrar</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    v-model="search"
                    clearable
            ></v-text-field>
        </v-toolbar-items>

        <item-dialog flat small label="Add" :item="{ type }"></item-dialog>

        </v-toolbar>

        <v-card class="grey lighten-4 elevation-0">

            <router-view :search="search"></router-view>

        </v-card>

    </section>
</template>

<script>
    export default {
        data: () => ({
            search: '',
        }),
        computed: {
            type() {
                let type = null
                switch (this.$route.name) {
                    case 'AccountingProducts':
                        type = 'product'
                        break
                    case 'AccountingServices':
                        type = 'service'
                        break
                    case 'AccountingInventories':
                        type = 'inventory'
                        break
                    default:
                    //console.warn('Invalid route name: ', this.$route.name)
                }
                return type
            }
        },
        mounted() {
            if (this.$route.name == 'AccountingItems') {
                this.$router.push({name: 'AccountingProducts'})
            }
        }
    }
</script>