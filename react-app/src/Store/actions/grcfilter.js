import * as actionType from './actionsType';
import * as action from './index'
import axios from 'axios';



export const initFilter = (token) => {
    return dispatch => {
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.get('/api/filter', { headers: { 'Authorisation': token } })
            .then(response => {
                dispatch(initiateFilter(response.data));
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
                if (error.response && error.response.status == '401') {
                    action.logout()
                    window.location.reload()

                }
            });
    }
}




export const changeFilter = (data, value) => {
    return dispatch => {
        switch (data.id) {
            case 1:
                dispatch({
                    type: actionType.CHANGE_SAPSYSTEM_FILTER,
                    value: value
                });
                break
            case 2:
                dispatch({
                    type: actionType.CHANGE_CLIENT_FILTER,
                    value: value
                });
                break
            case 3:
                dispatch({ type: actionType.CHANGE_RISKTYPE_FILTER, value: value })
                break
            case 4:
                dispatch({ type: actionType.CHANGE_RISKLEVEL_FILTER, value: value })
                break
            case 5:
                dispatch({ type: actionType.CHANGE_BUSINESS_FILTER, value: value })
                break
            case 6:
                dispatch({ type: actionType.CHANGE_RISK_ID, value: value })
                break
            case 7:
                dispatch({ type: actionType.CHANGE_MITIGATION_FILTER, value: value })
                break
            case 8:
                dispatch({ type: actionType.CHANGE_REPORT_TYPE, value: value })
                break
            case 9:
                dispatch({ type: actionType.CHANGE_DRILL_DOWN, value: value })
                break
            case 10:
                dispatch({ type: actionType.CHANGE_REPORTVIEW_TYPE, value: value })
                break
            case 13:
                dispatch({ type: actionType.CHANGE_USERGROUP_FILTER, value: value });
                break
            case 14:
                dispatch({ type: actionType.CHANGE_ACCOUNT_FILTER, value: value })
                break
            case 26:
                dispatch({ type: actionType.CHANGE_LEVEL, value: value })
                break
            default:
                break;
        }
    }
}


export const changeUserInput = (input) => {
    return dispatch => {
        dispatch({
            type: actionType.CHANGE_USERID_INPUT,
            value: input
        })

    }
}

export const changeLevel = (inputLevel) => {
    return dispatch => {
        let level = (inputLevel == 1) ? 2 : 1;
        dispatch({
            type: actionType.CHANGE_LEVEL,
            level: inputLevel
        })

    }
}

export const changeBreakDown = (data, value, action) => {
    let temparray = data.selectedValue;
    let index = temparray.findIndex(p => { return p == value });

    if (index != -1) {
        temparray.splice(index, 1)
    } else {
        temparray.push(value);
    }
    return {
        type: action,
        value: temparray
    }

}

export const initiateFilter = (data) => {
    let temp = {};
    temp.loader = false;
    data.map(p => {
        p.selectedValue = null;
        switch (p.id) {
            case 1:
                temp.sapSystem = p;
                temp.sapSystem.selectedValue = p.value[0].ZID
                temp.sapSystem.filtered = p.value[0].ZID
                break
            case 2:
                temp.client = p;
                temp.client.selectedValue = p.value[0].ZID
                temp.client.filtered = p.value[0].ZID
                break
            case 3:
                p.selectedValue = [];
                p.filtered = [];
                temp.riskType = p;
                break
            case 4:
                p.selectedValue = [];
                p.filtered = [];
                temp.riskLevel = p;
                break
            case 5:
                p.selectedValue = [];
                p.filtered = [];
                temp.businessModule = p;
                break
            case 6:
                p.selectedValue = [];
                p.filtered = [];
                temp.riskid = p;
                break;
            case 7:
                temp.mitigation = p;
                break;
            case 8:
                p.selectedValue = 1
                p.filtered = 1;
                temp.reportType = p;
                break;
            case 9:
                temp.drillDown = p;
                break;
            case 10:
                temp.reportView = p;
                break;
            case 51:
                temp.colors = p.value.map(color => color.ZDESC);
                const headerColorObj = p.value.find(c => c.ZROLE === 'HEADER');
                temp.headerColor = headerColorObj ? headerColorObj.ZDESC : '#2563eb';
                break;
            case 13:
                p.selectedValue = [];
                p.filtered = [];
                temp.userGroup = p;
                break;
            case 14:
                p.selectedValue = [];
                p.filtered = [];
                temp.account = p;
                break;
            case 26:
                temp.level = p;
                temp.level.selectedValue = p.value[0].ZID;
                temp.level.filtered = p.value[0].ZID;
                break;
            default:
                console.log("case doesn't match")
        }
    })

    return {
        type: actionType.INITFILTER,
        data: temp
    };
}

