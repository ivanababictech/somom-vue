import Customer from './customer'

/* istanbul ignore next */
Customer.install = function(Vue) {
  Vue.component(Customer.name, Customer)
}

export default Customer