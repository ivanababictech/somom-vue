<template>
    <div>
        <v-layout row mt-4>
            <v-flex xs8 class="border-big no-border-right">
                <v-layout row class="pl-1 py-1 fill-height pink lighten-3">
                    <h2 class="subheading bolder uppercase">Ultimate non-resident shareholders benefiting from refund claim</h2>
                </v-layout>
            </v-flex>
            <v-flex xs3 class="border-big">
                <v-layout row justify-center class="pl-1 py-1 fill-height pink lighten-3">
                    <h2 class="subheading bolder">Euro Currency</h2>
                </v-layout>
            </v-flex>
            <v-flex xs1 ml-1 class="border-big">
                <v-layout row justify-center class="pl-1 py-1 pink lighten-3">
                    <h2 class="subheading bolder">%</h2>
                </v-layout>
            </v-flex>
        </v-layout>
        <template v-for="i in 5">
            <v-layout row align-stretch class="custom-row">
                <v-flex xs8 class="border-big no-border-right" :class="[i < 5 && 'no-border-bottom', i === 1 && 'no-border-top']">
                    <v-text-field :id="'nonResident' + i + 'name'" hide-details class="mt-0 pt-0 pl-3 no-border"></v-text-field>
                </v-flex>
                <v-flex xs3 class="border-big" :class="[i < 5 && 'no-border-bottom', i === 1 && 'no-border-top']">
                    <v-text-field :id="'nonResident' + i + 'euro'" hide-details class="mt-0 pt-0 pl-3 no-border"></v-text-field>
                </v-flex>
                <v-flex xs1 ml-1 class="grey lighten-3 border-big" :class="[i < 5 && 'no-border-bottom', i === 1 && 'no-border-top']">
                    <v-text-field :id="'nonResident' + i + 'percentage'" hide-details class="mt-0 pt-0 pl-3 no-border"></v-text-field>
                </v-flex>
            </v-layout>
        </template>
    </div>
</template>