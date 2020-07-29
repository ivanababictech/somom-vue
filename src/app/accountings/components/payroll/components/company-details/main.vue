<template>
    <v-card>
        <v-card-text>
            <allowances/>
            <departments/>
        </v-card-text>
    </v-card>
</template>

<script>
    import Allowances from "./allowances/main.vue";
    import Departments from "./departments/main.vue";

    export default {
        components: {
            Departments,
            Allowances
        },
    }
</script>