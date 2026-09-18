import * as actionType from '../actions/actionsType'
import { updateObject } from '../utility'

const initialState = {
    sapSystem: { "name": "SAP System", "id": 1, "value": [] },
    client: { "name": "Client", "id": 2, "value": [] },
    riskType: { "name": "Risk Type", "id": 3, "value": [], selectedValue: [] },
    riskLevel: { "name": "Risk Level", "id": 4, "value": [], selectedValue: [] },
    businessModule: { "name": "Business Module", "id": 5, "value": [], selectedValue: [] },
    level: { name: "", id: 26, selectedValue: '1' , value:[]},
    breakDown: { values: { 'Risk Level': 2, 'Risk Type': 1, 'Business Modules': 3 }, selectedValue: [1] },
    mitigation: { "name": "Risk", "id": 6, "value": [] },
    drillDown: { "name": "Drill Down", "id": 9, "value": [] },
    reportType: { "name": "Report Type", "id": 7, "value": [] },
    riskid: { "name": "Risk Id", "id": 8, "value": [], selectedValue: [] },
    reportView: { "name": "Report View", "id": 10, "value": [] },
    userinput: "",
    result: null,
    dataformat: 0,
    tableReport: {},
    tableReportShow: false,
    levelSelected: 1,
    reportTypeSelected: 1,
    grcreport: {},
    loader: false,
    colors: [],
    tableRiskTechReport: {},
    account: { "name": "", "id": 14, "value": [], selectedValue: [] },
    userGroup: { "name": "", "id": 13, "value": [], selectedValue: [] },
}

const filterreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INITFILTER:
            return updateObject(state, action.data);
        case actionType.CHANGE_SAPSYSTEM_FILTER:
            return { ...state, sapSystem: { ...state.sapSystem, selectedValue: action.value } }
        case actionType.CHANGE_RISKTYPE_FILTER:
            return { ...state, riskType: { ...state.riskType, selectedValue: action.value } }
        case actionType.CHANGE_RISKLEVEL_FILTER:
            return { ...state, riskLevel: { ...state.riskLevel, selectedValue: action.value } }
        case actionType.CHANGE_CLIENT_FILTER:
            return { ...state, client: { ...state.client, selectedValue: action.value } }
        case actionType.CHANGE_BUSINESS_FILTER:
            return { ...state, businessModule: { ...state.businessModule, selectedValue: action.value } }
        case actionType.CHANGE_MITIGATION_FILTER:
            return { ...state, mitigation: { ...state.mitigation, selectedValue: action.value } }
        case actionType.CHANGE_RISK_ID:
            return { ...state, riskid: { ...state.riskid, selectedValue: action.value } }
        case actionType.CHANGE_REPORT_TYPE:
            return { ...state, reportType: { ...state.reportType, selectedValue: action.value } }
        case actionType.CHANGE_REPORTVIEW_TYPE:
            return { ...state, reportView: { ...state.reportView, selectedValue: action.value } }
        case actionType.CHANGE_DRILL_DOWN:
            return { ...state, drillDown: { ...state.drillDown, selectedValue: action.value } }
        case actionType.CHANGE_LEVEL:
            return { ...state, level: { ...state.level, selectedValue: action.value } }
        case actionType.CHANGE_BREAKDOWN:
            return { ...state, breakDown: { ...state.breakDown, selectedValue: action.data } }
        case actionType.CHANGE_ACCOUNT_FILTER:
            return { ...state, account: { ...state.account, selectedValue: action.value } }
        case actionType.CHANGE_USERGROUP_FILTER:
            return { ...state, userGroup: { ...state.userGroup, selectedValue: action.value } }
        case actionType.UPDATE_RESULT:
            return {
                ...state, result: action.data, tableReportShow: false,
                loader: false, levelSelected: state.level.selectedValue,
                reportTypeSelected: state.reportType.selectedValue,
                sapSystem: { ...state.sapSystem, filtered: state.sapSystem.selectedValue },
                client: { ...state.client, filtered: state.client.selectedValue },
                riskType: { ...state.riskType, filtered: state.riskType.selectedValue },
                riskLevel: { ...state.riskLevel, filtered: state.riskLevel.selectedValue },
                businessModule: { ...state.businessModule, filtered: state.businessModule.selectedValue },
                mitigation: { ...state.mitigation, filtered: state.mitigation.selectedValue },
                drillDown: { ...state.drillDown, filtered: state.drillDown.selectedValue },
                level: { ...state.level, filtered: state.level.selectedValue },
                reportType: { ...state.reportType, filtered: state.reportType.selectedValue },
                riskid: { ...state.riskid, filtered: state.riskid.selectedValue },
                account: { ...state.account, filtered: state.account.selectedValue },
                userGroup: { ...state.userGroup, filtered: state.userGroup.selectedValue },
            }
        case actionType.UPDATE_DATAFORMAT:
            return { ...state, dataformat: action.data }
        case actionType.CLEAR_RESULT:
            return { ...state, result: null, businessModule: { ...state.businessModule, selectedValue: [] }, riskType: { ...state.riskType, selectedValue: [] }, riskLevel: { ...state.riskLevel, selectedValue: [] }, risk: { ...state.risk, selectedValue: [] }, userinput: "", level: { ...state.level, selectedValue: '1', value:[] }, grcreport: {}, account: { ...state.account, selectedValue: [] }, userGroup: { ...state.userGroup, selectedValue: [] } }
        case actionType.UPDATE_RISKREPORT:
            return { ...state, tableReport: action.tableReport }
        case actionType.UPDATE_GRCREPORT:
            return { ...state, grcreport: action.tableReport }
        case actionType.TO_PARENT_TABLE:
            return { ...state, tableReportShow: false }
        case actionType.CHANGE_USERID_INPUT:
            return { ...state, userinput: action.value }
        case actionType.CHANGE_LOADER_STATUS:
            return { ...state, loader: action.data }
        case actionType.UPDATE_GRCRISKTECH_REPORT:
            return { ...state, tableRiskTechReport: action.tableRiskTechReport }
        case actionType.CLEAR_GRCRISKTECH_REPORT:
            return { ...state, tableRiskTechReport: {} }

    }


    return state;

}


export default filterreducer;