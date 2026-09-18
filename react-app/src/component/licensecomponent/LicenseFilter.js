import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as action from '../../Store/actions/index';
import { getDynamicFont } from '../../theme';

import FilterSingleSelectDropDown from './FilterSingleSelectDropDown';
import FilterMultiSelectDropDown from './FilterMultiSelectDropDown';
import Datepicker from './Datepicker';
import LicenceTextFiled from './LicenceTextFiled';

const LicenseFilter = ({ type }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(true);

  // Redux State
  const token = useSelector(state => state.login.token);
  const dynamicColors = useSelector(state => state.licensefilter.colors) || [];
  const primaryColor = dynamicColors[0] || '#2563eb';
  const dynamicFont = getDynamicFont(dynamicColors);

  const sapSystem = useSelector(state => state.licensefilter.sapSystem);
  const client = useSelector(state => state.licensefilter.client);
  const level = useSelector(state => state.licensefilter.level);
  const userType = useSelector(state => state.licensefilter.userType);
  const userGroup = useSelector(state => state.licensefilter.userGroup);
  const account = useSelector(state => state.licensefilter.account);
  const licenseType = useSelector(state => state.licensefilter.licenseType);
  const userStatus = useSelector(state => state.licensefilter.userStatus);
  const activeUser = useSelector(state => state.licensefilter.activeUser);
  const tcodes = useSelector(state => state.licensefilter.tcodes);
  const criteria = useSelector(state => state.licensefilter.criteria);
  const userId = useSelector(state => state.licensefilter.userId);
  const count = useSelector(state => state.licensefilter.count);
  const logondays = useSelector(state => state.licensefilter.logondays);
  const startDate = useSelector(state => state.licensefilter.startDate);
  const endDate = useSelector(state => state.licensefilter.endDate);

  React.useEffect(() => {
    dispatch(action.changeuserId(''));
  }, [dispatch]);
  const onChangeFilter = (data, value) => dispatch(action.changeLicenceFilter(data, value));
  const onDateChange = (type, date) => {
    if (type === 'start') dispatch(action.changestartDate(date));
    else dispatch(action.changeendDate(date));
  };
  const onTextChange = (field, value) => {
    if (field === 'logon') dispatch(action.changelogon(value));
    else if (field === 'count') dispatch(action.changecount(value));
    else if (field === 'userId') dispatch(action.changeuserId(value));
  };

  const onFilterSubmit = () => {
    const params = [
      token, sapSystem.selectedValue, client.selectedValue, level.selectedValue,
      userType.selectedValue, userGroup.selectedValue, account.selectedValue,
      licenseType.selectedValue, userStatus.selectedValue, activeUser.selectedValue,
      tcodes.selectedValue, criteria.selectedValue, userId, count, logondays,
      startDate, endDate
    ];

    if (type === 'Dashbord') {
      dispatch(action.submitLicenceFilter(...params));
    } else {
      dispatch(action.licenceReport(...params));
    }
  };

  const mapValues = (obj, keyField = 'ZID') => 
    obj && obj.value ? obj.value.map(p => ({ key: p.ZDESC || p.ZID, value: p[keyField] })) : [];

  const mapSystemClient = (obj) => 
    obj && obj.value ? obj.value.map(p => ({ key: p.ZID, value: p.ZID })) : [];

  const executeBtnColor = (dynamicColors && dynamicColors.length > 9) ? dynamicColors[9] : primaryColor;

  return (
    <Box
      position="relative"
      width="100%"
      style={{
        minHeight: '0px',
        backgroundColor: isVisible ? 'transparent' : '#FFFFFF'
      }}
    >
      <Box
        display={isVisible ? "flex" : "none"}
        alignItems="center"
        flexWrap="wrap"
        width="100%"
        gridGap={8}
        py={1}
        px={0}
        style={{ paddingTop: '7px', paddingBottom: '7px' }}
      >
        <Box flex="0 0 auto" width={100}>
          <FilterSingleSelectDropDown values={mapValues(level)} preSelected={level.selectedValue} changeEventCallBack={(v) => onChangeFilter(level, v)} label="Level" />
        </Box>
        <Box flex="0 0 auto" width={150}>
          <Datepicker onchange={(d) => onDateChange('start', d)} value={startDate} label="Start Date" />
        </Box>
        <Box flex="0 0 auto" width={150}>
          <Datepicker onchange={(d) => onDateChange('end', d)} value={endDate} label="End Date" />
        </Box>
        <Box flex="0 0 auto" width={100}>
          <FilterMultiSelectDropDown values={mapSystemClient(sapSystem)} preSelected={sapSystem.selectedValue} changeEventCallBack={(v) => onChangeFilter(sapSystem, v)} label="System" />
        </Box>
        <Box flex="0 0 auto" width={100}>
          <FilterMultiSelectDropDown values={mapSystemClient(client)} preSelected={client.selectedValue} changeEventCallBack={(v) => onChangeFilter(client, v)} label="Client" />
        </Box>
        <Box flex="0 0 auto" width={140}>
          <FilterMultiSelectDropDown values={mapValues(licenseType)} preSelected={licenseType.selectedValue} changeEventCallBack={(v) => onChangeFilter(licenseType, v)} label="License Type" />
        </Box>
        <Box flex="0 0 auto" width={140}>
          <FilterMultiSelectDropDown values={mapValues(userGroup)} preSelected={userGroup.selectedValue} changeEventCallBack={(v) => onChangeFilter(userGroup, v)} label="User Group" />
        </Box>
        <Box flex="0 0 auto" width={140}>
          <FilterMultiSelectDropDown values={mapValues(userType)} preSelected={userType.selectedValue} changeEventCallBack={(v) => onChangeFilter(userType, v)} label="User Type" />
        </Box>
        <Box flex="0 0 auto" width={120}>
          <FilterMultiSelectDropDown values={mapValues(account)} preSelected={account.selectedValue} changeEventCallBack={(v) => onChangeFilter(account, v)} label="Account" />
        </Box>
        <Box flex="0 0 auto" width={130}>
          <FilterMultiSelectDropDown values={mapValues(userStatus)} preSelected={userStatus.selectedValue} changeEventCallBack={(v) => onChangeFilter(userStatus, v)} label="User Status" />
        </Box>
        <Box flex="0 0 auto" width={120}>
          <FilterSingleSelectDropDown values={mapValues(activeUser)} preSelected={activeUser.selectedValue} changeEventCallBack={(v) => onChangeFilter(activeUser, v)} label="Active User" />
        </Box>
        <Box flex="0 0 auto" width={160}>
          <FilterSingleSelectDropDown values={mapValues(tcodes)} preSelected={tcodes.selectedValue} changeEventCallBack={(v) => onChangeFilter(tcodes, v)} label="Tcodes" />
        </Box>
        <Box flex="0 0 auto" width={160}>
          <FilterSingleSelectDropDown values={mapValues(criteria)} preSelected={criteria.selectedValue} changeEventCallBack={(v) => onChangeFilter(criteria, v)} label="Criteria" />
        </Box>
        <Box flex="0 0 auto" width={130}>
          <LicenceTextFiled label="Logon Days" onchange={(v) => onTextChange('logon', v)} value={logondays} />
        </Box>
        <Box flex="0 0 auto" width={130}>
          <LicenceTextFiled label="% or Count" onchange={(v) => onTextChange('count', v)} value={count} />
        </Box>
        <Box flex="0 0 auto" width={160}>
          <LicenceTextFiled label="User Id" onchange={(v) => onTextChange('userId', v)} value={userId} />
        </Box>

        <Box flex="0 0 auto" style={{ alignSelf: 'center', marginLeft: 0 }}>
          <Button
            variant="contained"
            onClick={onFilterSubmit}
            style={{
              borderRadius: 8,
              padding: '0 16px',
              fontWeight: 400,
              fontFamily: dynamicFont,
              fontSize: '11px',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              height: '37px',
              backgroundColor: executeBtnColor,
              color: '#FFFFFF'
            }}
          >
            Execute
          </Button>
        </Box>
      </Box>

      {/* Decorative Gradient Lines (Left and Right) */}
      <div style={{
          position: 'absolute',
          bottom: isVisible ? '1px' : '-5px',
          right: 'calc(50% + 15px)',
          width: '20%',
          height: '1px',
          background: `linear-gradient(to left, ${primaryColor}, transparent)`,
          zIndex: 5,
          pointerEvents: 'none',
          transition: 'all 0.3s ease'
      }} />
      <div style={{
          position: 'absolute',
          bottom: isVisible ? '1px' : '-5px',
          left: 'calc(50% + 15px)',
          width: '20%',
          height: '1px',
          background: `linear-gradient(to right, ${primaryColor}, transparent)`,
          zIndex: 5,
          pointerEvents: 'none',
          transition: 'all 0.3s ease'
      }} />
      {/* Toggle Triangle */}
      <div 
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'absolute',
          bottom: isVisible ? '-1px' : '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: isVisible ? `10px solid ${primaryColor}` : 'none',
          borderTop: isVisible ? 'none' : `10px solid ${primaryColor}`,
          zIndex: 10,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
      }} />
    </Box>
  );
};

export default LicenseFilter;