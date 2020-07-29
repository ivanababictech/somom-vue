<template>
    <div :style="'background-color: #' + background">
        <v-flex xs12>
            <v-layout fill-height align-center>
                <span class="vertical-text fs-text body-2" style="position: relative;right: 16px;">SECTION</span>
                <span class="fs-text display-3" style="position: relative;right: 36px;">{{ page }}</span>
                <p class="fs-text mb-0" style="position: relative;right: 36px;">
                    <span class="subheading" style="font-weight: 700" v-html="firstParagraph"></span><br/>
                    <span v-html="secondParagraph"></span>
                </p>
            </v-layout>
        </v-flex>
    </div>
</template>

<script>
    export default {
        props: {
            page: {
                type: String,
                required: true
            },
            background: {
                type: String,
                required: false,
                default: 'c4e1dd'
            },
            firstParagraph: {
                type: String,
                required: true
            },
            secondParagraph: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .row p {
        line-height: 1.2;
    }
    .vertical-text {
        transform: rotate(270deg);
    }
    .display-3{
        font-weight: 700 !important;
        line-height: 1 !important;
        font-size: 72px !important;
        font-family: Helvetica !important;
    }
</style>

