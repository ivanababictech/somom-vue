import DirectEntrySupplier from './direct-entry-supplier'

/* istanbul ignore next */
DirectEntrySupplier.install = function(Vue) {
  Vue.component(DirectEntrySupplier.name, DirectEntrySupplier)
}

export default DirectEntrySupplier