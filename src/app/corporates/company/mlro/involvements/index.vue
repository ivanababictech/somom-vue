<style>
    .divider {
        height:5px;
        border:none;
        color:#000;
        background-color:#000;
        margin-bottom: 5px;
    }
</style>
<template>
    <div>
        <div v-if="hasDirector">
            <label>DIRECTORS</label>
            <hr class="divider" />

            <director :details="individualDirector" v-if="hasIndividualDirector"></director>

            <hr width="100%" />

            <director :details="companyDirectors" v-if="hasCompanyDirector" :is-company="true"></director>
        </div>

        <div v-if="hasShareHolder">
            <label>SHAREHOLDERS</label>
            <hr class="divider" />

            <shareholder :details="individualShareHolder" v-if="hasIndividualShareHolder"></shareholder>

            <shareholder :details="companyShareholders" v-if="hasCompanyShareHolder" :is-company="true"></shareholder>

            <shareholder :details="nomineeShareholders" v-if="hasNomineeShareHolder" :is-company="true"></shareholder>

            <shareholder :details="trustShareholders" v-if="hasTrustShareholders" :is-company="true"></shareholder>

            <shareholder :details="foundationShareholders" v-if="hasFoundationShareholders" :is-company="true"></shareholder>
        </div>

        <div v-if="hasCompanySecretaries">
            <label>COMPANY SECRETARIES</label>
            <hr class="divider" />

            <company-secretaries :details="companySecretaries"></company-secretaries>
        </div>

        <div v-if="hasJudicialRepresentative">
            <label>JUDICIAL REPRESENTATION</label>
            <hr class="divider" />

            <judicial-and-legal-representation :details="judicialRepresentative" v-if="hasIndividualJudicialRepresentative"></judicial-and-legal-representation>

            <judicial-and-legal-representation :details="companyJudicialRepresentative" v-if="hasCompanyJudicialRepresentative" :is-company="true"></judicial-and-legal-representation>
        </div>

        <div v-if="hasLegalRepresentative">
            <label>LEGAL REPRESENTATION</label>
            <hr class="divider" />
            <judicial-and-legal-representation :details="legalRepresentative" v-if="hasIndividualLegalRepresentative"></judicial-and-legal-representation>

            <judicial-and-legal-representation :details="companyLegalRepresentative" v-if="hasCompanyLegalRepresentative" :is-company="true"></judicial-and-legal-representation>
        </div>

        <div v-if="hasBeneficialOwners">
            <label>ULTIMATE BENEFICIAL OWNERS</label>
            <hr class="divider" />

            <beneficial-owners :details="individualBeneficialOwners" v-if="hasIndividualBeneficialOwners"></beneficial-owners>

            <beneficial-owners :details="nomineeBeneficialOwners" v-if="hasNomineeBeneficialOwners"></beneficial-owners>

            <beneficial-owners :details="trustBeneficiaries" v-if="hasTrustBeneficiaries"></beneficial-owners>

            <beneficial-owners :details="foundationBeneficiaries" v-if="hasFoundationBeneficiaries"></beneficial-owners>
        </div>
    </div>
</template>

