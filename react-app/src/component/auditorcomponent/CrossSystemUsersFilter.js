import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as action from '../../Store/actions/index';
import { getDynamicFont } from '../../theme';
import FilterSingleSelectDropDown from '../licensecomponent/FilterSingleSelectDropDown';
import FilterMultiSelectDropDown from '../licensecomponent/FilterMultiSelectDropDown';
import LicenceTextFiled from '../licensecomponent/LicenceTextFiled';

const CrossSystemUsersFilter = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.login?.token);

  // Unconditional hook calls for dynamic theme
  const licenseFilterColors = useSelector(state => state.licensefilter?.colors);
  const filterColors = useSelector(state => state.filter?.colors);
  const dynamicColors = licenseFilterColors || filterColors || [];

  const primaryColor = dynamicColors[0] || '#2563eb';
  const executeBtnColor = (dynamicColors && dynamicColors.length > 9) ? dynamicColors[9] : primaryColor;
  const dynamicFont = getDynamicFont(dynamicColors);

  // Unconditional hook calls for System & Client dropdown options
  const filterSapSystem = useSelector(state => state.filter?.sapSystem);
  const licenseSapSystem = useSelector(state => state.licensefilter?.sapSystem);
  const sapSystemsList = filterSapSystem || licenseSapSystem;

  const filterClient = useSelector(state => state.filter?.client);
  const licenseClient = useSelector(state => state.licensefilter?.client);
  const clientList = filterClient || licenseClient;

  // Unconditional hook calls for User Group, User Type, Account, License Type
  const licenseUserGroup = useSelector(state => state.licensefilter?.userGroup);
  const filterUserGroupState = useSelector(state => state.filter?.userGroup);
  const filterUserGroup = licenseUserGroup || filterUserGroupState;

  const licenseUserType = useSelector(state => state.licensefilter?.userType);
  const filterUserTypeState = useSelector(state => state.filter?.userType);
  const filterUserType = licenseUserType || filterUserTypeState;

  const licenseAccount = useSelector(state => state.licensefilter?.account);
  const filterAccountState = useSelector(state => state.filter?.account);
  const filterAccount = licenseAccount || filterAccountState;

  const licenseLicenseType = useSelector(state => state.licensefilter?.licenseType);
  const filterLicenseTypeState = useSelector(state => state.filter?.licenseType);
  const filterLicenseType = licenseLicenseType || filterLicenseTypeState;

  const [sapSystem, setSapSystem] = useState('SR1');
  const [client, setClient] = useState('100');
  const [userGroup, setUserGroup] = useState([]);
  const [userType, setUserType] = useState([]);
  const [account, setAccount] = useState([]);
  const [licenseType, setLicenseType] = useState([]);
  const [logondays, setLogondays] = useState('90');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [tcode, setTcode] = useState('');

  useEffect(() => {
    if (token) {
      if (!sapSystemsList || !sapSystemsList.value) {
        dispatch(action.initFilter(token));
      }
      if (!filterLicenseType || !filterLicenseType.value) {
        dispatch(action.initLicenseFilter(token));
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    setUserGroup([]);
    setUserType([]);
    setAccount([]);
    setLicenseType([]);
    setUserId('');
    setRole('');
    setTcode('');
  }, []);

  const mapSystemClient = (obj) =>
    obj && obj.value ? obj.value.map(p => ({ key: p.ZID, value: p.ZID })) : [];

  const mapDropdownValues = (obj) =>
    obj && obj.value ? obj.value.map(p => ({ key: p.ZDESC || p.ZID, value: p.ZID })) : [];

  const onFilterSubmit = () => {
    const filterPayload = {
      sapSystem,
      client,
      userGroup: Array.isArray(userGroup) ? userGroup : (userGroup ? [userGroup] : []),
      userType: Array.isArray(userType) ? userType : (userType ? [userType] : []),
      account: Array.isArray(account) ? account : (account ? [account] : []),
      licenseType: Array.isArray(licenseType) ? licenseType : (licenseType ? [licenseType] : []),
      logondays,
      userId,
      role,
      tcode
    };
    dispatch(action.getCrossSystemUsersReport(token, filterPayload));
  };

  return (
    <Box position="relative" width="100%" style={{ minHeight: '0px', backgroundColor: 'transparent' }}>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        width="100%"
        gridGap={8}
        py={1}
        px={0}
        style={{ paddingTop: '7px', paddingBottom: '7px' }}
      >
        {/* System */}
        <Box flex="0 0 auto" width={95}>
          <FilterSingleSelectDropDown
            values={mapSystemClient(sapSystemsList)}
            preSelected={sapSystem}
            changeEventCallBack={(v) => setSapSystem(v)}
            label="System"
          />
        </Box>

        {/* Client */}
        <Box flex="0 0 auto" width={95}>
          <FilterSingleSelectDropDown
            values={mapSystemClient(clientList)}
            preSelected={client}
            changeEventCallBack={(v) => setClient(v)}
            label="Client"
          />
        </Box>

        {/* User Group (Multi-select Checkboxes) */}
        <Box flex="0 0 auto" width={115}>
          <FilterMultiSelectDropDown
            values={mapDropdownValues(filterUserGroup)}
            preSelected={userGroup}
            changeEventCallBack={(v) => setUserGroup(v)}
            label="User Group"
          />
        </Box>

        {/* User Type (Multi-select Checkboxes) */}
        <Box flex="0 0 auto" width={115}>
          <FilterMultiSelectDropDown
            values={mapDropdownValues(filterUserType)}
            preSelected={userType}
            changeEventCallBack={(v) => setUserType(v)}
            label="User Type"
          />
        </Box>

        {/* Account (Multi-select Checkboxes) */}
        <Box flex="0 0 auto" width={115}>
          <FilterMultiSelectDropDown
            values={mapDropdownValues(filterAccount)}
            preSelected={account}
            changeEventCallBack={(v) => setAccount(v)}
            label="Account"
          />
        </Box>

        {/* License Type (Multi-select Checkboxes) */}
        <Box flex="0 0 auto" width={115}>
          <FilterMultiSelectDropDown
            values={mapDropdownValues(filterLicenseType)}
            preSelected={licenseType}
            changeEventCallBack={(v) => setLicenseType(v)}
            label="License Type"
          />
        </Box>

        {/* Logon Days (default 90) */}
        <Box flex="0 0 auto" width={85}>
          <LicenceTextFiled label="Logon Days" value={logondays} onchange={(v) => setLogondays(v)} />
        </Box>

        {/* User Id */}
        <Box flex="0 0 auto" width={115}>
          <LicenceTextFiled label="User Id" value={userId} onchange={(v) => setUserId(v)} />
        </Box>

        {/* Role */}
        <Box flex="0 0 auto" width={115}>
          <LicenceTextFiled label="Role" value={role} onchange={(v) => setRole(v)} />
        </Box>

        {/* TCode */}
        <Box flex="0 0 auto" width={115}>
          <LicenceTextFiled label="TCode" value={tcode} onchange={(v) => setTcode(v)} />
        </Box>

        {/* Execute Button */}
        <Box flex="0 0 auto" ml={1}>
          <Button
            variant="contained"
            size="small"
            onClick={onFilterSubmit}
            style={{
              backgroundColor: executeBtnColor,
              color: '#FFFFFF',
              borderRadius: '8px',
              fontFamily: dynamicFont,
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'none',
              height: '37px',
              boxShadow: 'none'
            }}
            startIcon={<SearchIcon style={{ fontSize: '16px' }} />}
          >
            Execute
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CrossSystemUsersFilter;
