<template>
  <section>
    <v-toolbar dense flat height="38">

      <v-toolbar-items>
        <v-btn flat :to="{ name: 'AccountingCustomers' }">Customers</v-btn>
        <v-btn flat :to="{ name: 'AccountingSuppliers' }">Suppliers</v-btn>
        <v-btn flat :to="{ name: 'AccountingDirectEntrySuppliers' }">Direct entry suppliers</v-btn>
        <v-btn flat :to="{ name: 'AccountingDonors' }">Donors</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          v-model="search"
          clearable
        ></v-text-field>
      </v-toolbar-items>

     <donor-dialog v-if="$route.name == 'AccountingDonors'" flat small label="Add"></donor-dialog>
     <customer-dialog v-if="$route.name == 'AccountingCustomers'" flat small label="Add"></customer-dialog>
     <supplier-dialog v-if="$route.name == 'AccountingSuppliers'" flat small label="Add"></supplier-dialog>
     <direct-entry-supplier-dialog v-if="$route.name == 'AccountingDirectEntrySuppliers'" flat small label="Add"></direct-entry-supplier-dialog>

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
  mounted () {
    if (this.$route.name == 'AccountingContacts') {
      this.$router.push({ name: 'AccountingCustomers' })
    }
  }
}
</script>