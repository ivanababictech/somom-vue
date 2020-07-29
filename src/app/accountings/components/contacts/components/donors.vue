<template>

  <v-data-table
    :headers="headers"
    :items="donors"
    :search="search"
    :loading="!loaded"
    class="table-reports">

    <template slot="items" slot-scope="props">
      <tr>
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.mobile_no }}</td>
        <td>{{ accountNameById(props.item.account_id) }}</td>
        <td class="table__actions">
          <donor-dialog label="edit" icon flat small :item="props.item"></donor-dialog>
          <v-btn icon flat small color="warning" @click="deleteDonor(props.item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>

    <template slot="no-data">
      <v-alert :value="true" color="grey lighten-4">
        <p class="grey--text">No donors available.</p>
      </v-alert>
    </template>

  </v-data-table>

</template>

<script>
import { deleteDonor } from '@/api/accounting'
import { mapGetters } from 'vuex'

export default {
  props: ['search'],
  data: () => ({
    headers: [
      { text: '#ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Mobile no', value: 'mobile_no' },
      { text: 'Account', value: 'account_id' },
      { text: 'Operations', value: null, sortable: false },
    ]
  }),
  computed: {
    ...mapGetters({
      loaded: 'accounting/loaded',
      donors: 'accounting/donors',
      accountNameById: 'accounting/accountNameById'
    }),
  },
  methods: {
    deleteDonor: deleteDonor
  }
}
</script>