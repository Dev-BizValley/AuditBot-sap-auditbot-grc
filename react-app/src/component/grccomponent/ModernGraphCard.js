import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardActions, Typography, Grid, IconButton, Box, MenuItem, Menu, Select, Tooltip as MuiTooltip, Fade, FormControl, Dialog, DialogContent, DialogTitle, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList, PieChart, Pie, Legend, Label, Sector } from 'recharts';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import PieChartIcon from '@material-ui/icons/PieChart';
import TocIcon from '@material-ui/icons/Toc';
import BarChartIcon from '@material-ui/icons/BarChart';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Draggable from 'react-draggable';
import ModernCommonTable from '../ModernCommonTable';
import { MENU_FONT_FAMILY, getDynamicFont } from '../../theme';

function PaperComponent(props) {
  return (
    <Draggable handle=".draggable-dialog-handle">
      <Paper {...props} style={{ ...props.style, backgroundColor: '#ffffff' }} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#ffffff',
    border: (props) => `2px solid ${props.config.borderColor}`,
    borderRadius: (props) => props.config.cardRadius,
    height: (props) => props.config.cardHeight,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: (props) => props.config.cardShadow,
    '&:hover': {
      backgroundColor: (props) => `${props.config.primary}05`,
      boxShadow: (props) => props.config.hoverShadow,
      transform: 'translateY(-4px)',
      borderColor: (props) => props.config.primary,
      '& $title': {
        color: (props) => props.config.primary,
      }
    }
  },
  content: {
    flex: 1,
    padding: '12px 12px 4px 12px !important',
    minHeight: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: '3px',
    },
  },
  actions: {
    padding: '12px 16px',
    backgroundColor: 'transparent',
    borderTop: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: (props) => props.config.titleColor,
    fontFamily: (props) => props.dynamicFont,
    letterSpacing: '-0.01em',
  },
  select: {
    color: (props) => props.config.selectColor,
    fontSize: '0.8rem',
    backgroundColor: (props) => props.config.selectBgColor,
    padding: '4px 12px',
    borderRadius: 12,
    border: (props) => `1px solid ${props.config.selectBorderColor}`,
    '& svg': { color: (props) => props.config.selectIconColor }
  },
  customTooltip: {
    backgroundColor: (props) => props.config.tooltipBgColor,
    backdropFilter: 'blur(8px)',
    border: 'none',
    borderRadius: 12,
    padding: '6px 10px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    color: (props) => props.config.tooltipTextColor,
    fontFamily: (props) => props.dynamicFont,
    '& .label': {
      fontSize: 11,
      fontWeight: 400,
      marginBottom: 4,
      color: (props) => props.config.tooltipLabelColor,
      fontFamily: (props) => props.dynamicFont,
    },
    '& .value': {
      fontSize: 11,
      fontWeight: 400,
      color: (props) => props.config.tooltipTextColor,
      fontFamily: (props) => props.dynamicFont,
    }
  },
  dialogTitle: {
    background: '#ffffff',
    padding: '2px 24px',
    borderBottom: (props) => `1px solid ${props.config.actionBorderColor}`,
    '& h2': {
      fontFamily: (props) => props.dynamicFont,
      fontSize: (props) => props.config.dialogTitleFontSize,
      fontWeight: 800,
      color: (props) => props.config.titleColor,
    }
  }
}));