export const submitFilter = ({ data = {} }) => {

    return dispatch => {
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.post('/api/JAVA_0002N', {
            riskType: data?.riskType || [],
            sapSystem: data?.sapSystem || '',
            client: data?.client || '',
            riskLevel: data?.riskLevel || [],
            businessModule: data?.businessModule || [],
            level: data?.level || null,
            breakDown: data?.breakDown || [],
            riskId: data?.riskId || [],
            reportType: data?.reportType || null,
            mitigation: data?.mitigation || null,
            account: data?.account || [],
            userGroup: data?.userGroup || [],
            userInput: data?.userInput || ""
        }, { headers: { 'Authorisation': data.token } })
            .then(response => {
                dispatch({ type: actionType.UPDATE_RESULT, data: response.data })
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            });
    }

}

export const changeDataFormat = (value) => {
    return dispatch => {
        if (value === 1) {
            dispatch({ type: actionType.UPDATE_DATAFORMAT, data: 0 })
        } else {
            dispatch({ type: actionType.UPDATE_DATAFORMAT, data: 1 })
        }
    }
}


export const gobackToParentTable = () => {
    return dispatch => {
        dispatch({ type: actionType.TO_PARENT_TABLE })
    }
}





export const riskReport = ({ data = {} }) => {

    return dispatch => {
        console.log("[GRC-DEBUG] Action data received:", data);
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.post('/api/JAVA_MUL_0003', {
            sapSystem: data?.sapSystem || "",
            client: data?.client || "",
            level: data?.level || null,
            riskType: data?.riskType || [],
            riskLevel: data?.riskLevel || [],
            businessModule: data?.businessModule || [],
            mitigation: data?.mitigation || null,
            drillDown: data?.drillDown || null,
            riskId: data?.riskId || [],
            userInput: data?.userInput || '',
            account: data?.account || [],
            userGroup: data?.userGroup || []
        }, { headers: { 'Authorisation': data.token } })
            .then(response => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
                dispatch({ type: actionType.UPDATE_RISKREPORT, tableReport: response.data })
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            });
    }
}


export const clearriskReport = () => {

    return dispatch => {
        dispatch({ type: actionType.UPDATE_RISKREPORT, tableReport: {} })
    }
}


export const riskGrcReport = ({ data = {} }) => {

    return dispatch => {
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.post('/api/JAVA_MUL_0003', {
            sapSystem: data?.sapSystem || "",
            client: data?.client || "",
            level: data?.level || null,
            riskType: data?.riskType || [],
            riskLevel: data?.riskLevel || [],
            businessModule: data?.businessModule || [],
            mitigation: data?.mitigation || null,
            drillDown: data?.drillDown || null,
            riskId: data?.riskId || [],
            userInput: data?.userInput || '',
            account: data?.account || [],
            userGroup: data?.userGroup || []
        }, { headers: { 'Authorisation': data.token } })
            .then(response => {
                dispatch({ type: actionType.UPDATE_GRCREPORT, tableReport: response.data })
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            });
    }
}



export const riskGrcCompanyReport = ({ data = {} }) => {

    return dispatch => {

        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.post('/api/JAVA_0003N_FP', {
            sapSystem: data?.sapSystem || "",
            client: data?.client || "",
            level: data?.level || null,
            riskType: data?.riskType || [],
            riskLevel: data?.riskLevel || [],
            businessModule: data?.businessModule || [],
            mitigation: data?.mitigation || null,
            drillDown: data?.drillDown || null,
            riskId: data?.riskId || [],
            userInput: data?.userInput || '',
            account: data?.account || [],
            userGroup: data?.userGroup || []
        }, { headers: { 'Authorisation': data.token } })
            .then(response => {
                dispatch({ type: actionType.UPDATE_GRCREPORT, tableReport: response.data })
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            });
    }
}



