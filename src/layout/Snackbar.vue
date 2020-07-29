<template>
  <v-snackbar
    :absolute="snackbar.absolute"
    :bottom="snackbar.bottom"
    :left="snackbar.left"
    :multi-line="snackbar.multiLine"
    :right="snackbar.right"
    :timeout="snackbar.timeout"
    :top="snackbar.top"
    :vertical="snackbar.vertical"
    :color="snackbar.color"
    v-model="visible"
  >
    {{ snackbar.text }}
    <v-btn flat @click.native.stop="close">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    
  }),

  computed: {
    ...mapGetters({
      snackbar: 'snackbar/state'
    }),

    visible: {
      get () {
        return this.snackbar.visible
      },
      set (visible) {
        this.update({visible})
      }
    },
  },

  methods: {
    ...mapActions({
      close: 'snackbar/close',
      update: 'snackbar/update'
    })
  }
}
</script>
