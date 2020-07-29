<template>
    <v-card>
        <v-subheader>{{ title }}</v-subheader>
        <v-list dense two-line subheader>
            <v-list-tile avatar :to="{ name: item.link }" v-for="(item, index) in items" :key="index">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        props: ['items', 'title']
    }
</script>