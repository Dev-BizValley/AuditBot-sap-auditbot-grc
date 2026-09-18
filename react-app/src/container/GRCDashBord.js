import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography, ThemeProvider, CssBaseline, Paper, useScrollTrigger, createMuiTheme, makeStyles } from '@material-ui/core';

import * as action from '../Store/actions/index';
import * as actionType from '../Store/actions/actionsType';
// import baseTheme, { MENU_FONT_FAMILY, getDynamicFont } from '../theme';
import baseTheme, { getDynamicFont, FALLBACK_FONT_FAMILY } from '../theme';

// Original Components
import GRCFilter from '../component/grccomponent/GRCFilter';
import Loader from '../component/Loader';
import GRCDragableDialogue from './GRCDragableDialogue';

// Modernized GRC Components
import GRCDataCard from '../component/grccomponent/GRCDataCard';
import GRCThirdSecData from '../component/grccomponent/GRCThirdSecData';
import GRCFirstSecData from '../component/grccomponent/GRCFirstSecData';
import GRCFourthSecData from '../component/grccomponent/GRCFourthSecData';
import GRCFifthSecData from "../component/grccomponent/GRCFifthSecData";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    backgroundColor: '#f8fafc',
    height: 'calc(100vh - 48px)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  headerPaper: {
    zIndex: 1100,
    position: 'sticky',
    top: 0,
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
    padding: '0px 0',
    width: '100%',
    overflow: 'visible'
  },
  scrollContainer: {
    flex: 1, 
    overflowX: 'hidden',
    width: '100%', 
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: '32px',
  },
  sectionMargin: {
    marginBottom: theme.spacing(2)
  },
  smallSectionMargin: {
    marginBottom: theme.spacing(2)
  },
  kpiSection: {
    marginBottom: theme.spacing(1)
  }
}));

const GRCDashBord = () => {
  console.log("[GRC-DASHBOARD] Full HMR tree invalidation triggered");
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const [dialogue, setDialogue] = useState(false);
  const [groupby, setGroupby] = useState('');
  const [chart, setChart] = useState('');
  const [barNumber, setBarNumber] = useState(false);

  const token = useSelector(state => state.login.token);
  const result = useSelector(state => state.filter.result);
  const sapSystem = useSelector(state => state.filter.sapSystem);
  const loader = useSelector(state => state.filter.loader);

  const riskType = useSelector(state => state.filter.riskType);
  const client = useSelector(state => state.filter.client);
  const riskLevel = useSelector(state => state.filter.riskLevel);
  const businessModule = useSelector(state => state.filter.businessModule);
  const level = useSelector(state => state.filter.level);
  const breakDown = useSelector(state => state.filter.breakDown);
  const riskid = useSelector(state => state.filter.riskid);
  const reportType = useSelector(state => state.filter.reportType);
  const mitigation = useSelector(state => state.filter.mitigation);
  const account = useSelector(state => state.filter.account);
  const userGroup = useSelector(state => state.filter.userGroup);
  const userinput = useSelector(state => state.filter.userinput);

  // Dynamic UI settings from Redux
  const dynamicColors = useSelector(state => state.filter.colors) || [];
  const primaryColor = dynamicColors[0] || '#2563eb';
  const dynamicFont = getDynamicFont(dynamicColors);

  // Create a dynamic theme based on the fetched filter settings
  const theme = useMemo(() => createMuiTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: { main: primaryColor },
    },
    typography: {
      ...baseTheme.typography,
      // fontFamily: [dynamicFont, 'Roboto', 'sans-serif'].join(','),
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

  useEffect(() => {
    dispatch(action.updatePathname(location.pathname));
    dispatch({ type: actionType.CLEAR_RESULT });
    dispatch(action.initFilter(token));
  }, [dispatch, location.pathname, token]);

  const openDialogue = (chart, groupby, barNumber) => {
    console.log("reached parents", { dialogue: true, groupby, chart, barNumber });
    setDialogue(true);
    setGroupby(groupby);
    setChart(chart);
    setBarNumber(barNumber || false);
  };

  const closeDialogue = () => {
    dispatch(action.clearriskReport());
    setDialogue(false);
    setGroupby('');
    setChart('');
  };

  const trigger = useScrollTrigger();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.pageContainer}>
        {/* Fixed Header / Filter Bar - 100% Sticky/Static */}
        <Paper
          elevation={0}
          className={classes.headerPaper}
        >
          <Box px={2} width="100%">
            <Box display="flex" alignItems="center" width="100%">
              <GRCFilter type='Dashbord' />
            </Box>
          </Box>
        </Paper>

        {/* Scrollable Work Area */}
        <Box className={classes.scrollContainer} style={{ overflowY: result ? 'auto' : 'hidden' }}>


          {/* Section 1: Top Metrics */}
          <Box style={{ marginBottom: '0px' }}>
            <GRCThirdSecData dialogueOpen={openDialogue} />
          </Box>

          {/* Section 2: Main Data Cards */}
          {result && result.E_RESULT_02 && result.E_RESULT_02.data && (
            <Box style={{ marginBottom: '0px' }}>
              <Grid container spacing={2}>
                {result.E_RESULT_02.data.slice(0, 6).map((data, idx) => (
                  <Grid item xs={12} sm={6} md={2} key={`row1-${idx}`}>
                    <GRCDataCard result={data} index={idx} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Section 3: Middle Section */}
          <Box style={{ marginBottom: '0px' }}>
            <GRCFifthSecData dialogueOpen={openDialogue} />
          </Box>

          {/* Section 4: Secondary Data Cards */}
          {result && result.E_RESULT_02 && result.E_RESULT_02.data && (
            <Box style={{ marginBottom: '0px' }}>
              <Grid container spacing={2}>
                {result.E_RESULT_02.data.slice(6, 12).map((data, idx) => (
                  <Grid item xs={12} sm={6} md={2} key={`row2-${idx}`}>
                    <GRCDataCard result={data} index={idx + 6} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Section 5: Bottom Sections */}
          {result && (
            <>
              <Box className={classes.smallSectionMargin}>
                <GRCFourthSecData dialogueOpen={openDialogue} />
              </Box>
              <Box className={classes.smallSectionMargin}>
                <GRCFirstSecData dialogueOpen={openDialogue} />
              </Box>
            </>
          )}



          {dialogue && (
            <GRCDragableDialogue
              barNumber={barNumber}
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

export default GRCDashBord;

