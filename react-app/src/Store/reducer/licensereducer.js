import * as actionType from '../actions/actionsType'
import { updateObject } from '../utility'


const initialState = {
    sapSystem: { "name": "SAP System", "id": 1, "value": [] },
    client: { "name": "Client", "id": 2, "value": [] },
    level: { "name": "Level", "id": 11, "value": [] },
    userType: { "name": "User Type", "id": 12, "value": [] },
    userGroup: { "name": "User Group", "id": 13, "value": [] },
    account: { "name": "Account", "id": 14, "value": [] },
    licenseType: { "name": "License Type", "id": 15, "value": [] },
    userStatus: { "name": "User Status", "id": 16, "value": [] },
    activeUser: { "name": "Active User", "id": 17, "value": [] },
    tcodes: { "name": "Tcodes", "id": 18, "value": [] },
    criteria: { "name": "Criteria", "id": 19, "value": [] },
    userId: "",
    count: 10,
    logondays: 90,
    startDate: new Date(),
    endDate: new Date(),
    filtereduserId: "",
    filteredcount: 10,
    filteredlogondays: 90,
    filteredstartDate: new Date(),
    filteredendDate: new Date(),
    licenseresult: null,
    licensereport: {},
    licensetablereport: {},
    colors: [],
    loader: false
}

const licensereducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INITLICENSEFILTER:
            return updateObject(state, action.data);
        case actionType.CHANGE_LICENCESYSTEM_FILTER:
            return { ...state, sapSystem: { ...state.sapSystem, selectedValue: action.value } }
        case actionType.CHANGE_LICENCECLIENTT_FILTER:
            return { ...state, client: { ...state.client, selectedValue: action.value } }
        case actionType.CHANGE_LICENCELEVEL_FILTER:
            return { ...state, level: { ...state.level, selectedValue: action.value } }
        case actionType.CHANGE_LICENCEUSERTYPE_FILTER:
            return { ...state, userType: { ...state.userType, selectedValue: action.value } }
        case actionType.CHANGE_LICENCEUSERGRP_FILTER:
            return { ...state, userGroup: { ...state.userGroup, selectedValue: action.value } }
        case actionType.CHANGE_LICENCEACC_FILTER:
            return { ...state, account: { ...state.account, selectedValue: action.value } }
        case actionType.CHANGE_LICENCETYPE_FILTER:
            return { ...state, licenseType: { ...state.licenseType, selectedValue: action.value } }
        case actionType.CHANGE_LICENCEUSERSTAT_FILTER:
            return { ...state, userStatus: { ...state.userStatus, selectedValue: action.value } }
        case actionType.CHANGE_LICENCEACTUSER_FILTER:
            return { ...state, activeUser: { ...state.activeUser, selectedValue: action.value } }
        case actionType.CHANGE_LICENCETCODE_FILTER:
            return { ...state, tcodes: { ...state.tcodes, selectedValue: action.value } }
        case actionType.CHANGE_LICENCECRITERIA_FILTER:
            return { ...state, criteria: { ...state.criteria, selectedValue: action.value } }
        case actionType.CHANGE_LICENCECUSERID_FILTER:
            return { ...state, userId: action.value }
        case actionType.CHANGE_LICENCECCOUNT_FILTER:
            return { ...state, count: action.value }
        case actionType.CHANGE_LICENCECLOGONDAYS_FILTER:
            return { ...state, logondays: action.value }
        case actionType.CHANGE_LICENCECSTARTDATE_FILTER:
            return { ...state, startDate: action.value }
        case actionType.CHANGE_LICENCECENDDATE_FILTER:
            return { ...state, endDate: action.value }
        case actionType.UPDATE_LICENCE_RESULT:
            return {
                ...state, licenseresult: action.data,
                sapSystem: { ...state.sapSystem, filtered: state.sapSystem.selectedValue },
                client: { ...state.client, filtered: state.client.selectedValue },
                level: { ...state.level, filtered: state.level.selectedValue },
                userType: { ...state.userType, filtered: state.userType.selectedValue },
                userGroup: { ...state.userGroup, filtered: state.userGroup.selectedValue },
                account: { ...state.account, filtered: state.account.selectedValue },
                licenseType: { ...state.licenseType, filtered: state.licenseType.selectedValue },
                userStatus: { ...state.userStatus, filtered: state.userStatus.selectedValue },
                activeUser: { ...state.activeUser, filtered: state.activeUser.selectedValue },
                tcodes: { ...state.tcodes, filtered: state.tcodes.selectedValue },
                criteria: { ...state.criteria, filtered: state.criteria.selectedValue },
                filtereduserId: state.userId,
                filteredcount: state.count,
                filteredlogondays: state.logondays,
                filteredstartDate: state.startDate,
                filteredendDate: state.endDate
            }
        case actionType.CHANGE_LICENCELOADER_STATUS:
            return { ...state, loader: action.data }
        case actionType.UPDATE_LICENCEREPORT_RESULT:
            return { ...state, licensereport: action.data }
        case actionType.UPDATE_LICENCEREPORTTABLE_RESULT:
            return { ...state, licensetablereport: action.data, licensereport: action.data }
        case actionType.CLEAR_LICENSE_RESULT:
            return { ...state, licenseresult: null, licensereport: {}, licensetablereport: {} }

    }


    return state;

}


export default licensereducer;