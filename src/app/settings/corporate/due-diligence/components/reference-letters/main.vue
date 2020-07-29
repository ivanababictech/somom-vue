<template>
    <v-container fluid>
        <reference-form :references="references" @save="saveReferences" v-if="referencesIsSet"></reference-form>
    </v-container>
</template>

<script>
    import ReferenceForm from './components/form';
    import * as referenceService from './service';
    import dueDiligenceMixin from '../mixins/tab-mixin';

    export default {
        mixins: [dueDiligenceMixin],

        data()
        {
            return {
                references: {},
                referencesIsSet: false
            }
        },

        mounted()
        {
            this.getReferences();
        },

        methods: {
            saveReferences(data)
            {
                referenceService.save({data})
                    .then(() => {
                        this.setMessage({type: 'success', message: 'References has been updated successfully!'});
                    })
            },

            getReferences()
            {
                referenceService.get()
                    .then(({data}) => {
                        this.references = data;
                        this.referencesIsSet = true;
                    })
            }
        },
        components: {ReferenceForm}
    }
</script>