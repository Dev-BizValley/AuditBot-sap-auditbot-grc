import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, RadioGroup, FormControlLabel, Radio, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as action from '../../Store/actions/index';
import { getDynamicFont } from '../../theme';
import FilterSingleSelectDropDown from '../licensecomponent/FilterSingleSelectDropDown';
import FilterMultiSelectDropDown from '../licensecomponent/FilterMultiSelectDropDown';
import LicenceTextFiled from '../licensecomponent/LicenceTextFiled';

const CrossSystemTCodesFilter = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.login?.token);

  // Unconditional hook calls for dynamic theme
  const licenseFilterColors = useSelector(state => state.licensefilter?.colors);
  const filterColors = useSelector(state => state.filter?.colors);
  const dynamicColors = licenseFilterColors || filterColors || [];

  const primaryColor = dynamicColors[0] || '#2563eb';
  const executeBtnColor = (dynamicColors && dynamicColors.length > 9) ? dynamicColors[9] : (dynamicColors[0] || '#f97316');
  const dynamicFont = getDynamicFont(dynamicColors);

  // System & Client dropdown options
  const filterSapSystem = useSelector(state => state.filter?.sapSystem);
  const licenseSapSystem = useSelector(state => state.licensefilter?.sapSystem);
  const sapSystemsList = filterSapSystem || licenseSapSystem;

  const filterClient = useSelector(state => state.filter?.client);
  const licenseClient = useSelector(state => state.licensefilter?.client);
  const clientList = filterClient || licenseClient;

  // License Type options
  const licenseLicenseType = useSelector(state => state.licensefilter?.licenseType);
  const filterLicenseTypeState = useSelector(state => state.filter?.licenseType);
  const filterLicenseType = licenseLicenseType || filterLicenseTypeState;

  const [sapSystem, setSapSystem] = useState('SR1');
  const [client, setClient] = useState('100');
  const [licenseType, setLicenseType] = useState([]);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [tcode, setTcode] = useState('');
  const [type, setType] = useState('1'); // '1' = Assigned TCodes, '2' = Executed TCodes

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
    setLicenseType([]);
    setUserId('');
    setRole('');
    setTcode('');
    setType('1');
  }, []);

  const mapSystemClient = (obj) =>
    obj && obj.value ? obj.value.map(p => ({ key: p.ZID, value: p.ZID })) : [];

  const mapDropdownValues = (obj) =>
    obj && obj.value ? obj.value.map(p => ({ key: p.ZDESC || p.ZID, value: p.ZID })) : [];

  const onFilterSubmit = () => {
    const filterPayload = {
      sapSystem,
      client,
      type,
      licenseType: Array.isArray(licenseType) ? licenseType : (licenseType ? [licenseType] : []),
      userId,
      role,
      tcode
    };
    dispatch(action.getCrossSystemTcodesReport(token, filterPayload));
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

        {/* License Type (Multi-select Checkboxes) */}
        <Box flex="0 0 auto" width={115}>
          <FilterMultiSelectDropDown
            values={mapDropdownValues(filterLicenseType)}
            preSelected={licenseType}
            changeEventCallBack={(v) => setLicenseType(v)}
            label="License Type"
          />
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

        {/* Report Type Radio Buttons (Assigned TCodes = 1, Executed TCodes = 2) */}
        <Box flex="0 0 auto" display="flex" alignItems="center" height={37} my={0.5} px={1}>
          <RadioGroup
            row
            name="tcodeReportType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ margin: 0, alignItems: 'center' }}
          >
            <FormControlLabel
              value="1"
              control={<Radio size="small" style={{ color: primaryColor, padding: '4px' }} />}
              label={<Typography variant="body2" style={{ fontFamily: dynamicFont, fontSize: '11px', fontWeight: 400, color: '#000000de', lineHeight: 1 }}>Assigned TCodes</Typography>}
              style={{ marginRight: '12px', marginBottom: 0, display: 'flex', alignItems: 'center' }}
            />
            <FormControlLabel
              value="2"
              control={<Radio size="small" style={{ color: primaryColor, padding: '4px' }} />}
              label={<Typography variant="body2" style={{ fontFamily: dynamicFont, fontSize: '11px', fontWeight: 400, color: '#000000de', lineHeight: 1 }}>Executed TCodes</Typography>}
              style={{ marginRight: '4px', marginBottom: 0, display: 'flex', alignItems: 'center' }}
            />
          </RadioGroup>
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

export default CrossSystemTCodesFilter;
