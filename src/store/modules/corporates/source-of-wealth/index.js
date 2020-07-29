export default {
    namespaced: true,

    state: {
        sourceOfWealthDocuments: [],

        sourceOfWealthDocument: {
            source_of_wealth: null,
            documents: [
                {
                    title: null,
                    note: null,
                    file_path: null
                }
            ]
        }
    },

    mutations: {
        setSourceOfWealthDocuments: (state, documents) => state.sourceOfWealthDocuments = documents,

        removeSourceOfWealthDocument(state, documentId) {
            const documentIndex = _.findIndex(state.sourceOfWealthDocuments, document => document.id == documentId);

            state.sourceOfWealthDocuments.splice(documentIndex, 1);
        }
    },

    getters: {
        sourceOfWealthDocuments: state => state.sourceOfWealthDocuments,

        sourceOfWealthDocument: state => state.sourceOfWealthDocument,
    }
}