import * as TYPES from './types'

import {fetchAssignedAccounts, fetchSettings} from '@/api/settings'

export const loadInitialState = ({state, commit, dispatch }) => {
    if (state.initialized) {
        return
    }

    fetchSettings()

    commit('initializeStore')
}

export const setFetching = ({commit}, obj) => {
    commit(TYPES.MAIN_SET_FETCHING, obj)
}

export const downloadFile = ({commit}, response) => {
    console.log(response);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(response.headers['content-disposition']);
    let filename;
    if (matches != null && matches[1])
        filename = matches[1].replace(/['"]/g, '');
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
    window.URL.revokeObjectURL(url);
}

export const setMessage = ({commit, dispatch}, obj) => {
    dispatch('resetMessages')

    commit(TYPES.MAIN_SET_MESSAGE, obj)

    setTimeout(() => {
        dispatch('resetMessages')
    }, 5000);
}

export const resetMessages = ({commit}) => {
    commit(TYPES.MAIN_SET_MESSAGE, {type: 'success', message: ''})
    commit(TYPES.MAIN_SET_MESSAGE, {type: 'error', message: []})
    commit(TYPES.MAIN_SET_MESSAGE, {type: 'warning', message: ''})
    commit(TYPES.MAIN_SET_MESSAGE, {type: 'validation', message: []})
}