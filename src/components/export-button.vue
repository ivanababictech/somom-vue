<template>
    <v-menu>
        <v-btn icon color="primary" class="white--text" slot="activator">
            <v-icon>cloud_download</v-icon>
        </v-btn>
        <v-list dense>
            <v-list-tile @click="exportData('pdf')">
                <v-list-tile-title>Pdf</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="exportData('xlsx')">
                <v-list-tile-title>XLSX</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="exportData('xls')">
                <v-list-tile-title>XLS</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="exportData('ods')">
                <v-list-tile-title>ODS</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="exportData('csv')">
                <v-list-tile-title>CSV</v-list-tile-title>
            </v-list-tile>
            <!--<v-list-tile @click="exportData('html')">-->
                <!--<v-list-tile-title>Html</v-list-tile-title>-->
            <!--</v-list-tile>-->
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        methods: {
            exportData(format) {
                this.$emit('export', format)
            }
        }
    }
</script>