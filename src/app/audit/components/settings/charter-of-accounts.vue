<template>
  <section>
    <v-card class="grey lighten-4 elevation-0">

      <v-subheader>
        <span class="subheading">Charter of accounts</span>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn fab dark small color="primary" @click.native="editAccount({})">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-subheader>

      <el-table
        :data="filteredAccounts"
        height="400"
        style="width: 100%">
        <el-table-column
          label="Account Number"
          prop="account_no">
        </el-table-column>
        <el-table-column
          label="Account name"
          prop="account_name">
        </el-table-column>
        <el-table-column
          label="Assigned account"
          prop="assigned_account.assigned_account_name">
        </el-table-column>
        <el-table-column
          label="Sub account"
          prop="sub_account.sub_account_name">
        </el-table-column>
        <el-table-column
          label="Grouping"
          prop="group">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations">
          <template slot-scope="scope">
            <div class="text-xs-center">
              <v-btn icon flat small color="primary" @click.prevent="editAccount(scope.row)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon flat small color="warning" @click.prevent="deleteAccount(scope.row)">
                <v-icon>delete</v-icon>
              </v-btn>
            </div>
          </template>
        </el-table-column>

      </el-table>

    </v-card>

  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { $axios } from '@/api'
import { searchArrayItems } from '@/util'

export default {
  data: () => ({
    search: '',
  }),

  computed: {
    ...mapGetters({
      assignedAccounts: 'accounting/assignedAccounts',
      accounts: 'accounting/accounts',
    }),
    filteredAccounts() {
      return searchArrayItems(this.accounts, this.search, ['account_no', 'account_name', 'assigned_account.assigned_account_name', 'sub_account.sub_account_name', 'group'])
    },
  },

  methods: {
    ...mapActions({
      deleteAccount: 'accounting/deleteAccount',
      editAccount: 'accounting/editAccount'
    }),
  }
}
</script>