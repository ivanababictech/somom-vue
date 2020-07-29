export default {
    namespaced: true,

    state: {
        questions: []
    },

    mutations: {
        setQuestions: (state, questions) => state.questions = questions
    },

    getters: {
        questions: state => state.questions
    }
}