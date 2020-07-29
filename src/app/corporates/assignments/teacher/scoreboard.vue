<template>
    <v-container grid-list-md>
        <div class="headline">SCOREBOARD</div>
        <v-card>
            <v-card-title>
                FILTER ASSIGNMENTS BY:
                <v-spacer></v-spacer>
                <v-btn :color="filterBy == 'grade' ? 'info' : ''" @click="filterBy = 'grade'">GRADE</v-btn>
                <v-btn :color="filterBy == 'chapter' ? 'info' : ''" @click="filterBy = 'chapter'">CHAPTER</v-btn>
                <v-btn :color="filterBy == 'level' ? 'info' : ''" @click="filterBy = 'level'" active-class="true">LEVEL</v-btn>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="results"
                    hide-actions
                    disable-initial-sort
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.assignment.name }}</td>
                    <td>{{ props.item.user.full_name }}</td>
                    <td>{{ (props.item.score / props.item.total_score * 100).toFixed(2) }} %</td>
                    <td>{{ props.item.time }}</td>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                filterBy: null,
                headers: [
                    { text: 'Assignment name', value: 'name' },
                    { text: 'User', value: 'user' },
                    { text: 'Score', value: 'score' },
                    { text: 'Time', value: 'time' },
                ],
                items: [],
                results: []
            }
        },

        props: ['scoreboard'],

        mounted() {
            this.getAssignmentResults()
        },

        methods: {
            getAssignmentResults() {
                this.$http.get('assignments/results').then(response => {
                    this.results = response.data.data
                })
            }
        }
    }
</script>

<style scoped>

</style>