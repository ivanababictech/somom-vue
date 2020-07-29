<template>
    <v-form ref="form">
        <v-container>
            <v-layout row wrap align-center>
                <v-flex md4 xs6>
                    <v-text-field
                            v-model="currentEmployee.firstName"
                            label="First Name"
                    ></v-text-field>
                </v-flex>
                <v-flex md4 xs6>
                    <v-text-field
                            v-model="currentEmployee.lastName"
                            label="Last Name"
                    ></v-text-field>
                </v-flex>
                <v-flex md4 xs5>
                    <v-text-field
                            v-model="currentEmployee.dob"
                            label="Date of birthday"
                            mask="##/##/####"
                            hint="For example, 04/11/1989"
                            :return-masked-value="true"
                            persistent-hint
                    ></v-text-field>
                </v-flex>
                <v-flex md4 xs5>
                    <v-autocomplete
                            :items="nationalities"
                            v-model="currentEmployee.nationality"
                            label="Select nationality"
                    ></v-autocomplete>
                </v-flex>
                <v-flex md1 xs2 text-xs-center>
                    <v-btn-toggle v-model="currentEmployee.loans">
                        <v-btn flat :value="true">
                            <span>M</span>
                        </v-btn>
                        <v-btn flat :value="false">
                            <span>F</span>
                        </v-btn>
                    </v-btn-toggle>
                </v-flex>
                <v-flex md3 xs6>
                    <v-select
                            :items="identificationTypes"
                            v-model="currentEmployee.identificationType"
                            label="Select"
                    ></v-select>
                </v-flex>
                <v-flex md4 xs6>
                    <v-text-field
                            v-model="currentEmployee.identificationNumber"
                            label="Identification number"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <label>ADDRESS DETAILS</label>

            <v-layout row wrap>
                <v-flex xs4>
                    <v-text-field
                            v-model="currentEmployee.buildingNumber"
                            label="Building number"
                    ></v-text-field>
                </v-flex>
                <v-flex xs8>
                    <v-text-field
                            v-model="currentEmployee.street"
                            label="Street name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                            v-model="currentEmployee.town"
                            label="Town"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                            v-model="currentEmployee.postcode"
                            label="Post code"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <countries v-model="currentEmployee.country" label="Select Country"></countries>
                </v-flex>
            </v-layout>

            <label>LOGIN DETAILS</label>

            <v-layout row>
                <v-flex xs7>
                    <phone-number :object="currentEmployee"></phone-number>
                </v-flex>
                <v-flex xs5>
                    <v-text-field
                            v-model="currentEmployee.email"
                            label="email address"
                    ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs4>
                    <v-text-field
                            label="National Insurance no."
                            v-model="currentEmployee.national_insurance_no">
                    </v-text-field>
                </v-flex>
                <v-flex xs4 px-2>
                    <v-text-field
                            label="Income tax reg.no."
                            v-model="currentEmployee.income_tax_reg_no">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-select label="Income tax category"
                              :items="incomeTaxCategoriesList"
                              v-model="currentEmployee.income_tax_category_id"
                              :rules="incomeTaxCategoryRules"
                              item-value="id"
                              item-text="name">
                    </v-select>
                </v-flex>
                <v-flex xs4 px-2>
                    <v-select label="Social security category"
                              :items="socialSecurityCategoriesList"
                              v-model="currentEmployee.social_security_contrib_cat_id"
                              :rules="socialSecurityCategoryRules"
                              item-value="id"
                              item-text="name">
                    </v-select>
                </v-flex>
                <v-spacer/>
            </v-layout>
            <v-layout row wrap v-if="[2, 8].indexOf(currentEmployee.income_tax_category_id) > -1">
                <template v-if="currentEmployee.income_tax_category_id === 2">
                    <v-flex xs4>
                        <v-text-field
                                label="Name of spouse"
                                v-model="currentEmployee.name_of_spouse"
                                :rules="nameRules">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field
                                v-if="currentEmployee.income_tax_category_id === 2"
                                type="date"
                                label="Date of marriage"
                                v-model="currentEmployee.date_of_marriage"
                                :rules="dateOfMarriage">
                        </v-text-field>
                    </v-flex>
                </template>
                <v-flex xs4 v-else-if="currentEmployee.income_tax_category_id === 8">
                    <v-text-field
                            type="date"
                            label="Date of arrival in Malta"
                            v-model="currentEmployee.date_of_arrive"
                            :rules="dateOfArrivalRules">
                    </v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout row wrap>
                <v-flex xs4 px-2>
                    <v-text-field type="date"
                                  label="Employment start date"
                                  v-model="currentEmployee.employment_start_date"
                                  :rules="startDateRules">
                    </v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-select label="Type of contract"
                              :items="typeOfContractList"
                              v-model="currentEmployee.type_of_contract_id"
                              :rules="typeOfContractRules"
                              item-value="id"
                              item-text="name">
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4 v-if="currentEmployee.type_of_contract_id === 2">
                    <v-select label="Duration of contract"
                              :items="durationOfContractsList"
                              v-model="currentEmployee.duration_of_contract"
                              :rules="durationOfContractRules">
                    </v-select>
                </v-flex>
                <v-flex xs4 px-2>
                    <v-select label="Employment Status"
                              :items="employmentStatusList"
                              v-model="currentEmployee.employment_status_id"
                              :rules="employmentStatusRules"
                              item-value="id"
                              item-text="name">
                    </v-select>
                </v-flex>
                <v-flex xs4>
                    <v-select label="Probation period"
                              :items="probationPeriodsList"
                              v-model="currentEmployee.probation_period">
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-text-field label="Job title"
                                  v-model="currentEmployee.job_title"
                                  :rules="jobTitleRules">
                    </v-text-field>
                </v-flex>
                <v-flex xs4 px-2>
                    <v-select label="Department"
                              :items="departmentsList"
                              v-model="currentEmployee.department_id"
                              item-value="id"
                              item-text="name">
                    </v-select>
                </v-flex>
                <v-flex xs4>
                    <v-text-field type="number"
                                  label="Hourly gross basic salary"
                                  v-model="currentEmployee.hourly_gross_basic_salary"
                                  :rules="hourlyGrossBasicSalaryRules">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs6 pr-1>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-layout row wrap v-for="(preTax, i) in preTaxes" :key="i">
                                <v-flex xs7>
                                    <v-select
                                            label="Default pre-tax monthly allowances"
                                            :items="defaultPreTaxAllowancesList"
                                            v-model="preTax.pre_tax_allowance_id"
                                            item-value="id"
                                            item-text="name"
                                    />
                                </v-flex>
                                <v-flex xs2 px-2>
                                    <v-text-field
                                            type="number"
                                            placeholder="0"
                                            v-model="preTax.value"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="align-content-and justify-center">
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-btn
                                                    dark
                                                    color="primary"
                                                    small
                                                    fab
                                                    @click="addPreTaxItem"
                                                    v-if="i === preTaxes.length - 1"
                                            >
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-btn
                                                    dark
                                                    color="danger"
                                                    small
                                                    fab
                                                    @click="removePreTaxItem(i)"
                                                    v-if="preTaxes.length > 1"
                                            >
                                                <v-icon>remove</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6 pl-1>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-layout row wrap v-for="(postTax, i) in postTaxes" :key="i">
                                <v-flex xs7>
                                    <v-select
                                            label="Default pre-tax monthly allowances"
                                            :items="defaultPostTaxAllowancesList"
                                            v-model="postTax.post_tax_allowance_id"
                                            item-value="id"
                                            item-text="name"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs2 px-2>
                                    <v-text-field
                                            type="number"
                                            placeholder="0"
                                            v-model="postTax.value"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2 class="align-content-and justify-center">
                                    <v-layout>
                                        <v-flex xs6>
                                            <v-btn
                                                    dark
                                                    color="primary"
                                                    small
                                                    fab
                                                    @click="addPostTaxItem"
                                                    v-if="i === postTaxes.length - 1"
                                            >
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-btn
                                                    dark
                                                    color="danger"
                                                    small
                                                    fab
                                                    @click="removePostTaxItem(i)"
                                                    v-if="postTaxes.length > 1"
                                            >
                                                <v-icon>remove</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs-12>
                    <v-layout row align-center wrap>
                        <v-flex xs-6>
                            <v-subheader class="px-0">Is there any income earned before the first payroll period?
                            </v-subheader>
                        </v-flex>
                        <v-flex xs6>
                            <v-radio-group
                                    v-model="currentEmployee.is_income_earned"
                                    row
                                    :rules="isIncomeEarnedBeforeRules"
                            >
                                <v-radio label="Yes" :value=1></v-radio>
                                <v-radio label="No" :value=0></v-radio>
                            </v-radio-group>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <template v-if="currentEmployee.is_income_earned === 1">
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-text-field type="number"
                                      v-model="currentEmployee.gross_salary_earned"
                                      label="Gross Salary earned"
                                      :rules="grossSalaryEarnedRules">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs4 px-2>
                        <v-text-field type="number"
                                      v-model="currentEmployee.income_tax_paid"
                                      label="Income tax paid"
                                      :rules="incomeTaxPaidRules">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field type="number"
                                      v-model="currentEmployee.social_security_paid"
                                      label="Social security paid"
                                      :rules="socialSecurityPaidRules">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs4>
                        <v-text-field
                                type="number"
                                v-model="currentEmployee.maternity_leave_paid"
                                label="Maternity leave paid">
                        </v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                </v-layout>
            </template>
            <v-layout row>
                <v-flex xs4>
                    <v-text-field
                            type="email"
                            v-model="currentEmployee.email"
                            label="Email">
                    </v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-layout>
        </v-container>
        <v-layout row justify-end>
            <v-spacer></v-spacer>
            <v-dialog
                    v-model="dialog"
                    fullscreen
            >
                <v-btn color="primary" slot="activator">FS4</v-btn>
                <v-card>
                    <v-card-title class="grey lighten-4">
                        <span class="title">FS4</span>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="print = !print">Create PDF</v-btn>
                        <v-icon @click="dialog = false">close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <fs4 :print="print"></fs4>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-btn color="primary" @click="save">{{buttonText}}</v-btn>
            <v-btn color="primary" @click="cancel" flat>Cancel</v-btn>
            <v-btn flat @click="clear">Clear</v-btn>
        </v-layout>
    </v-form>
