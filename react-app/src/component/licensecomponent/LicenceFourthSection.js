import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Login.css'
//import * as actionType from '../../Store/actions/actionsType'
import * as action from '../../Store/actions/index'

import LoginCard from '../LoginCard'
import Grid from '@material-ui/core/Grid';

import LicenceGraphCard from './LicenceGraphCard'
import LicenceStackGraphCard from './LicenceStackGraphCard'





class LicenceFourthSection extends Component {

    componentDidMount() {

    }

    checkForDataToShow=(data)=>{
        if(data&&Object.keys(data).length>0){
            return true;
        }
        return false;
       }

    graphNameOnReportType=()=>{
       if(this.props.reportTypeSelected=='1'){
           return 'Risk Type'
       }
       if(this.props.reportTypeSelected=='2'){
        return 'Risk Level'
        }
        if(this.props.reportTypeSelected=='3'){
            return 'Business Module'
        }
    }   

 
    render() {

        let isDataReadtToShow=this.checkForDataToShow(this.props.licenseresult)

        return (
            <Grid container style={{marginTop:0}} spacing={2}>
                <Grid item md={6} sm={12}  style={{paddingTop:0}}>
                   {isDataReadtToShow && this.props.licenseresult?.E_REPORT?.data?.[2] ? (
                     <LicenceStackGraphCard  
                        chart='03'   
                        stack='3' 
                        color={this.props.colors} 
                        data={this.props.licenseresult.E_RESULT_01?.data || []} 
                        name={this.props.licenseresult.E_REPORT.data[2]?.ZDESC || ''} 
                        chartType={3}  
                        dialogueOpen={this.props.dialogueOpen} 
                        chartId="SEC111" 
                        chartdata={this.props.licenseresult.E_RESULT_00?.data || []} 
                        chartHeader={this.props.licenseresult.header?.data?.[2]?.ZDESC || ''} 
                     />
                   ) : null}
                </Grid> 
                <Grid item  md={6} sm={12}  style={{paddingTop:0}}>
                   {isDataReadtToShow && this.props.licenseresult?.E_REPORT?.data?.[3] ? (
                     <LicenceGraphCard 
                        chart='01' 
                        stack={true} 
                        color={this.props.colors} 
                        data={this.props.licenseresult.E_RESULT_03?.data || []} 
                        name={this.props.licenseresult.E_REPORT.data[3]?.ZDESC || ''}  
                        chartType={5} 
                        dialogueOpen={this.props.dialogueOpen} 
                        chartId="SEC333" 
                        chartdata={this.props.licenseresult.E_RESULT_00?.data || []} 
                        chartHeader={this.props.licenseresult.header?.data?.[3]?.ZDESC || ''}
                     />
                   ) : null}
                </Grid>
                {/* <Grid item md={2} style={{paddingTop:0}}>
                   {isDataReadtToShow? <LicenceGraphCard chart='01' stack={false} color={this.props.colors}  data={this.props.result.E_RESULT_04.data} name="Top Prof user with doc" chartType={3} dialogueOpen={this.props.dialogueOpen} chartId="SEC32" /> :null}
                </Grid>
                <Grid item md={2} style={{paddingTop:0}}>
                   {isDataReadtToShow? <LicenceGraphCard chart='02' stack={false} color={this.props.colors} data={this.props.result.E_RESULT_04.data} name="Top Users with indirect Usage"  chartType={3}  dialogueOpen={this.props.dialogueOpen} chartId="SEC32"/> :null}
                </Grid>
                <Grid item md={2} style={{paddingTop:0}}>
                   {isDataReadtToShow? <LicenceGraphCard chart='03' stack={false} color={this.props.colors} data={this.props.result.E_RESULT_04.data} name="Top Users with Multiple Logon" chartType={1}  dialogueOpen={this.props.dialogueOpen} chartId="SEC34"/> :null}
                </Grid>
                <Grid item md={2} style={{paddingTop:0}}>
                   {isDataReadtToShow? <LicenceGraphCard chart='04' stack={false} color={this.props.colors} data={this.props.result.E_RESULT_04.data} name="Top USMM Enginee Usage" chartType={1}  dialogueOpen={this.props.dialogueOpen} chartId="SEC34"/> :null}
                </Grid>   */}
              
            </Grid>


        )


    }
}

const mapStateToProps = state => {    //this methos use to retrive state from redux store as props
    return {
        token: state.login.token, //state.reducername.value
        isUserLogedIn: state.login.isUserLogedIn,
        licenseresult:state.licensefilter.licenseresult,
        colors:state.licensefilter.colors

    };

}

const mapDispatchToProps = dispatch => { // this methos used for dispatch action to reducer
    return {
       
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LicenceFourthSection);//connect which return a HOC taking two parameters which help connect to redux store and component