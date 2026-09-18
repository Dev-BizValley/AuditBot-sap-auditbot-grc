import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, useScrollTrigger, ThemeProvider, CssBaseline, Paper, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Components
import LicenseFilter from '../component/licensecomponent/LicenseFilter';
import LicenceFirstSection from '../component/licensecomponent/LicenceFirstSection';
import LicenseDataCard from "../component/licensecomponent/LicenseDataCard";
import LicenceFourthSection from '../component/licensecomponent/LicenceFourthSection';
import LicenceFiveSection from '../component/licensecomponent/LicenceFiveSection';
import LicenceThirdSection from '../component/licensecomponent/LicenceThirdSection';
import Loader from '../component/Loader';
import LicenceDragableDialogue from './LicenceDragableDialogue';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: '0px',
    backgroundColor: theme.palette.background.default,
    height: 'calc(100vh - 48px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  headerPaper: {
    zIndex: 1100,
    flexShrink: 0,
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    padding: '0px 0',
    width: '100%',
    overflow: 'visible'
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    paddingTop: '8px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: '32px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    }
  },
  sectionMargin: {
    marginBottom: theme.spacing(1)
  },
  smallSectionMargin: {
    marginBottom: theme.spacing(1)
  }
}));

const LicenseDashbord = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const token = useSelector(state => state.login.token);
  const result = useSelector(state => state.licensefilter.licenseresult);
  const loader = useSelector(state => state.licensefilter.loader);
  const sapSystem = useSelector(state => state.licensefilter.sapSystem);
  const colors = useSelector(state => state.licensefilter.colors);

  const [dialogue, setDialogue] = useState(false);
  const [groupby, setGroupby] = useState('');
  const [chart, setChart] = useState('');

  // Dynamic UI settings from Redux
  const primaryColor = (colors && colors.length > 0) ? colors[0] : '#2563eb';
  const dynamicFont = getDynamicFont(colors);

  // Create dynamic theme
  const theme = useMemo(() => createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: primaryColor },
    },
    typography: {
      ...baseTheme.typography,
      // fontFamily: [dynamicFont, 'Inter', 'Roboto', 'sans-serif'].join(','),
      fontFamily: [dynamicFont, FALLBACK_FONT_FAMILY].join(','),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            overflow: result ? 'auto' : 'hidden',
          },
        },
      },
    },
  }), [primaryColor, dynamicFont, result]);

  const trigger = useScrollTrigger();

  useEffect(() => {
    const { pathname } = props.location;
    dispatch(action.updatePathname(pathname));
    dispatch({ type: 'CLEAR_LICENSE_RESULT' });
    dispatch(action.initLicenseFilter(token));
  }, [dispatch, token, props.location]);

  const openDialogue = (chartType, groupType) => {
    setDialogue(true);
    setGroupby(groupType);
    setChart(chartType);
  };

  const closeDialogue = () => {
    dispatch(action.clearLicanceTableReport());
    setDialogue(false);
    setGroupby('');
    setChart('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar - Always rendered */}
        <Paper
          elevation={0}
          className={classes.headerPaper}
        >
          <Box px={2} width="100%">
            <Box display="flex" alignItems="center" width="100%">
              <LicenseFilter type='Dashbord' />
            </Box>
          </Box>
        </Paper>

        {/* Scrollable Work Area */}
        <Box className={classes.scrollContainer}>

          {/* Content Sections */}
          {result && (
            <Box className={classes.sectionMargin}>
              <LicenceFirstSection dialogueOpen={openDialogue} />
            </Box>
          )}

          {result && result.E_RESULT_02 && result.E_RESULT_02.data && (
            <Box className={classes.sectionMargin}>
              <Grid container spacing={1}>
                {result.E_RESULT_02.data.slice(0, 4).map((data, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={`card-1-${idx}`}>
                    <LicenseDataCard result={data} index={idx} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {result && (
            <Box className={classes.smallSectionMargin}>
              <LicenceFourthSection dialogueOpen={openDialogue} />
            </Box>
          )}

          {result && result.E_RESULT_02 && result.E_RESULT_02.data && result.E_RESULT_02.data.length > 6 && (
            <Box className={classes.smallSectionMargin}>
              <Grid container spacing={1}>
                {result.E_RESULT_02.data.slice(4, 8).map((data, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={`card-2-${idx}`}>
                    <LicenseDataCard result={data} index={idx + 6} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {result && (
            <>
              <Box className={classes.smallSectionMargin}>
                <LicenceFiveSection dialogueOpen={openDialogue} />
              </Box>
              <Box className={classes.smallSectionMargin}>
                <LicenceThirdSection dialogueOpen={openDialogue} />
              </Box>
            </>
          )}

          {dialogue && (
            <LicenceDragableDialogue
              dialogueState={dialogue}
              groupby={groupby}
              chart={chart}
              closeDialogue={closeDialogue}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LicenseDashbord;
