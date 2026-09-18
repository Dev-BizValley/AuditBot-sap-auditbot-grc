import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'absolute',
      
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  arrow:{
    margin: props=>props.state?'-18px':'-22px',
    boxShadow:'none !important',
    background:'transparent !important',
    color:'#009ED7 !important',
    outline:'none !important',
    '&:after': {
        backgroundImage: 'linear-gradient(to right, #0854a0, rgba(8,84,160,0))',
        left: '100%',
        content: '""',
        position: 'absolute',
        width: '10rem',
        top: '50%',
        height: '0.1rem'
    },
    '&:before': {
        backgroundImage: 'linear-gradient(to left, #0854a0, rgba(8,84,160,0))',
        right: '100%',
        content: '""',
        position: 'absolute',
        width: '10rem',
        top: '50%',
        height: '0.1rem'
    },
  }
}));

const FilterFloatAction=(props)=> {
    const classes = useStyles(props);

    return (
      <div className={classes.root}>
        
        <Fab size="small" color="primary" aria-label="add" className={classes.arrow} onClick={()=>props.onclick()}>
        {props.state? <ArrowDropDownIcon fontSize="large" />:<ArrowDropUpIcon fontSize="large"/>}
        </Fab>
      </div>
    );
  }
export default FilterFloatAction;