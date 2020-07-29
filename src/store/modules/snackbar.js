import _ from 'lodash'

const namespaced = true;

const state = {
  visible: false,
  absolute: false,
  bottom: false,
  left: false,
  multiLine: false,
  right: false,
  timeout: 6000,
  top: true,
  vertical: false,
  text: '',
  color: 'info'
}

const getters = {
  state (state) {
    return state;
  }
}

const actions = {
  open ({commit}, text) {
    commit('open', text);
  },
  close ({commit, dispatch}) {
    commit('close');
  },
  toggle ({commit}) {
    commit('toggle');
  },
  update ({commit, dispatch}, snackbar) {
    dispatch('reset');
    commit('update', snackbar);
  },
  reset ({commit}) {
    commit('reset');
  }
}

const mutations = {
  update (state, snackbar) {
    _.each(snackbar, function(value, key) {
      state[key] = value;
      if (key === 'success') {
        if (value) {
          state.color = 'success'
        } else {
          state.color = 'error'
        }
      }
    });
  },
  open (text) {
    state.visible = true;
    state.text = text;
  },
  close (state) {
    state.visible = false;
  },
  toggle (state) {
    state.visible = !state.visible;
  },
  reset (state) {
    state.visible = false;
    state.absolute = false;
    state.bottom = false;
    state.left = false;
    state.multiLine = false;
    state.right = false;
    state.timeout = 6000;
    state.top = true;
    state.vertical = false;
    state.text = '';
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
