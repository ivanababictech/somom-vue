import { mapMutations, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['setMessage']),

        ...mapMutations('dueDiligence', [
            'setCurrentTab'
        ]),

        setQuestionnaireTab() {
            this.setCurrentTab('questionnaire');
        },

        setDeclerationsTab() {
            this.setCurrentTab('declerations');
        }
    }
}