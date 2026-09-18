import React, { Component } from 'react';
import { connect } from 'react-redux';
//import './Login.css'
//import * as actionType from '../../Store/actions/actionsType'
import * as action from '../../Store/actions/index'

import FilterSingleSelectDropDown from './FilterSingleSelectDropDown'
import FilterMultiSelectDropDown from './FilterMultiSelectDropDown'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
// import { MENU_FONT_FAMILY } from '../../theme';
import { getDynamicFont } from '../../theme';

const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 8,
        },
        '& .MuiOutlinedInput-input': {
            padding: '8.5px 14px',
        },
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px, 10px) scale(1)',
            color: '#000000de',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
            color: '#000000de',
        },
    },
})(TextField);


class GRCCompanyFilter extends Component {
    state = { isVisible: true };

    componentDidMount() {
        // Clear user input on refresh/mount
        if (this.props.changeUserInput) {
            this.props.changeUserInput("");
        }

        // if (this.props.type == 'Dashbord') {
        //     this.props.submitFilter(this.props.token, this.props.riskType.selectedValue,
        //         this.props.sapSystem.selectedValue, this.props.client.selectedValue,
        //         this.props.riskLevel.selectedValue, this.props.businessModule.selectedValue,
        //         this.props.level.selectedValue, this.props.breakDown.selectedValue,
        //         this.props.riskid.selectedValue, this.props.reportType.selectedValue,
        //         this.props.mitigation.selectedValue)
        // } else {
        //     this.props.submitGRCCompanyFilter(this.props.token,
        //         this.props.sapSystem.selectedValue,
        //         this.props.client.selectedValue,
        //         this.props.level.selectedValue,
        //         this.props.riskType.selectedValue,
        //         this.props.riskLevel.selectedValue,
        //         this.props.businessModule.selectedValue,
        //         this.props.mitigation.selectedValue,
        //         this.props.drillDown.selectedValue,
        //         this.props.riskid.selectedValue, null)
        // }
    }

    changeSystem = (value) => {
        this.props.onChangeFilter(this.props.sapSystem, value)
    }
    changeClient = (value) => {
        this.props.onChangeFilter(this.props.client, value)
    }

    changeLevel = (value) => {
        this.props.onChangeFilter(this.props.level, value);
    };

    changeRiskType = (value) => {
        this.props.onChangeFilter(this.props.riskType, value)
    }
    changeRiskLevel = (value) => {
        this.props.onChangeFilter(this.props.riskLevel, value)
    }
    changeBusinessModule = (value) => {
        this.props.onChangeFilter(this.props.businessModule, value)
    }

    changeMitigation = (value) => {
        this.props.onChangeFilter(this.props.mitigation, value)
    }

    changeRiskId = (value) => {
        this.props.onChangeFilter(this.props.riskid, value)
    }

    changeReportType = (value) => {
        this.props.onChangeFilter(this.props.reportType, value)
    }
    changeDrillDown = (value) => {
        this.props.onChangeFilter(this.props.drillDown, value)
    }

    changeAccount = (value) => {
        this.props.onChangeFilter(this.props.account, value);
    };

    changeUserGroup = (value) => {
        this.props.onChangeFilter(this.props.userGroup, value);
    };


