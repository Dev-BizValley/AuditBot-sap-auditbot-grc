import * as actionType from '../actions/actionsType'
import { updateObject } from '../utility'

const initialState = {
    sapSystem: { "name": "SAP System", "id": 1, "value": [] },
    client: { "name": "Client", "id": 2, "value": [] },
    year: { "name": "Year", "id": 3, "selectedValue": new Date().getFullYear().toString(), "filtered": new Date().getFullYear().toString() },
    summaryYear: { "name": "Year", "id": 33, "selectedValue": new Date().getFullYear().toString(), "filtered": new Date().getFullYear().toString() },
    detailYear: { "name": "Year", "id": 333, "selectedValue": new Date().getFullYear().toString(), "filtered": new Date().getFullYear().toString() },
    controls: { "name": "Controls", "id": 21, "value": [] },
    control: { "name": "Controls", "id": 221, "value": [] },
    mitigation: { "name": "Mitigation", "id": 6, "value": [] },
    drillDown: { "name": "Drill Down", "id": 9, "value": [] },
    colors: [],
    controlresult: null,
    controlreport: {},
    controlsummaryreport: {},
    controltablereport: {},
    loader: false
}

const licensereducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INITCONTROLFILTER:
            return updateObject(state, action.data);
        case actionType.CHANGE_CONTROLDRILL_DOWN:
            return { ...state, drillDown: { ...state.drillDown, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLMITIGATION_FILTER:
            return { ...state, mitigation: { ...state.mitigation, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLCLIENT_FILTER:
            return { ...state, client: { ...state.client, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLSAPSYSTEM_FILTER:
            return { ...state, sapSystem: { ...state.sapSystem, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLS_FILTER:
            return { ...state, controls: { ...state.controls, selectedValue: action.value } }
        case actionType.CHANGE_CONTROL_FILTER:
            return { ...state, control: { ...state.control, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLYEAR_FILTER:
            return { ...state, year: { ...state.year, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLSUMMARYYEAR_FILTER:
            return { ...state, summaryYear: { ...state.summaryYear, selectedValue: action.value } }
        case actionType.CHANGE_CONTROLDETAILYEAR_FILTER:
            return { ...state, detailYear: { ...state.detailYear, selectedValue: action.value } }
        case actionType.UPDATE_CONTROL_RESULT:
            return {
                ...state, controlresult: action.data,
                sapSystem: { ...state.sapSystem, filtered: state.sapSystem.selectedValue },
                client: { ...state.client, filtered: state.client.selectedValue },
                year: { ...state.year, filtered: state.year.selectedValue },
                mitigation: { ...state.mitigation, filtered: state.mitigation.selectedValue },
                drillDown: { ...state.drillDown, filtered: state.drillDown.selectedValue },
                controls: { ...state.controls, filtered: state.controls.selectedValue }
            }
        case actionType.CHANGE_CONTROLLOADER_STATUS:
            return { ...state, loader: action.data }
        case actionType.UPDATE_CONTROLREPORT_RESULT:
            return {
                ...state, controlreport: action.data,
                sapSystem: { ...state.sapSystem, filtered: state.sapSystem.selectedValue },
                client: { ...state.client, filtered: state.client.selectedValue },
                detailYear: { ...state.detailYear, filtered: state.detailYear.selectedValue },
                control: { ...state.control, filtered: state.control.selectedValue }
            }
        case actionType.UPDATE_CONTROLSUMMARYREPORT_RESULT:
            return {
                ...state, controlsummaryreport: action.data,
                sapSystem: { ...state.sapSystem, filtered: state.sapSystem.selectedValue },
                client: { ...state.client, filtered: state.client.selectedValue },
                summaryYear: { ...state.summaryYear, filtered: state.summaryYear.selectedValue },
                controls: { ...state.controls, filtered: state.controls.selectedValue }
            }
        case actionType.UPDATE_CONTROLREPORTTABLE_RESULT:
            return { ...state, controltablereport: action.data, controlreport: action.data }
        case actionType.CLEAR_CONTROL_RESULT:
            return { ...state, controlresult: null, controlreport: {}, controltablereport: {} }
    }
    return state;
}

export default licensereducer;