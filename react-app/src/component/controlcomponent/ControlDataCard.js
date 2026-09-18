import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Avatar, Box, Zoom } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getDynamicFont } from '../../theme';

// Icons
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ReportIcon from '@material-ui/icons/Report';
import ReportOffIcon from '@material-ui/icons/ReportOff';

const ControlDataCard = ({ result, index }) => {
  const dynamicColors = useSelector(state => state.control.colors) || [];
  const primaryColor = dynamicColors[0] || '#2563eb';
  const dynamicFont = getDynamicFont(dynamicColors);

  const colorSchemes = (dynamicColors.length >= 6) ? [
    { primary: dynamicColors[0], bg: `${dynamicColors[0]}12`, shadow: `${dynamicColors[0]}20` },
    { primary: dynamicColors[1], bg: `${dynamicColors[1]}12`, shadow: `${dynamicColors[1]}20` },
    { primary: dynamicColors[2], bg: `${dynamicColors[2]}12`, shadow: `${dynamicColors[2]}20` },
    { primary: dynamicColors[3], bg: `${dynamicColors[3]}12`, shadow: `${dynamicColors[3]}20` },
    { primary: dynamicColors[4], bg: `${dynamicColors[4]}12`, shadow: `${dynamicColors[4]}20` },
    { primary: dynamicColors[5], bg: `${dynamicColors[5]}12`, shadow: `${dynamicColors[5]}20` },
  ] : [
    { primary: '#2563eb', bg: '#eff6ff', shadow: 'rgba(37, 99, 235, 0.12)' },
    { primary: '#7c3aed', bg: '#f5f3ff', shadow: 'rgba(124, 58, 237, 0.12)' },
    { primary: '#0891b2', bg: '#ecfeff', shadow: 'rgba(8, 145, 178, 0.12)' },
    { primary: '#059669', bg: '#f0fdf4', shadow: 'rgba(5, 150, 105, 0.12)' },
    { primary: '#ca8a04', bg: '#fefce8', shadow: 'rgba(202, 138, 4, 0.12)' },
    { primary: '#dc2626', bg: '#fef2f2', shadow: 'rgba(220, 38, 38, 0.12)' },
  ];

  const scheme = colorSchemes[index % colorSchemes.length];

  const CONFIG = {
    fontFamily: dynamicFont,
    labelFontSize: '12px',
    valueFontSize: '12px',
    letterSpacing: '0.01rem',
    wordSpacing: '0.02rem',
    cardRadius: 6,
    // Dynamic Colors
    labelColor: '#000000',
    valueColor: '#0f172a',
    borderColor: 'rgb(173, 177, 184)',
    indicatorBg: '#f1f5f9'
  };

  const IconArray = [
    <ControlCameraIcon />, <FilterCenterFocusIcon />, <FilterTiltShiftIcon />, <ExploreIcon />, <ExploreOffIcon />,
    <PeopleIcon />, <AccountBoxIcon />, <PersonIcon />, <PersonAddDisabledIcon />, <ReportProblemIcon />,
    <ReportIcon />, <ReportOffIcon />
  ];

  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor: '#ffffff',
      border: `2px solid ${CONFIG.borderColor}`,
      borderRadius: CONFIG.cardRadius,
      height: 'auto',
      minHeight: 54,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 20px -8px ${scheme.shadow}`,
        borderColor: scheme.primary,
        '& $avatar': {
          transform: 'scale(1.05)',
          backgroundColor: scheme.primary,
          color: '#ffffff',
        }
      },
    },
    content: {
      padding: '6px 8px !important',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '100%',
      position: 'relative',
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 6,
      backgroundColor: scheme.primary,
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '& svg': {
        fontSize: '18px',
      }
    },
    centerSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: CONFIG.labelFontSize,
      color: CONFIG.labelColor,
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: 1.2,
      fontFamily: CONFIG.fontFamily,
      letterSpacing: CONFIG.letterSpacing,
      wordSpacing: CONFIG.wordSpacing,
      whiteSpace: 'normal',
      marginBottom: 10,
      textAlign: 'center',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    },
    value: {
      color: CONFIG.valueColor,
      fontSize: CONFIG.valueFontSize,
      fontFamily: CONFIG.fontFamily,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '-0.02em',
    },
    indicatorContainer: {
      width: '100%',
      height: 4,
      backgroundColor: CONFIG.indicatorBg,
      borderRadius: 2,
      marginTop: 4,
      overflow: 'hidden',
    },
    indicator: {
      height: '100%',
      backgroundColor: scheme.primary,
      borderRadius: 2,
    }
  }));

  const classes = useStyles();

  const progressWidth = result?.ZPERCENT || (35 + (index * 12) % 55);
  const widthStr = typeof progressWidth === 'string' && progressWidth.includes('%') 
    ? progressWidth 
    : `${progressWidth}%`;

  return (
    <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
      <Card className={classes.card} elevation={0}>
        <CardContent className={classes.content}>
          <Avatar variant="rounded" className={classes.avatar}>
            {IconArray[index % IconArray.length]}
          </Avatar>
          <div className={classes.centerSection}>
            <Typography className={classes.label}>
              {result?.COL1 ? result.COL1.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) : (result?.ZDESC || "No Data Available")}
            </Typography>
            <Typography className={classes.value}>
              {result?.ZCOUNT || 0}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default ControlDataCard;