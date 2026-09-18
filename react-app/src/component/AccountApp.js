import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import AccountCircle from '@material-ui/icons/AccountCircle';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { GoogleLogout } from 'react-google-login';



const AccountApp=(props)=>
{

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("dasdsadsadsa")
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    props.logOutGoogle() 
    setAnchorEl(null);
  }
  


return(
<ClickAwayListener onClickAway={handleClose}>
    <IconButton
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    color="inherit"
    onClick={handleMenu}
     //onClick={()=>{window.auth2.grantOfflineAccess().then(signInCallback);}}
  ><Typography  variant="subtitle2" color="inherit">
   {props.name}
</Typography>
   
    <AccountCircle />
    <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
  </IconButton>
  </ClickAwayListener>
   )
}



export default AccountApp