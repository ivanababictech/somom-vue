import Supplier from './supplier'

/* istanbul ignore next */
Supplier.install = function(Vue) {
  Vue.component(Supplier.name, Supplier)
}

export default Supplier