import _ from 'lodash'

const namespaced = true;

const state = {
  company_name: null,
  company_reg_no: null,
  shares_count: null,
  shares_type: null,
  shares_class: null,
  share_value: null,
  company_address_1: null,
  company_address_2: null,
  company_city: null,
  bankers: [],
  directors: [],
  shareholders: [],
}

const getters = {

  id ({company_id}) {
    return company_id
  },
  name ({company_name}) {
    return company_name
  },
  regNo ({company_reg_no}) {
    return company_reg_no
  },
  sharesCount ({shares_count}) {
    return shares_count
  },
  sharesType ({shares_type}) {
    return shares_type
  },
  sharesClass ({shares_class}) {
    return shares_class
  },
  shareValue ({share_value}) {
    return share_value
  },
  address1 ({company_address_1}) {
    return company_address_1
  },
  address2 ({company_address_2}) {
    return company_address_2
  },
  city ({company_city}) {
    return company_city
  },
  bankers ({bankers}) {
    return bankers
  },
  directors: ({directors}) => (type) => {
    if (directors && type) {
      return directors.filter(director => director.type == type)
    }
    return directors
  },
  shareholders: ({shareholders}) => (type) => {
    if (shareholders && type) {
      return shareholders.filter(shareholder => shareholder.type == type)
    }
    return shareholders
  },
}

const mutations = {
  update (state, company) {
    Object.assign(state, company)
  },
  name (state, company_name) {
    state.company_name = company_name
  },
  regNo (state, reg_no) {
    state.company_reg_no = reg_no
  },
  sharesCount (state, shares_count) {
    state.shares_count = shares_count
  },
  sharesType (state, shares_type) {
    state.shares_type = shares_type
  },
  sharesClass (state, shares_class) {
    state.shares_class = shares_class
  },
  shareValue (state, share_value) {
    state.share_value = share_value
  },
  address1 (state, company_address_1) {
    state.company_address_1 = company_address_1
  },
  address2 (state, company_address_2) {
    state.company_address_2 = company_address_2
  },
  city (state, company_city) {
    state.company_city = company_city
  },
  bankers (state, bankers) {
    state.bankers = bankers
  },

  addDirectors(state) {
    state.directors.push(
      {
        director_id: 1,
        com_name: null,
        reg_no: null,
        name: null,
        sex: null,
        id_type: null,
        id_number: null,
        address: null,
        domicile: null,
        type: 'Corporate'
      },
      {
        director_id: 2,
        name: null,
        sex: null,
        id_type: null,
        id_number: null,
        address: null,
        domicile: null,
        type: 'Individual'
      }
    )
  },

  addDirector (state, type) {
    const lastDirector = _.last(state.directors)
    const director_id = parseInt(lastDirector.director_id) + 1

    const director = {
      director_id,
      name: null,
      sex: null,
      id_type: null,
      id_number: null,
      address: null,
      domicile: null,
      type
    }
    if (type == 'Corporate') {
      director.com_name = null
      director.reg_no = null
    }
    state.directors.push(director)
  },

  updateDirector({directors}, {field, id, value}) {
    const director = directors.find( director => director.director_id == id )
    director[field] = value
  },

  addShareholders(state) {
    state.shareholders.push(
      {
        shareholder_id: 1,
        com_name: null,
        reg_no: null,
        address: null,
        domicile: null,
        type: 'Corporate',
        issued_share_capitals: [
          {
            count: null,
            type: null,
            class: null,
            value: null,
            paid: null
          }
        ]
      },
      {
        shareholder_id: 2,
        name: null,
        id_number: null,
        address: null,
        nationality: null,
        type: 'Individual',
        issued_share_capitals: [
          {
            count: null,
            type: null,
            class: null,
            value: null,
            paid: null
          }
        ]
      }
    )
  },

  addShareholder (state, type) {
    const lastShareholder = _.last(state.shareholders)
    const shareholder_id = parseInt(lastShareholder.shareholder_id) + 1

    const shareholder = {
      shareholder_id,
      name: null,
      id_number: null,
      address: null,
      nationality: null,
      type,
      issued_share_capitals: [
        {
          count: null,
          type: null,
          class: null,
          value: null,
          paid: null
        }
      ]
    }
    if (type == 'Corporate') {
      delete shareholder.name
      delete shareholder.id_number
      delete shareholder.nationality
      shareholder.com_name = null
      shareholder.reg_no = null
      shareholder.domicile = null
    }
    state.shareholders.push(shareholder)
  },

  updateShareholder ({shareholders}, {field, id, value}) {
    const shareholder = shareholders.find( shareholder => shareholder.shareholder_id == id )
    shareholder[field] = value
  },

  addIssuedShareCapital ({shareholders}, id) {
    const shareholder = shareholders.find( shareholder => shareholder.shareholder_id == id )
    shareholder.issued_share_capitals.push({
      count: null,
      type: null,
      class: null,
      value: null,
      paid: null
    })
  },

  updateIssuedShareCapital ({shareholders}, {field, id, key, value}) {
    const shareholder = shareholders.find( shareholder => shareholder.shareholder_id == id )
    shareholder.issued_share_capitals[key][field] = value
  },
}

const actions = {
  update ({commit}, audit) {
    commit('update', audit);
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
