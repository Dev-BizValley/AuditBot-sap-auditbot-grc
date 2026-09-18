import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as action from '../../Store/actions/index';
import FilterSingleSelectDropDown from './FilterSingleSelectDropDown';
import FilterMultiSelectDropDown from './FilterMultiSelectDropDown';
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
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
      color: '#000000de',
      fontWeight: 400,
    },
  },
})(TextField);

const GRCFilter = ({ type }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(true);

  const token = useSelector(state => state.login.token);
  const colors = useSelector(state => state.filter.colors) || [];

  const riskType = useSelector(state => state.filter.riskType);
  const sapSystem = useSelector(state => state.filter.sapSystem);
  const client = useSelector(state => state.filter.client);
  const riskLevel = useSelector(state => state.filter.riskLevel);
  const businessModule = useSelector(state => state.filter.businessModule);
  const mitigation = useSelector(state => state.filter.mitigation);
  const level = useSelector(state => state.filter.level);
  const reportType = useSelector(state => state.filter.reportType);
  const riskid = useSelector(state => state.filter.riskid);
  const drillDown = useSelector(state => state.filter.drillDown);
  const breakDown = useSelector(state => state.filter.breakDown);
  const userinput = useSelector(state => state.filter.userinput);
  const account = useSelector(state => state.filter.account);
  const userGroup = useSelector(state => state.filter.userGroup);

  const onChangeFilter = (data, value) => dispatch(action.changeFilter(data, value));
  const changeUserInput = (value) => dispatch(action.changeUserInput(value));

  React.useEffect(() => {
    dispatch(action.changeUserInput(''));
  }, [dispatch]);

  const onFilterSubmit = () => {
    if (type === 'Dashbord') {
      dispatch(action.submitFilter({
        data: {
          token, riskType: riskType.selectedValue, sapSystem: sapSystem.selectedValue,
          client: client.selectedValue, riskLevel: riskLevel.selectedValue,
          businessModule: businessModule.selectedValue, level: level.selectedValue,
          breakDown: breakDown.selectedValue, riskId: riskid.selectedValue,
          reportType: reportType.selectedValue, mitigation: mitigation.selectedValue,
          account: account.selectedValue, userGroup: userGroup.selectedValue, userInput: userinput
        }
      }));
    } else {
      dispatch(action.riskGrcReport({
        data: {
          token, sapSystem: sapSystem.selectedValue, client: client.selectedValue,
          level: level.selectedValue, riskType: riskType.selectedValue,
          riskLevel: riskLevel.selectedValue, businessModule: businessModule.selectedValue,
          mitigation: mitigation.selectedValue, drillDown: drillDown.selectedValue,
          riskId: riskid.selectedValue, userInput: userinput, account: account.selectedValue,
          userGroup: userGroup.selectedValue
        }
      }));
    }
  };

  const mapValues = (obj) =>
    obj && obj.value ? obj.value.map(p => ({ key: p.ZDESC || p.ZID, value: p.ZID })) : [];

  const primaryColor = (colors && colors.length > 0) ? colors[0] : '#2563eb';
  const executeBtnColor = (colors && colors.length > 9) ? colors[9] : primaryColor;
  // const dynamicFont = MENU_FONT_FAMILY;
  const dynamicFont = getDynamicFont(colors);

  return (
    <Box position="relative" width="100%" style={{ minHeight: '0px', backgroundColor: isVisible ? 'transparent' : '#FFFFFF' }}>
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
        <Box flex="1" minWidth={80}>
          <FilterSingleSelectDropDown
            values={mapValues(level)}
            preSelected={level.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(level, v)}
            label={level.name}
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={90}>
          <FilterSingleSelectDropDown
            values={sapSystem && sapSystem.value ? sapSystem.value.map(p => ({ key: p.ZID, value: p.ZID })) : []}
            preSelected={sapSystem.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(sapSystem, v)}
            label={sapSystem.name}
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={90}>
          <FilterSingleSelectDropDown
            values={client && client.value ? client.value.map(p => ({ key: p.ZID, value: p.ZID })) : []}
            preSelected={client.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(client, v)}
            label={client.name}
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(riskType)}
            preSelected={riskType.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(riskType, v)}
            label={riskType.name}
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(riskLevel)}
            preSelected={riskLevel.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(riskLevel, v)}
            label={riskLevel.name}
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(businessModule)}
            preSelected={businessModule.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(businessModule, v)}
            label="Bus Module"
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(riskid)}
            preSelected={riskid.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(riskid, v)}
            label="Risk Id"
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(mitigation)}
            preSelected={mitigation.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(mitigation, v)}
            label="Mitigation"
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(account)}
            preSelected={account.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(account, v)}
            label={account.name}
            fontFamily={dynamicFont}
          />
        </Box>
        <Box flex="1" minWidth={100}>
          <FilterMultiSelectDropDown
            values={mapValues(userGroup)}
            preSelected={userGroup.selectedValue}
            changeEventCallBack={(v) => onChangeFilter(userGroup, v)}
            label={userGroup.name}
            fontFamily={dynamicFont}
          />
        </Box>

        <Box flex="1" minWidth={120}>
          <CssTextField
            size="small"
            variant="outlined"
            fullWidth
            label={level.selectedValue === '1' ? "User" : "Role"}
            value={userinput || ''}
            onChange={(e) => changeUserInput(e.target.value)}
            InputProps={{ style: { fontSize: '0.75rem', fontFamily: dynamicFont } }}
            InputLabelProps={{
              shrink: !!userinput || undefined,
              style: { fontSize: '0.75rem', fontFamily: dynamicFont }
            }}
          />
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

export default GRCFilter;
