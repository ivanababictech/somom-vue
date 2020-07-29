<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex md10>
                <v-container grid-list-md v-for="(name, index) in accountNames" :key="index">
                    <v-layout row>
                        <v-flex>
                            <v-text-field
                                    :ref="'accountName' + index"
                                    v-model="name.name"
                                    label="Add the account name that the student can select"
                                    @keyup.enter="addAccountName()"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>

            <v-flex xs2>
                <v-btn fab dark small color="success" @click="addAccountName">
                    <v-icon dark>add</v-icon>
                </v-btn>
                <v-btn fab dark small color="error" @click="removeAccountName">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                accountNamestructure: {
                    name: null
                }
            }
        },

        props: ['accountNames'],

        mounted() {
            this.init()
        },

        methods: {
            init() {
                if(!this.accountNames.length) {
                    this.addAccountName()
                }
            },

            addAccountName() {
                //if(this.accountNames[this.accountNames.length - 1].name) {
                    this.accountNames.push(Vue.util.extend({}, this.accountNamestructure))
                //}

                this.setFocusOnLastAccountName()
            },

            removeAccountName() {
                if(this.accountNames.length >=2) {
                    this.accountNames.pop()
                }
            },

            setFocusOnLastAccountName() {
                this.$nextTick(() => {
                    this.$refs['accountName' + (this.accountNames.length - 1)][0].focus()
                })
            }
        },
    }
</script>

<style scoped>

</style>