<template>
  <div>
    <v-card>
      <v-card-title>
        <h4 class="card-title">Auditors</h4>

        <v-spacer></v-spacer>

        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          v-model="search"
        ></v-text-field>

        <v-btn fab dark small class="primary" @click.stop="toggleDialog">
          <v-icon dark>add</v-icon>
        </v-btn>

      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="auditors"
          :search="search"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.auditor_id }}</td>
          <td class="text-xs-right">{{ props.item.auditor_name }}</td>
          <td class="text-xs-right"><v-btn icon @click.stop="toggleDialog(props.item)"><v-icon>edit</v-icon></v-btn></td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          From {{ pageStart }} to {{ pageStop }}
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog.visible" absolute width="600">
      <v-card>
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="Auditor name"
            v-model="auditor.auditor_name"
            required
            @input="$v.auditor.auditor_name.$touch()"
          ></v-text-field>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions v-if="!auditor.auditor_id">
          <v-spacer></v-spacer>
          <v-btn flat primary :disabled="$v.$invalid" @click="add">Add</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-spacer></v-spacer>
          <v-btn flat primary :disabled="$v.$invalid" @click="update">Update</v-btn>
          <v-btn flat warning @click="destroy">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { http } from '@/plugins/http/index';
import { required } from 'vuelidate/lib/validators'
import _ from 'lodash'

export default {
  data: () => ({
    search: '',
    headers: [
      { text: 'ID', value: 'auditor_id' },
      { text: 'auditor name', value: 'auditor_name' }
    ],
    auditors: [],
    auditor: {
      auditor_name: null,
    },
    dialog: {
      visible: false,
      title: 'Add auditor',
    }
  }),

  validations: {
    auditor: {
      auditor_name: {
        required
      },
    }
  },

  methods: {
    ...mapActions({
      snackbar: 'snackbar/update'
    }),

    toggleDialog (auditor) {
      if (auditor.auditor_id) {
        this.dialog.title = 'Edit auditor';
        this.auditor = auditor;
      } else {
        this.dialog.title = 'Add auditor';
        this.auditor = {
          auditor_name: null,
        };
      }
      this.dialog.visible = true;
    },

    add () {
      http.post('auditors', this.auditor)
        .then(({data}) => {
          if (data.success) {
            this.auditors.push(data.auditor);
          }
          // hide form
          this.dialog.visible = false;
          // show success notification
          this.snackbar({
            visible: true,
            success: data.success,
            text: data.message
          });
        });
    },

    update () {
      const url = 'auditors/' + this.auditor.auditor_id;

      http.put(url, this.auditor)
        .then(({data}) => {
          // hide form
          this.dialog.visible = false;
          // show success notification
          this.snackbar({
            visible: true,
            success: data.success,
            text: data.message
          });
        });
    },

    destroy () {
      const url = 'auditors/' + this.auditor.auditor_id;
      http.delete(url)
        .then(({data}) => {
          if (data.success) {
            // remove auditor
            _.remove(this.auditors, ({auditor_id}) => auditor_id === this.auditor.auditor_id);
            if (this.auditors.length) {
              this.auditors.push([])
            } else {
              this.auditors = [];
            }
          }
          // hide dialog
          this.dialog.visible = false;
          // show success notification
          this.snackbar({
            visible: true,
            success: data.success,
            text: data.message,
          });
        });
    },
  },

  created () {
    http.get('auditors').then(({data}) => {
      this.auditors = data.auditors;
    });
  }

}
</script>
