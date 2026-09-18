import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Login.css'
//import * as actionType from '../../Store/actions/actionsType'
import GRCDraggableDialog from '../component/grccomponent/GRCDraggableDialog'
import * as action from '../Store/actions/index'




class GRCDragableDialogue extends Component {

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.dialogueState && !prevProps.dialogueState) ||
            (this.props.groupby !== prevProps.groupby) ||
            (this.props.chart !== prevProps.chart)) {
            this.getData();
        }
    }

    getData() {
        console.log("[GRC-DIALOG-TRACE] Dialog received props -> Chart:", this.props.chart, "barNumber prop:", this.props.barNumber, "groupby:", this.props.groupby);
        const { chart, groupby, barNumber, token, sapSystem, client, level, riskType, riskLevel, businessModule, mitigation, riskid, userinput, account, userGroup, riskReport } = this.props;

        // 1. Resolve drillDown level
        let finalDrillDown = (barNumber !== undefined && barNumber !== false && barNumber !== null)
            ? barNumber
            : (this.props.drillDown.selectedValue || 1);

        console.log("[GRC-DIALOG-TRACE] Calculated finalDrillDown:", finalDrillDown);

        // 2. Resolve Report Level (User/Role/Risk)
        let finalLevel = (chart === "SEC1" || chart === "SEC2") ? level.filtered : "1";

        // 3. Always read confirmed applied filters (.filtered = last searched values)
        let drilldownRiskType       = Array.isArray(riskType)       ? [...riskType]       : [...(riskType?.filtered       || riskType?.selectedValue       || [])];
        let drilldownRiskLevel      = Array.isArray(riskLevel)      ? [...riskLevel]      : [...(riskLevel?.filtered      || riskLevel?.selectedValue      || [])];
        let drilldownBusinessModule = Array.isArray(businessModule) ? [...businessModule] : [...(businessModule?.filtered || businessModule?.selectedValue || [])];
        let drilldownUserInput      = (typeof userinput === 'string') ? userinput          : (userinput?.filtered          || userinput?.selectedValue       || "");

        const activeGroupby = (groupby || "").trim();

        if (activeGroupby) {
            const chartId = (chart || "").toUpperCase();
            console.log("[GRC-FILTER-TRACE] Drilling down — Chart:", chartId, "activeGroupby:", activeGroupby, "finalDrillDown:", finalDrillDown);

            // GROUPBY1 from the backend is already the correct code ("S", "G", "T").
            // For user-based charts (SEC15, SEC34), GROUPBY1 is a user ID — route to userInput.
            // For all other charts, GROUPBY1 is a risk type code — use directly as riskType.
            // All other applied filters (riskLevel, businessModule) are PRESERVED from .filtered.
            if (chartId === 'SEC15' || chartId === 'SEC34') {
                drilldownUserInput  = activeGroupby;  // user ID → userInput
                // drilldownRiskType kept from .filtered
            } else {
                drilldownRiskType   = [activeGroupby]; // "S", "G", "T" — use directly
                // drilldownRiskLevel and drilldownBusinessModule kept from .filtered
            }
        }

        const resolvedDrillDownParam = (!isNaN(finalDrillDown) && finalDrillDown !== "2" && finalDrillDown !== 2 && finalDrillDown !== "1" && finalDrillDown !== 1) ? Number(finalDrillDown) : String(finalDrillDown);
        console.log("[GRC-API-TRACE] Dispatching riskReport API call -> Chart:", chart, "drillDown parameter sent:", resolvedDrillDownParam, "riskType:", drilldownRiskType);

        // Dispatch risk report API call — all params use .filtered (confirmed applied values)
        riskReport(
            token,
            sapSystem?.filtered  || sapSystem?.selectedValue  || (typeof sapSystem === 'string' ? sapSystem : ""),
            client?.filtered     || client?.selectedValue     || (typeof client === 'string' ? client : ""),
            level?.filtered      || level?.selectedValue      || (typeof level === 'string' ? level : "1"),
            drilldownRiskType,
            drilldownRiskLevel,
            drilldownBusinessModule,
            mitigation?.filtered || mitigation?.selectedValue || (typeof mitigation === 'string' ? mitigation : null),
            resolvedDrillDownParam,
            riskid?.filtered     || (Array.isArray(riskid) ? riskid : []),
            drilldownUserInput,
            account?.filtered    || account?.selectedValue    || (Array.isArray(account) ? account : []),
            userGroup?.filtered  || userGroup?.selectedValue  || (Array.isArray(userGroup) ? userGroup : [])
        );
    }








    render() {
        const { tableReport, chart, barNumber, drillDown } = this.props;

        if (!tableReport || Object.keys(tableReport).length === 0) return null;

        // Recalculate finalDrillDown for alignment logic
        const finalDrillDown = (barNumber !== undefined && barNumber !== false && barNumber !== null)
            ? barNumber
            : (drillDown.selectedValue || 1);

        const reportTitle = tableReport.reportName && tableReport.reportName[0] ? tableReport.reportName[0] : "Report Detail";
        console.log("[GRC-RENDER-TRACE] Dialog Rendering Table -> Chart:", chart, "Title:", reportTitle, "Total Records:", tableReport.data ? tableReport.data.length : 0);
        if (tableReport.data && tableReport.data.length > 0) {
            console.log("[GRC-DATA-DEBUG] First row data object keys and values:", JSON.stringify(tableReport.data[0]));
        }
        console.log("[GRC-KEYS-DEBUG] chart:", chart, "finalDrillDown:", finalDrillDown, "barNumber:", barNumber, "drillDown.selectedValue:", drillDown?.selectedValue);

        let processedHeader = [...(tableReport.header || [])];
        let processedData   = [...(tableReport.data   || [])];

        // Always derive keys dynamically from actual API response.
        // Slice to header length to align columns exactly and exclude extra backend fields (e.g. FP_IND).
        let processedKeys = processedData.length > 0
            ? Object.keys(processedData[0]).slice(0, processedHeader.length)
            : null;

        return (
            <div>
                <GRCDraggableDialog
                    dialogueState={this.props.dialogueState}
                    colors={this.props.colors}
                    header={processedHeader}
                    data={processedData}
                    keys={processedKeys}
                    name={tableReport.reportName && tableReport.reportName[0] ? tableReport.reportName[0] : "Report Detail"}
                    closeDialogue={this.props.closeDialogue}
                    // Pass filter context for redirection
                    filterContext={{
                        sapSystem: this.props.sapSystem,
                        client: this.props.client,
                        level: this.props.level,
                        riskType: this.props.riskType,
                        riskLevel: this.props.riskLevel,
                        account: this.props.account,
                        userGroup: this.props.userGroup,
                        reportType: this.props.reportType
                    }}
                >
                    <div style={{ background: 'red', color: 'white', padding: '5px', fontSize: '12px' }}>
                        DEBUG: chart={this.props.chart}, groupby={this.props.groupby}, barNumber={this.props.barNumber}
                    </div>
                </GRCDraggableDialog>
            </div>
        );
    }
}

