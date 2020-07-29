// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

/**
 * Send login data and retrive a new token
 *
 * @param payload
 * @returns {Promise<T>}
 */
export const login = (payload) =>
    http.post('/auth/login', payload)
    /**
     * functional approach, more readable and generate minus code
     * examples:
     * PromiseObject.then(response => response.data)
     * PromiseObject.then({ data } => data)
     *
     * We do this many times in many locations.
     * We know that .then accepts a function and what arguments it receives
     * This is because in JavaScript functions are first class citizens.
     * In summary we can pass functions as arguments and also receive functions as results
     * (first-class function and higher-order function)
     */
        .then(getData) // .then(response => getData(response))

/**
 * Register a new user
 *
 * @param payload
 * @returns {Promise<T>}
 */
export const register = (payload) => http.post('/auth/register', payload).then(getData)

/**
 * Join user
 *
 * @param payload
 * @returns {Promise<T>}
 */
export const join = (payload) => http.post('/auth/join', payload).then(getData)

/**
 * Email verification
 *
 * @param token
 */
export const verificationEmail = (token) => http.post('/auth/verification/' + token).then(getData)

/**
 * Two factor verification
 *
 * @param user
 * @returns {Promise<T>}
 */
export const verificationTwoFactorCode = (user) => http.post('/auth/2fa', user).then(getData)

/**
 * Google two factor verification
 *
 * @param user
 * @returns {Promise<T>}
 */
export const verificationGoogleTwoFactorCode = (user) => http.post('/auth/google-2fa', user).then(getData)

/**
 * Resend Two factor authorization code
 *
 * @param user
 * @returns {Promise<T>}
 */
export const resendTwoFactorCode = (user) => http.post('/auth/resend-2fa-code', user).then(getData)

/**
 * Send mobile verification code to user
 *
 * @param mobile
 * @returns {Promise<T>}
 */
export const sendMobileCode = (mobile) => http.post('/auth/mobile-verification', { mobile }).then(getData)

/**
 * Send reset link email
 *
 * @param payload
 * @returns {Promise<T>}
 */
export const sendResetLink = (payload) => http.post('/auth/password/email', payload).then(getData)

/**
 * Reset password
 *
 * @param payload
 * @returns {Promise<T>}
 */
export const resetPassword = (payload) => http.post('/auth/password/reset', payload).then(getData)

/**
 * Get current user
 */
export const loadUserData = () => http.get('/auth/me').then(getData)

/**
 * Revoke current token
 *
 * @returns {Promise<T>}
 */
export const revokeToken = () => http.post('/auth/token/revoke').then(getData)

