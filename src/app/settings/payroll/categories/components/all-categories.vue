<template>
    <v-card>
        <v-card-title>
            <h2>Payroll categories</h2>
        </v-card-title>
        <v-card-text>
            <v-layout row wrap>
                <template v-for="category in categories">
                    <v-flex xs6 px-2 mb-3>
                        <crud-table
                                :category="category"
                                @add="addCategory"
                                @edit="editCategory"
                                @destroy="destroyCategory"
                        ></crud-table>
                    </v-flex>
                </template>
                <form-popup
                        v-if="showForm"
                        :showForm="showForm"
                        :category="category"
                        :item="item"
                        @saveCategory="saveCategory"
                        @updateCategory="updateCategory"
                        @closeDialog="showForm = false"
                ></form-popup>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    import CrudTable from "./layouts/crud-table";
    import * as service from "../service";
    import FormPopup from "./layouts/form";

    export default {
        components: {
            FormPopup,
            CrudTable
        },
        data: () => ({
                showForm: false,
                category: null,
                item: null,
                categories: [
                    {
                        name: 'Income tax categories',
                        route: 'incometax',
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            }
                        ],
                    },
                    {
                        name: 'Social Security contributions categories',
                        route: 'contribution',
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            }
                        ],
                    },
                    {
                        name: 'Employment Status',
                        route: 'employmentstatus',
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            }
                        ],
                    },
                    {
                        name: 'Type of contract',
                        route: 'typecontract',
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            }
                        ],
                    },
                    {
                        name: 'Leave categories',
                        route: 'leavecategories',
                        fake: true,
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            },
                            {
                                name: 'days limit',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Days limit required',
                                ]
                            }
                        ],
                    },
                    {
                        name: 'Overtime categories',
                        route: 'overtimecategories',
                        fake: true,
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            },
                            {
                                name: 'rate',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Rate is required',
                                ],
                                type: 'number'
                            }
                        ],
                    },
                    {
                        name: 'Fringe benefit categories',
                        route: 'fringebenefitcategories',
                        fake: true,
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            }
                        ],
                    },
                    {
                        name: 'Public holidays',
                        route: 'publicholidays',
                        fake: true,
                        items: [],
                        fields: [
                            {
                                name: 'id',
                                value: '',
                                display: false,
                                rules: null
                            },
                            {
                                name: 'date',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Date is required',
                                ],
                                type: 'date'
                            },
                            {
                                name: 'name',
                                value: '',
                                display: true,
                                rules: [
                                    v => !!v || 'Name is required',
                                ]
                            }
                        ],
                    },

                ],
            }
        ),
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.categories.forEach(category => {
                    if (category.fake) {
                        service.readFake(category.route)
                            .then(response => category.items = response)
                    } else {
                        service.read(category.route)
                            .then(response => category.items = response.data)
                    }
                })
            },
            saveCategory(fields, category) {
                this.showForm = false
                let item = {}
                fields.forEach(el => item[el.name] = el.value)
                if (category.fake) {
                    service.createFake(category.route, item)
                        .then(response => {
                            item = response
                            category.items.push(item)
                        });
                } else {
                    service.create(category.route, item)
                        .then(response => {
                            if (response.message === 'saved') {
                                item.id = response.data
                                category.items.push(item)
                            }
                        });
                }
            },
            updateCategory(fields, category) {
                this.showForm = false
                let item = {}
                fields.forEach(el => item[el.name] = el.value)
                if(category.fake) {
                    service.updateFake(category.route, item)
                        .then(() => {
                            let index = category.items.findIndex(obj => obj.id === item.id);
                            let updateItem = category.items[index]
                            Object.keys(updateItem)
                                .forEach(key => updateItem[key] = item[key])
                        })
                } else {
                    service.update(category.route, item)
                        .then(response => {
                            if (response.message === 'edited') {
                                let index = category.items.findIndex(obj => obj.id === item.id);
                                let updateItem = category.items[index]
                                Object.keys(updateItem)
                                    .forEach(key => updateItem[key] = item[key])
                            }
                        })
                }
            },
            destroyCategory(category, item) {
                if(category.fake) {
                    service.destroyFake(category.route, item)
                        .then(() => {
                            let index = category.items.findIndex(obj => obj.id === item.id);
                            category.items.splice(index, 1)
                        })
                } else {
                    service.destroy(category.route, item)
                        .then(response => {
                            if (response.message === 'deleted') {
                                let index = category.items.indexOf(item)
                                category.items.splice(index, 1)
                            }
                        });
                }
            },
            addCategory(category) {
                this.category = category;
                this.item = []
                category.fields.forEach(field => {
                    field.value = ""
                    this.item.push(field)
                })
                this.showForm = true
            },
            editCategory(category, item) {
                this.category = category;
                this.item = category.fields
                this.item.forEach(el => el.value = item[el.name])
                this.showForm = true;
            }
        },
    }
</script>