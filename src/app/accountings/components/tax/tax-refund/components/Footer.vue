<template>
    <div class="mt-5">
        <v-layout row justify-space-between px-2 class="body-2">
            <span>Form ITU/2</span>
            <span>Refund Claim Version: 41__0__7</span>
            <span class="uppercase">{{ step }}</span>
        </v-layout>
        <v-divider class="black"></v-divider>
    </div>
</template>

<script>
    export default {
        props: {
            step: {
                type: String,
                required: true
            }
        }
    }
</script>