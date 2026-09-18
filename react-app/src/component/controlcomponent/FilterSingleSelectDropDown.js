import React, { useEffect, useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
// import { MENU_FONT_FAMILY } from '../../theme';
import { getDynamicFont } from '../../theme';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
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

const FilterSingleSelectDropDown = (props) => {
  const dynamicColors = useSelector(state => state.control.colors) || [];
  const dynamicFont = getDynamicFont(dynamicColors);
  const classes = useStyles({ ...props, dynamicFont });
  const getValidValue = useCallback((val) => {
    if (val === undefined || val === null) return '';
    if (props.values && props.values.some(v => v.value === val)) return val;
    return '';
  }, [props.values]);


  const [selected, setSelected] = useState(getValidValue(props.preSelected));

  useEffect(() => {
    setSelected(getValidValue(props.preSelected));
  }, [getValidValue, props.preSelected, props.values]);

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
        maxHeight: 300,
        borderRadius: 12,
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        marginTop: 8,
      },
    },
  };

  const handleChange = (event) => {
    props.changeEventCallBack(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth ref={containerRef}>
      <InputLabel className={classes.label} style={{ color: '#000000de' }} shrink={selected !== '' && selected !== undefined ? true : undefined}>
        {props.label}
      </InputLabel>
      <Select
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
      >

        {props.values.map((v) => (
          <MenuItem
            key={v.key}
            value={v.value}
            // style={{ fontSize: '11px', fontFamily: MENU_FONT_FAMILY, color: '#000000de' }}
            style={{ fontSize: '11px', fontFamily: dynamicFont, color: '#000000de' }}
          >
            {v.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export default FilterSingleSelectDropDown