</template>

<script>
    import * as service from "./service";
    import Nationalities from '@/plugins/nationalities'
    import PhoneNumber from '@/components/phone-number'
    import Fs4 from '../goverment_reporting/FS4.vue'

    export default {
        props: ['employee', 'buttonText'],
        components: {
            PhoneNumber,
            Fs4
        },
        data: () => ({
                // Form lists
                dialog: false,
                print: false,
                identificationTypes: [
                    'Passport',
                    'ID card',
                    'Driving lisence'
                ],
                incomeTaxCategoriesList: [],
                socialSecurityCategoriesList: [],
                typeOfContractList: [],
                durationOfContractsList: [],
                employmentStatusList: [],
                probationPeriodsList: [],
                departmentsList: [],
                defaultPreTaxAllowancesList: [],
                defaultPostTaxAllowancesList: [],
                currentEmployee: null,
                preTaxes: [
                    {
                        id: null,
                        pre_tax_allowance_id: '',
                        value: ''
                    }
                ],
                postTaxes: [
                    {
                        id: null,
                        post_tax_allowance_id: '',
                        value: ''
                    }
                ],
                company_id: null,
                // validation rules
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 3) || 'Name must be more than 3 characters'
                ],
                idCardPassportRules: [
                    v => !!v || 'Id Card / Passport no. is required',
                    v => (v && v.length >= 5) || 'Id Card / Passport no. must be more than 5 characters'
                ],
                dateOfBirthRules: [
                    v => !!v || 'Date of birth is required',
                    v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date of Birth invalid date format'
                ],
                doorNameRules: [
                    v => !!v || 'Door name is required',
                    v => (v && v.length >= 3) || 'Door name must be more than 3 characters'
                ],
                streetNameRules: [
                    v => !!v || 'Street name is required',
                    v => (v && v.length >= 3) || 'Street name must be more than 3 characters'
                ],
                localityRules: [
                    v => !!v || 'Locality is required',
                    v => (v && v.length >= 3) || 'Locality must be more than 3 characters'
                ],
                dateOfMarriage: [
                    v => (!v || /^\d{4}-\d{2}-\d{2}$/.test(v)) || 'Date of Birth invalid date format'
                ],
                incomeTaxCategoryRules: [
                    v => !!v || 'Income tax category is required'
                ],
                socialSecurityCategoryRules: [
                    v => !!v || 'Social security category is required'
                ],
                dateOfArrivalRules: [
                    v => !!v || 'Date of arrival in Malta is required',
                    v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date of Birth invalid date format'
                ],
                startDateRules: [
                    v => !!v || 'Employment start date is required',
                    v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Date of Birth invalid date format'
                ],
                typeOfContractRules: [
                    v => !!v || 'Type of contract is required'
                ],
                durationOfContractRules: [
                    v => !!v || 'Duration of contract is required'
                ],
                employmentStatusRules: [
                    v => !!v || 'Employment Status is required'
                ],
                jobTitleRules: [
                    v => !!v || 'Job title is required',
                    v => (v && v.length >= 3) || 'Job title must be more than 3 characters'
                ],
                hourlyGrossBasicSalaryRules: [
                    v => !!v || 'Hourly gross basic salary is required',
                ],
                defaultPreTaxAllowanceRules: [
                    v => !!v || 'Default pre-tax monthly allowances is required',
                ],
                defaultPostTaxAllowanceRules: [
                    v => !!v || 'Default post-tax monthly allowances is required',
                ],
                isIncomeEarnedBeforeRules: [
                    v => (String(v) !== 'null') || 'Answer is required',
                    // v => () || 'Answer is required',
                ],
                grossSalaryEarnedRules: [
                    v => !!v || 'Gross Salary earned is required',
                ],
                incomeTaxPaidRules: [
                    v => !!v || 'Income tax paid is required',
                ],
                socialSecurityPaidRules: [
                    v => !!v || 'Social security paid is required',
                ],
                nationalities: Nationalities
            }
        ),
        created() {
            this.fetchData();
            this.currentEmployee.type_of_contract_id = 3
        },
        methods: {
            fetchData() {
                service.getOptions()
                    .then(response => {
                        this.incomeTaxCategoriesList = response.data.incomeTaxCategories;
                        this.socialSecurityCategoriesList = response.data.contributions;
                        this.typeOfContractList = response.data.typeContracts;
                        this.employmentStatusList = response.data.employmentStatus;
                        this.departmentsList = response.data.departments;
                        this.defaultPreTaxAllowancesList = response.data.preTaxAllowances;
                        this.defaultPostTaxAllowancesList = response.data.postTaxAllowances;
                        this.company_id = response.data.company_id;
                    });

                this.durationOfContractsList = service.getContractDurations();
                this.probationPeriodsList = service.getProbationPeriodsList();

                this.currentEmployee = this.employee;

                this.preTaxes = this.employee.employee_pre_taxes.length > 0 ? this.employee.employee_pre_taxes : this.preTaxes;
                this.postTaxes = this.employee.employee_post_taxes.length > 0 ? this.employee.employee_post_taxes : this.postTaxes;
            },
            addPreTaxItem() {
                this.preTaxes.push({
                    pre_tax_allowance_id: '',
                    value: ''
                })
            },
            removePreTaxItem(index) {
                this.postTax.splice(index, 1);
            },
            addPostTaxItem() {
                this.postTaxes.push({
                    post_tax_allowance_id: '',
                    value: ''
                })
            },
            removePostTaxItem(index) {
                this.postTaxes.splice(index, 1);
            },
            clear() {
                this.$refs.form.reset();
            },
            save() {
                if (this.$refs.form.validate()) {
                    this.currentEmployee.company_id = this.company_id;
                    this.$emit('submitted', this.currentEmployee);
                    this.$router.go(-1);
                }
            },
            cancel() {
                this.$router.go(-1);
                this.clear();
            }
        }
    }
</script>