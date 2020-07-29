<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="assessments"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.area }}</td>
                <td>{{ props.item.applicable }}</td>
                <td>
                    <v-select
                            :items="risks"
                            label="Risk"
                            v-model="props.item.inherentRisk"
                    ></v-select>
                </td>
                <td>
                    <v-radio-group v-model="props.item.controlsRisk" row hide-details>
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
                <td>{{ props.item.overallAssessment }}</td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import * as areaService from '@/app/settings/audit/audit-area/service'

    export default {
        data: () => ({
            headers: [
                { text: 'Audit area', value: 'area' },
                { text: 'Applicable', value: 'applicable' },
                { text: 'Inherent risk', value: 'inherentRisk' },
                { text: 'Controls risk', value: 'controlsRisk' },
                { text: 'Overall assessment', value: 'overallAssessment' }
            ],
            assessments: [],
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
                                applicable: 'Y',
                                inherentRisk: 'L',
                                controlsRisk: 0,
                                overallAssessment: ''
                            }
                            this.assessments.push(ar)
                        })
                    })
            }
        }
    }
</script>