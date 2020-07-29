export default {
    namespaced: true,

    state: {
        declerations: []
    },

    mutations: {
        setDeclerations: (state, declerations) => state.declerations = declerations
    },

    getters: {
        declerations: state => state.declerations
    }
}