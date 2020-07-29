import store from '../store'

const needAuth = auth => auth === true

const beforeEach = (to, from, next) => {
    const auth = to.meta.requiresAuth

    /**
     * Clears all global feedback message
     * that might be visible
     */
    store.dispatch('resetMessages')

    /**
     * Otherwise  if authentication is required login.
     */
    store.dispatch('checkUserToken')
        .then(() => {
            // There is a token and it is valid
            const isInitialized = store.getters['initialState'];

            if (!isInitialized) {
                store.dispatch('loadInitialState');
            }
            if(to.name === 'auth') {
                next({name: 'dashboard'})
            } else {
                next()
            }
        })
        .catch(() => {
            // No token, or it is invalid
            if (needAuth(auth)) {
                next({name: 'dashboard'}) // redirect to login
            } else {
                next()
            }
        })
}

export default beforeEach
