import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Login.css'
//import * as actionType from '../../Store/actions/actionsType'
import LicenceDraggableDialog from '../component/licensecomponent/LicenceDraggableDialog'
import * as action from '../Store/actions/index'




class LicenceDragableDialogue extends Component {

    componentDidMount() {
        this.props.licenceTableReport(this.props.token, this.props.sapSystem.filtered,
            this.props.client.filtered, this.props.level.filtered,
            this.props.userType.filtered, this.props.userGroup.filtered,
            this.props.account.filtered, [this.props.groupby],
            this.props.userStatus.filtered, this.props.activeUser.filtered,
            this.props.tcodes.filtered,this.props.criteria.filtered,
            this.props.userId,this.props.count,
            this.props.logondays,this.props.startDate,this.props.endDate)
    }
        


    
    
    

 

    render() {
        

        return (
            <div>
          {this.props.dialogueState && !this.props.loader && Object.keys(this.props.licensetablereport).length>0?<LicenceDraggableDialog dialogueState={this.props.dialogueState} colors={this.props.colors} header={this.props.licensetablereport.header} data={this.props.licensetablereport.data} name={this.props.licensetablereport.reportName && this.props.licensetablereport.reportName[0] ? this.props.licensetablereport.reportName[0] : "License Details"} closeDialogue={this.props.closeDialogue}/>:null}
          </div>
        )


    }
}

const mapStateToProps = state => {    //this methos use to retrive state from redux store as props
     return {
        token: state.login.token, //state.reducername.value
        sapSystem: state.licensefilter.sapSystem,
        client: state.licensefilter.client,
        level: state.licensefilter.level,
        userType: state.licensefilter.userType,
        userGroup: state.licensefilter.userGroup,
        account: state.licensefilter.account,
        licenseType: state.licensefilter.licenseType,
        userStatus: state.licensefilter.userStatus,
        activeUser: state.licensefilter.activeUser,
        tcodes: state.licensefilter.tcodes,
        criteria: state.licensefilter.criteria,
        userId:state.licensefilter.filtereduserId,
        count: state.licensefilter.filteredcount,
        logondays: state.licensefilter.filteredlogondays,
        startDate: state.licensefilter.filteredstartDate,
        endDate: state.licensefilter.filteredendDate,
        licensetablereport:state.licensefilter.licensetablereport,
        loader:state.licensefilter.loader,
        colors:state.licensefilter.colors
        
    };
}

const mapDispatchToProps = dispatch => { // this methos used for dispatch action to reducer
     return {
        licenceTableReport: (token, sapSystem, client, level, userType, userGroup, 
            account, licenseType, userStatus, activeUser, tcodes,criteria,userId,count,logondays,startDate,endDate)=>dispatch(action.licenceTableReport(token, sapSystem, client, level, userType, userGroup, 
                account, licenseType, userStatus, activeUser, tcodes,criteria,userId,count,logondays,startDate,endDate))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LicenceDragableDialogue);//connect which return a HOC taking two parameters which help connect to redux store and component

