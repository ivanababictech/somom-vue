import Vue from 'vue'

export const update = (state, data) => {
  Object.assign(state, data)
}

export const toggleNavDrawer = (state)  => {
	state.navDrawer = !state.navDrawer
}

export const initializeStore = state => {
    state.initialized = true
}

export const mutateItemField = (state, {item, key, value}) => {
  Vue.set(item, key, value)
}
export const MAIN_SET_FETCHING = (state, obj) => {
    state.fetching = obj.fetching
}
export const MAIN_SET_MESSAGE = (state, obj) => {
    state.messages[obj.type] = obj.message
}

