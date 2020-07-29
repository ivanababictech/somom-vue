<template>
    <v-list dense>
        <template v-for="item in items">
            <v-list-group
                    v-if="item.children"
                    v-model="item.model"
                    :key="item.text"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']"
                    append-icon=""
            >
                <v-list-tile slot="activator">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                        v-for="(child, i) in item.children"
                        :key="i"
                        :to="{ name: item.link + child.link }"
                >
                    <v-list-tile-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ child.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else @click="" :key="item.text" :to="{ name: item.link }">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ item.text }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    export default {
        props: ['items']
    }
</script>