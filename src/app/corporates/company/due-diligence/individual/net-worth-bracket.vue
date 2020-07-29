<template>
    <v-container fluid grid-list-md>
        <div class="headline">{{ letter }}. Net worth bracket</div>
        <v-layout row wrap>
            <v-radio-group v-model="netWorthBracket.type" :mandatory="false">
                <v-radio label="0 - 500,000" :value="1"></v-radio>
                <v-radio label="500,000 - 1,000,000" :value="2"></v-radio>
                <v-radio label="1,000,000 - 2,000,000" :value="3"></v-radio>
                <v-radio label="2,000,000+" :value="4"></v-radio>
            </v-radio-group>
        </v-layout>
    </v-container>
</template>

<script>
    export default {

        props: [
            'netWorthBracket',
            'letter'
        ]
    }
</script>