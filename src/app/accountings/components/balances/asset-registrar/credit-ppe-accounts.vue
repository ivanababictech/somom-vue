<template>
    <v-dialog v-model="dialog" max-width="500" :overlay="true">
        <v-card>
            <v-card-title>
                <span class="headline">Accounts</span>
            </v-card-title>
            <v-card-text>
                <v-list two-line subheader>
                    <v-list-tile
                            v-for="(account, index) in accounts"
                            :key="'account' + index"
                            @click="openAccount(account)"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ account.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ account.created_at }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn color="primary" class="pr-2 pl-2">Some action</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "credit-ppe-accounts",

        data() {
            return {
                dialog: true
            }
        },

        props: ['accounts'],

        methods: {
            openAccount(account) {
                console.log(account)
            }
        }
    }
</script>

<style scoped>

</style>