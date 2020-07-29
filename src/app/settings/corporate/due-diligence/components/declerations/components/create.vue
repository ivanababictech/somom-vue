<template>
    <v-container fluid>
        <div class="headline">Create Due diligence decleration</div>
        <decleration-form :decleration="decleration" @submit="createDecleration"></decleration-form>
    </v-container>
</template>

<script scoped>
    import DeclerationForm from './form';
    import * as declerationService from '../service';
    import dueDiligenceMixin from '../../mixins/tab-mixin';

    export default {
        mixins: [dueDiligenceMixin],

        data() {
            return {
                decleration: {
                    type: null,
                    data: {
                        paragraphs: [{
                            involvements: [],
                            is_standard: false,
                            text: null
                        }]
                    }
                }
            }
        },

        methods: {
            createDecleration() {
                declerationService.create(this.decleration)
                    .then(response => {
                        this.$router.push({ name: 'corporate.due-diligence' });
                        this.setDeclerationsTab();

                        this.setMessage({ type: 'success', message: 'Decleration has been created successfully!' });
                    })
            }
        },

        components: { DeclerationForm }
    }
</script>