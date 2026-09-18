import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
// import { MENU_FONT_FAMILY } from '../../theme';
import { getDynamicFont } from '../../theme';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';





const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    fontSize: '11px',
    // fontFamily: MENU_FONT_FAMILY,
    fontFamily: (props) => props.dynamicFont,
    '& .MuiOutlinedInput-input': {
      padding: '8px 14px',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 10px) scale(1)',
      fontSize: '11px',
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
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e2e8f0',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#cbd5e1',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2563eb',
    },
  },
  label: {
    fontSize: '11px',
    // fontFamily: MENU_FONT_FAMILY,
    fontFamily: (props) => props.dynamicFont,
    color: '#000000de',
    '&.Mui-focused': {
      color: '#000000de',
    }
  },
}));

// Dynamic MenuProps calculation moved inside the component

const FilterMultiSelectDropDown = (props) => {
  const dynamicColors = useSelector(state => state.control.colors) || [];
  const dynamicFont = getDynamicFont(dynamicColors);
  const classes = useStyles({ ...props, dynamicFont });
  const getValidArray = (val) => {
    if (Array.isArray(val)) return val;
    if (val === null || val === undefined || val === '') return [];
    return [val];
  };

  const [selected, setSelected] = useState(getValidArray(props.preSelected));

  useEffect(() => {
    setSelected(getValidArray(props.preSelected));
  }, [props.preSelected]);

  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const MenuProps = {
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
        maxHeight: 400,
        borderRadius: 12,
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        marginTop: 8,
      },
    },
  };

  const handleChange = (event) => {
    props.changeEventCallBack(event.target.value);
  };

  const findSelected = (selected) => {
    if (selected.length === 0) return 'None';
    return `${selected.length} Selected`;
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth ref={containerRef}>
      <InputLabel className={classes.label} style={{ color: '#000000de' }} shrink={selected && selected.length > 0 ? true : undefined}>{props.label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        classes={{ select: classes.select }}
        label={props.label}
        MenuProps={{
          ...MenuProps,
          PaperProps: {
            ...MenuProps.PaperProps,
            style: (props.label && (props.label.toLowerCase() === 'risk id' || props.label.toLowerCase() === 'controls'))
              ? { ...MenuProps.PaperProps.style, minWidth: '118px', maxHeight: '153px' }
              : MenuProps.PaperProps.style
          }
        }}
        // style={{ fontSize: '11px', fontFamily: MENU_FONT_FAMILY }}
        style={{ fontSize: '11px', fontFamily: dynamicFont }}
        renderValue={(selected) => findSelected(selected)}
      >
        {props.values.map((v) => (
          <MenuItem key={v.key} value={v.value} style={{ padding: '4px 8px' }}>
            <Checkbox
              size="small"
              color="primary"
              style={{ padding: 4 }}
              checked={selected.indexOf(v.value) > -1}
            />
            <ListItemText
              disableTypography
              primary={
                // <Typography style={{ fontSize: '11px', fontFamily: MENU_FONT_FAMILY, color: '#000000de' }}>
                <Typography style={{ fontSize: '11px', fontFamily: dynamicFont, color: '#000000de' }}>
                  {v.key}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export default FilterMultiSelectDropDown