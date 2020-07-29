<template>
    <v-container fluid>
        <div class="headline">Edit Due diligence question</div>
        <decleration-form v-if="declerationIsSet"
            :decleration="decleration"
            @submit="updateDecleration"></decleration-form>
    </v-container>
</template>

<script>
    import DeclerationForm from './form';
    import * as declerationService from '../service';
    import dueDiligenceMixin from '../../mixins/tab-mixin';

    export default {
        mixins: [dueDiligenceMixin],

        data() {
            return {
                decleration: {},
                declerationIsSet: false
            }
        },

        mounted() {
            this.getDecleration();
        },

        methods: {
            updateDecleration() {
                declerationService.update(this.decleration)
                    .then(response => {
                        this.$router.push({ name: 'corporate.due-diligence' });
                        this.setDeclerationsTab();

                        this.setMessage({ type: 'success', message: 'Decleration has been updated successfully!' });
                    })
            },

            getDecleration() {
                declerationService.find(this.declerationId)
                    .then(({data}) => {
                        this.decleration = data;
                        this.declerationIsSet = true;
                    })
            }
        },

        computed: {
            declerationId() {
                return this.$route.params.declerationId
            },
        },

        components: { DeclerationForm }
    }
</script>

<style scoped>

</style>