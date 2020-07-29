export default {
    namespaced: true,

    state: {
        references: []
    },

    mutations: {
        setReferences: (state, references) => state.references = references
    },

    getters: {
        references: state => state.references
    }
}