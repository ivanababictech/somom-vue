<template>
    <v-layout>
        <v-flex xs12>
            <v-checkbox v-model="user.terms">
                <div slot="label" @click.stop="">
                    Do you accept the
                    <a href="javascript:;" @click.stop="terms = true">terms</a>
                    and
                    <a href="javascript:;" @click.stop="conditions = true">conditions?</a>
                </div>
            </v-checkbox>
        </v-flex>
        <v-dialog v-model="terms" width="70%">
            <v-card>
                <v-card-title class="title">Terms</v-card-title>
                <v-card-text v-for="n in 5" :key="n">
                    {{ content }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            flat
                            color="purple"
                            @click="terms = false"
                    >Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="conditions" width="70%">
            <v-card>
                <v-card-title class="title">Conditions</v-card-title>
                <v-card-text v-for="n in 5" :key="n">
                    {{ content }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            flat
                            color="purple"
                            @click="conditions = false"
                    >Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {

        data() {
            return {
                terms: false,
                conditions: false,
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.`,
            }
        },

        props: ['user']
    }
</script>

<style scoped>

</style>