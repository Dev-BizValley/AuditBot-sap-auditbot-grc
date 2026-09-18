import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Login.css'
//import * as actionType from '../../Store/actions/actionsType'
import * as action from '../../Store/actions/index'
import Grid from '@material-ui/core/Grid';
import LicenceStackGraphCard from './LicenceStackGraphCard'






class LicenceFirstSection extends Component {

    componentDidMount() {

    }

    checkForDataToShow=(data)=>{
        if(data&&Object.keys(data).length>0){
            return true;
        }
        return false;
       }
    
 
    render() {

        let isDataReadtToShow=this.checkForDataToShow(this.props.licenseresult)

        return (
            <Grid container style={{marginTop:0}} spacing={2}>
                <Grid item md={6} sm={12}  style={{paddingTop:0}}>
                   {isDataReadtToShow && this.props.licenseresult?.E_REPORT?.data?.[0] ? (
                     <LicenceStackGraphCard 
                        chart='01' 
                        stack='3' 
                        color={this.props.colors} 
                        data={this.props.licenseresult.E_RESULT_01?.data || []} 
                        name={this.props.licenseresult.E_REPORT.data[0]?.ZDESC || ''} 
                        chartType={3} 
                        dialogueOpen={this.props.dialogueOpen} 
                        chartId="SEC11" 
                        chartdata={this.props.licenseresult.E_RESULT_00?.data || []} 
                        chartHeader={this.props.licenseresult.header?.data?.[0]?.ZDESC || ''}
                     />
                   ) : null}
                </Grid>
                <Grid item md={6} sm={12}  style={{paddingTop:0}}>
                   {isDataReadtToShow && this.props.licenseresult?.E_REPORT?.data?.[1] ? (
                     <LicenceStackGraphCard 
                        chart='02' 
                        stack='3' 
                        color={this.props.colors} 
                        data={this.props.licenseresult.E_RESULT_01?.data || []} 
                        name={this.props.licenseresult.E_REPORT.data[1]?.ZDESC || ''} 
                        chartType={3} 
                        dialogueOpen={this.props.dialogueOpen} 
                        chartId="SEC12" 
                        chartdata={this.props.licenseresult.E_RESULT_00?.data || []} 
                        chartHeader={this.props.licenseresult.header?.data?.[1]?.ZDESC || ''}
                     />
                   ) : null}
                </Grid>
                {/* <Grid item md={4}  style={{paddingTop:0}}>
                   {isDataReadtToShow? <LicenceStackGraphCard chart='03'  stack='3' color={this.props.colors} height={"33vh"} data={this.props.licenseresult.E_RESULT_01.data} name="License Savings" chartType={3}  dialogueOpen={this.props.dialogueOpen} chartId="SEC13" chartdata={this.props.licenseresult.E_RESULT_00.data} chartHeader={this.props.licenseresult.header.data}/> :null}
                </Grid> */}
            
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(LicenceFirstSection);//connect which return a HOC taking two parameters which help connect to redux store and component