const CustomTooltip = ({ active, payload, label, config, dynamicFont }) => {
  const classes = useStyles({ config, dynamicFont });
  if (active && payload && payload.length) {
    return (
      <div className={classes.customTooltip}>
        <p className="label" style={{ marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 4, fontFamily: dynamicFont, fontSize: '11px' }}>
          {payload[0].payload.displayName || payload[0].payload.GROUP_DESC1 || label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="value" style={{ color: entry.color, margin: '4px 0', fontFamily: dynamicFont, fontSize: '11px' }}>
            {entry.name ? `${entry.name} : ${entry.value}` : `${entry.value} Risks`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Global Bar Configuration for Consistency
const BAR_SIZES = {
  VERTICAL: {
    STACKED: 55,
    GROUPED: 45,
    SINGLE: 55
  },
  HORIZONTAL: {
    STACKED: 55,
    GROUPED: 45,
    SINGLE: 55
  }
};

const getProcessedData = (data, chart, name) => {
  if (!data || !Array.isArray(data)) return [];
  const typeFilteredData = data.filter(item => !chart || item.ZTYPE === chart);

  // Grouping for Risk Type categories
  const normName = name ? decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim() : '';
  if (chart === '01' || chart === '02' || chart === '08' || normName === 'total executed risks by risk type') {
    const targetCategories = ['Auth Obj', 'SoD Risk', 'Sensitive'];
    
    const encounteredCategories = [];
    typeFilteredData.forEach(item => {
      const desc = item.GROUP_DESC1;
      if (targetCategories.includes(desc) && !encounteredCategories.includes(desc)) {
        encounteredCategories.push(desc);
      }
    });

    const grouped = {};
    typeFilteredData.forEach(item => {
      const desc = item.GROUP_DESC1;
      if (targetCategories.includes(desc)) {
        if (!grouped[desc]) {
          grouped[desc] = { 
            ...item, 
            ZCOUNT1: 0, 
            ZCOUNT2: 0, 
            ZCOUNT3: 0 
          };
        }
        grouped[desc].ZCOUNT1 += Number(item.ZCOUNT1) || 0;
        grouped[desc].ZCOUNT2 += Number(item.ZCOUNT2) || 0;
        grouped[desc].ZCOUNT3 += Number(item.ZCOUNT3) || 0;
      }
    });

    const result = encounteredCategories
      .filter(cat => grouped[cat])
      .map(cat => grouped[cat]);

    return result.length > 0 ? result : typeFilteredData;
  }
  return typeFilteredData;
};

const checkIfMultipleBars = (header, data) => {
  if (header && typeof header === 'string') {
    const parts = header.split(',').map(h => h.trim().toLowerCase());
    const countCols = parts.filter((p, idx) => {
      if (idx === 0) return false;
      if (idx === 1 && (p === 'desc' || p === 'description' || p === 'name' || p === 'description1' || p === 'group desc1')) return false;
      return true;
    });
    return countCols.length > 1;
  }
  if (data && Array.isArray(data) && data.length > 0) {
    const hasZ2 = data.some(item => item.ZCOUNT2 !== undefined && item.ZCOUNT2 !== null && String(item.ZCOUNT2).trim() !== '' && Number(item.ZCOUNT2) > 0);
    const hasZ3 = data.some(item => item.ZCOUNT3 !== undefined && item.ZCOUNT3 !== null && String(item.ZCOUNT3).trim() !== '' && Number(item.ZCOUNT3) > 0);
    if (hasZ2 || hasZ3) return true;
  }
  return false;
};



const getDynamicBarSize = (type, isChart01) => {
  const t = Number(type);
  if (t === 2) return BAR_SIZES.VERTICAL.STACKED;
  if (t === 5) return BAR_SIZES.HORIZONTAL.STACKED;
  if (t === 4) return isChart01 ? BAR_SIZES.HORIZONTAL.GROUPED : BAR_SIZES.HORIZONTAL.SINGLE;
  return isChart01 ? BAR_SIZES.VERTICAL.GROUPED : BAR_SIZES.VERTICAL.SINGLE;
};

const ModernGraphCard = ({ data, name, chartType, chartId, dialogueOpen, header, chart }) => {
  const dynamicColors = useSelector(state => state.filter.colors) || [];
  const primaryColor = dynamicColors[0] || '#2563eb';
  const dynamicFont = getDynamicFont(dynamicColors);
  const COLORS = (dynamicColors.length >= 8) ? dynamicColors.slice(0, 16) : ["#2563eb", "#f97316", "#10b981", "#ef4444", "#8b5cf6", "#eab308", "#06b6d4", "#f43f5e"];

  const CONFIG = useMemo(() => ({
    fontFamily: dynamicFont,
    cardHeight: '40vh',
    cardShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px',
    hoverShadow: `0 45px 55px -5px ${primaryColor}25, 0 12px 16px -6px ${primaryColor}25`,
    cardRadius: 18,
    titleFontSize: '0.85rem',
    dialogTitle: {
      padding: '2px 24px !important',
      background: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      '& h2': {
        margin: 0,
        fontSize: '1.2rem',
        fontWeight: 500,
        color: '#0f172a',
        letterSpacing: '-0.02em',
      }
    },
    pieCenterValueFontSize: '1.4rem',
    pieCenterLabelFontSize: '0.55rem',
    legendFontSize: '12px',
    barLabelFontSize: 11,
    axisFontSize: 12,

    // Dynamic Colors
    primary: primaryColor,
    borderColor: 'rgb(173, 177, 184)',
    titleColor: '#0f172a',
    subTitleColor: '#64748b',
    selectColor: '#334155',
    selectBgColor: '#f8fafc',
    selectBorderColor: '#e2e8f0',
    selectIconColor: '#64748b',
    tooltipBgColor: '#ffffff',
    tooltipTextColor: '#000000de',
    tooltipLabelColor: '#000000de',
    actionBgColor: 'transparent',
    actionBorderColor: 'transparent',
    menuIconColor: primaryColor,
    pieCenterValueColor: '#0f172a',
    pieCenterLabelColor: '#64748b',
    legendTextColor: '#000000de',
    axisTickColor: '#000000de',
    tooltipCursorFill: '#f8fafc',
    barLabelColor: '#000000de'
  }), [primaryColor, dynamicFont]);

  const classes = useStyles({ dynamicFont, config: CONFIG });

  const processedData = useMemo(() => {
    const rawData = getProcessedData(data, chart, name);
    return rawData.map(item => ({
      ...item,
      displayName: item.GROUP_DESC1 || item.GROUPBY1 || item.BNAME || item.COL1 || ""
    }));
  }, [data, chart, name]);

  const filteredData = useMemo(() => {
    return processedData.filter(d => Number(d.ZCOUNT1) > 0);
  }, [processedData]);


  // Define default chart types based on ZTYPE (chart prop) and actual processed data values
  // 100% Dynamic Chart Type Initialization with Semantic Validation
  const getDefaultChartType = (zType, propType) => {
    const processed = getProcessedData(data, chart, name);
    const isMulti = checkIfMultipleBars(header, processed);
    let type = Number(propType) || 1;
    if (isMulti) {
      if (type === 3) return 1;
      if (type === 4) return 5;
    } else {
      if (type === 2) return 1;
      if (type === 5) return 4;
    }
    return type;
  };

  const [currentChartType, setCurrentChartType] = useState(getDefaultChartType(chart, chartType));
  const [activeIndex, setActiveIndex] = useState(0);

  // Dynamically sync currentChartType whenever chartType prop, header, data or chart changes from parent
  React.useEffect(() => {
    if (chartType) {
      const processed = getProcessedData(data, chart, name);
      const isMulti = checkIfMultipleBars(header, processed);
      let type = Number(chartType);
      if (isMulti) {
        if (type === 3) type = 1;
        if (type === 4) type = 5;
      } else {
        if (type === 2) type = 1;
        if (type === 5) type = 4;
      }
      setCurrentChartType(type);
    }
  }, [chartId]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const selectChartType = (type) => {
    setCurrentChartType(Number(type));
    handleMenuClose();
  };

  // 100% Dynamic Multi-Bar Detection based on explicit chartIds, header columns, and data values
  const hasMultipleBars = useMemo(() => {
    if (['SEC1', 'SEC12', 'SEC11'].includes(chartId)) return true;
    return checkIfMultipleBars(header, processedData);
  }, [header, processedData, chartId]);

  // 100% Dynamic Legend Labels derived directly from backend header prop with Semantic Overrides for Executed Views
  const legendLabels = useMemo(() => {
    let baseLabels = [];

    // Semantic Overrides based on EXACT chartId to prevent false positives on single-bar charts like SEC15
    if (chartId === 'SEC1' || chartId === 'SEC321') {
      baseLabels = ['Enabled Risk', 'Risk Found', 'Risk Not Found'];
    } else if (chartId === 'SEC12') {
      baseLabels = ['Risk Found', 'Executed Risks', 'Non Executed Risk'];
    } else if (chartId === '11' || chartId === 'SEC11') {
      baseLabels = ['Executed Risk Users', 'Non Executed Risk Users'];
    } else if (chartId === '08' || chart === '08' || (name && decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\\s+/g, ' ').trim() === 'total executed risks by risk type')) {
      baseLabels = ['Executed Risks', 'Non-Executed Risks'];
    } else if (header && typeof header === 'string') {
      // Default Dynamic ALV Header parsing (excluding 'Desc' description columns)
      const parts = header.split(',').map(h => h.trim());
      if (parts.length > 1) {
        baseLabels = parts.slice(1).filter(col => col.toLowerCase() !== 'desc');
      } else {
        baseLabels = parts.filter(col => col.toLowerCase() !== 'desc');
      }
    }

    // Default fallbacks in case header doesn't specify enough columns
    const fallbacks = ['Executed Risks', 'Non-Executed Risks', 'Never Executed Risks'];
    
    const isTotalExecuted = (chartId === '08' || chart === '08' || (name && decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\\s+/g, ' ').trim() === 'total executed risks by risk type'));
    
    // Determine how many bars the processed data actually has
    const hasZ3 = processedData.some(item => item.ZCOUNT3 !== undefined && item.ZCOUNT3 !== null && String(item.ZCOUNT3).trim() !== '' && Number(item.ZCOUNT3) > 0);
    const hasZ2 = processedData.some(item => item.ZCOUNT2 !== undefined && item.ZCOUNT2 !== null && String(item.ZCOUNT2).trim() !== '' && Number(item.ZCOUNT2) > 0);
    
    // If it's a single bar chart, force length to 1. UNLESS it's the Total Executed Risks chart, where the user explicitly requested the backend legend list.
    const requiredLabelsCount = (!hasMultipleBars && !isTotalExecuted) ? 1 : (baseLabels.length > 0 ? baseLabels.length : (hasZ3 ? 3 : (hasZ2 ? 2 : 1)));
    
    const finalLabels = [];
    for (let i = 0; i < requiredLabelsCount; i++) {
      if (baseLabels[i]) {
        finalLabels.push(baseLabels[i]);
      } else {
        finalLabels.push(fallbacks[i]);
      }
    }
    return finalLabels;
  }, [header, chartId, processedData, hasMultipleBars, name, chart]);

  const normNameForLegend = name ? decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\\s+/g, ' ').trim() : '';
  const isTotalExecutedRisksType = (chartId === '08' || chart === '08' || normNameForLegend === 'total executed risks by risk type');

  // 100% Dynamic Legend and Tooltip Visibility
  const showLegendAndTooltip = (hasMultipleBars && legendLabels.length > 1) || isTotalExecutedRisksType;



  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTableHeader = (data, key, headerdata) => {
    if (!data || data.length < 1) return [];
    let filtereddata = data.filter(p => p.ZTYPE === key);
    if (filtereddata.length < 1) return [];

    let header = headerdata ? headerdata.split(',') : [];
    let dataset2 = filtereddata.map(dt => ({
      COLUMN1: dt.GROUPBY1 || dt.BNAME || "",
      COLUMN2: dt.GROUP_DESC1 || dt.BNAME || dt.COL1 || "",
      COUNT1: dt.ZCOUNT1,
      COUNT2: dt.ZCOUNT2,
      COUNT3: dt.ZCOUNT3
    }));

    // Dynamic keys based on header length to ensure correct mapping
    let keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2', 'COUNT3'];
    if (header.length === 2) keys = ['COLUMN1', 'COUNT1'];
    else if (header.length === 3) keys = ['COLUMN1', 'COLUMN2', 'COUNT1'];
    else if (header.length === 4) keys = ['COLUMN1', 'COLUMN2', 'COUNT1', 'COUNT2'];

    return [header, keys, dataset2];
  };

  const tableDataResult = getTableHeader(processedData, chart, header);

  const calculateDomainMax = () => {
    if (!processedData || processedData.length === 0) return 10;
    const isStacked = (Number(currentChartType) === 2 || Number(currentChartType) === 5);
    
    let maxVal = 0;
    if (isStacked) {
      processedData.forEach(item => {
        const sum = (Number(item.ZCOUNT1) || 0) + (Number(item.ZCOUNT2) || 0) + (Number(item.ZCOUNT3) || 0);
        if (sum > maxVal) maxVal = sum;
      });
    } else {
      processedData.forEach(item => {
        const m = Math.max(Number(item.ZCOUNT1) || 0, Number(item.ZCOUNT2) || 0, Number(item.ZCOUNT3) || 0);
        if (m > maxVal) maxVal = m;
      });
    }

    if (maxVal === 0) return 10;
    const multiplier = isStacked ? 1.04 : 1.05;
    const target = maxVal * multiplier;
    const magnitude = Math.pow(10, Math.floor(Math.log10(target)));
    const normalized = target / magnitude;
    const niceSteps = [1, 2, 4, 5, 6, 8, 10];
    const niceMultiplier = niceSteps.find(s => s >= normalized) || 10;
    const result = Math.ceil(niceMultiplier * magnitude);
    return result < maxVal ? maxVal + 5 : result;
  };

  const totalRisksValue = useMemo(() => {
    if (!processedData || processedData.length === 0) return 0;
    // Check if backend explicitly sent a total row
    const backendTotalRow = data && data.find(d => d.GROUP_DESC1 === 'TOTAL' || d.GROUPBY1 === 'TOTAL');
    if (backendTotalRow && backendTotalRow.ZCOUNT1 !== undefined) {
      return Number(backendTotalRow.ZCOUNT1);
    }
    // If it's a users chart, summing risks is incorrect because users share risks.
    // The representative total from backend is usually the maximum value in this case.
    const norm = name ? decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim() : '';
    if (norm.includes('users')) {
      return Math.max(...processedData.map(d => Number(d.ZCOUNT1) || 0));
    }
    // Default sum for distinct categories like Risk Matrix
    return processedData.reduce((acc, curr) => acc + (Number(curr.ZCOUNT1) || 0), 0);
  }, [processedData, data, name]);

  const activeSlice = (activeIndex >= 0 && activeIndex < filteredData.length) ? filteredData[activeIndex] : null;
  const displayValue = activeSlice ? (activeSlice.ZCOUNT1 !== undefined ? activeSlice.ZCOUNT1 : (activeSlice.payload?.ZCOUNT1 ?? 0)) : totalRisksValue;
  const displayLabel = activeSlice ? (activeSlice.displayName || activeSlice.payload?.displayName || "") : "TOTAL RISKS";
  const fillValueColor = activeIndex !== -1 ? COLORS[activeIndex % COLORS.length] : CONFIG.pieCenterValueColor;
  
  console.log("[GRC-DEBUG] Render Center State:", { activeIndex, activeSlice, displayValue, displayLabel, fillValueColor, rawData: data });
  const displayLabelStr = String(displayLabel);
  const truncatedLabel = displayLabelStr.length > 15 ? displayLabelStr.substring(0, 12) + "..." : displayLabelStr;

  const renderChartIcon = () => {
    const type = Number(currentChartType);
    if (type === 3) {
      return <DonutSmallIcon fontSize="small" style={{ color: '#f43f5e' }} />;
    } else if (type === 4 || type === 5) {
      return <ViewStreamIcon fontSize="small" style={{ color: '#f43f5e' }} />;
    } else {
      return <BarChartIcon fontSize="small" style={{ color: '#f43f5e' }} />;
    }
  };

  if (!processedData || processedData.length === 0) {
    return (
      <Card className={classes.card} elevation={0}>
        <CardContent className={classes.content}>
          <Box display="flex" alignItems="center" justifyContent="center" height="100%">
            <Typography color="textSecondary" style={{ fontFamily: dynamicFont }}>No data available for analysis</Typography>
          </Box>
        </CardContent>
        <CardActions className={classes.actions}>
          <Box display="flex" alignItems="center" width="100%">
            <Box flex={1} textAlign="center" px={1}>
              <Typography className={classes.title}>
                {name ? name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()) : ''}
              </Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>
    );
  }  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius: _innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent: _percent, value: _value, name: _name
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 11;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    const activeInnerRadius = outerRadius * 0.5882;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize="16px" fontWeight="400" fontFamily={dynamicFont}>{payload.ZCOUNT1}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={activeInnerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke={fill} />
        <text x={ex + (cos >= 0 ? 1 : -1) * 5} y={ey} angle={-45} fontSize={12} textAnchor={textAnchor} fill={fill} fontFamily={CONFIG.fontFamily}>{`${payload.displayName || payload.GROUP_DESC1 || ''}`}</text>
      </g>
    );
  };

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardContent className={classes.content}>
          <Box flex={1} width="100%" minHeight={0} display="flex" justifyContent="center" alignItems="center" style={{ position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              {Number(currentChartType) === 3 ? (
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={filteredData}
                    cx={Number(currentChartType) === 3 ? "50%" : "42%"}
                    innerRadius="50%"
                    outerRadius="85%"
                    paddingAngle={0}
                    dataKey="ZCOUNT1"
                    nameKey="displayName"
                    stroke="white"
                    isAnimationActive={true}
                    onMouseEnter={(d, idx) => {
                      console.log("[GRC-DEBUG] Pie Hover Enter:", idx);
                      setActiveIndex(idx);
                    }}
                    onClick={(d) => {
                      console.log("[GRC-DEBUG] Pie Click Data:", d);
                      const payload = d.payload || {};
                      const activeG = payload.GROUPBY1 || d.GROUPBY1 || payload.BNAME || d.BNAME || payload.displayName || d.displayName || "";
                      let barNum = false;
                      if (chartId === 'SEC15') barNum = '1';
                      else if (chartId === 'SEC32') barNum = '2';
                      else if (chartId === 'SEC34') barNum = '1';
                      dialogueOpen(chartId, activeG, barNum);
                    }}
                  >
                    {filteredData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        style={{ cursor: 'pointer', outline: 'none' }}
                        onMouseEnter={() => {
                          console.log("[GRC-DEBUG] Cell Hover Enter:", index);
                          setActiveIndex(index);
                        }}
                      />
                    ))}
                  </Pie>

                  {/* Tooltip removed for donut chart */}
                  {Number(currentChartType) !== 3 && (
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                      iconType="circle"
                      wrapperStyle={{
                        right: "2%",
                        fontSize: CONFIG.legendFontSize,
                        fontFamily: dynamicFont,
                        fontWeight: 400,
                        color: CONFIG.legendTextColor
                      }}
                    />
                  )}
                </PieChart>
              ) : (
                <BarChart
                  data={processedData}
                  layout={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? "vertical" : "horizontal"}
                  margin={{ top: 10, right: 15, left: (Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 10 : 20, bottom: (Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 10 : 0 }}
                  barGap={4}
                  barCategoryGap={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? "10%" : "5%"}
                >
                  <CartesianGrid
                    strokeDasharray="0"
                    stroke={CONFIG.gridStroke}
                    vertical={(Number(currentChartType) === 4 || Number(currentChartType) === 5)}
                    horizontal={(Number(currentChartType) !== 4 && Number(currentChartType) !== 5)}
                    strokeWidth={1}
                  />
                  <XAxis
                    dataKey={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? undefined : "displayName"}
                    type={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? "number" : "category"}
                    tick={{ fill: CONFIG.axisTickColor, fontSize: CONFIG.axisFontSize, fontFamily: dynamicFont, fontWeight: 400 }}
                    axisLine={false}
                    tickLine={false}
                    hide={false}
                    domain={[0, calculateDomainMax()]}
                    interval={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? undefined : 0}
                  />
                  <YAxis
                    dataKey={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? "displayName" : undefined}
                    type={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? "category" : "number"}
                    tick={{ fill: CONFIG.axisTickColor, fontSize: CONFIG.axisFontSize, fontFamily: dynamicFont, fontWeight: 400 }}
                    axisLine={false}
                    tickLine={false}
                    width={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 80 : 45}
                    domain={[0, calculateDomainMax()]}
                    interval={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 0 : undefined}
                  />

                  {/* 
                      Tooltip is conditionally rendered only for charts that have legends (showLegendAndTooltip).
                      For single bar charts (no legends) or disabled ones, the tooltip is hidden.
                  */}
                  {showLegendAndTooltip && (
                    <Tooltip
                      content={<CustomTooltip config={CONFIG} dynamicFont={dynamicFont} />}
                      cursor={{ fill: CONFIG.tooltipCursorFill, radius: 8 }}
                    />
                  )}
                  {showLegendAndTooltip && (
                    <Legend
                      verticalAlign="top"
                      align="center"
                      iconType="square"
                      iconSize={10}
                      wrapperStyle={{ paddingBottom: 12, fontFamily: dynamicFont, fontSize: CONFIG.legendFontSize, fontWeight: 400 }}
                    />
                  )}
                  {hasMultipleBars && (
                    <Bar
                      dataKey="ZCOUNT1"
                      name={legendLabels[0]}
                      fill={COLORS[0]}
                      stackId={(Number(currentChartType) === 2 || Number(currentChartType) === 5) ? "a" : undefined}
                      radius={(Number(currentChartType) === 2 || Number(currentChartType) === 5) ? (legendLabels.length === 1 ? (Number(currentChartType) === 5 ? [0, 6, 6, 0] : [6, 6, 0, 0]) : [0, 0, 0, 0]) : (Number(currentChartType) === 4 ? [0, 6, 6, 0] : [6, 6, 0, 0])}
                      maxBarSize={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 35 : 45}
                      onClick={(d) => {
                        const activeG = d.GROUPBY1 || (d.payload && d.payload.GROUPBY1) || d.activeLabel || d.label || "";
                        let barNum = false;
                        const norm = name ? decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim() : '';
                        const isExecChart = norm.includes('executed') || (header && header.toLowerCase().includes('executed')) || chartId === 'SEC321' || chartId === 'SEC12' || chartId === 'SEC11';

                        // Fully modernized drilldown mappings for SEC13
                        if (chartId === 'SEC13') {
                          barNum = 2;
                        }
                        else if (chartId === 'SEC11') barNum = 'B';
                        else if (chartId === 'SEC12') barNum = 5;
                        else if (chartId === 'SEC1') barNum = 7;
                        else if (chartId === 'SEC15') barNum = 2; // '2' is the correct parameter for Executed Risks at the User Level
                        else if (chartId === 'SEC34') barNum = 1;
                        else if (chartId === 'SEC32') barNum = 8; // Matched from original GRCGraphCard.js
                        else if (chartId === 'SEC321') barNum = 1; // Matched from original GRCGraphCard.js

                        console.log("[GRC-CLICK-TRACE] Bar 1 (ZCOUNT1) Clicked -> Chart:", chartId, "Category:", activeG, "barNum passing:", barNum);
                        dialogueOpen(chartId, activeG, barNum);
                      }}
                      isAnimationActive={false}
                    >
                      <LabelList
                        dataKey="ZCOUNT1"
                        position="center"
                        style={{ fontSize: CONFIG.barLabelFontSize, fill: "#ffffff", fontWeight: 400, fontFamily: dynamicFont }}
                        offset={10}
                        formatter={(val) => (val > 0) ? val : ''}
                      />
                    </Bar>
                  )}
                  {hasMultipleBars && legendLabels.length > 1 && (
                    <Bar
                      dataKey="ZCOUNT2"
                      name={legendLabels[1]}
                      fill={COLORS[1]}
                      stackId={(Number(currentChartType) === 2 || Number(currentChartType) === 5) ? "a" : undefined}
                      radius={(Number(currentChartType) === 2 || Number(currentChartType) === 5) ? (legendLabels.length === 2 ? (Number(currentChartType) === 5 ? [0, 6, 6, 0] : [6, 6, 0, 0]) : [0, 0, 0, 0]) : (Number(currentChartType) === 4 ? [0, 6, 6, 0] : [6, 6, 0, 0])}
                      maxBarSize={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 35 : 45}
                      onClick={(d) => {
                        const activeG = d.GROUPBY1 || (d.payload && d.payload.GROUPBY1) || d.activeLabel || d.label || "";
                        let barNum = false;
                        const norm = name ? decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim() : '';
                        const isExecChart = norm.includes('executed') || (header && header.toLowerCase().includes('executed')) || chartId === 'SEC321' || chartId === 'SEC12' || chartId === 'SEC11';

                        if (chartId === 'SEC13') {
                          barNum = 3;
                        }
                        else if (chartId === 'SEC11') barNum = 'C';
                        else if (chartId === 'SEC12') {
                          barNum = isExecChart ? 9 : 2;
                        }
                        else if (chartId === 'SEC1') barNum = 5;
                        else if (chartId === 'SEC15' || chartId === 'SEC32' || chartId === 'SEC34') barNum = 5; // Risk Found is level 5

                        console.log("[GRC-CLICK-TRACE] Bar 2 (ZCOUNT2) Clicked -> Chart:", chartId, "Category:", activeG, "barNum passing:", barNum);
                        dialogueOpen(chartId, activeG, barNum);
                      }}
                      isAnimationActive={false}
                    >
                      <LabelList
                        dataKey="ZCOUNT2"
                        position="center"
                        style={{ fontSize: CONFIG.barLabelFontSize, fill: "#ffffff", fontWeight: 400, fontFamily: dynamicFont }}
                        offset={10}
                        formatter={(val) => (val > 0) ? val : ''}
                      />
                    </Bar>
                  )}
                  {hasMultipleBars && legendLabels.length > 2 && (
                    <Bar
                      dataKey="ZCOUNT3"
                      name={legendLabels[2]}
                      fill={COLORS[2]}
                      stackId={(Number(currentChartType) === 2 || Number(currentChartType) === 5) ? "a" : undefined}
                      radius={(Number(currentChartType) === 2 || Number(currentChartType) === 5) ? (legendLabels.length === 3 ? (Number(currentChartType) === 5 ? [0, 6, 6, 0] : [6, 6, 0, 0]) : [0, 0, 0, 0]) : (Number(currentChartType) === 4 ? [0, 6, 6, 0] : [6, 6, 0, 0])}
                      maxBarSize={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 35 : 45}
                      onClick={(d) => {
                        const activeG = d.GROUPBY1 || (d.payload && d.payload.GROUPBY1) || d.activeLabel || d.label || "";
                        let barNum = false;
                        const norm = name ? decodeURIComponent(name).toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim() : '';
                        const isExecChart = norm.includes('executed') || (header && header.toLowerCase().includes('executed')) || chartId === 'SEC321' || chartId === 'SEC12' || chartId === 'SEC11';

                        if (chartId === 'SEC13') {
                          barNum = 9;
                        }
                        else if (chartId === 'SEC12') barNum = isExecChart ? 'A' : 3;
                        else if (chartId === 'SEC1') barNum = 6;
                        else if (chartId === 'SEC15' || chartId === 'SEC32' || chartId === 'SEC34') barNum = 9; // Risk Not Found is level 9
                        else if (chartId === 'SEC321') barNum = 1;

                        console.log("[GRC-CLICK-TRACE] Bar 3 (ZCOUNT3) Clicked -> Chart:", chartId, "Category:", activeG, "barNum passing:", barNum);
                        dialogueOpen(chartId, activeG, barNum);
                      }}
                      isAnimationActive={false}
                    >
                      <LabelList
                        dataKey="ZCOUNT3"
                        position="center"
                        style={{ fontSize: CONFIG.barLabelFontSize, fill: "#ffffff", fontWeight: 400, fontFamily: dynamicFont }}
                        offset={10}
                        formatter={(val) => (val > 0) ? val : ''}
                      />
                    </Bar>
                  )}
                  {!hasMultipleBars && (
                    <Bar
                      dataKey="ZCOUNT1"
                      radius={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? [0, 6, 6, 0] : [6, 6, 0, 0]}
                      maxBarSize={(Number(currentChartType) === 4 || Number(currentChartType) === 5) ? 35 : 45}
                      onClick={(d) => {
                        console.log("[GRC-DEBUG] Bar Click Data:", d);
                        const activeG = d.GROUPBY1 || (d.payload && d.payload.GROUPBY1) || d.activeLabel || d.label || "";
                        let barNum = false;

                        if (chartId === 'SEC15') barNum = 2;
                        else if (chartId === 'SEC34') barNum = 1;
                        else if (chartId === 'SEC32') barNum = 8; // Matched from original GRCGraphCard.js

                        dialogueOpen(chartId, activeG, barNum);
                      }}
                      isAnimationActive={false}
                    >

                      {processedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      <LabelList
                        dataKey="ZCOUNT1"
                        position="center"
                        style={{ fontSize: CONFIG.barLabelFontSize, fill: "#ffffff", fontWeight: 400, fontFamily: dynamicFont }}
                        offset={10}
                        formatter={(val) => (val > 0) ? val : ''}
                      />
                    </Bar>
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>

          </Box>
        </CardContent>
        <CardActions className={classes.actions}>
          <Box display="flex" alignItems="center" width="100%">
            <Box
              onClick={handleMenuClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '2px 4px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                minWidth: '50px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                fontFamily: dynamicFont,
                fontSize: '12px'
              }}
            >
              {renderChartIcon()}
              <ArrowDropDownIcon fontSize="small" style={{ color: '#64748b', marginLeft: 4 }} />
            </Box>

            <Box flex={1} textAlign="center" px={1}>
              <Typography className={classes.title}>
                {name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
              </Typography>
            </Box>

            <IconButton size="small" onClick={handleClickOpen} style={{ color: '#64748b' }}>
              <TocIcon fontSize="small" />
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              style: {
                borderRadius: '12px',
                marginTop: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                minWidth: '180px'
              }
            }}
          >
            <MenuItem onClick={() => selectChartType(1)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: Number(currentChartType) === 1 ? primaryColor : '#475569' }}>Vertical Bar</MenuItem>
            {hasMultipleBars ? [
              chartId !== 'SEC321' && <MenuItem key="2" onClick={() => selectChartType(2)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: Number(currentChartType) === 2 ? primaryColor : '#475569' }}>Vertical Stacked Bar</MenuItem>,
              chartId !== 'SEC321' && <MenuItem key="5" onClick={() => selectChartType(5)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: Number(currentChartType) === 5 ? primaryColor : '#475569' }}>Horizontal Stacked Bar</MenuItem>,
              chartId === 'SEC321' && <MenuItem key="4" onClick={() => selectChartType(4)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: Number(currentChartType) === 4 ? primaryColor : '#475569' }}>Horizontal Bar</MenuItem>
            ] : [
              <MenuItem key="4" onClick={() => selectChartType(4)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: Number(currentChartType) === 4 ? primaryColor : '#475569' }}>Horizontal Bar</MenuItem>,
              <MenuItem key="3" onClick={() => selectChartType(3)} style={{ fontSize: '12px', fontFamily: dynamicFont, padding: '10px 16px', fontWeight: 500, color: Number(currentChartType) === 3 ? primaryColor : '#475569' }}>Donut Chart</MenuItem>
            ]}
          </Menu>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        fullWidth={false}
        classes={{ paper: classes.dialogPaper }}
        disableEnforceFocus
      >
        <DialogContent style={{ padding: '8px 24px !important', overflow: 'hidden' }}>
          {tableDataResult && tableDataResult.length > 0 && (
            <ModernCommonTable
              name={name}
              header={tableDataResult[0]}
              data={tableDataResult[2]}
              keys={tableDataResult[1]}
              colors={dynamicColors}
              isReport={false}
              onClose={handleClose}
              isTocGrid={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModernGraphCard;
