<template>

  <v-data-table
    :headers="headers"
    :items="suppliers"
    :search="search"
    :loading="!loaded"
    class="table-reports">

    <template slot="items" slot-scope="props">
      <tr>
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.country_code }}</td>
        <td>{{ props.item.vat_no }}</td>
        <td class="table__actions">
          <supplier-dialog label="edit" icon flat small :item="props.item"></supplier-dialog>
          <v-btn icon flat small color="warning" @click="deleteSupplier(props.item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>

    <template slot="no-data">
      <v-alert :value="true" color="grey lighten-4">
        <p class="grey--text">No suppliers available.</p>
      </v-alert>
    </template>

  </v-data-table>

</template>

<script>
import { deleteSupplier } from '@/api/accounting'
import { mapGetters } from 'vuex'

export default {
  props: ['search'],
  data: () => ({
    headers: [
      { text: '#ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Country', value: 'country' },
      { text: 'Vat no', value: 'vat_no' },
      { text: 'Operations', value: null, sortable: false },
    ]
  }),
  computed: {
    ...mapGetters({
      loaded: 'accounting/loaded',
      suppliers: 'accounting/suppliers',
    }),
  },
  methods: {
    deleteSupplier: deleteSupplier
  }
}
</script>