    onfilterSumbit = () => {
        console.log('type', this.props.type);
        if (this.props.type == 'Dashbord') {
            this.props.submitFilter(this.props.token, this.props.riskType.selectedValue,
                this.props.sapSystem.selectedValue, this.props.client.selectedValue,
                this.props.riskLevel.selectedValue, this.props.businessModule.selectedValue,
                this.props.level.selectedValue, this.props.breakDown.selectedValue,
                this.props.riskid.selectedValue, this.props.reportType.selectedValue,
                this.props.mitigation.selectedValue, this.props.userinput, this.props.account.selectedValue, this.props.userGroup.selectedValue)
        } else {
            this.props.submitGRCCompanyFilter(this.props.token,
                this.props.sapSystem.selectedValue,
                this.props.client.selectedValue,
                this.props.level.selectedValue,
                this.props.riskType.selectedValue,
                this.props.riskLevel.selectedValue,
                this.props.businessModule.selectedValue,
                this.props.mitigation.selectedValue,
                this.props.drillDown.selectedValue,
                this.props.riskid.selectedValue, this.props.userinput, this.props.account.selectedValue, this.props.userGroup.selectedValue)
        }

    }
    render() {

        let level = Object.keys(this.props.level).length != 0 ?
            this.props.level.value.map((param) => {
                return { key: param.ZDESC, value: param.ZID };
            }) : []

        let sapSystem = Object.keys(this.props.sapSystem).length != 0 ?
            this.props.sapSystem.value.map((param) => {
                return { 'key': param.ZID, 'value': param.ZID };
            }) : []

        let sapClient = Object.keys(this.props.client).length != 0 ?
            this.props.client.value.map((param) => {
                return { 'key': param.ZID, 'value': param.ZID };
            }) : []
        let riskType = Object.keys(this.props.riskType).length != 0 ?
            this.props.riskType.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []
        let riskLevel = Object.keys(this.props.riskLevel).length != 0 ?
            this.props.riskLevel.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []
        let businessModule = Object.keys(this.props.businessModule).length != 0 ?
            this.props.businessModule.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []

        let mitigation = Object.keys(this.props.mitigation).length != 0 ?
            this.props.mitigation.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []

        let riskid = Object.keys(this.props.riskid).length != 0 ?
            this.props.riskid.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []

        let reportType = Object.keys(this.props.reportType).length != 0 ?
            this.props.reportType.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []
        let drillDown = Object.keys(this.props.drillDown).length != 0 ?
            this.props.drillDown.value.map((param) => {
                return { 'key': param.ZDESC, 'value': param.ZID };
            }) : []
        let account = Object.keys(this.props.account).length != 0 ?
            this.props.account.value.map((param) => {
                return { key: param.ZID, value: param.ZID };
            }) : []
        let userGroup = Object.keys(this.props.userGroup).length != 0 ?
            this.props.userGroup.value.map((param) => {
                return { key: param.ZID, value: param.ZID };
            }) : []

        const dynamicColors = this.props.colors || [];
        const primaryColor = (dynamicColors && dynamicColors.length > 0) ? dynamicColors[0] : '#e91e63';
        const executeBtnColor = (dynamicColors && dynamicColors.length > 9) ? dynamicColors[9] : primaryColor;
        // const dynamicFont = MENU_FONT_FAMILY;
        const dynamicFont = getDynamicFont(dynamicColors);

        return (
            <Box position="relative" width="100%" style={{ minHeight: '0px', backgroundColor: this.state.isVisible ? 'transparent' : '#FFFFFF' }}>
                <Box
                    display={this.state.isVisible ? "flex" : "none"}
                    alignItems="center"
                    flexWrap="nowrap"
                    width="100%"
                    gridGap={8}
                    py={1}
                    px={0}
                    style={{ overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', paddingTop: '7px', paddingBottom: '7px' }}
                    className="hide-scrollbar"
                >
                    <Box flex="0 0 80px" minWidth={80}>
                        <FilterSingleSelectDropDown values={level} preSelected={this.props.level.selectedValue} changeEventCallBack={this.changeLevel} label="Level" />
                    </Box>
                    <Box flex="0 0 80px" minWidth={80}>
                        <FilterSingleSelectDropDown values={sapSystem} preSelected={this.props.sapSystem.selectedValue} changeEventCallBack={this.changeSystem} label="System" />
                    </Box>
                    <Box flex="0 0 80px" minWidth={80}>
                        <FilterSingleSelectDropDown values={sapClient} preSelected={this.props.client.selectedValue} changeEventCallBack={this.changeClient} label="Client" />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={riskType} preSelected={this.props.riskType.selectedValue} changeEventCallBack={this.changeRiskType} label="Risk Type" />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={riskLevel} preSelected={this.props.riskLevel.selectedValue} changeEventCallBack={this.changeRiskLevel} label="Risk Level" />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={businessModule} preSelected={this.props.businessModule.selectedValue} changeEventCallBack={this.changeBusinessModule} label="Bus Module" />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={riskid} preSelected={this.props.riskid.selectedValue} changeEventCallBack={this.changeRiskId} label="Risk Id" />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={mitigation} preSelected={this.props.mitigation.selectedValue} changeEventCallBack={this.changeMitigation} label="Mitigation" />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={account} preSelected={this.props.account.selectedValue} changeEventCallBack={this.changeAccount} label={this.props.account.name || "Account"} />
                    </Box>
                    <Box flex="0 0 120px" minWidth={120}>
                        <FilterMultiSelectDropDown values={userGroup} preSelected={this.props.userGroup.selectedValue} changeEventCallBack={this.changeUserGroup} label={this.props.userGroup.name || "User Group"} />
                    </Box>

                    {this.props.type === 'Report' && (
                        <Box flex="1 1 140px" minWidth={140} maxWidth={200}>
                            <CssTextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                label={this.props.level.selectedValue === '1' ? "User" : "Role"}
                                value={this.props.userinput || ''}
                                onChange={(e) => this.props.changeUserInput(e.target.value)}
                                InputProps={{ style: { fontSize: '0.75rem', fontFamily: dynamicFont } }}
                                InputLabelProps={{
                                    shrink: !!this.props.userinput || undefined,
                                    style: { fontSize: '0.75rem', fontFamily: dynamicFont }
                                }}
                            />
                        </Box>
                    )}

                    <Box flex="0 0 auto" style={{ alignSelf: 'center', marginLeft: 0 }}>
                        <Button
                            variant="contained"
                            onClick={() => this.onfilterSumbit()}
                            style={{
                                borderRadius: 8,
                                padding: '0 16px',
                                fontWeight: 400,
                                fontFamily: dynamicFont,
                                fontSize: '11px',
                                textTransform: 'none',
                                whiteSpace: 'nowrap',
                                height: '30px',
                                backgroundColor: executeBtnColor,
                                color: '#FFFFFF',
                                boxShadow: 'none'
                            }}
                        >
                            Execute
                        </Button>
                    </Box>
                </Box>
                {/* Decorative Gradient Lines (Left and Right) */}
                <div style={{
                    position: 'absolute',
                    bottom: this.state.isVisible ? '1px' : '-5px',
                    right: 'calc(50% + 15px)',
                    width: '20%',
                    height: '1px',
                    background: `linear-gradient(to left, ${primaryColor}, transparent)`,
                    zIndex: 1200,
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: this.state.isVisible ? '1px' : '-5px',
                    left: 'calc(50% + 15px)',
                    width: '20%',
                    height: '1px',
                    background: `linear-gradient(to right, ${primaryColor}, transparent)`,
                    zIndex: 1200,
                    pointerEvents: 'none',
                    transition: 'all 0.3s ease'
                }} />
                <div
                    onClick={() => this.setState({ isVisible: !this.state.isVisible })}
                    style={{
                        position: 'absolute',
                        bottom: this.state.isVisible ? '-1px' : '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderBottom: this.state.isVisible ? `10px solid ${primaryColor}` : 'none',
                        borderTop: this.state.isVisible ? 'none' : `10px solid ${primaryColor}`,
                        zIndex: 1300,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }} />
            </Box>
        );
        //     </Grid>

        // </Grid>

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
        account: state.filter.account,
        userGroup: state.filter.userGroup,
        colors: state.filter.colors,
    };

}

const mapDispatchToProps = dispatch => { // this methos used for dispatch action to reducer
    return {
        loadFilter: (token) => dispatch(action.initFilter(token)),
        onChangeFilter: (data, value) => dispatch(action.changeFilter(data, value)),
        changeUserInput: (value) => dispatch(action.changeUserInput(value)),
        // changeLevel: (level) => dispatch(action.changeLevel(level)),
        submitFilter: (token, riskType, sapSystem, client, riskLevel, businessModule, level, breakDown, riskId, reportType, mitigation, userinput, account, userGroup) => dispatch(action.submitFilter({ data: { token, riskType, sapSystem, client, riskLevel, businessModule, level, breakDown, riskId, reportType, mitigation, userInput: userinput, account, userGroup } })),
        submitGRCCompanyFilter: (token, sapSystem, client, level, riskType, riskLevel, businessModule, mitigation, drillDown, riskId, userinput, account, userGroup) => dispatch(action.riskGrcCompanyReport({ data: { token, sapSystem, client, level, riskType, riskLevel, businessModule, mitigation, drillDown, riskId, userInput: userinput, account, userGroup } }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GRCCompanyFilter);//connect which return a HOC taking two parameters which help connect to redux store and component