<script>
    import Director from './director';
    import Shareholder from './shareholder';
    import CompanySecretaries from './company-secretaries';
    import JudicialAndLegalRepresentation from './judicial-and-legal-representation';
    import BeneficialOwners from './beneficial-owners';

    export default {
        props: ['company'],

        components: {
            Director,
            Shareholder,
            CompanySecretaries,
            JudicialAndLegalRepresentation,
            BeneficialOwners
        },

        data() {
            return {
                companyShareholders: [],
                companyDirectors: [],
                nomineeShareholders: [],
                trustShareholders: [],
                foundationShareholders: [],
                individualBeneficialOwners: [],
                nomineeBeneficialOwners: [],
                trustBeneficiaries: [],
                foundationBeneficiaries: [],
                companyJudicialRepresentative: [],
                companyLegalRepresentative: []
            }
        },

        mounted() {
            this.getCompanyShareholders();
            this.getCompanyDirectors();
            this.getNomineeShareholders();
            this.getTrustShareholders();
            this.getFoundationShareholders();
            this.getCompanyJudicialRepresentative();
            this.getCompanyLegalRepresentative();
        },

        computed: {
            individualDirector() {
                return _.filter(this.company.involvements.types, type => _.includes(type.involvements, 'Individual director'));
            },

            hasIndividualDirector() {
                return this.individualDirector.length > 0;
            },

            hasCompanyDirector() {
                return this.companyDirectors.length > 0;
            },

            hasDirector() {
                return this.hasIndividualDirector || this.hasCompanyDirector;
            },

            individualShareHolder() {
                return _.filter(this.company.involvements.types, type => _.includes(type.involvements, 'Individual shareholder'));
            },

            hasIndividualShareHolder() {
                return this.individualShareHolder.length > 0;
            },

            hasCompanyShareHolder() {
                return this.companyShareholders.length > 0;
            },

            hasNomineeShareHolder() {
                return this.nomineeShareholders.length > 0;
            },

            hasTrustShareholders() {
                return this.trustShareholders.length > 0;
            },

            hasFoundationShareholders() {
                return this.foundationShareholders.length > 0;
            },

            hasShareHolder() {
                return this.hasIndividualShareHolder || this.hasCompanyShareHolder || this.hasNomineeShareHolder
                    || this.hasTrustShareholders || this.hasFoundationShareholders;
            },

            companySecretaries() {
                return _.filter(this.company.involvements.types, type => _.includes(type.involvements, 'Company secretary'));
            },

            hasCompanySecretaries() {
                return this.companySecretaries.length > 0;
            },

            judicialRepresentative() {
                return _.filter(this.company.involvements.types, type => {
                    return type.value === 'individual' && _.includes(type.involvements, 'Judicial representative')
                });
            },

            hasIndividualJudicialRepresentative() {
                return this.judicialRepresentative.length > 0;
            },

            legalRepresentative() {
                return _.filter(this.company.involvements.types, type => {
                    return type.value === 'individual' && _.includes(type.involvements, 'Legal representative')
                });
            },

            hasIndividualLegalRepresentative() {
                return this.legalRepresentative.length > 0;
            },

            hasCompanyJudicialRepresentative() {
                return this.companyJudicialRepresentative.length > 0;
            },

            hasCompanyLegalRepresentative() {
                return this.companyLegalRepresentative.length > 0;
            },

            hasLegalRepresentative() {
                return  this.hasIndividualLegalRepresentative || this.hasCompanyLegalRepresentative;
            },

            hasJudicialRepresentative() {
                return this.hasIndividualJudicialRepresentative || this.hasCompanyJudicialRepresentative
            },

            hasIndividualBeneficialOwners() {
                return this.individualBeneficialOwners.length > 0;
            },

            hasNomineeBeneficialOwners() {
                return this.nomineeBeneficialOwners.length > 0;
            },

            hasTrustBeneficiaries() {
                return this.trustBeneficiaries.length > 0;
            },

            hasFoundationBeneficiaries() {
                return this.foundationBeneficiaries.length > 0;
            },

            hasBeneficialOwners() {
                return this.hasIndividualBeneficialOwners || this.hasNomineeBeneficialOwners || this.hasTrustBeneficiaries
                    || this.hasFoundationBeneficiaries;
            }
        },

        methods: {
            getCompanyShareholders() {
                this.individualBeneficialOwners = [];
                this.companyShareholders = [];
                const companyShareholders = _.filter(this.company.involvements.types, type => _.includes(type.involvements, 'Corporate shareholder'));

                if (companyShareholders.length > 0) {
                    this.getCompanyDetails(companyShareholders, 'companyShareholders');

                    _.each(companyShareholders, corporate => {
                        _.each(corporate.structure.types, type => {
                            if (type.value === 'individual') {
                                if (type.inputDetails.firstName === null && type.inputDetails.lastName === null) {
                                    type.inputDetails.firstName = type.name;
                                    type.inputDetails.lastName = type.surname;
                                }
                                this.individualBeneficialOwners.push(type.inputDetails);
                            }

                            if (type.value === 'company')
                                _.each(type.shareholders, shareholder => {
                                    if (shareholder.inputDetails.firstName === null && shareholder.inputDetails.lastName === null) {
                                        shareholder.inputDetails.firstName = shareholder.name;
                                        shareholder.inputDetails.lastName = shareholder.surname;
                                    }
                                    this.individualBeneficialOwners.push(shareholder.inputDetails);
                                });

                            if (type.value === 'foundation' || type.value === 'trust')
                                _.each(type.beneficiaries, beneficiary => {
                                    if (beneficiary.inputDetails.firstName === null && beneficiary.inputDetails.lastName === null) {
                                        beneficiary.inputDetails.firstName = beneficiary.name;
                                        beneficiary.inputDetails.lastName = beneficiary.surname;
                                    }
                                    this.individualBeneficialOwners.push(beneficiary.inputDetails);
                                })
                        })
                    });
                }
            },

            getCompanyDirectors() {
                this.companyDirectors = [];
                const companyDirectors = _.filter(this.company.involvements.types, type => _.includes(type.involvements, 'Corporate director'));

                if (companyDirectors.length > 0) {
                    this.getCompanyDetails(companyDirectors, 'companyDirectors');
                }
            },

            getNomineeShareholders() {
                this.nomineeShareholders = [];
                this.nomineeBeneficialOwners = [];

                const nomineeShareholders = _.filter(this.company.involvements.types, type => _.includes(type.involvements, 'Nominee shareholder'));

                if (nomineeShareholders.length > 0) {
                    this.getCompanyDetails(nomineeShareholders, 'nomineeShareholders');

                    _.each(nomineeShareholders, corporate => {
                        _.each(corporate.beneficialOwners, owner => {
                            this.nomineeBeneficialOwners.push(owner.inputDetails);
                        })
                    });
                }
            },

            getTrustShareholders() {
                const trustShareholders = _.filter(this.company.involvements.types, type => _.includes(type.value, 'trust'));
                this.trustShareholders = [];
                this.trustBeneficiaries = [];

                if (trustShareholders.length > 0) {
                    this.getCompanyDetails(trustShareholders, 'trustShareholders');

                    _.each(trustShareholders, corporate => {
                        _.each(corporate.beneficiaries, owner => {
                            this.trustBeneficiaries.push(owner.inputDetails);
                        })
                    });
                }
            },

            getFoundationShareholders() {
                this.foundationShareholders = [];
                this.foundationBeneficiaries = [];
                const foundationShareholders = _.filter(this.company.involvements.types, type => _.includes(type.value, 'foundation'));

                if (foundationShareholders.length > 0) {
                    this.getCompanyDetails(foundationShareholders, 'foundationShareholders');

                    _.each(foundationShareholders, corporate => {
                        _.each(corporate.beneficiaries, owner => {
                            this.foundationBeneficiaries.push(owner.inputDetails);
                        })
                    });
                }
            },

            getCompanyJudicialRepresentative() {
                this.companyJudicialRepresentative = [];
                const companyJudicialRepresentative = _.filter(this.company.involvements.types, type => {
                    return type.value === 'company' && _.includes(type.involvements, 'Judicial representative')
                });

                if (companyJudicialRepresentative.length > 0) {
                    this.getCompanyDetails(companyJudicialRepresentative, 'companyJudicialRepresentative');
                }
            },

            getCompanyLegalRepresentative() {
                this.companyLegalRepresentative = [];

                const companyLegalRepresentative = _.filter(this.company.involvements.types, type => {
                    return type.value === 'company' && _.includes(type.involvements, 'Legal representative')
                });

                if (companyLegalRepresentative.length > 0) {
                    this.getCompanyDetails(companyLegalRepresentative, 'companyLegalRepresentative');
                }
            },

            getCompanyDetails(companies, involvementType) {
                _.each(companies, director => {
                    const companyIndex = _.findIndex(this.company.dueDiligence, company => company.name === director.name);
                    let companyDetails = this.company.dueDiligence[companyIndex];
                    this[involvementType].push(companyDetails);
                })
            }
        },

        watch: {
            'company.involvements.types': {
                handler(involvementTypes) {
                    this.getCompanyDirectors();
                    this.getCompanyShareholders();
                    this.getNomineeShareholders();
                    this.getTrustShareholders();
                    this.getFoundationShareholders();
                    this.getCompanyJudicialRepresentative();
                    this.getCompanyLegalRepresentative();
                },

                deep: true
            },

            'company.dueDiligence': {
                handler(dueDiligence) {
                    this.getCompanyDirectors();
                    this.getCompanyShareholders();
                    this.getNomineeShareholders();
                    this.getTrustShareholders();
                    this.getFoundationShareholders();
                    this.getCompanyJudicialRepresentative();
                    this.getCompanyLegalRepresentative();
                },

                deep: true
            }
        }
    }
</script>