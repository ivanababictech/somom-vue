<template>
    <v-card class="grey lighten-4 elevation-1">

        <v-card-title primary-title>
            <div class="headline">Add Company</div>
        </v-card-title>

        <company-form :company="company" @submit="createCompany"></company-form>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    import CompanyForm from './form'
    import * as companyService from '../service'

    export default {
        data() {
            return {
                company: {
                    details: {

                    }
                },
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            createCompany() {
                companyService.create(this.company)
                    .then(response => {
                        this.$router.go(-1)

                        this.setMessage({ type: 'success', message: response.data.message })
                    })
            }
        },

        components: { CompanyForm }
    }
</script>