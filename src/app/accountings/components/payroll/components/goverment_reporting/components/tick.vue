<template>
    <div :style="'background-color: '+ background">
        <v-layout row wrap justify-space-between align-center :py-1="!small">
            <v-flex xs10>
                <span class="fs-text body-1" v-html="text" :style="small && 'line-height: 1;'"></span>
            </v-flex>
            <v-flex xs2>
                <v-layout justify-end>
                    <span class="fs-text body-1 mr-1"><strong>{{ title }}</strong></span>
                    <div>
                        <v-checkbox hide-details class="mt-0 pt-0" color="#009688"></v-checkbox>
                    </div>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider color="#009688" v-if="!hideDivider"></v-divider>
    </div>
</template>

<script>
    export default{
        props: {
            text: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            small: {
                type: Boolean,
                required: false,
                default: false
            },
            hideDivider: {
                type: Boolean,
                required: false,
                default: false
            },
            background: {
                type: String,
                required: false,
                default: 'transparent'
            }
        }
    }
</script>