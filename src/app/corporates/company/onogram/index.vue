<template>
    <v-container grid-list-md>
        <div class="headline">Onogram</div>
        <v-layout row wrap>
            <diagram ref="diag"
                     :model-data="onograms"
                     v-if="onograms.length"
                     @model-changed="modelChanged"
                     style="border: solid 1px black; width:100%; height:400px"
            ></diagram>
        </v-layout>
    </v-container>
</template>

<script>
    import Diagram from './diagram'

    export default {
        data() {
            return {
                onogram: [],
                savedModelText: "",
            }
        },

        props: ['involvements'],

        mounted() {
            this.updateDiagramFromData()
        },

        methods: {
            // get access to the GoJS Model of the GoJS Diagram
            model() {
                return this.$refs.diag.model()
            },
            // tell the GoJS Diagram to update based on the arbitrarily modified model data
            updateDiagramFromData() {
                if(this.onograms.length) {
                    this.$refs.diag.updateDiagramFromData();
                }
            },
            // this event listener is declared on the <diagram>
            modelChanged: function(e) {
                if (e.isTransactionFinished) {  // show the model data in the page's TextArea
                    this.savedModelText = e.model.toJson();
                }
            },
        },

        computed: {
            onograms() {
                this.onogram = []
                var key = -1

                // check if exists company then we can build the tree
                if(this.involvements.companyName && this.involvements.issuedShares) {
                    this.onogram.push({
                        key: ++key,
                        type: "company",
                        name: this.involvements.companyName + '\n' + this.involvements.issuedShares + ' issued shares',
                    })
                } else {
                    return []
                }

                this.involvements.types.map((type, index) => {
                    let onogram = {};

                    // get more info bellow name
                    let info = '\n' + (type.numberOfShares || 0) + ' held shares\n' +
                        ((type.numberOfShares || 0) / this.involvements.issuedShares * 100).toFixed(0) + ' %'

                    switch (type.value) {
                        case 'company':
                            if(type.name && type.registrationNumber) {
                                let typeOnogram = type.involvements.indexOf('Corporate shareholder') !== -1 ? 'Corporate shareholder\n' : '';
                                typeOnogram += type.involvements.indexOf('Nominee shareholder') !== -1 ? 'Nominee shareholder\n' : ''

                                this.onogram.push({
                                    parent: 0,
                                    key: ++key,
                                    type: type.value,
                                    name: typeOnogram + type.name + ' ' + type.registrationNumber + info,
                                })
                            } else {
                                break
                            }

                            let parentCompany = key

                            type.beneficialOwners.map(beneficialOwner => {
                                if(beneficialOwner.name && beneficialOwner.inputDetails.identificationNumber) {
                                    let beneficialOwnerInfo = '\n' + (beneficialOwner.numberOfShares || 0) + ' held shares\n' +
                                        ((beneficialOwner.numberOfShares || 0) / type.numberOfShares * 100).toFixed(0) + ' %'
                                    let name = beneficialOwner.name + ' ' + beneficialOwner.surname + ' ' + beneficialOwner.inputDetails.identificationNumber

                                    onogram = {
                                        parent: parentCompany,
                                        key: ++key,
                                        type: 'individual',
                                        name: name + beneficialOwnerInfo
                                    };

                                    this.onogram.push(onogram)
                                }
                            });

                            type.structure.types.map(type => {
                                var ownershipInfo =  '\n' + (type.companyOwnership || 0) + ' % of ownership'

                                switch (type.value) {
                                    case 'individual':
                                        if(type.name && type.inputDetails.identificationNumber) {
                                            let name = type.name + ' ' + type.surname + ' '+ type.inputDetails.identificationNumber + ownershipInfo

                                            onogram = {
                                                parent: parentCompany,
                                                key: ++key,
                                                type: type.value,
                                                name: name
                                            };

                                            this.onogram.push(onogram)
                                        }
                                        break;

                                    case 'company':
                                        if(type.companyName && type.registrationNumber) {
                                            onogram = {
                                                parent: parentCompany,
                                                key: ++key,
                                                type: type.value,
                                                name: type.companyName + ' ' + type.registrationNumber + ownershipInfo,
                                            };

                                            this.onogram.push(onogram)


                                            let parent = key

                                            type.shareholders.map(shareholder => {
                                                let name = shareholder.name + ' ' + shareholder.name + ' ' + shareholder.inputDetails.identificationNumber + '\n' +
                                                            (shareholder.ownership || 0) + ' % of ownership',

                                                onogram = {
                                                    parent: parent,
                                                    key: ++key,
                                                    type: 'individual',
                                                    name: name,
                                                };

                                                this.onogram.push(onogram)
                                            });
                                        }
                                        break;

                                    case 'foundation':
                                        if(type.foundationName && type.registrationNumber) {
                                            onogram = {
                                                parent: parentCompany,
                                                key: ++key,
                                                type: type.value,
                                                name: type.foundationName + ' ' + type.registrationNumber + ownershipInfo,
                                            };

                                            this.onogram.push(onogram)


                                            let parentFoundation = key

                                            type.beneficiaries.map(beneficiary => {
                                                if (beneficiary.name && beneficiary.inputDetails.identificationNumber) {
                                                    let name = beneficiary.name + ' ' + beneficiary.surname + ' ' + beneficiary.inputDetails.identificationNumber + '\n' +
                                                                (beneficiary.foundation || 0) + ' % foundation interest'
                                                    onogram = {
                                                        parent: parentFoundation,
                                                        key: ++key,
                                                        type: 'beneficiary',
                                                        name: name
                                                    };

                                                    this.onogram.push(onogram)
                                                }
                                            });
                                        }
                                        break;

                                    case 'trust':
                                        if(type.trustName) {
                                            onogram = {
                                                parent: parentCompany,
                                                key: ++key,
                                                type: 'trust',
                                                name: type.trustName + ownershipInfo,
                                            };

                                            if (onogram.name) this.onogram.push(onogram)

                                            let parentTrust = key

                                            type.beneficiaries.map(beneficiary => {
                                                if (beneficiary.name) {
                                                    let name = beneficiary.name + ' ' + beneficiary.surname + ' ' + beneficiary.inputDetails.identificationNumber + '\n' +
                                                                (beneficiary.trust || 0) + ' % foundation interest'
                                                    onogram = {
                                                        parent: parentTrust,
                                                        key: ++key,
                                                        type: 'beneficiary',
                                                        name: name
                                                    };

                                                    this.onogram.push(onogram)
                                                }
                                            });
                                        }
                                        break
                                }
                            });
                            break;

                        case 'individual':
                            if(type.firstName && type.lastName && type.identificationNumber) {
                                let typeOnogram = type.involvements.indexOf('Individual shareholder') !== -1 ? 'Individual shareholder\n' : ''

                                onogram = {
                                    parent: 0,
                                    key: ++key,
                                    type: 'individual',
                                    name: typeOnogram + type.firstName + ' ' + type.lastName + ' ' + type.identificationNumber + info,
                                };

                                this.onogram.push(onogram)
                            }

                            break;

                        case 'foundation':
                        case 'trust':
                            if(type.name && type.registrationNumber && type.registrationNumber) {
                                let typeOnogram = type.value + '\n'

                                onogram = {
                                    parent: 0,
                                    key: ++key,
                                    type: type.value,
                                    name: typeOnogram + type.name + ' ' + type.registrationNumber + info,
                                };

                                this.onogram.push(onogram)

                                let parentTrust = key

                                type.beneficiaries.map(beneficiary => {
                                    if (beneficiary.name && beneficiary.inputDetails.identificationNumber) {
                                        let info = ''

                                        // get the info for % interest
                                        if (type.value === 'trust') {
                                            info = (beneficiary.trustee || 0) + ' % trust interest'
                                        } else {
                                            info = (beneficiary.foundationOwnership || 0) + ' % foundation interest'
                                        }


                                        let name = beneficiary.name + ' ' + beneficiary.surname + ' ' + beneficiary.inputDetails.identificationNumber + '\n' + info

                                        onogram = {
                                            parent: parentTrust,
                                            key: ++key,
                                            type: 'individual',
                                            name: name
                                        };

                                        this.onogram.push(onogram)
                                    }
                                })
                            }
                            break;
                    }
                })

                return this.onogram
            },
        },

        components: { Diagram }
    }
</script>