<template>
    <v-card v-if="company" class="grey lighten-4 elevation-1">

        <v-card-title primary-title>
            <div class="headline">Edit Company</div>
            <v-chip v-if="company.deleted_at" class="warning white--text">Archived</v-chip>
        </v-card-title>

        <company-form :company="company" @submit="updateCompany" v-if="company.id"></company-form>
    </v-card>

    <v-progress-linear v-else :indeterminate="true"></v-progress-linear>

</template>

<script>
    import { mapActions } from 'vuex'
    import CompanyForm from './form'
    import * as companyService from '../service'

    export default {
        data() {
            return {
                company: {},
            }
        },

        mounted() {
            this.getCompany()
        },

        methods: {
            ...mapActions(['setMessage', 'setFetching']),

            getCompany() {
                this.setFetching({ fetching: true })

                companyService.find(this.companyId)
                    .then(response => {
                        this.company = response.data

                        this.setFetching({ fetching: false })
                    })
            },

            updateCompany() {
                companyService.update(this.company)
                    .then(response => {
                        this.setMessage({ type: 'success', message: 'Company has been updated successfully!' })
                    })
            },
        },

        computed: {
            companyId() {
                return this.$route.params.companyId
            }
        },

        components: { CompanyForm }
    }
</script>
