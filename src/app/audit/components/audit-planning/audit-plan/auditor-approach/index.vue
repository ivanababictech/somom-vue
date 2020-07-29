<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="approaches"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="border-right">{{ props.item.area }}</td>
                <td class="border-right">{{ props.item.materiality }}</td>
                <td class="border-right">
                    <v-select
                            :items="risks"
                            label="Risk"
                            v-model="props.item.risk"
                    ></v-select>
                </td>
                <td class="border-right">
                    <v-radio-group v-model="props.item.controlsTesting" row hide-details>
                        <v-radio
                                label="Yes"
                                :value="1"
                        ></v-radio>
                        <v-radio
                                label="No"
                                :value="0"
                        ></v-radio>
                    </v-radio-group>
                </td>
                <td class="border-right">
                    <v-radio-group v-model="props.item.detAnaReview" row hide-details>
                        <v-radio
                                label="Yes"
                                :value="1"
                        ></v-radio>
                        <v-radio
                                label="No"
                                :value="0"
                        ></v-radio>
                    </v-radio-group>
                </td>
                <td class="border-right">
                    <v-radio-group v-model="props.item.standardWp" row hide-details>
                        <v-radio
                                label="Yes"
                                :value="1"
                        ></v-radio>
                        <v-radio
                                label="No"
                                :value="0"
                        ></v-radio>
                    </v-radio-group>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import * as areaService from '@/app/settings/audit/audit-area/service'

    export default {
        data: () => ({
            headers: [
                {text: 'Audit area', value: 'area'},
                {text: 'Materiality', value: 'materiality'},
                {text: 'Risk', value: 'risk'},
                {text: 'Controls testing', value: 'controlsTesting'},
                {text: 'Det. Ana. Review', value: 'detAnaReview'},
                {text: 'Standard WP', value: 'standardWp'}
            ],
            approaches: [],
            risks: ['L', 'M', 'H']
        }),
        created() {
            this.fetchAreas()
        },
        methods: {
            fetchAreas() {
                areaService.get()
                    .then(response => {
                        let areas = JSON.parse(response) || []
                        areas.forEach(area => {
                            let ar = {
                                area: area.title,
                                materiality: 1,
                                risk: 'L',
                                controlsTesting: 0,
                                detAnaReview: 0,
                                standardWp: 1
                            }
                            this.approaches.push(ar)
                        })
                    })
            }
        }
    }
</script>

<style>
    .border-right {
        border-right: 1px solid rgba(0, 0, 0, .12);
    }

    .datatable {
        overflow: hidden;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
</style>