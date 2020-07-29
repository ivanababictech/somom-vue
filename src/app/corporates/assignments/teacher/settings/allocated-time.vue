<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex md2 xs6>
                <v-btn color="info">ACTIVATE TIMER</v-btn>
            </v-flex>
            <v-flex md3 xs6>
                <v-text-field
                        v-model="allocatedTime.minutes"
                        label="Enter minutes"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['allocatedTime'],

    }
</script>