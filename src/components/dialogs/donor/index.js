import Donor from './donor'

/* istanbul ignore next */
Donor.install = function(Vue) {
  Vue.component(Donor.name, Donor)
}

export default Donor