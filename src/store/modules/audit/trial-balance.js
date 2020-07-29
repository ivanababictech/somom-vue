import Vue from 'vue'
import _ from 'lodash'


const namespaced = true;

const state = {
  items: [],
  default_item: {
    account_no: null,
    account_name: null,
    amount: 0,
    assigned_account: null,
    assigned_account_id: null,
    sub_account: null,
    sub_account_id: null,
    grouping: null,
    figure: 0,
    last_year_figure: 0,
    adjustments: []
  },
  adjustment_reason: null 
}

const getters = {

  defaultItem ({default_item}) {
    return default_item
  },

  items ({items}) {
    return items
  },

  itemById: ({items}) => (id) => {
    return items.find(item => item.tb_id == id)
  },

  activeItems ({items, default_item}) {
    const activeItems = items.filter(item => item.account_no || item.account_name || item.amount || item.assigned_account || item.sub_account || item.grouping || item.figure || item.adjustment || item.last_year_figure)
    return activeItems
  },

  savedItems ({items, default_item}) {
    return items.filter(item => item.created_at !== undefined)
  },

  unsavedItems({items, default_item}) {
    return items.filter(item => item.created_at === undefined)
  },

  accounts ({items}) {
    return items.filter(item => item.account_name).map(item => item.account_name)
  },

  assignedAccounts ({items}) {
    let assigned_accounts = []
    _.each(items, item => {
      if (item.assigned_account) {
        assigned_accounts.push(item.assigned_account)
      }
    });
    return assigned_accounts
  },
  
  assignedAccountsNames (state, {assignedAccounts}) {
    return assignedAccounts.map(assigned_account => assigned_account.assigned_account_name)
  },

  totalAmount ({items}) {
    let total = 0
    _.each(items, item => {
      if (item.amount) {
        total += parseFloat(item.amount)
      }
    })
    return Number(total).toFixed(2)
  },

  adjustmentReason: ({adjustment_reason}) => adjustment_reason,

  adjustmentsFigure: () => ({adjustment, adjustments}) => {
    let total = 0
    
    if (adjustment) {
      total += parseFloat(adjustment)
    }

    _.each(adjustments, adjustment => {
      if (adjustment.pivot) {
        total += parseFloat(adjustment.pivot.amount)
      }
    })
    return total
  },

  totalAdjustments (state, {activeItems, adjustmentsFigure}) {
    let total = 0;
    const items = activeItems.filter(item => item.adjustments.length || item.adjustment)

    _.each(items, item => total += adjustmentsFigure(item))
    return total
  },

  figure: () => ({amount, adjustment, adjustments}) => {
    let figure = 0

    if (amount) {
      figure = parseFloat(amount)
    }

    if (adjustment) {
      figure += parseFloat(adjustment)
    }

    _.each(adjustments, adjustment => {
      if (adjustment.pivot) {
        figure += parseFloat(adjustment.pivot.amount)
      }
    })

    return figure
  },

  totalFigure (state, {activeItems, figure}) {
    let total = 0
    _.each(activeItems, item => {
      total += figure(item)
    })
    return total
  },
  
  totalLastYearFigure (state, {activeItems}) {
    let total = 0
    _.each(activeItems, item => {
      total += parseFloat(item.last_year_figure)
    })
    return total
  },
}

const mutations = {
  setItems (state, items) {
    let lastId = 0
    if (items.length) {
      const lastItem = _.last(items)
      let lastId = lastItem.tb_id
    }
    while (items.length < 100) {
      items.push(Object.assign({ tb_id: ++lastId }, state.default_item))
    }

    state.items = items
  },

  updateItem ({items}, {id, field, value}) {
    const item = items.find( item => item.tb_id == id )
    item[field] = value

    /*if (item[field] === undefined) {
      item[field] = value
      //const items = state.items
      const itemIndex = _.findIndex(state.items, item => item.tb_id == id)
      state.items.splice(itemIndex, 1, item)
    } else {
      item[field] = value
    }*/
  },

  adjustmentReason (state, reason) {
    state.adjustment_reason = reason
  },

  resetAdjustment ({items}) {
    _.each(items, item => _.unset(item, ['adjustment']));
  }

}

const actions = {
  init ({commit}, items) {
    commit('setItems', items);
  },

  updateAssignedAccount({commit, getters}, {id, value}) {
    const item = getters.itemById(id)
    const condition = Boolean(!item.grouping || item.assigned_account && item.assigned_account.assigned_account_name == item.grouping)

    commit('updateItem', { field: 'assigned_account', id, value } )
    commit('updateItem', { field: 'assigned_account_id', id, value: value.assigned_account_id } )
    // TODO - set sub account to null maybe? 
    if (condition) {
      commit('updateItem', {field: 'grouping', id, value: value.assigned_account_name} )
    }
  },

  updateSubAccount({commit, getters},{id, value}) {
    const item = getters.itemById(id)
    const condition = Boolean(item.grouping == item.assigned_account.assigned_account_name || item.sub_account && item.sub_account.sub_account_name == item.grouping)
    
    commit('updateItem', { field: 'sub_account', id, value } )
    commit('updateItem', { field: 'sub_account_id', id, value: value.sub_account_id } )

    if (condition) {
      commit('updateItem', { field: 'grouping', id, value: value.sub_account_name } )
    }
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
