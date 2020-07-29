<template>
    <v-container fluid grid-list-md>
        <div class="headline">
            B. Banks
            <questions-create :section="sectionType" v-if="sectionType"></questions-create>
        </div>
        <v-layout row wrap>
            <v-flex xs12>
                <span class="subheading">Will the company have a bank account?</span>
            </v-flex>
            <v-flex xs12>
                <v-btn
                    :color="'primary'"
                    :flat="!banks.maltaBank"
                    @click="banks.maltaBank = ! banks.maltaBank">
                    Malta bank
                </v-btn>
                <v-btn
                    :color="'primary'"
                    :flat="!banks.foreignBank"
                    @click="banks.foreignBank = ! banks.foreignBank">
                    Foreign bank
                </v-btn>
                <v-btn
                    :color="'primary'"
                    :flat="banks.maltaBank || banks.foreignBank"
                    @click="banks.maltaBank = banks.foreignBank = false">
                    No bank
                </v-btn>
            </v-flex>
        </v-layout>
        <template v-if="banks.foreignBank">
            <v-layout row align-center v-for="(item, index) in banks.foreignBanks" :key="`foreign-${index}`">
                <v-flex xs12 md4>
                    <v-text-field v-model="item.name" label="Foreign bank"></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-select :items="countries" v-model="item.country" label="Country" item-text="name"></v-select>
                </v-flex>
                <v-flex xs12 md4>
                    <v-select :items="currencies" v-model="item.currencies" label="Currency" :multiple="true"></v-select>
                </v-flex>
                <v-flex sm2 xs12>
                    <v-layout row justify-end>
                        <v-btn v-if="index === 0"
                            fab
                            small
                            color="primary"
                            @click="addForeignBank">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            small
                            dark
                            color="danger"
                            @click="removeForeignBank(index)"
                            v-if="banks.foreignBanks.length > 1">
                            <v-icon>remove</v-icon>
                        </v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </template>
        <template v-if="banks.maltaBank">
            <v-layout row align-center v-for="(item, i) in banks.malteseBanks" :key="i">
                <v-flex sm4 xs12>
                    <span class="subheading">Bank account currency required</span>
                </v-flex>
                <v-flex sm3 xs12>
                    <v-select
                        v-model="item.bank"
                        :items="malteseBanks"
                        label="Select Bank"
                        item-text="name"
                    ></v-select>
                </v-flex>
                <v-flex sm3 xs12 v-if="item.bank !== null">
                    <currencies v-model="item.currencies" :multiple="true"></currencies>
                </v-flex>
                <v-flex sm2 xs12>
                    <v-layout row justify-end>
                        <v-btn v-if="i === 0"
                            fab
                            small
                            color="primary"
                            @click="addMalteseBank">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            small
                            dark
                            color="danger"
                            @click="removeMalteseBank(i)"
                            v-if="banks.malteseBanks.length > 1">
                            <v-icon>remove</v-icon>
                        </v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row align-center>
                <v-flex xs12 md6>
                    <span class="subheading"> Do you require a bank debit card?</span>
                </v-flex>
                <v-flex xs12 md6>
                    <v-container grid-list-md>
                        <v-btn-toggle v-model="banks.debitCard">
                            <v-btn flat
                                :value="true"
                                active-class="primary"
                                :style="addButtonsStyle(banks.debitCard, 'y')">
                                <span>Y</span>
                            </v-btn>
                            <v-btn flat
                                :value="false"
                                active-class="primary"
                                :style="addButtonsStyle(banks.debitCard, 'n')">
                                <span>N</span>
                            </v-btn>
                        </v-btn-toggle>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-layout row v-if="banks.debitCard">
                <v-flex xs12 sm4>
                    <v-text-field
                        v-model="banks.nameOfCardHolder"
                        label="enter name of card holder"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                    <v-text-field
                        v-model="banks.nameOfCardHolder"
                        label="enter name of card holder"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                    <v-text-field
                        v-model="banks.nameOfCardHolder"
                        label="enter name of card holder"
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </template>

        <questions-list :section="sectionType" :data="banks" v-if="sectionType"></questions-list>
    </v-container>
</template>

<script>
    import * as corporateService from '@/app/corporates/service';
    import { mapGetters } from 'vuex';
    import * as MalteseBanksService from '@/app/settings/global/maltese-banks/service';
    import QuestionsList from '@/app/corporates/company/profile/components/questions/list'
    import QuestionsCreate from '@/app/corporates/company/profile/components/questions/create'

    export default {
        props: ['banks'],
        
        data() {
            return {
                sectionType: corporateService.SECTION_BANK,
                malteseBanks: []
            }
        },

        mounted () {
            this.fetchItems();
            if (this.banks.malteseBanks.length === 0) {
                this.addMalteseBank();
            }
            if (this.banks.foreignBanks.length === 0) {
                this.addForeignBank();
            }
        },
        
        methods: {
            fetchItems () {
                MalteseBanksService.get()
                    .then(response => this.malteseBanks = _.filter(response.data, bank => bank.deleted_at === null));
            },

            addMalteseBank () {
                this.banks.malteseBanks.push({bank: null, currencies: []})
            },

            removeMalteseBank (index) {
                this.banks.malteseBanks.splice(index, 1)
            },

            addForeignBank() {
                this.banks.foreignBanks.push({
                    name: null,
                    country: '',
                    currencies: []
                })
            },

            removeForeignBank(index) {
                this.banks.foreignBanks.splice(index, 1);
            }
        },
        
        computed: {
            ...mapGetters({
                countries: 'settings/countries',
                currencies: 'settings/currencies'
            }),
        },

        components: {QuestionsList, QuestionsCreate}
    }
</script>