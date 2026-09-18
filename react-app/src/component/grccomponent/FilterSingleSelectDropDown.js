import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { MENU_FONT_FAMILY } from '../../theme';
import { getDynamicFont } from '../../theme';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: '100%',
  },
  select: {
    color: '#000000de',
    borderRadius: 8,
  },
  label: {
    fontSize: props => props.fontSize || '11px',
    // fontFamily: props => props.fontFamily || MENU_FONT_FAMILY,
    fontFamily: props => props.fontFamily || props.dynamicFont,
    color: '#000000de',
    fontWeight: 400,
    '&.Mui-focused': {
      color: '#000000de',
    }
  },
}));

const MenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  PaperProps: {
    style: {
      maxHeight: 300,
      borderRadius: 12,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      marginTop: 8,
    },
  },
};

const FilterSingleSelectDropDown = (props) => {
  const dynamicColors = useSelector(state => state.filter.colors) || [];
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

  const handleChange = (event) => {
    props.changeEventCallBack(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
      <InputLabel className={classes.label} style={{ color: '#000000de' }} shrink={selected !== '' && selected !== undefined ? true : undefined}>
        {props.label}
      </InputLabel>
      <Select
        value={selected}
        onChange={handleChange}
        className={classes.select}
        label={props.label}
        MenuProps={{
          ...MenuProps,
          PaperProps: {
            ...MenuProps.PaperProps,
            style: (props.label && props.label.toLowerCase() === 'risk id')
              ? { ...MenuProps.PaperProps.style, minWidth: '118px', maxHeight: '153px' }
              : MenuProps.PaperProps.style
          }
        }}
        // style={{ fontSize: props.fontSize || '11px', fontFamily: props.fontFamily || MENU_FONT_FAMILY }}
        style={{ fontSize: props.fontSize || '11px', fontFamily: props.fontFamily || dynamicFont }}
      >

        {props.values.map((v) => (
          <MenuItem
            key={v.key}
            value={v.value}
            // style={{ fontSize: props.fontSize || '11px', fontFamily: props.fontFamily || MENU_FONT_FAMILY, color: '#000000de' }}
            style={{ fontSize: props.fontSize || '11px', fontFamily: props.fontFamily || dynamicFont, color: '#000000de' }}
          >
            {v.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};


export default FilterSingleSelectDropDown