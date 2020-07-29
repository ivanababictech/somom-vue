<template>
  <v-data-table
    :headers="headers"
    :items="items"
    dark
    hide-actions
    class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.date }}</td>
      <td>{{ props.item.reference }}</td>
      <td>{{ props.item.details }}</td>
      <td>{{ props.item.description }}</td>
      <td>{{ props.item.currency }}</td>
      <td>{{ props.item.base_debit }}</td>
      <td>{{ props.item.base_credit }}</td>
      <td>{{ props.item.debit }}</td>
      <td>{{ props.item.credit }}</td>
      <td>{{ props.item.exchange_rate }}</td>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    account: Object,
    dates: Object,
  },

  data: () => ({
    headers: [
      { text: 'Date', value: 'date' },
      { text: 'Reference', value: 'reference' },
      { text: 'Details', value: 'details' },
      { text: 'Description', value: 'description' },
      { text: 'Currency', value: 'currency' },
      { text: 'Base debit', value: 'base_debit' },
      { text: 'Base credit', value: 'base_credit' },
      { text: 'Debit', value: 'debit' },
      { text: 'Credit', value: 'credit' },
      { text: 'Exchange rate', value: 'exchange_rate' },
    ],
    items: [],
  }),

  computed: {
    ...mapGetters({
      currency: 'accounting/currency'
    }),
  },

  methods: {
    async fetchActivity () {
      this.items = []
    }
  },

  mounted () {
    this.fetchActivity()
  }
}  
</script>