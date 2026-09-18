import * as actionType from '../actions/actionsType';

const initialState = {
    crossSystemUsersReport: null,
    crossSystemRolesReport: null,
    crossSystemTcodesReport: null,
    loader: false,
    colors: []
};

const auditorreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CHANGE_CROSS_SYSTEM_USERS_LOADER:
            return {
                ...state,
                loader: action.data
            };
        case actionType.UPDATE_CROSS_SYSTEM_USERS_REPORT:
            return {
                ...state,
                crossSystemUsersReport: action.data
            };
        case actionType.CLEAR_CROSS_SYSTEM_USERS_REPORT:
            return {
                ...state,
                crossSystemUsersReport: null,
                loader: false
            };
        case actionType.CHANGE_CROSS_SYSTEM_ROLES_LOADER:
            return {
                ...state,
                loader: action.data
            };
        case actionType.UPDATE_CROSS_SYSTEM_ROLES_REPORT:
            return {
                ...state,
                crossSystemRolesReport: action.data
            };
        case actionType.CLEAR_CROSS_SYSTEM_ROLES_REPORT:
            return {
                ...state,
                crossSystemRolesReport: null,
                loader: false
            };
        case actionType.CHANGE_CROSS_SYSTEM_TCODES_LOADER:
            return {
                ...state,
                loader: action.data
            };
        case actionType.UPDATE_CROSS_SYSTEM_TCODES_REPORT:
            return {
                ...state,
                crossSystemTcodesReport: action.data
            };
        case actionType.CLEAR_CROSS_SYSTEM_TCODES_REPORT:
            return {
                ...state,
                crossSystemTcodesReport: null,
                loader: false
            };
        default:
            return state;
    }
};

export default auditorreducer;
