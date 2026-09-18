import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Login.css'
//import * as actionType from '../../Store/actions/actionsType'
import * as action from '../../Store/actions/index'

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import GRCStackGraphCard from './GRCStackGraphCard'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Typography } from '@material-ui/core';
import ControlCameraIcon from '@material-ui/icons/ControlCamera'
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReportIcon from '@material-ui/icons/Report';
import ReportOffIcon from '@material-ui/icons/ReportOff';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    rounded: {
        color: '#FFFFFF',
        backgroundColor: '#009ed7',
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginTop:'20%'
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    Labeltext:{
        // fontFamily:'Helvetica',
        fontSize:10
    },
    roundedSecond: {
        color: '#FFFFFF',
        backgroundColor: '#00A158',
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginTop:'20%'
    },
    roundedThird: {
        color: '#FFFFFF',
        backgroundColor: '#c91e8d',
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginTop:'20%'
    },
    roundedFourth: {
        color: '#FFFFFF',
        backgroundColor: '#0057BE',
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginTop:'20%'
    },
    autoMarginTopBottom:{
        marginTop:'auto',
        marginBottom:'auto'
    }


}));


const GRCSecondSecData = (props) => {



    const checkForDataToShow = (data) => {
        if (data && Object.keys(data).length > 0) {
            return true;
        }
        return false;
    }



    const classes = useStyles();
    let isDataReadtToShow = checkForDataToShow(props.result)

    return (

        <Grid container style={{ marginTop:5 }} spacing={0}>
            <Grid item md={12} >
            {isDataReadtToShow ?
                <Card elevation='5' style={{border:'2px solid #009ED7'}}>
                   
                        <CardContent style={{ padding: 2, height:"8vh" }}>
                            <Grid container spacing={1} style={{ height:"inherit",width: '100%', margin: 0 }}>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>

                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.rounded}>
                                        <ControlCameraIcon />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[0].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[0].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        

                                </Grid>
                                
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center'style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.rounded}>
                                        <FilterCenterFocusIcon />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}> 
                                            {props.result.E_RESULT_02.data[1].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[1].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.rounded}>
                                        <FilterTiltShiftIcon />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[2].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[2].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedSecond}>
                                        <ExploreIcon />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[3].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[3].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedSecond}>
                                        <ExploreOffIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[4].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[4].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedThird}>
                                        <PeopleIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[5].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[5].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedThird}>
                                        <AccountBoxIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[6].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[6].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedThird}>
                                        <PersonIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[7].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[7].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center'style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedThird}>
                                        <PersonAddDisabledIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[8].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[8].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedFourth}>
                                        <ReportProblemIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[9].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[9].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedFourth}>
                                        <ReportIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[10].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[10].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>
                                <Grid item md={1} className={classes.autoMarginTopBottom}>
                                <Grid container spacing={0}>
                                 <Grid item sm={3} alignContent='center' alignItems='center' style={{ margin: 'auto' }}>
                                 <Avatar variant="rounded" className={classes.roundedFourth}>
                                        <ReportOffIcon  />
                                    </Avatar>
                                     </Grid>
                                     <Grid item sm={9}> 
                                     <Typography variant="caption" display="block" className={classes.Labeltext}>
                                            {props.result.E_RESULT_02.data[11].COL1}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                        {props.result.E_RESULT_02.data[11].ZCOUNT}
                                        </Typography>
                                     </Grid>   
                                     </Grid>
        
                                </Grid>

                            </Grid>

                            {/* <Grid container spacing={1}>
                                <Grid item md={4}>
                                    <FilterMultiSelectDropDown values={riskid} preSelected={this.props.riskid.selectedValue} changeEventCallBack={this.changeRiskId} label="Risk Id" width='100' />
                                </Grid>
                                <Grid item md={2}>
                                    <FilterSingleSelectDropDown values={mitigation} preSelected={this.props.risk.selectedValue} changeEventCallBack={this.changeMitigation} label="Mitigation" width='100' />
                                </Grid>
                                <Grid item md={2}>
                                    <FilterSingleSelectDropDown values={reportType} preSelected={this.props.reportType.selectedValue} changeEventCallBack={this.changeReportType} label="Report Type" width='100' />
                                </Grid>
                                <Grid item md={2}>

                                </Grid>
                                <Grid item md={2}>
                                    <Button variant="contained" color="primary"  onClick={()=>this.onfilterSumbit()}>
                                      Search
                                    </Button>
                                </Grid>

                            </Grid> */}
                        </CardContent>
                       
                </Card>
                 : null}
            </Grid>

        </Grid>





    )


}



export default GRCSecondSecData;//connect which return a HOC taking two parameters which help connect to redux store and component