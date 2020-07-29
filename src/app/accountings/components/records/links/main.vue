<template>
    <v-layout row wrap mt-4>
        <v-flex xs12 md6 pr-2>
            <span>PENDING RECEIVED REQUESTS</span>
            <v-data-table
                    :headers="headers"
                    :items="pendingReceivedRequests"
                    hide-actions
                    class="elevation-1 mt-2"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.relationship }}</td>
                    <td>{{ props.item.companyName }}</td>
                    <td>{{ props.item.regNo }}</td>
                    <td>
                        <v-btn color="success" light>Accept</v-btn>
                        <v-btn color="danger" light>Decline</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12 md6 pl-2>
            PENDING SENT REQUESTS
            <v-data-table
                    :headers="headers"
                    :items="pendingSentRequests"
                    hide-actions
                    class="elevation-1 mt-2"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.relationship }}</td>
                    <td>{{ props.item.companyName }}</td>
                    <td>{{ props.item.regNo }}</td>
                    <td>
                        <v-btn color="danger" light>Cancel</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12 md6 mt-4 pr-2>
            ACCEPTED REQUESTS
            <v-data-table
                :headers="headers"
                :items="acceptedRequests"
                hide-actions
                class="elevation-1 mt-2"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.relationship }}</td>
                <td>{{ props.item.companyName }}</td>
                <td>{{ props.item.regNo }}</td>
                <td>
                    <v-btn color="danger" light>Decline</v-btn>
                </td>
            </template>
        </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    export default{
        data: () => ({
            headers: [
                { text: 'Relationship', relationship: 'calories' },
                { text: 'Company name', value: 'companyName' },
                { text: 'Reg. no.', value: 'regNo' },
                { text: 'Actions', sortable: false}
            ],
            pendingReceivedRequests: [
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
            ],
            pendingSentRequests: [
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
            ],
            acceptedRequests: [
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
                {
                    relationship: 'Director',
                    companyName: 'Hemofarm',
                    regNo: '05478721'
                },
            ]
        })
    }
</script>