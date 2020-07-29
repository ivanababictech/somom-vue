import Account from './account'

/* istanbul ignore next */
Account.install = function(Vue) {
  Vue.component(Account.name, Account)
}

export default Account