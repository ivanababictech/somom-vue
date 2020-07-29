<template>
    <v-layout>
        <v-flex xs12>

            <v-card class="grey lighten-4 elevation-0 mb-3">

                <v-card-title primary-title>
                    <div class="headline">Company Details</div>
                </v-card-title>

                <v-card-text>

                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                    label="Company Name"
                                    v-model="companyName"
                                    required
                                    @input="$v.company.company_name.$touch()"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs6>
                            <v-text-field
                                    label="Registration Number"
                                    v-model="companyRegNo"
                                    required
                                    @input="$v.company.company_reg_no.$touch()"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <label>Authorised share capital</label>
                    <v-layout row>
                        <v-flex xs4>
                            <v-text-field
                                    label="Number of shares"
                                    v-model="companySharesCount"
                                    type="number"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Type of shares"
                                    v-model="companySharesType"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Class of shares"
                                    v-model="companySharesClass"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field
                                    label="Value per shares"
                                    v-model="companyShareValue"
                                    type="number"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <label>Bankers</label>
                    <v-autocomplete
                            label="Select bankers"
                            :items="bankers"
                            v-model="companyBankers"
                            item-text="banker_name"
                            item-value="banker_id"
                            max-height="auto"
                            multiple
                            chips
                            return-object
                    >
                        <template slot="selection" slot-scope="data">
                            <v-chip
                                    close
                                    @input="data.parent.selectItem(data.item)"
                                    @click.native.stop
                                    class="chip--select-multi"
                                    :key="data.item.banker_id"
                            >
                                {{ data.item.banker_name }}
                            </v-chip>
                        </template>
                        <template slot="item" slot-scope="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                            </template>
                            <template v-else>
                                <v-list-tile-content v-text="data.item.banker_name"></v-list-tile-content>
                            </template>
                        </template>
                    </v-autocomplete>

                    <label>Address</label>
                    <v-layout row>
                        <v-flex xs5>
                            <v-text-field
                                    label="Address 1"
                                    v-model="companyAddress1"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                            <v-text-field
                                    label="Address 2"
                                    v-model="companyAddress2"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs2>
                            <v-text-field
                                    label="City"
                                    v-model="companyCity"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                </v-card-text>

                <!-- <v-card-text>

                  <v-layout row>
                    <v-flex xs4>
                      <label>Company Name</label>
                      <v-text-field
                        v-model="company.company_name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs8>
                      <label>Authorised share capital</label>
                      <v-layout row>
                        <v-flex xs4>
                          <v-text-field
                            label="Number of shares"
                            v-model="company.shares_count"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field
                            label="Type of shares"
                            v-model="company.shares_type"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field
                            label="Class of shares"
                            v-model="company.shares_class"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs4>
                          <v-text-field
                            label="Value per shares"
                            v-model="company.share_value"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs4>
                      <label>Company registered address</label>
                      <v-text-field
                        label="Address 1"
                        v-model="company.company_address_1"
                      ></v-text-field>
                      <v-text-field
                        label="Address 2"
                        v-model="company.company_address_2"
                      ></v-text-field>
                      <v-text-field
                        label="City"
                        v-model="company.company_city"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs8>
                      <label>Bankers</label>
                      <v-select
                        label="Select bankers"
                        :items="bankers"
                        v-model="company.bankers"
                        item-text="banker_name"
                        item-value="banker_id"
                        max-height="auto"
                        multiple
                        chips
                        autocomplete
                        return-object
                      >
                        <template slot="selection" slot-scope="data">
                          <v-chip
                            close
                            @input="data.parent.selectItem(data.item)"
                            @click.native.stop
                            class="chip--select-multi"
                            :key="data.item.banker_id"
                          >
                            {{ data.item.banker_name }}
                          </v-chip>
                        </template>
                        <template slot="item" slot-scope="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-tile-content v-text="data.item"></v-list-tile-content>
                          </template>
                          <template v-else>
                            <v-list-tile-content v-text="data.item.banker_name"></v-list-tile-content>
                          </template>
                        </template>
                      </v-select>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs4>
                      <label>Company registration number</label>
                      <v-text-field
                        v-model="company.company_reg_no"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                </v-card-text> -->

                <v-card-title primary-title>
                    <div class="headline">Directorship</div>
                </v-card-title>

                <v-card-text>

                    <label>Corporate directors</label>

                    <v-layout row>
                        <v-flex sx11>
                            <v-layout row wrap v-for="(director, index) in directors('Corporate')" :key="index">

                                <v-flex xs6>
                                    <v-text-field
                                            label="Company name"
                                            :value="director.com_name"
                                            @input="updateDirector({field: 'com_name', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                            label="Reg number"
                                            :value="director.reg_no"
                                            @input="updateDirector({field: 'reg_no', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs3>
                                    <v-text-field
                                            label="Individual name"
                                            :value="director.name"
                                            @input="updateDirector({field: 'name', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs3>
                                    <v-radio-group
                                            :input-value="director.sex"
                                            @change="updateDirector({field: 'sex', id: director.director_id, value: $event })"
                                            row hide-details>
                                        <v-radio label="Female" value="Female"></v-radio>
                                        <v-radio label="Male" value="Male"></v-radio>
                                    </v-radio-group>
                                </v-flex>

                                <v-flex xs3>
                                    <v-select
                                            label="ID Type"
                                            :items="id_types"
                                            :value="director.id_type"
                                            @change="updateDirector({field: 'id_type', id: director.director_id, value: $event })"
                                            single-line
                                    ></v-select>
                                </v-flex>

                                <v-flex xs3>
                                    <v-text-field
                                            :label="(director.id_type ? director.id_type + ' ' : '') + 'Number'"
                                            :value="director.id_number"
                                            @input="updateDirector({field: 'id_number', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                            label="Address"
                                            :value="director.address"
                                            @input="updateDirector({field: 'address', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                            label="Domicile"
                                            :value="director.domicile"
                                            @input="updateDirector({field: 'domicile', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                            </v-layout>
                        </v-flex>
                        <v-flex xs1>
                            <v-btn fab dark small color="primary" @click="addDirector('Corporate')">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                    <label>Individual directors</label>

                    <v-layout row>
                        <v-flex xs11>
                            <v-layout row wrap v-for="(director, index) in directors('Individual')" :key="index">
                                <v-flex xs3>
                                    <v-text-field
                                            label="Individual name"
                                            :value="director.name"
                                            @input="updateDirector({ field: 'name', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs3>
                                    <v-radio-group
                                            :input-value="director.sex"
                                            @change="updateDirector({field: 'sex', id: director.director_id, value: $event })"
                                            row hide-details>
                                        <v-radio label="Female" value="Female"></v-radio>
                                        <v-radio label="Male" value="Male"></v-radio>
                                    </v-radio-group>
                                </v-flex>

                                <v-flex xs3>
                                    <v-select
                                            label="ID Type"
                                            :items="id_types"
                                            :value="director.id_type"
                                            @change="updateDirector({field: 'id_type', id: director.director_id, value: $event })"
                                            single-line
                                    ></v-select>
                                </v-flex>

                                <v-flex xs3>
                                    <v-text-field
                                            :label="(director.id_type ? director.id_type + ' ' : '') + 'Number'"
                                            :value="director.id_number"
                                            @input="updateDirector({field: 'id_number', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                            label="Address"
                                            :value="director.address"
                                            @input="updateDirector({field: 'address', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs6>
                                    <v-text-field
                                            label="Domicile"
                                            :value="director.domicile"
                                            @input="updateDirector({field: 'domicile', id: director.director_id, value: $event })"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs1>
                            <v-spacer></v-spacer>
                            <v-btn fab dark small color="primary" @click="addDirector('Individual')">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                </v-card-text>

                <v-card-title primary-title>
                    <div class="headline">Shareholders</div>
                </v-card-title>

                <v-card-text>

                    <label>Number of corporate shareholders</label>

                    <v-layout row>
                        <v-flex xs11>
                            <v-layout row v-for="(shareholder, index) in shareholders('Corporate')" :key="index">
                                <v-flex xs12>
                                    <v-layout row>
                                        <v-flex xs2>
                                            <v-text-field
                                                    label="Company name"
                                                    :value="shareholder.com_name"
                                                    @input="updateShareholder({field: 'com_name', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-text-field
                                                    label="Reg number"
                                                    :value="shareholder.reg_no"
                                                    @input="updateShareholder({field: 'reg_no', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field
                                                    label="Address"
                                                    :value="shareholder.address"
                                                    @input="updateShareholder({field: 'address', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-text-field
                                                    label="Domicile"
                                                    :value="shareholder.domicile"
                                                    @input="updateShareholder({field: 'domicile', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>

                                    <label>Issued share capital</label>

                                    <v-layout row>
                                        <v-flex xs11>
                                            <v-layout row v-for="(share,index) in shareholder.issued_share_capitals"
                                                      :key="index">
                                                <v-flex xs2>
                                                    <v-text-field
                                                            label="Number of shares"
                                                            :value="share.count"
                                                            @input="updateIssuedShareCapital({field: 'count', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs3>
                                                    <v-text-field
                                                            label="Type of shares"
                                                            :value="share.type"
                                                            @input="updateIssuedShareCapital({field: 'type', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs3>
                                                    <v-text-field
                                                            label="Class of shares"
                                                            :value="share.class"
                                                            @input="updateIssuedShareCapital({field: 'class', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2>
                                                    <v-text-field
                                                            label="Value per shares"
                                                            :value="share.value"
                                                            @input="updateIssuedShareCapital({field: 'value', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2>
                                                    <v-text-field
                                                            label="% paid up"
                                                            :value="share.paid"
                                                            @input="updateIssuedShareCapital({field: 'paid', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-btn fab dark small color="primary"
                                                   @click="addIssuedShareCapital(shareholder.shareholder_id)">
                                                <v-icon dark>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs1>
                            <v-btn fab dark small color="primary" @click="addShareholder('Corporate')">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                    <v-divider class="mb-4"></v-divider>

                    <label>Number of individual shareholders</label>

                    <v-layout row>
                        <v-flex xs11>
                            <v-layout row v-for="(shareholder, index) in shareholders('Individual')" :key="index">
                                <v-flex xs12>
                                    <v-layout row>
                                        <v-flex xs2>
                                            <v-text-field
                                                    label="Person name"
                                                    :value="shareholder.name"
                                                    @input="updateShareholder({field: 'name', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-text-field
                                                    label="ID / Passport"
                                                    :value="shareholder.id_number"
                                                    @input="updateShareholder({field: 'id_number', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs6>
                                            <v-text-field
                                                    label="Address"
                                                    :value="shareholder.address"
                                                    @input="updateShareholder({field: 'address', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs2>
                                            <v-text-field
                                                    label="Nationality"
                                                    :value="shareholder.nationality"
                                                    @input="updateShareholder({field: 'nationality', id: shareholder.shareholder_id, value: $event })"
                                            ></v-text-field>
                                        </v-flex>
                                    </v-layout>

                                    <label>Issued share capital</label>

                                    <v-layout row>
                                        <v-flex xs11>
                                            <v-layout row v-for="(share,index) in shareholder.issued_share_capitals"
                                                      :key="index">
                                                <v-flex xs2>
                                                    <v-text-field
                                                            label="Number of shares"
                                                            :value="share.count"
                                                            @input="updateIssuedShareCapital({field: 'count', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs3>
                                                    <v-text-field
                                                            label="Type of shares"
                                                            :value="share.type"
                                                            @input="updateIssuedShareCapital({field: 'type', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs3>
                                                    <v-text-field
                                                            label="Class of shares"
                                                            :value="share.class"
                                                            @input="updateIssuedShareCapital({field: 'class', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2>
                                                    <v-text-field
                                                            label="Value per shares"
                                                            :value="share.value"
                                                            @input="updateIssuedShareCapital({field: 'value', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                                <v-flex xs2>
                                                    <v-text-field
                                                            label="% paid up"
                                                            :value="share.paid"
                                                            @input="updateIssuedShareCapital({field: 'paid', id: shareholder.shareholder_id, key: index, value: $event })"
                                                    ></v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-btn fab dark small color="primary"
                                                   @click="addIssuedShareCapital(shareholder.shareholder_id)">
                                                <v-icon dark>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs1>
                            <v-btn fab dark small color="primary" @click="addShareholder('Individual')">
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>

                </v-card-text>

                <v-card-title primary-title>
                    <div class="headline">Audit Details</div>
                </v-card-title>

                <v-card-text>
                    <v-layout row>
                        <v-flex xs6>
                            <v-select
                                    label="Auditor"
                                    :items="auditors"
                                    v-model="auditor"
                                    item-text="auditor_name"
                                    item-value="auditor_id"
                                    single-line
                                    return-object
                            ></v-select>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Audit fee"
                                    v-model="auditFee"
                                    type="number"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="relative">
                        <v-flex xs12>
                            <v-layout row v-for="(employee,index) in employees" :key="index">
                                <v-flex xs6>
                                    <v-text-field
                                            label="Audit employee"
                                            :value="employee.employee_name"
                                            @input="updateEmployee({ field: 'employee_name', key: index, value: $event })"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs2>
                                    <v-select
                                            label="Other fees"
                                            :items="other_fees"
                                            :value="employee.fee_type"
                                            @input="updateEmployee({ field: 'fee_type', key: index, value: $event })"
                                            single-line
                                    ></v-select>
                                </v-flex>
                                <v-flex xs3>
                                    <v-text-field
                                            :label="employee.fee_type ? employee.fee_type + ' Fee' : 'Fee'"
                                            :value="employee.employee_fee"
                                            @input="updateEmployee({ field: 'employee_fee', key: index, value: $event })"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-btn fab dark small color="primary" absolute top right class="mt-4" @click="addEmployee">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs6>
                            <v-layout row>
                                <v-flex xs9>
                                    <v-text-field
                                            label="Previous year"
                                            v-model="prevYear"
                                            type="number"
                                            :disabled="prev_year_not_aplicable"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs3>
                                    <v-checkbox
                                            label="Not aplicable"
                                            v-model="prev_year_not_aplicable"
                                            light
                                            @change="prevYear = null"
                                    ></v-checkbox>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Current year"
                                    v-model="year"
                                    type="number"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs6>
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="com_start_date_open"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-left="40"
                                    max-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Company period start date"
                                        v-model="comStartDate"
                                        prepend-icon="event"
                                ></v-text-field>
                                <v-date-picker v-model="comStartDate" no-title scrollable actions>
                                    <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-btn flat color="primary" @click="cancel()">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save()">Save</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs6>
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="com_end_date_open"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-left="40"
                                    max-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Company period end date"
                                        v-model="comEndDate"
                                        prepend-icon="event"
                                ></v-text-field>
                                <v-date-picker v-model="comEndDate" no-title scrollable actions>
                                    <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-btn flat color="primary" @click="cancel()">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save()">Save</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs6>
                            <v-menu
                                    lazy
                                    :close-on-content-click="false"
                                    v-model="audit_start_date_open"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    :nudge-left="40"
                                    max-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        label="Audit start date"
                                        v-model="startDate"
                                        prepend-icon="event"
                                ></v-text-field>
                                <v-date-picker v-model="startDate" no-title scrollable actions>
                                    <template slot-scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-btn flat color="primary" @click="cancel()">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save()">Save</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs6>
                            <v-text-field
                                    label="Company trading activity"
                                    v-model="comTradingActivity"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <!-- <v-flex xs4>
                          <v-select
                            label="Audit framework"
                            :items="audit_frameworks"
                            v-model="audit_details.framework"
                            single-line
                            bottom
                          ></v-select>
                        </v-flex> -->
                        <v-flex xs3>
                            <v-select
                                    label="Currency"
                                    :items="currencies"
                                    v-model="currency"
                                    single-line
                                    bottom
                            ></v-select>
                        </v-flex>
                    </v-layout>

                    <!--
                    <v-layout row>
                      <v-flex xs4>
                        <v-select
                          label="Companies act"
                          :items="companies_acts"
                          v-model="audit_details.companies_act"
                          single-line
                          bottom
                        ></v-select>
                      </v-flex>
                      <v-flex xs4 offset-xs2>
                        <label>Was there a change of auditor for this year's audit?</label>

                        <v-radio-group v-model="changed_auditor" :mandatory="false" row hide-details>
                          <v-radio label="Yes" value="Yes"></v-radio>
                          <v-radio label="No" value="No"></v-radio>
                        </v-radio-group>

                        <div v-if="changed_auditor == 'Yes'">
                          <v-text-field
                            label="Previuos auditor name"
                          ></v-text-field>
                          <v-menu
                            lazy
                            :close-on-content-click="false"
                            v-model="auditor_date_change_open"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-left="40"
                            max-width="290px"
                          >
                            <v-text-field
                              slot="activator"
                              label="Effective date of change"
                              v-model="audit_details.auditor_change_date"
                              prepend-icon="event"
                              readonly
                            ></v-text-field>
                            <v-date-picker v-model="audit_details.auditor_change_date" no-title scrollable actions>
                              <template slot-scope="{ save, cancel }">
                                <v-card-actions>
                                  <v-btn flat color="primary" @click.native="cancel()">Cancel</v-btn>
                                  <v-btn flat color="primary" @click.native="save()">Save</v-btn>
                                </v-card-actions>
                              </template>
                            </v-date-picker>
                          </v-menu>
                        </div>
                      </v-flex>
                    </v-layout>
                    -->

                </v-card-text>

            </v-card>

            <v-btn color="primary" @click="save">Save</v-btn>
            <v-btn color="primary" @click="changeStep('2')">Continue</v-btn>
            <v-btn flat to="/audit">Cancel</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import { http } from '@/plugins/http/index';
    import {mapGetters, mapActions, mapMutations} from 'vuex';
    import {required} from 'vuelidate/lib/validators';
    import _ from 'lodash';
    import {deepCloneKeys} from '@/util';

    export default {
        data: () => ({
            // init data
            auditors: [],
            bankers: [],
            currencies: [],

            // selectors arrays
            id_types: [
                'ID Card',
                'Passport'
            ],
            other_fees: [
                'Tax Return'
            ],

            // open/close flags for date pickers
            com_start_date_open: null,
            com_end_date_open: null,
            audit_start_date_open: null,
            auditor_date_change_open: null,

            // yes/no flags for checkboxes
            changed_auditor: 'No',
            prev_year_not_aplicable: false
        }),

        validations: {
            company: {
                company_name: {
                    required
                },
                company_reg_no: {
                    required
                }
            }
        },

        computed: {
            ...mapGetters({
                directors: 'audit/company/directors',
                shareholders: 'audit/company/shareholders',
            }),

            auditor: {
                get() {
                    return this.$store.getters['audit/auditor'];
                },
                set(auditor) {
                    this.$store.commit('audit/auditor', auditor);
                }
            },
            auditFee: {
                get() {
                    return this.$store.getters['audit/fee'];
                },
                set(fee) {
                    this.$store.commit('audit/fee', fee);
                }
            },
            employees: {
                get() {
                    return this.$store.getters['audit/employees'];
                },
                set(employees) {
                    this.$store.commit('audit/employees', employees);
                }
            },
            prevYear: {
                get() {
                    return this.$store.getters['audit/prevYear'];
                },
                set(prevYear) {
                    this.$store.commit('audit/prevYear', prevYear);
                }
            },
            year: {
                get() {
                    return this.$store.getters['audit/year'];
                },
                set(year) {
                    this.$store.commit('audit/year', year);
                }
            },
            comStartDate: {
                get() {
                    return this.$store.getters['audit/comStartDate'];
                },
                set(date) {
                    this.$store.commit('audit/comStartDate', date);
                }
            },
            comEndDate: {
                get() {
                    return this.$store.getters['audit/comEndDate'];
                },
                set(date) {
                    this.$store.commit('audit/comEndDate', date);
                }
            },
            startDate: {
                get() {
                    return this.$store.getters['audit/startDate'];
                },
                set(date) {
                    this.$store.commit('audit/startDate', date);
                }
            },
            comTradingActivity: {
                get() {
                    return this.$store.getters['audit/comTradingActivity'];
                },
                set(activity) {
                    this.$store.commit('audit/comTradingActivity', activity);
                }
            },
            currency: {
                get() {
                    return this.$store.getters['audit/currency'];
                },
                set(currency) {
                    this.$store.commit('audit/currency', currency);
                }
            },

            // Company
            company: {
                get() {
                    return this.$store.getters['audit/company'];
                },
                set(company) {
                    this.$store.commit('audit/company', company);
                }
            },
            companyName: {
                get() {
                    return this.$store.getters['audit/company/name'];
                },
                set(company_name) {
                    this.$store.commit('audit/company/name', company_name);
                }
            },
            companyRegNo: {
                get() {
                    return this.$store.getters['audit/company/regNo'];
                },
                set(reg_no) {
                    this.$store.commit('audit/company/regNo', reg_no);
                }
            },
            companySharesCount: {
                get() {
                    return this.$store.getters['audit/company/sharesCount'];
                },
                set(shares_count) {
                    this.$store.commit('audit/company/sharesCount', shares_count);
                }
            },
            companySharesType: {
                get() {
                    return this.$store.getters['audit/company/sharesType'];
                },
                set(shares_type) {
                    this.$store.commit('audit/company/sharesType', shares_type);
                }
            },
            companySharesClass: {
                get() {
                    return this.$store.getters['audit/company/sharesClass'];
                },
                set(shares_class) {
                    this.$store.commit('audit/company/sharesClass', shares_class);
                }
            },
            companyShareValue: {
                get() {
                    return this.$store.getters['audit/company/shareValue'];
                },
                set(share_value) {
                    this.$store.commit('audit/company/shareValue', share_value);
                }
            },
            companyAddress1: {
                get() {
                    return this.$store.getters['audit/company/address1'];
                },
                set(address1) {
                    this.$store.commit('audit/company/address1', address1);
                }
            },
            companyAddress2: {
                get() {
                    return this.$store.getters['audit/company/address2'];
                },
                set(address2) {
                    this.$store.commit('audit/company/address2', address2);
                }
            },
            companyCity: {
                get() {
                    return this.$store.getters['audit/company/city'];
                },
                set(city) {
                    this.$store.commit('audit/company/city', city);
                }
            },
            companyBankers: {
                get() {
                    return this.$store.getters['audit/company/bankers'];
                },
                set(bankers) {
                    this.$store.commit('audit/company/bankers', bankers);
                }
            }
        },

        methods: {
            ...mapActions({
                save: 'audit/save',
            }),
            ...mapMutations({
                changeStep: 'audit/changeStep',
                addEmployee: 'audit/addEmployee',
                updateEmployee: 'audit/updateEmployee',
                addDirector: 'audit/company/addDirector',
                updateDirector: 'audit/company/updateDirector',
                addShareholder: 'audit/company/addShareholder',
                updateShareholder: 'audit/company/updateShareholder',
                updateIssuedShareCapital: 'audit/company/updateIssuedShareCapital',
                addIssuedShareCapital: 'audit/company/addIssuedShareCapital'
            }),
        },

        created() {
            http.get('audit/company-details')
                .then(({data}) => {
                    if (data.success) {
                        this.auditors = data.auditors
                        this.bankers = data.bankers
                        this.currencies = data.currencies
                    }
                })
        }

    }
</script>
