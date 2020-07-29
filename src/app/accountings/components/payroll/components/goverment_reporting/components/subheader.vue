<template>
    <v-flex xs12 class="border-bottom border-top border-right">
        <v-layout  :style="'background-color:' + background ">
            <div class="block" :style="'background-color:' + backgroundBox ">
                <v-layout fill-height justify-center align-center>
                    <span class="white--text title">{{ title }}</span>
                </v-layout>
            </div>
            <div class="pl-2">
                <v-layout fill-height align-center>
                    <span class="title fs-text" v-if="!small">{{ text }}</span>
                    <span class="subheading fs-text" v-if="small"><strong>{{ text }}</strong></span>
                </v-layout>
            </div>
        </v-layout>
    </v-flex>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            background: {
                type: String,
                required: false,
                default: '#c4e1dd'
            },
            backgroundBox: {
                type: String,
                required: false,
                default: '#009688'
            },
            small: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>

<style scoped>
    .block {
        border-radius: 0 !important;
        width: 36px;
        height: 36px;
    }
</style>