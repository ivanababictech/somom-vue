<template>
    <div class="px-3 red lighten-4 border-big body-2 inline-block mt-2">{{ step }}</div>
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