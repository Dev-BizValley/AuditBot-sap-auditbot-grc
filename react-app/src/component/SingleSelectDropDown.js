import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from "@material-ui/core/OutlinedInput";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 135,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  resize: {
    fontSize: 8
  },
  input: {
    fontSize: 8
  }
}));
const SingleSelectDropDown = (props) => {

  const classes = useStyles();
  // const [selected, setSelected] = React.useState(props.preSelected?'SR1':'');

  console.log(props.preSelected)

  const handleChange = (event) => {
    //setSelected(event.target.value)
    props.changeEventCallBack(event.target.value)
  };

  const MenuItems = props.values.map((v) => {
    return <MenuItem key={v.key} value={v.key}>{v.value}</MenuItem>
  }
  )

  return <FormControl variant="outlined" className={classes.formControl} size="small">
    <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={props.preSelected}
      onChange={handleChange}
      label={props.label}

    //input={<OutlinedInput classes={{ input: classes.input }} />}
    >

      {MenuItems}
    </Select>
  </FormControl>
}

export default SingleSelectDropDown