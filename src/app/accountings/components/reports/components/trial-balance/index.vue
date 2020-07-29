<template>
  <v-card>

    <v-card-title>
      <h3 class="title">Nominal activity</h3>
    </v-card-title>

    <v-container fluid grid-list-md>
      <v-layout wrap>
        <v-flex xs12 md2 lg1 class="bottom-align-content">
          <span>Filter by</span>
        </v-flex>

        <v-flex xs12 sm4 md3>
          <v-autocomplete
            :items="accounts"
            v-model="filters.account_id"
            label="Account"
            item-text="name"
            item-value="id"
            hide-details
            clearable
            dense
          ></v-autocomplete>
        </v-flex>

        <v-flex xs12 sm4 md3>
          <v-autocomplete
            :items="assignedAccounts"
            v-model="filters.assigned_account_id"
            label="Assigned account"
            item-text="name"
            item-value="id"
            hide-details
            clearable
            dense
          ></v-autocomplete>
        </v-flex>

      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <v-layout wrap>
        <v-flex xs12 md2 lg1 class="bottom-align-content">
          <span class="mr-2">Date Range</span>
        </v-flex>

        <v-flex xs6 sm4 md3>
          <date-picker label="From" v-model="filters.dates.from" full-width hide-details></date-picker>
        </v-flex>
        <v-flex xs6 sm4 md3>
          <date-picker label="To" v-model="filters.dates.to" full-width hide-details></date-picker>
        </v-flex>
        <v-flex xs12 sm4 md3>
          <v-text-field
            append-icon="search"
            label="Search"
            v-model="search"
            hide-details
            clearable
          ></v-text-field>
        </v-flex>
      </v-layout>

    </v-container>

    <v-container fluid grid-list-md>
      <v-data-table
        :headers="headers"
        :items="filteredAccounts"
        :search="search"
        hide-actions
        item-key="id"
        class="table-reports">

        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.assigned_account.name }}</td>
            <td>{{ props.item.sub_account.name }}</td>
            <td>{{ props.item.fs_title }}</td>
            <td class="text-xs-right">{{ props.item.balance.base_debit | n }}</td>
            <td class="text-xs-right">{{ props.item.balance.base_credit | n }}</td>
          </tr>
        </template>

        <template slot="expand" slot-scope="props">
          <account-activity :account="props.item" :dates="filters.dates"></account-activity>
        </template>

        <template slot="no-data">
          <v-alert :value="true" color="grey lighten-4">
            <p class="grey--text">No data</p>
          </v-alert>
        </template>

        <template slot="footer">
          <td colspan="4"><strong>Total</strong></td>
          <td class="text-xs-right"><strong>{{ totals.debit | n }}</strong></td>
          <td class="text-xs-right"><strong>{{ totals.credit | n }}</strong></td>
        </template>

      </v-data-table>
    </v-container>

  </v-card>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { searchArrayItems } from '@/util'

import AccountActivity from './account-activity'

export default {
  components: {
    AccountActivity,
  },

  data: () => ({

    headers: [
      { text: 'Account', value: 'account_name' },
      { text: 'Assigned account', value: 'assigned_account.assigned_account_name' },
      { text: 'Sub account', value: 'sub_account.sub_account_name' },
      { text: 'Fs title', value: 'fs_title' },
      { text: 'Debit', value: 'balance.debit', align: 'right' },
      { text: 'Credit', value: 'balance.credit', align: 'right' },
    ],
    itemHeaders: [
      { text: 'Date', value: 'date' },
      { text: 'Number', value: 'no' },
      { text: 'Additional', value: null, sortable: false },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Currency', value: 'currency' },
      { text: 'Debit', value: 'debit' },
      { text: 'Credit', value: 'credit' },
      { text: 'Foreign equivalent', value: null, sortable: false },
    ],
    search: '',
    filters: {
      dates: {}
    },
  }),

  computed: {
    ...mapGetters({
      accounts: 'accounting/accounts'
    }),
    assignedAccounts () {
      return _.uniqBy(this.accounts, 'assigned_account_id').map(({assigned_account}) => assigned_account)
    },
    filteredAccounts () {
      const filters = this.filters
      return this.accounts.filter(account => {
        let condition = true

        if (filters.account_id) {
          condition = Boolean(filters.account_id == account.id)
        }

        if (condition && filters.assigned_account_id) {
          condition = Boolean(filters.assigned_account_id == account.assigned_account_id)
        }

        /* const dateTime = new Date(account.date).getTime()

        if (condition && filters.dates.from) {
          const fromDateTime = new Date(filters.dates.from).getTime()
          condition = Boolean(fromDateTime <= dateTime)
        }

        if (condition && filters.dates.to) {
          const toDateTime = new Date(filters.dates.to).getTime()
          condition = Boolean(dateTime <= toDateTime)
        }*/

        return condition
      })
    },
    totals () {
      let debit = 0
      let credit = 0
      this.filteredAccounts.forEach(({balance}) => {
        debit += balance.debit
        credit += balance.credit
      })
      return { debit, credit }
    },
  },

}
</script>