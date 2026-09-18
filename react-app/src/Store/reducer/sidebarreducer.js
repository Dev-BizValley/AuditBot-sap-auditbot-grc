import * as actionType from '../actions/actionsType'
import { updateObject } from '../utility'

const initialState = {

    pathname: '',
    userauthorization: {},
    loader: false

}

const sidebarreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.UPDATEPATHNAME:
            return { ...state, pathname: action.value }
        case actionType.AUTHORIZATION:
            return { ...state, userauthorization: action.value, loader: false }
        case actionType.CHANGE_SIDEBARLOADER_STATUS:
            return { ...state, loader: action.data }
    }

    return state;

}

export default sidebarreducer;