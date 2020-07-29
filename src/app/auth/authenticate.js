import VueAuthenticate from "vue-authenticate";
import {VueAuthenticate as VueAuthenticateObject} from "vue-authenticate"
import * as config from "@/config";
import Vue from "vue";
import OAuth2 from 'vue-authenticate/src/oauth/oauth2.js'


VueAuthenticateObject.prototype.authenticate = function authenticate (provider, userData, requestOptions) {
    return new Promise((resolve, reject) => {
        var providerConfig = this.options.providers[provider]
        if (!providerConfig) {
            return reject(new Error('Unknown provider'))
        }

        let providerInstance;

        switch (providerConfig.oauthType) {
            case '2.0':
                providerInstance = new OAuth2(this.$http, this.storage, providerConfig, this.options)
                break
            default:
                return reject(new Error('Invalid OAuth type'))
                break
        }

        return providerInstance.init(userData)
            .then((response) => resolve(response))
            .catch(err => reject(err))
    })
}


Vue.use(VueAuthenticate, {
    baseUrl: config.apiUrl, // Your API domain
    tokenName: 'token',
    tokenPrefix: 'vueauth',
    tokenHeader: 'Authorization',
    tokenType: 'Bearer',
    loginUrl: '/auth/login',
    registerUrl: '/auth/register',
    logoutUrl: null,
    storageType: 'localStorage',
    requestDataKey: 'data',
    responseDataKey: 'data',

    providers: config.socialProviders,

    bindRequestInterceptor() {
        this.$http.interceptors.request.use((config) => {
            /*if (this.isAuthenticated()) {
                config.headers['Authorization'] = [
                    this.options.tokenType, this.getToken()
                ].join(' ')
            } else {
                delete config.headers['Authorization']
            }*/
            return config
        })
    },

    bindResponseInterceptor() {
        this.$http.interceptors.response.use((response) => {
            //this.setToken(response)
            return response
        })
    }
})
