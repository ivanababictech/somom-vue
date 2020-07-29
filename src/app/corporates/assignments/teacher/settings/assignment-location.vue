<template>
    <v-container grid-list-md>
        <v-data-table
                :headers="headers"
                :items="questions"
                hide-actions
                class="elevation-1"
                disable-initial-sort
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.question }}</td>
                <td>{{ props.item.keywords.map(keyword => keyword.name).join(', ') }}</td>
                <td>{{ props.item.amountNameDebit}}</td>
                <td>{{ props.item.amountNameCredit }}</td>
                <td>{{ props.item.marks }}</td>
                <td class="justify-center">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                headers: [
                    { text: 'Question', value: 'question' },
                    { text: 'Keywords', value: 'keywords' },
                    { text: 'Debit', value: 'debit' },
                    { text: 'Credit', value: 'credit' },
                    { text: 'Marks', value: 'marks' },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
            }
        },

        props: ['assignmentLocation', 'questions'],
    }
</script>