export const initRiskTechFilter = (token, preserveLoader = false) => {
    return dispatch => {
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.get('/api/filter', { headers: { 'Authorisation': token } })
            .then(response => {
                dispatch(initiateRiskTechFilter(response.data, preserveLoader));
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
                if (error.response && error.response.status == '401') {
                    action.logout()
                    window.location.reload()

                }
            });
    }
}


export const initiateRiskTechFilter = (data, preserveLoader = false) => {
    let temp = {};
    if (!preserveLoader) {
        temp.loader = false;
    }
    data.map(p => {
        p.selectedValue = null;
        switch (p.id) {
            case 1:
                temp.sapSystem = p;
                temp.sapSystem.selectedValue = p.value[0].ZID
                temp.sapSystem.filtered = p.value[0].ZID
                break
            case 2:
                temp.client = p;
                temp.client.selectedValue = p.value[0].ZID
                temp.client.filtered = p.value[0].ZID
                break
            case 3:
                p.selectedValue = [p.value[0].ZID];
                p.filtered = [];
                temp.riskType = p;
                break
            case 4:
                p.selectedValue = [];
                p.filtered = [];
                temp.riskLevel = p;
                break
            case 5:
                p.selectedValue = [];
                p.filtered = [];
                temp.businessModule = p;
                break
            case 6:
                p.selectedValue = [];
                p.filtered = [];
                temp.riskid = p;
                break;
            case 7:
                temp.mitigation = p;
                break;
            case 8:
                p.selectedValue = 1
                p.filtered = 1;
                temp.reportType = p;
                break;
            case 9:
                temp.drillDown = p;
                break;
            case 10:
                p.selectedValue = p.value[0].ZID;
                temp.reportView = p;
                break;
            case 51:
                temp.colors = p.value.map(color => color.ZDESC);
                break;
            case 13:
                p.selectedValue = [];
                p.filtered = [];
                temp.userGroup = p;
                break;
            case 14:
                p.selectedValue = [];
                p.filtered = [];
                temp.account = p;
                break;
            case 26:
                temp.level = p;
                temp.level.selectedValue = p.value[0].ZID;
                temp.level.filtered = p.value[0].ZID;
                break;
            default:
                break;
        }
    })

    return {
        type: actionType.INITFILTER,
        data: temp
    };
}


export const riskTechGrcReport = ({ data = {} }) => {

    return dispatch => {
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.post('/api/JAVA_MUL_0004', {
            sapSystem: data?.sapSystem || "",
            client: data?.client || "",
            level: data?.level || null,
            riskType: data?.riskType || [],
            riskLevel: data?.riskLevel || [],
            businessModule: data?.businessModule || [],
            riskId: data?.riskId || [],
            userInput: data?.userInput || '',
            reportView: data?.reportView || "",
            account: data?.account || [],
            userGroup: data?.userGroup || []
        }, { headers: { 'Authorisation': data.token } })
            .then(response => {
                dispatch({ type: actionType.UPDATE_GRCRISKTECH_REPORT, tableRiskTechReport: response.data })
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            });
    }
}
export const grcReportDrillDown = ({ data = {} }) => {

    return dispatch => {
        dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: true })
        axios.post('/api/JAVA_MUL_0004', {
            sapSystem: data?.sapSystem || "",
            client: data?.client || "",
            level: data?.level || null,
            riskType: data?.riskType || [],
            riskLevel: data?.riskLevel || [],
            businessModule: [],
            riskId: data?.riskId || [],
            userInput: data?.userInput || '',
            reportView: "2", // Technical report
            account: data?.account || [],
            userGroup: data?.userGroup || []
        }, { headers: { 'Authorisation': data.token } })
            .then(response => {
                dispatch({ type: actionType.UPDATE_GRCRISKTECH_REPORT, tableRiskTechReport: response.data })
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_LOADER_STATUS, data: false })
            });
    }
}
