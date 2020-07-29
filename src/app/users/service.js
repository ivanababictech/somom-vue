// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const ROLE_ADMIN             = 'admin';
export const ROLE_CLIENT            = 'client';
export const ROLE_AGENT             = 'agent';
export const ROLE_HEAD_OF_SCHOOL    = 'head-of-school';
export const ROLE_EDUCATOR          = 'educator';
export const ROLE_STUDENT           = 'student';
export const ROLE_HEAD_OF_NGO       = 'head-of-ngo';
export const ROLE_EMPLOYEE          = 'employee';
export const ROLE_COMPANY           = 'company';
export const ROLE_VOLUNTEER         = 'volunteer';

/**
 * Get users
 */
export const get = (payload) => http.get('/users', payload).then(getData)

/**
 * Get user
 *
 * @param userId
 */
export const find = (userId) => http.get('/users/' + userId).then(getData)

/**
 * Create the new user
 *
 * @param user
 */
export const create = (user) => http.post('/users', user).then(getData)

/**
 * Update the user
 *
 * @param user
 */
export const update = (user) => http.put('/users/' + user.id, user).then(getData)

/**
 * Delete the user
 *
 * @param user
 */
export const remove = (user) => http.delete('/users/' + user.id).then(getData)

/**
 * Get user roles
 */
export const getUserRoles = () => http.get('/roles').then(getData)


/**
 * Get user info by IP
 */
export const getIpInfo = () => http.get('https://ipinfo.io', function() {}, "jsonp").then()



