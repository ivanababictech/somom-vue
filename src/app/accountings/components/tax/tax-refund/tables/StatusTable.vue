<template>
    <div>
        <div class="pb-1 mt-3 border-big">
            <v-layout row class="pink lighten-3 border-bottom-big">
                <v-flex xs9>
                    <span class="body-2 black--text">Worksheet</span>
                </v-flex>
                <v-flex xs3>
                    <span class="body-2 black--text">Status</span>
                </v-flex>
            </v-layout>

            <v-layout ma-2 row v-for="item in steps" :key="item.name">
                <v-flex xs9 class="red lighten-4 border">
                    <v-layout row align-center fill-height pl-3>
                        <span class="body-2 uppercase black--text">{{ item.name }}</span>
                    </v-layout>
                </v-flex>
                <v-flex ml-2 xs3>
                    <v-select
                            v-model="item.completed"
                            :items="items"
                            :append-icon="''"
                            item-text="text"
                            item-value="value"
                            return-object
                            single-line
                            hide-details
                            class="pt-0 mt-0 border"
                            :class="item.completed ? 'orange lighten-4 indigo--text text--darken-4' : 'red lighten-1 white--text'"
                    ></v-select>
                </v-flex>
            </v-layout>
        </div>

        <v-layout row v-if="checkCompleted" class="red px-2 white--text border mt-2">
            <strong>Workbook cannot be Submitted!</strong>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "status-table",
        data() {
            return {
                steps: [
                    {
                        name: 'Index',
                        completed: false
                    },
                    {
                        name: 'SECTION 1 ~ DETAILS OF COMPANY PAYING DIVIDENDS',
                        completed: false
                    },
                    {
                        name: 'SECTION 2 ~ DETAILS OF DIRECT SHAREHOLDER ENTITLED FOR REFUND',
                        completed: false
                    },
                    {
                        name: 'SECTION 3 {3.1, 3.2, 3.3, 3.4} ~ SEGREGATION OF THE DISTRIBUTION',
                        completed: false
                    },
                    {
                        name: 'SECTION 4 ~ DETAILS OF CLAIM AND DIVIDENDS RECEIVED\n',
                        completed: false
                    },
                    {
                        name: 'SUMMARY ~ STATEMENT OF TOTAL REFUND CLAIMED',
                        completed: false
                    },
                    {
                        name: 'PAYMENT ~ BANK DETAILS WHERE REFUND IS TO BE TRANSFERRED\n',
                        completed: false
                    },
                    {
                        name: 'ATTACHMENTS ~ ORIGINAL DOCUMENTATIONS TO BE ATTACHED WITH THE CLAIM',
                        completed: false
                    },
                    {
                        name: 'DECLARATION ~ CONTACT DETAILS AND SIGNATORY',
                        completed: false
                    }
                ],
                select: { state: 'Florida', abbr: 'FL' },
                items: [
                    { text: 'Complete' , value: true } ,
                    { text: 'Incomplete' , value: false }
                ]
            }
        },
        computed: {
            checkCompleted() {
                return this.steps.find(step => !step.completed)
            }
        }
    }
</script>

<style scoped>

</style>