export default {
    namespaced: true,

    state: {
        currentTab: 'questionnaire'
    },

    mutations: {
        setCurrentTab: (state, tab) => state.currentTab = tab
    },

    getters: {
        currentTab: state => state.currentTab
    }
}