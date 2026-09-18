import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import * as action from '../../Store/actions/index';
import { getDynamicFont } from '../../theme';

import FilterSingleSelectDropDown from './FilterSingleSelectDropDown';
import FilterMultiSelectDropDown from './FilterMultiSelectDropDown';

const useStyles = makeStyles((theme) => ({
  textFieldRoot: {
    margin: theme.spacing(0.5),
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      fontFamily: (props) => props.dynamicFont,
      fontSize: '11px',
      fontWeight: 400,
      height: '37px',
    },
    '& .MuiInputLabel-outlined': {
      fontFamily: (props) => props.dynamicFont,
      fontSize: '11px',
      fontWeight: 400,
      color: '#000000de',
      transform: 'translate(14px, 10px) scale(1)',
      '&.Mui-focused': {
        color: '#000000de',
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
        color: '#000000de',
      }
    }
  },
  input: {
    padding: '8px 14px',
    color: '#000000de',
  }
}));

const ControlFilter = ({ type }) => {
  const dispatch = useDispatch();

  // Redux State
  const token = useSelector(state => state.login.token);
  const sapSystem = useSelector(state => state.control.sapSystem);
  const client = useSelector(state => state.control.client);
  const dashboardYear = useSelector(state => state.control.year);
  const summaryYear = useSelector(state => state.control.summaryYear);
  const detailYear = useSelector(state => state.control.detailYear);
  const year = type === 'Dashbord' 
    ? dashboardYear 
    : type === 'Summary' 
      ? summaryYear 
      : detailYear;
  const mitigation = useSelector(state => state.control.mitigation);
  const drillDown = useSelector(state => state.control.drillDown);
  const controls = useSelector(state => state.control.controls);
  const control = useSelector(state => state.control.control);
  const colors = useSelector(state => state.control.colors) || [];
  const primaryColor = (colors && colors.length > 0) ? colors[0] : '#2563eb';
  const executeBtnColor = (colors && colors.length > 9) ? colors[9] : primaryColor;

  const [isVisible, setIsVisible] = React.useState(true);
  const dynamicFont = getDynamicFont(colors);
  const classes = useStyles({ dynamicFont });

  // Dispatch Actions
  const onChangeFilter = (data, value) => dispatch(action.changeControlFilter(data, value));
  
  React.useEffect(() => {
    dispatch(action.changeControlFilter({ id: 21 }, ''));
    dispatch(action.changeControlFilter({ id: 221 }, ''));
  }, [dispatch]);
  
  const onFilterSubmit = () => {
    if (type === 'Dashbord') {
      dispatch(action.submitcontrolFilter(token, sapSystem.selectedValue, client.selectedValue, year.selectedValue, controls.selectedValue));
    } else if (type === 'Summary') {
      dispatch(action.submitcontrolReportFilterSummary(token, sapSystem.selectedValue, client.selectedValue, year.selectedValue, controls.selectedValue));
    } else {
      dispatch(action.submitcontrolReportFilter(token, sapSystem.selectedValue, client.selectedValue, year.selectedValue, control.selectedValue));
    }
  };

  const mapValues = (obj) => 
    obj && obj.value ? obj.value.map(p => ({ key: p.ZDESC || p.ZID, value: p.ZID })) : [];

  const mapSystemClient = (obj) => 
    obj && obj.value ? obj.value.map(p => ({ key: p.ZID, value: p.ZID })) : [];

  return (
    <Box position="relative" width="100%">
      <Box 
        display={isVisible ? "flex" : "none"} 
        alignItems="center" 
        justifyContent="flex-start"
        flexWrap="wrap" 
        width="100%" 
        gridGap={16} 
        py={1}
        px={0}
        style={{ paddingTop: '7px', paddingBottom: '7px', paddingLeft: '18px' }}
      >
        <Box flex="0 0 280px" minWidth={280}>
          <FilterSingleSelectDropDown 
            values={mapSystemClient(sapSystem)} 
            preSelected={sapSystem.selectedValue} 
            changeEventCallBack={(v) => onChangeFilter(sapSystem, v)} 
            label="System" 
          />
        </Box>
        <Box flex="0 0 280px" minWidth={280}>
          <FilterSingleSelectDropDown 
            values={mapSystemClient(client)} 
            preSelected={client.selectedValue} 
            changeEventCallBack={(v) => onChangeFilter(client, v)} 
            label="Client" 
          />
        </Box>
        <Box flex="0 0 280px" minWidth={280}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            label="Year"
            value={year.selectedValue || ''}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 4) {
                onChangeFilter(year, val);
              }
            }}
            className={classes.textFieldRoot}
            InputProps={{
              classes: { input: classes.input },
              style: { fontSize: '11px', fontFamily: dynamicFont, fontWeight: 400 }
            }}
          />
        </Box>
        
        {type === "Report" ? (
          <Box flex="0 0 280px" minWidth={280}>
            <FilterSingleSelectDropDown 
              values={mapValues(control)} 
              preSelected={control.selectedValue} 
              changeEventCallBack={(v) => onChangeFilter(control, v)} 
              label="Controls" 
            />
          </Box>
        ) : type !== "Dashbord" ? (
          <Box flex="0 0 280px" minWidth={280}>
            <FilterMultiSelectDropDown 
              values={mapValues(controls)} 
              preSelected={controls.selectedValue} 
              changeEventCallBack={(v) => onChangeFilter(controls, v)} 
              label="Controls" 
            />
          </Box>
        ) : null}

        <Box flex="0 0 auto" style={{ alignSelf: 'center', marginLeft: 0 }}>
          <Button 
            variant="contained" 
            onClick={onFilterSubmit}
            style={{ 
              borderRadius: 8, 
              padding: '0 20px', 
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

      {/* Decorative Gradient Lines */}
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

      {/* Toggle Triangle Indicator */}
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

export default ControlFilter;