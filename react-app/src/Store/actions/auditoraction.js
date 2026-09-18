import axios from 'axios';
import * as actionType from './actionsType';

export const getCrossSystemUsersReport = (token, filterData) => {
    return dispatch => {
        dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_USERS_LOADER, data: true });
        const payload = {
            sapSystem: filterData.sapSystem || '',
            client: filterData.client || '',
            userGroup: filterData.userGroup || [],
            userType: filterData.userType || [],
            account: filterData.account || [],
            licenseType: filterData.licenseType || [],
            logondays: filterData.logondays || '90',
            userId: filterData.userId || '',
            role: filterData.role || '',
            tcode: filterData.tcode || ''
        };

        axios.post('/api/JAVA_0011', payload, { headers: { 'Authorisation': token } })
            .then(response => {
                dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_USERS_LOADER, data: false });
                dispatch({ type: actionType.UPDATE_CROSS_SYSTEM_USERS_REPORT, data: response.data });
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_USERS_LOADER, data: false });
            });
    };
};

export const clearCrossSystemUsersReport = () => {
    return {
        type: actionType.CLEAR_CROSS_SYSTEM_USERS_REPORT
    };
};

export const getCrossSystemRolesReport = (token, filterData) => {
    return dispatch => {
        dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_ROLES_LOADER, data: true });
        const payload = {
            sapSystem: filterData.sapSystem || '',
            client: filterData.client || '',
            licenseType: filterData.licenseType || [],
            userId: filterData.userId || '',
            role: filterData.role || '',
            tcode: filterData.tcode || '',
            authObj: filterData.authObj || '',
            authField: filterData.authField || '',
            authVal: filterData.authVal || ''
        };

        console.log('%c=== SAP RFC /BOT/JAVA_0014 REQUEST PAYLOAD ===', 'color: #2563eb; font-weight: bold;', payload);

        axios.post('/api/JAVA_0014', payload, { headers: { 'Authorisation': token } })
            .then(response => {
                console.log('%c=== SAP RFC /BOT/JAVA_0014 OUTPUT DATA (E_RESULT_01) ===', 'color: #16a34a; font-weight: bold;', response.data?.data || []);
                console.log('%c=== SAP RFC HEADER (E_HEADER) ===', 'color: #0284c7; font-weight: bold;', response.data?.header || []);
                console.log('%c=== SAP RFC REPORT METADATA (E_REPORT) ===', 'color: #7c3aed; font-weight: bold;', response.data?.reportName || []);

                dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_ROLES_LOADER, data: false });
                dispatch({ type: actionType.UPDATE_CROSS_SYSTEM_ROLES_REPORT, data: response.data });
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_ROLES_LOADER, data: false });
                console.error("=== SAP RFC /BOT/JAVA_0014 ERROR ===", error);
            });
    };
};

export const clearCrossSystemRolesReport = () => {
    return {
        type: actionType.CLEAR_CROSS_SYSTEM_ROLES_REPORT
    };
};

export const getCrossSystemTcodesReport = (token, filterData) => {
    return dispatch => {
        dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_TCODES_LOADER, data: true });
        const payload = {
            sapSystem: filterData.sapSystem || '',
            client: filterData.client || '',
            type: filterData.type || '1',
            licenseType: filterData.licenseType || [],
            userId: filterData.userId || '',
            role: filterData.role || '',
            tcode: filterData.tcode || ''
        };

        console.log('%c=== SAP RFC /BOT/JAVA_0015 REQUEST PAYLOAD ===', 'color: #2563eb; font-weight: bold;', payload);

        axios.post('/api/JAVA_0015', payload, { headers: { 'Authorisation': token } })
            .then(response => {
                console.log('%c=== SAP RFC /BOT/JAVA_0015 OUTPUT DATA (E_RESULT_01) ===', 'color: #16a34a; font-weight: bold;', response.data?.data || []);
                console.log('%c=== SAP RFC HEADER (E_HEADER) ===', 'color: #0284c7; font-weight: bold;', response.data?.header || []);
                console.log('%c=== SAP RFC REPORT METADATA (E_REPORT) ===', 'color: #7c3aed; font-weight: bold;', response.data?.reportName || []);

                dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_TCODES_LOADER, data: false });
                dispatch({ type: actionType.UPDATE_CROSS_SYSTEM_TCODES_REPORT, data: response.data });
            })
            .catch(error => {
                dispatch({ type: actionType.CHANGE_CROSS_SYSTEM_TCODES_LOADER, data: false });
                console.error("=== SAP RFC /BOT/JAVA_0015 ERROR ===", error);
            });
    };
};

export const clearCrossSystemTcodesReport = () => {
    return {
        type: actionType.CLEAR_CROSS_SYSTEM_TCODES_REPORT
    };
};
