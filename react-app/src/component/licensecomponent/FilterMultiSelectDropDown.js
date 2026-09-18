import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getDynamicFont } from '../../theme';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

// Dynamic MenuProps calculation moved inside the component

const FilterMultiSelectDropDown = ({ values, preSelected, changeEventCallBack, label }) => {
  const dynamicColors = useSelector(state => state.licensefilter.colors) || [];
  const dynamicFont = getDynamicFont(dynamicColors);

  const useStylesInner = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0.5),
      fontSize: '11px',
      fontFamily: dynamicFont,
      fontWeight: 400,
      '& .MuiOutlinedInput-input': {
        padding: '0 28px 0 10px !important',
        display: 'flex',
        alignItems: 'center',
        height: '37px',
        boxSizing: 'border-box',
      },
      '& .MuiSelect-icon': {
        top: 'calc(50% - 12px)',
      },
      '& .MuiInputLabel-outlined': {
        transform: 'translate(10px, 10px) scale(1)',
        fontSize: '11px',
        fontWeight: 400,
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        height: '37px',
      },
    },
    select: {
      color: '#000000de',
      borderRadius: 8,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    label: {
      fontSize: '11px',
      fontFamily: dynamicFont,
      fontWeight: 400,
      color: '#000000de',
      '&.Mui-focused': {
        color: '#000000de',
      }
    },
  }));

  const classes = useStylesInner();
  const [selected, setSelected] = useState(preSelected || []);

  useEffect(() => {
    setSelected(preSelected || []);
  }, [preSelected]);

  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []); // Re-run on every render to stay in sync with grid/resize

  const MenuProps = {
    disablePortal: false,
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    PaperProps: {
      style: {
        minWidth: width || 'auto',
        width: 'auto',
        maxHeight: 250,
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        marginTop: '4px',
        border: '1px solid #e2e8f0'
      },
    },
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    changeEventCallBack(value);
  };

  const renderValue = (selected) => {
    if (!selected || selected.length === 0) return "";
    return `${selected.length} Selected`;
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth ref={containerRef}>
      <InputLabel id={`${label}-multi-label`} className={classes.label} style={{ color: '#000000de' }} shrink={selected && selected.length > 0 ? true : undefined}>{label}</InputLabel>
      <Select
        multiple
        labelId={`${label}-multi-label`}
        value={selected}
        onChange={handleChange}
        label={label}
        renderValue={renderValue}
        MenuProps={{
          ...MenuProps,
          PaperProps: {
            ...MenuProps.PaperProps,
            style: (label && label.toLowerCase() === 'risk id')
              ? { ...MenuProps.PaperProps.style, minWidth: '118px', maxHeight: '153px' }
              : MenuProps.PaperProps.style
          }
        }}
        classes={{ select: classes.select }}
        style={{ fontSize: '11px', fontFamily: dynamicFont, fontWeight: 400 }}
      >
        {values && values.map((v) => (
          <MenuItem key={v.key} value={v.value} className={classes.menuItem}>
            <Checkbox checked={selected.indexOf(v.value) > -1} style={{ padding: 4 }} color="primary" size="small" />
            <ListItemText
              disableTypography
              primary={<Typography style={{ fontFamily: dynamicFont, fontSize: '11px', fontWeight: 400, color: '#000000de' }}>{v.key}</Typography>}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterMultiSelectDropDown;
