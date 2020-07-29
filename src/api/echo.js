import Echo from 'laravel-echo'
import store from "@/store";
import {userTokenStorageKey} from "@/config";
import localforage from "localforage";

window.Pusher = require('pusher-js')

export default  () => {
    return localforage.getItem(userTokenStorageKey)
    // With the token in hand, retrieves the user's data, validating the token
        .then((token) => {
            return new Echo({
                broadcaster: 'pusher',
                key: '3ac149c9863b8733bf1d',
                cluster: 'mt1',
                encrypted: true,
                authEndpoint: process.env.NODE_ENV === 'production' ? '/api/broadcasting/auth' : 'http://localhost:6001/api/broadcasting/auth',
                auth: {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        //'X-Requested-With': 'XMLHttpRequest',
                    },
                },
            })
        })
}