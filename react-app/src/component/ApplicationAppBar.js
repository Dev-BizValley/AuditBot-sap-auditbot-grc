import React from 'react';
import { TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { Box, Tooltip, Fade, Slide, useScrollTrigger } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import logo_icon from '../resources/auditlogo.png'

import { makeStyles } from '@material-ui/core/styles';
import { NavLink, withRouter, Link, useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';



import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_FONT_FAMILY, getDynamicFont } from '../theme';
import * as action from '../Store/actions/index';

import AccountApp from './AccountApp'

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import TableChartIcon from '@material-ui/icons/TableChart';
import GridOnIcon from '@material-ui/icons/GridOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';




const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#4f4f54',
    height: "48px",
    zIndex: 1300,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: 'none',
  },

  menuButton: {
    marginRight: theme.spacing(2),
    color: '#ffffff',
    outline: 'none !important',
    border: 'none !important',
    '&:focus': {
      outline: 'none !important',
      border: 'none !important',
    },
    '&:focus-visible': {
      outline: 'none !important',
      border: 'none !important',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }
  },
  title: {
    fontFamily: (props) => props.dynamicFont || MENU_FONT_FAMILY,
    fontWeight: 600,
    color: '#ffffff',
    fontSize: '1rem',
    letterSpacing: '-0.01em',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#0f172a',
    borderRight: 'none',
    boxShadow: '10px 0 30px rgba(0, 0, 0, 0.1)',
    overflowX: 'hidden',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  drawerTop: {
    padding: '12px 24px 8px 24px',
    backgroundColor: '#0f172a',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    flexShrink: 0,
  },
  drawerList: {
    flexGrow: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '4px 0',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
    }
  },
  drawerBottom: {
    padding: '8px 0',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    flexShrink: 0,
  },
  logoImage: {
    width: '100%',
    height: 'auto',
    maxWidth: '180px',
    display: 'block',
    margin: '0 auto',
  },
  toolbar: {
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 4),
    paddingTop: 48, // Reserves space for fixed AppBar
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  IconColor: {
    color: '#3b82f6',
    fontSize: '1.25rem',
  },
  IconColorchild: {
    color: '#60a5fa',
    width: 18,
  },
  ItemIcon: {
    minWidth: 32,
  },
  listitmentext: {
    color: '#f8fafc',
    fontSize: '0.75rem',
    fontFamily: (props) => props.dynamicFont || MENU_FONT_FAMILY,
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  listitmentextchild: {
    color: '#94a3b8',
    fontSize: '0.65rem',
    fontFamily: (props) => props.dynamicFont || MENU_FONT_FAMILY,
    fontWeight: 500,
  },
  logo: {
    padding: '16px',
    width: '100%',
    height: 'auto',
    marginBottom: 10,
  },
  selecteditme: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    color: '#3b82f6',
    margin: '2px 12px',
    borderRadius: '12px',
    paddingTop: 4,
    paddingBottom: 4,
    borderLeft: '4px solid #3b82f6',
    '& $listitmentextchild': {
      color: '#3b82f6',
      fontWeight: 700,
    },
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    }
  },
  nested: {
    color: '#f8fafc',
    margin: '2px 8px',
    borderRadius: '12px',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: '12px !important',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateX(4px)',
    }
  },
  subItem: {
    paddingLeft: '32px !important',
    '& $listitmentextchild': {
      fontSize: '0.65rem',
      fontWeight: 500,
    }
  },
  subSubItem: {
    paddingLeft: '44px !important',
    '& $listitmentextchild': {
      fontSize: '0.65rem',
      fontWeight: 500,
    }
  }
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ApplicationAppBar = (props) => {

  const signInCallback = (data) => {
    console.log(data)
  }

  const [pathname, setPathname] = React.useState('/');
  const location = useLocation()

  const grcColors = useSelector(state => state.filter?.colors) || [];
  const licenseColors = useSelector(state => state.licensefilter?.colors) || [];
  const controlColors = useSelector(state => state.control?.colors) || [];

  const dispatch = useDispatch();
  const token = useSelector(state => state.login.token);

  React.useEffect(() => {
    if (token) {
      if (grcColors.length === 0) {
        dispatch(action.initFilter(token));
      }
      if (licenseColors.length === 0) {
        dispatch(action.initLicenseFilter(token));
      }
      if (controlColors.length === 0) {
        dispatch(action.initControlFilter(token));
      }
    }
  }, [token, dispatch, grcColors.length, licenseColors.length, controlColors.length]);

  let colors = [];
  if (location.pathname.includes('grc')) {
    colors = grcColors;
  } else if (location.pathname.includes('licen')) {
    colors = licenseColors;
  } else if (location.pathname.includes('control')) {
    colors = controlColors;
  }

  if (colors.length === 0) {
    colors = grcColors.length > 0 ? grcColors : (licenseColors.length > 0 ? licenseColors : controlColors);
  }

  const dynamicFont = getDynamicFont(colors);
  const classes = useStyles({ dynamicFont });


  //const [anchorEl, setAnchorEl] = React.useState(null);
  //const open = Boolean(anchorEl);
  const [data, setData] = React.useState([]);

  const [grc, setGrc] = React.useState(true);
  const [dashbord, setDashbord] = React.useState(false);
  const [report, setReport] = React.useState(false);


  const [license, setLicense] = React.useState(false);
  const [licenceDashbord, setLicenceDashbord] = React.useState(false);
  const [licencereport, setLicenceReport] = React.useState(false);

  const [controls, setControls] = React.useState(false);
  const [controlsdashbord, setControlsdashbord] = React.useState(false);
  const [controlsreport, setControlsReport] = React.useState(false);

  const [auditor, setAuditor] = React.useState(false);
  const [auditordashbord, setAuditordashbord] = React.useState(false);
  const [auditorreport, setAuditorReport] = React.useState(false);

  const [manager, setManager] = React.useState(false);
  const [managerdashbord, setManagerdashbord] = React.useState(false);
  const [managerreport, setManagerReport] = React.useState(false);

  const [basis, setBasis] = React.useState(false);
  const [basisdashbord, setBasisdashbord] = React.useState(false);
  const [basisreport, setBasisReport] = React.useState(false);

  const [security, setSecurity] = React.useState(false);
  const [securitydashbord, setSecuritydashbord] = React.useState(false);
  const [securityreport, setSecurityReport] = React.useState(false);

  const [users, setUsers] = React.useState(false);
  const [usersdashbord, setUsersdashbord] = React.useState(false);
  const [usersreport, setUsersReport] = React.useState(false);


  const [hana, setHana] = React.useState(false);
  const [hanadashbord, setHanadashbord] = React.useState(false);
  const [hanareport, setHanaReport] = React.useState(false);


  const [misc, setMisc] = React.useState(false);
  const [miscdashbord, setMiscdashbord] = React.useState(false);
  const [miscreport, setMiscReport] = React.useState(false);






  const [drawerswitch, setDrawerswitch] = React.useState(false);



  const isValid = (value) => {
    if (data.length < 1) {
      return false;
    }
    return data.includes(value) || 
           data.includes(`${value}s`) || 
           data.includes(value.replace(/s$/, '')) || 
           data.some(item => item && item.toLowerCase() === value.toLowerCase());
  }

  const makeAllclose = React.useCallback(() => {
    setReport(false)
    setDashbord(false);
    setGrc(false);
    setLicense(false);
    setLicenceDashbord(false);
    setLicenceReport(false);
    setControls(false);
    setControlsReport(false);
    setControlsdashbord(false);
    setControls(false);
    setControlsReport(false);
    setControlsdashbord(false);
    setAuditor(false);
    setAuditorReport(false);
    setAuditordashbord(false);
    setManager(false);
    setManagerReport(false);
    setManagerdashbord(false);
    setBasis(false);
    setBasisReport(false);
    setBasisdashbord(false);
    setUsers(false);
    setUsersReport(false);
    setUsersdashbord(false);
    setHana(false);
    setHanaReport(false);
    setHanadashbord(false);
    setMisc(false);
    setMiscReport(false);
    setMiscdashbord(false);
  }, []);

  const openSelectedDropDown = React.useCallback((path) => {
    if (path === '/grcreport' || path === '/grcreport-company' || path === '/grcrisktechviewreport') {
      makeAllclose()
      setGrc(true);
      setReport(true)
    }
    else if (path === '/licensedashbord') {
      makeAllclose()
      setLicense(true)
      setLicenceDashbord(true)
    }
    else if (path === '/licensereport') {
      makeAllclose()
      setLicense(true)
      setLicenceReport(true)
    }
    else if (path === '/controldashbord') {
      makeAllclose()
      setControls(true)
      setControlsdashbord(true)
    }
    else if (path === '/controlreport') {
      makeAllclose()
      setControls(true)
      setControlsReport(true)
    }
    else if (path === '/controlsummaryreport') {
      makeAllclose()
      setControls(true)
      setControlsReport(true)
    }
    else {
      makeAllclose()
      setGrc(true);
      setDashbord(true);
    }
  }, [makeAllclose]);

  React.useEffect(() => {
    setData(props.userauthorization.value === undefined ? [] : props.userauthorization.value.map(p => p.ZDESC))
    setPathname(props.pathname);
    openSelectedDropDown(props.pathname)
  }, [props.userauthorization.value, props.pathname, openSelectedDropDown])



  const handleReport = () => {
    setReport(!report);
  };

  const handlegrc = () => {
    setGrc(!grc);
  };

  const handleDashbord = () => {
    setDashbord(!dashbord);
  };


  const handleLicenseReport = () => {
    setLicenceReport(!licencereport);
  };

  const handleLicense = () => {
    setLicense(!license);
  };

  const handleLicenseDashbord = () => {
    setLicenceDashbord(!licenceDashbord);
  };



  const handleControlReport = () => {
    setControlsReport(!controlsreport);
  };

  const handleControl = () => {
    setControls(!controls);

  };

  const handleControlDashbord = () => {
    setControlsdashbord(!controlsdashbord);
  };




  const handleAuditorReport = () => {
    setAuditorReport(!auditorreport);
  };

  const handleAuditor = () => {
    setAuditor(!auditor);
    setAuditorReport(!auditor);
    setAuditordashbord(!auditor);
  };

  const handleAuditorDashbord = () => {
    setAuditordashbord(!auditordashbord);
  };




  const handleManagerReport = () => {
    setManagerReport(!managerreport);
  };

  const handleManager = () => {
    setManager(!manager);
    setManagerReport(!manager);
    setManagerdashbord(!manager);
  };

  const handleManagerDashbord = () => {
    setManagerdashbord(!managerdashbord);
  };


  const handleBasisReport = () => {
    setBasisReport(!basisreport);
  };

  const handleBasis = () => {
    setBasis(!basis);
    setBasisReport(!basis);
    setBasisdashbord(!basis);
  };

  const handleBasisDashbord = () => {
    setBasisdashbord(!basisdashbord);
  };


  const handleSecurityReport = () => {
    setSecurityReport(!securityreport);
  };

  const handleSecurity = () => {
    setSecurity(!security);
    setSecurityReport(!security);
    setSecuritydashbord(!security);
  };

  const handleSecurityDashbord = () => {
    setSecuritydashbord(!securitydashbord);
  };



  const handleUsersReport = () => {
    setUsersReport(!usersreport);
  };

  const handleUsers = () => {
    setUsers(!users);
    setUsersReport(!users);
    setUsersdashbord(!users);
  };

  const handleUsersDashbord = () => {
    setUsersdashbord(!usersdashbord);
  };



  const handleHanaReport = () => {
    setHanaReport(!hanareport);
  };

  const handleHana = () => {
    setHana(!hana);
    setHanaReport(!hana);
    setHanadashbord(!hana);
  };

  const handleHanaDashbord = () => {
    setHanadashbord(!hanadashbord);
  };



  const handleMiscReport = () => {
    setMiscReport(!miscreport);
  };

  const handleMisc = () => {
    setMisc(!misc);
    setMiscReport(!misc);
    setMiscdashbord(!misc);
  };

  const handleMiscDashbord = () => {
    setMiscdashbord(!miscdashbord);
  };




  const toggleDrawer = (drawerswitch) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerswitch(drawerswitch)
  };

  const findName = () => {
    const pathname = location.pathname

    if (pathname === '/grcreport') {
      return 'AuditBOT GRC Report';
    }

    if (pathname === '/grcreport-company') {
      return 'AuditBOT GRC Report Company Code';
    }

    if (pathname === '/grcrisktechviewreport') {
      return 'AuditBOT GRC Risk Business Tech View Report';
    }

    if (pathname === '/licensereport') {
      return 'AuditBOT License Report';
    }
    if (pathname === '/licensedashbord') {
      return 'AuditBOT License Dashboard';
    }
    if (pathname === '/controlreport') {
      return 'AuditBOT Controls Details Report';
    }
    if (pathname === '/controldashbord') {
      return 'AuditBOT Controls Dashboard';
    }
    if (pathname === '/controlsummaryreport') {
      return 'AuditBOT Controls Summary Report';
    }
    if (pathname === "/grcdashbord") {
      return 'AuditBOT GRC Dashboard';
    }
    if (pathname === '/crosssystemusers') {
      return 'AuditBOT Cross System Users Report';
    }
    if (pathname === '/crosssystemroles') {
      return 'AuditBOT Cross System Roles Report';
    }
    if (pathname === '/crosssystemtcodes') {
      return 'AuditBOT Cross System TCodes Report';
    }
    return 'AuditBOT Dashboard';
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={classes.root} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems="center" wrap="nowrap">
            <Grid item>
              <IconButton
                edge="start"
                className={classes.menuButton}
                aria-label="menu"
                onClick={toggleDrawer(true)}
                style={{ marginLeft: 16 }}s
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography noWrap style={{ fontSize: '16px', fontWeight: 400, fontFamily: dynamicFont, color: '#ffffff' }}>
                {findName()}
              </Typography>
            </Grid>

            {props.isAuthenticated && (
              <Grid item>
                <Box display="flex" alignItems="center">
                  <Box mr={1.5} textAlign="right" display={{ xs: 'none', sm: 'block' }}>
                    <Typography variant="body2" style={{ fontWeight: 400, color: '#ffffff', fontFamily: dynamicFont, lineHeight: 1, fontSize: '14px', textTransform: 'none' }}>
                      {props.username}
                    </Typography>
                  </Box>
                  <Tooltip title="Quick Logout" TransitionComponent={Fade}>
                    <IconButton size="small" onClick={() => props.onLogout()} style={{ backgroundColor: 'transparent', padding: 4, marginRight: 8 }}>
                      <ExitToAppIcon style={{ color: '#ffffff', fontSize: 20 }} />
                    </IconButton>
                  </Tooltip>
                  <IconButton size="small" style={{ backgroundColor: 'transparent', padding: 4 }}>
                    <AccountCircleIcon style={{ color: '#ffffff', fontSize: 24 }} />
                  </IconButton>
                </Box>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <main>


        <Drawer
          className={classes.drawer}
          //variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
          open={drawerswitch}
          onClose={toggleDrawer(false)}
        >
          <Box className={classes.drawerTop}>
            <img
              src={logo_icon}
              alt="AuditBot Logo"
              className={classes.logoImage}
            />
          </Box>

          <Box className={classes.drawerList}>
            {/* main menu items... */}
            {/* [OMIT_FOR_RANGE_SAFETY] */}


            {/* this is for grc Dashbord */}

            {isValid('GRC') ?
              <List>
                <ListItem button key='DashBord' onClick={handlegrc} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>GRC</Typography>} />
                  {grc ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={grc} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {dashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={dashbord} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/grcdashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/grcdashbord' || pathname == '/' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>
                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>GRC Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {report ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/grcreport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/grcreport' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>GRC Report</Typography>} />
                          </ListItem>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/grcreport-company'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/grcreport-company' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>GRC Report - Company Code</Typography>} />
                          </ListItem>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/grcrisktechviewreport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/grcrisktechviewreport' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>GRC Risk Bus/Tech View</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>

              : null}


            {isValid('License') ?
              <List>
                <ListItem button key='DashBord' onClick={handleLicense} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>License</Typography>} />
                  {license ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={license} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleLicenseDashbord}>
                      {/* <ListItemIcon className={classes.ItemIcon} >
                    <LineStyleIcon className={classes.IconColorchild} />
                  </ListItemIcon> */}
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {licenceDashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={licenceDashbord} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>License Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleLicenseReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {licencereport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={licencereport} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>License Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}




            {isValid('Controls') ?
              <List>
                <ListItem button key='DashBord' onClick={handleControl} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Controls</Typography>} />
                  {controls ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={controls} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleControlDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {controlsdashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={controlsdashbord} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/controldashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/controldashbord' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleControlReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {controlsreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={controlsreport} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/controlsummaryreport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/controlsummaryreport' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Summary Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/controlreport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/controlreport' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Details Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>

                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}


            {isValid('Auditors') || true ?
              <List>
                <ListItem button key='DashBord' onClick={handleAuditor} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Auditors</Typography>} />
                  {auditor ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={auditor} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleAuditorDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {auditordashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={`${classes.nested} ${classes.subItem}`} onClick={handleAuditorReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {auditorreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={auditorreport} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/crosssystemusers'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/crosssystemusers' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>
                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Cross System Users</Typography>} />
                          </ListItem>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/crosssystemroles'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/crosssystemroles' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>
                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Cross System Roles</Typography>} />
                          </ListItem>
                        </Link>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/crosssystemtcodes'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/crosssystemtcodes' ? `${classes.selecteditme} ${classes.subSubItem}` : `${classes.nested} ${classes.subSubItem}`}>
                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Cross System TCodes</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}


            {isValid('Manager') ?
              <List>
                <ListItem button key='DashBord' onClick={handleManager} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Managers</Typography>} />
                  {manager ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={manager} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleManagerDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {managerdashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleManagerReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {managerreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}


            {isValid('Basis') ?
              <List>
                <ListItem button key='DashBord' onClick={handleBasis} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Basis</Typography>} />
                  {basis ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={basis} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleBasisDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {basisdashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleBasisReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {basisreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}



            {isValid('Security') ?
              <List>
                <ListItem button key='DashBord' onClick={handleSecurity} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Security</Typography>} />
                  {security ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={security} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleSecurityDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {securitydashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleSecurityReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {securityreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}
            {isValid('Users') ?
              <List>
                <ListItem button key='DashBord' onClick={handleUsers} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Users</Typography>} />
                  {users ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={users} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleUsersDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {securitydashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleUsersReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {usersreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}

            {isValid('Hana') ?
              <List>
                <ListItem button key='DashBord' onClick={handleHana} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Hana</Typography>} />
                  {hana ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={users} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleHanaDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {hanadashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleHanaReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {hanareport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}

            {isValid('Misc') ?
              <List>
                <ListItem button key='DashBord' onClick={handleMisc} className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><DashboardIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Misc</Typography>} />
                  {misc ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={users} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding >
                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleMiscDashbord}>
                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Dashboard</Typography>} />
                      {miscdashbord ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensedashbord'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensedashbord' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Dashboard</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>


                    <ListItem button className={classes.nested} style={{ paddingLeft: 64 }} onClick={handleMiscReport} >

                      <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Report</Typography>} />
                      {miscreport ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={false} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={'/licensereport'} onClick={toggleDrawer(false)}>
                          <ListItem button className={pathname == '/licensereport' ? classes.selecteditme : classes.nested} style={{ paddingLeft: 74 }}>

                            <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentextchild}>Controls Report</Typography>} />
                          </ListItem>
                        </Link>
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </List>
              : null}


          </Box>

          <Box className={classes.drawerBottom}>
            <List style={{ padding: '0 8px' }}>
              <Link style={{ color: 'white', textDecoration: 'none' }} to={'/help'} onClick={toggleDrawer(false)}>
                <ListItem button key='Help' className={classes.nested}>
                  <ListItemIcon className={classes.ItemIcon} ><HelpIcon className={classes.IconColor} /></ListItemIcon>
                  <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext}>Help Center</Typography>} />
                </ListItem>
              </Link>
              <ListItem button key='Logout' className={classes.nested} onClick={() => props.onLogout()}>
                <ListItemIcon className={classes.ItemIcon} ><ExitToAppIcon style={{ color: '#ef4444' }} />     </ListItemIcon>
                <ListItemText disableTypography primary={<Typography type="body2" className={classes.listitmentext} style={{ color: '#ef4444' }}>Logout</Typography>} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </main>
    </div>
  );
}

export default withRouter(ApplicationAppBar)