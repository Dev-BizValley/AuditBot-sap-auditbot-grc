import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





// const AntSwitch = withStyles((theme) => ({
//   root: {
//     width: 28,
//     height: 16,
//     padding: 0,
//     display: 'flex',
//   },
//   switchBase: {
//     padding: 2,
//     color: theme.palette.common.white,
//     '&$checked': {
//       transform: 'translateX(12px)',
//       color: theme.palette.common.white,
//       '& + $track': {
//         opacity: 1,
//         backgroundColor: theme.palette.primary.main,
//         borderColor: theme.palette.primary.main,
//       },
//     },
//   },
//   thumb: {
//     width: 12,
//     height: 12,
//     boxShadow: 'none',
//   },
//   track: {
//     border: `1px solid ${theme.palette.grey[500]}`,
//     borderRadius: 16 / 2,
//     opacity: 1,
//     backgroundColor: "#009ED7" ,
//   },
//   checked: {},
// }))(Switch);

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  colorSecondary: {
    color:props=>props.colors[0] ,
  },
  checked:{
    color:props=>props.checked?props.colors[1]:props.colors[0]
  },
  track:{
    backgroundColor:'#927979 !important'
  },
  media: {
    width: 300,
    height: 75,
    marginLeft: '5%'
  },
  
}));


const SwitchComponent=(props)=> {
    
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = (event) => {
    if (props.onToggle) {
      props.onToggle();
    }
  };


  const classes = useStyles(props);

  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item style={{padding:0,fontSize:'12px'}}>Count</Grid>
          <Grid item style={{padding:0}}>
            <Switch size ='small' checked={props.val} onChange={handleChange} name="checkedC"  
            classes={
              {
                colorSecondary:classes.colorSecondary,
                thumb:classes.checked,
                colorPrimary:classes.colorSecondary,
                track:classes.track
              }
            }/>
          </Grid>
          <Grid item style={{padding:0,fontSize:'12px'}}>Cost</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}


export default SwitchComponent;