<template>
    <section>
        <v-toolbar dense flat height="38">

            <v-toolbar-items>
                <v-btn flat :to="{ name: 'company-settings.details' }">Company details</v-btn>
                <v-btn flat :to="{ name: 'company-settings.charter-of-accounts' }">Charter of accounts</v-btn>
                <v-btn flat :to="{ name: 'company-settings.bank-details' }">Bank details</v-btn>
                <v-btn flat :to="{ name: 'company-settings.logo' }">Logo</v-btn>
                <v-btn flat :to="{ name: 'company-settings.users' }">Users</v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <donor-dialog v-if="$route.name == 'AccountingDonors'" flat small label="Add"></donor-dialog>
            <customer-dialog v-if="$route.name == 'AccountingCustomers'" flat small label="Add"></customer-dialog>
            <supplier-dialog v-if="$route.name == 'AccountingSuppliers'" flat small label="Add"></supplier-dialog>
            <direct-entry-supplier-dialog
                    v-if="$route.name == 'AccountingDirectEntrySuppliers'" flat small label="Add"
            ></direct-entry-supplier-dialog>

        </v-toolbar>

        <v-card class="grey lighten-4 elevation-0">

            <router-view :search="search"></router-view>

        </v-card>

    </section>
</template>

<script>

    export default {
        data: () => ({
            search: '',
        }),
        mounted() {
            if (this.$route.name == 'AccountingContacts') {
                this.$router.push({name: 'AccountingCustomers'})
            }
        }
    }
</script>