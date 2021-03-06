import localforage from 'localforage'
// plugins and src are alias. see client/build/webpack.base.conf.js
import {userTokenStorageKey} from '@/config'
import {setToken as httpSetToken} from '@/plugins/http'
import * as TYPES from './mutations-types'

const subscribe = (store) => {
    store.subscribe((mutation, {auth}) => {
        if (TYPES.SET_TOKEN === mutation.type) {
            /**
             * Set the Axios Authorization header with the token
             */
            httpSetToken(auth.token)

            /**
             * Sets the token to the local storage
             * for auto-login purpose
             */
            localforage.setItem(userTokenStorageKey, auth.token)
        }
    })
}

export default (store) => {
    subscribe(store)
};
