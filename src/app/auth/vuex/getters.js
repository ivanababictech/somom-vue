// http://vuex.vuejs.org/en/getters.html
import { isEmpty } from 'lodash'

/**
 * If has token, we assume that user is logged in our system
 *
 * @param token
 * @returns {boolean}
 */
export const isLogged = ({ token }) => !isEmpty(token)

/**
 * Get current user data
 *
 * @param user
 * @returns {*}
 */
export const currentUser = ({ user }) => user

/**
 * Get authorization token
 *
 * @param token
 * @returns {*}
 */
export const token = ({ token }) => token
