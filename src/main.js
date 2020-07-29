// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
//import VueRx from 'vue-rx'
//import Rx from 'rxjs/Rx'
//import { Observable } from 'rxjs/Observable'
//import { Subscription } from 'rxjs/Subscription' // Disposable if using RxJS4
//import { Subject } from 'rxjs/Subject' // required for domStreams option

import Vuetify from 'vuetify'
//import ElementUI from 'element-ui'
import {Autocomplete, Input, InputNumber, Select, Table, TableColumn, Loading} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// Custom global components
import {
    AccountDialog,
    DonorDialog,
    CustomerDialog,
    SupplierDialog,
    DirectEntrySupplierDialog,
    ItemDialog,
    DatePicker,
} from './components/index'

import Vuelidate from 'vuelidate'

import AsyncComputed from 'vue-async-computed'

import Root from './Root'
import RoleMixin from '@/mixins/role'
import MixinsMixin from '@/mixins/mixins'
import FlagIcon from 'vue-flag-icon'
import Pagination from './components/pagination'
import Countries from './components/countries'
import Currencies from './components/currencies'
import ExportButton from '@/components/export-button'
import Google2fa from '@/components/google2fa'
import YesNo from '@/components/yes-no'
import VuetifyConfirm from 'vuetify-confirm'
import TextHighlight from 'vue-text-highlight';


import VueCountdown from '@xkeshi/vue-countdown'
import * as config from './config'

/**
 * This is the vuetify upload button
 */
import UploadButton from 'vuetify-upload-button';
/**
 * This is the Vuex store and it is
 * avaible to all your components
 */
import store from './store'

/**
 * This is the Router
 */
import router from './router/index'

/**
 * $http plugin based on axios
 */
import httpPlugin from './plugins/http'

/**
 * eventbus plugin
 */
import eventbus from './plugins/eventbus'

// custom helpers
import {Helpers} from './helpers'

/**
 * Other packages
 */
require('./includes')

/**
 * Include social authenticate
 */
require('./app/auth/authenticate')

// vue rxjs
//Vue.use(VueRx, Rx)
/*
 Vue.use(VueRx, {
 Observable,
 Subscription,
 Subject
 })
 */

/**
 * Make $http avaible to all components
 * Send store and router to httpPlugin (injection)
 */
Vue.use(httpPlugin, {store, router})

/**
 * Make $bus avaible to all components
 */
Vue.use(eventbus)

/**
 * Include Vue moment
 */
Vue.use(require('vue-moment'));

/**
 * Include spinner
 */
Vue.use(Loading.directive);

/**
 * Include flags of countries
 */
Vue.use(FlagIcon);

// Element UI components

// configure language
locale.use(lang)

//Vue.use(ElementUI)
Vue.use(Autocomplete)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(VuetifyConfirm, {
    buttonTrueText: 'OK',
    buttonFalseText: 'Oh, no',
    color: 'warning',
    icon: 'warning',
    title: 'Warning',
    width: 300,
    property: '$confirm'
})


// Vuetify
Vue.use(Vuetify, {
        theme: {
            primary: '#fb8c00',
            accent: '#ffeb3b',
            secondary: '#0c74bc',
            info: '#8eb4cb',
            warning: '#FFC107',
            error: '#f35b5b',
            success: '#69CCa2',
            danger: '#ff3d00'
        }
    }
)
// Vuetify uploadbutton
Vue.component('upload-btn', UploadButton)

// Custom global components
Vue.use(AccountDialog)
Vue.use(DonorDialog)
Vue.use(CustomerDialog)
Vue.use(SupplierDialog)
Vue.use(DirectEntrySupplierDialog)
Vue.use(ItemDialog)
Vue.use(DatePicker)

// Vuelidate
Vue.use(Vuelidate)

// Async computed
Vue.use(AsyncComputed)

// helpers plugin
Vue.use(Helpers)

/**
 * Inlude Spinner
 *
 * @type {(options: LoadingServiceOptions) => ElLoadingComponent}
 */
Vue.prototype.$loading = Loading.service;

Vue.component('pagination', Pagination)
Vue.component('VueCountdown', VueCountdown)
Vue.component('countries', Countries)
Vue.component('currencies', Currencies)
Vue.component('export-button', ExportButton)
Vue.component('google2fa', Google2fa)
Vue.component('yes-no', YesNo)
Vue.component('text-highlight', TextHighlight);

/**
 * Roles mixin
 */
Vue.mixin(RoleMixin)
Vue.mixin(MixinsMixin)

// Filters
Vue.filter('capitalize', (value) => {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('n', (no) => {
    return Number(no).toFixed(2)
})
Vue.filter('formatDate', (date) => {
    if (!date) {
        return null
    }
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
})
Vue.filter('parseDate', (date) => {
    if (!date) {
        return null
    }
    const [day, month, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
})
Vue.mixin({
    data() {
        return {
            styleObject: {
                color: 'white',
                opacity: 1
            }
        }
    },

    methods: {
        /**
         * Number.prototype.format(n, x, s, c)
         *
         * @param integer n: length of decimal
         * @param integer x: length of whole part
         * @param mixed   s: sections delimiter
         * @param mixed   c: decimal delimiter
         */
        formatMoney(money, n = 2, x, s = ',', c) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = (money / config.moneyAccuracy).toFixed(Math.max(0, ~~n));

            let result = (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + s)

            if (s == '') {
                return result.replace(/\.00$/,'');
            }

            return result;
        },

        /**
         * Format number to Integer
         *
         * @param money
         * @returns {string}
         */
        formatToInteger(money) {
            return money * config.moneyAccuracy
        },

        /**
         * Reset money
         *
         * @param value
         * @returns {*}
         */
        resetFormatMoney(value) {
            return this.formatMoney(value, 2, 3, '')
        },

        /**
         * Add primary color to `yes` or `no` buttons selections
         */
        addButtonsStyle(isSelected, btn) {
            if ((btn === 'y' && isSelected === true) || (btn === 'n' && isSelected === false))
                return this.styleObject;
        }
    }
})

Vue.config.productionTip = false
Vue.config.devtools = true


// Effortlessly keep vue-router and vuex store in sync.
sync(store, router) // https://github.com/vuejs/vuex-router-sync/tree/next

/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    template: '<Root/>',
    components: {Root},
})