const mapStateToProps = state => {    //this methos use to retrive state from redux store as props
    return {
        token: state.login.token, //state.reducername.value
        isUserLogedIn: state.login.isUserLogedIn,
        username: state.login.username,
        riskType: state.filter.riskType,
        sapSystem: state.filter.sapSystem,
        client: state.filter.client,
        riskLevel: state.filter.riskLevel,
        businessModule: state.filter.businessModule,
        mitigation: state.filter.mitigation,
        level: state.filter.level,
        reportType: state.filter.reportType,
        riskid: state.filter.riskid,
        drillDown: state.filter.drillDown,
        breakDown: state.filter.breakDown,
        result: state.filter.result,
        userinput: state.filter.userinput,
        tableReport: state.filter.tableReport,
        levelSelected: state.filter.levelSelected,
        reportTypeSelected: state.filter.reportTypeSelected,
        colors: state.filter.colors,
        account: state.filter.account,
        userGroup: state.filter.userGroup,
    };
}

const mapDispatchToProps = dispatch => { // this methos used for dispatch action to reducer
    return {
        riskReport: (token, sapSystem, client, level, riskType, riskLevel, businessModule, mitigation, drillDown, riskId, userInput, account, userGroup) => dispatch(action.riskReport({ data: { token, sapSystem, client, level, riskType, riskLevel, businessModule, mitigation, drillDown, riskId, userInput, account, userGroup } })),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GRCDragableDialogue);//connect which return a HOC taking two parameters which help connect to redux store and component

