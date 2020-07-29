// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'


// update profile
export const update = (payload) => http.post('/profile', payload).then(getData)


