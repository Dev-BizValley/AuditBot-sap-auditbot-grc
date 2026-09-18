import React ,{useState,useEffect}from 'react';
import { makeStyles,useTheme  } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
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
      maxHeight: 400,
      borderRadius: 12,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      marginTop: 8,
    },
  },
};

const FilterMultiSelectDropDown = (props) => {
  const dynamicColors = useSelector(state => state.filter.colors) || [];
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

  const handleChange = (event) => {
    props.changeEventCallBack(event.target.value);
  };

  const findSelected = (selected) => {
    if (selected.length === 0) return 'None';
    return `${selected.length} Selected`;
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
      <InputLabel className={classes.label} style={{ color: '#000000de' }} shrink={selected && selected.length > 0 ? true : undefined}>
        {props.label}
      </InputLabel>
      <Select
        multiple
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
                // <Typography style={{ fontSize: props.fontSize || '11px', fontFamily: props.fontFamily || MENU_FONT_FAMILY, color: '#000000de' }}>
                <Typography style={{ fontSize: props.fontSize || '11px', fontFamily: props.fontFamily || dynamicFont, color: '#000000de' }}>
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