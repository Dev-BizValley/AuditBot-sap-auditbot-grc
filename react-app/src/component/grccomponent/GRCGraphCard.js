import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import SingleSelectDropDown from '../SingleSelectDropDown'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import GRCDashbordTable from './GRCDashbordTable';
import IconButton from '@material-ui/core/IconButton';
import TocIcon from '@material-ui/icons/Toc';
import CloseIcon from '@material-ui/icons/Close';
import BarChartIcon from '@material-ui/icons/BarChart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import GRCReportTable from './GRCReportTable';
// import { MENU_FONT_FAMILY } from '../../theme';
import { getDynamicFont } from '../../theme';
const COLORS = ["#009ed7", "#a05195", "#665191", "#665191", "#ffa600", "#d45087", "#f95d6a", "#ff7c43", "#2f4b7c", "#00bdd7", "#0093ff", "#005fc0", "#ffab91", "#66bb6a", "#9e9d24", "#ffe082", "#26a69a", "#00acc1", "#e57373", "#ff8a80", "#8d6e63", "#ff80ab", "#f48fb1", "#9575cd", "#7986cb", "#64b5f6", "#ffb74d", "#ea80fc", "#4dd0e1", "#d4e157", "#9ccc65", "#fff176", "#ffd740", "#90a4ae", "#eeff41", "#ccff90", "#c0ca33", "#0097a7", "#29b6f6"];
const RADIAN = Math.PI / 180;

// const CONFIG = {
//   cardHeight: "42vh",
//   cardShadow: 8,
//   cardRadius: 18,
//   borderColor: 'rgb(173, 177, 184)',
//   fontFamily: MENU_FONT_FAMILY,
//   axisFontSize: 12,
//   legendFontSize: '12px',
//   dialogTitleFontSize: 16,
//   gridStroke: "#cbd5e1",
//   axisFontColor: "#000000de",
//   titleFontWeight: "normal",
//   labelFontSize: "70%",
//   stackLabelFontSize: "50%",
// };

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: (props) => `${props.config.cardRadius}px !important`,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 30px 40px -2px, rgba(0, 0, 0, 0.1) 0px 6px 10px -2px !important',
    border: (props) => `2px solid ${props.config.borderColor}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: (props) => `${(props.color && props.color[0]) || '#2563eb'}05`,
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08) !important',
      borderColor: (props) => (props.color && props.color[0]) || '#2563eb',
      '& $titleLabel': {
        color: (props) => (props.color && props.color[0]) || '#2563eb',
      }
    }
  },
  titleLabel: {
    fontSize: '14px !important',
    fontWeight: 700,
    color: '#000000de',
    fontFamily: (props) => props.config.fontFamily,
    transition: 'color 0.3s ease',
  },
  dialoguewidth: {
    maxWidth: 'inherit'
  },
  resize: {
    fontSize: 15,
    padding: '12px 14px'
  },
  icon: {
    right: 0,
    height: 20
  },
  rootSelect: {
    paddingLeft: '3px',
    paddingRight: '18px !important'
  }
}));

function PaperComponent(props) {
  return (
    <Draggable handle=".draggable-dialog-handle">
      <Paper {...props} style={{ ...props.style, backgroundColor: '#ffffff' }} />
    </Draggable>
  );
}

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Box
//         style={{
//           backgroundColor: '#ffffff',
//           backdropFilter: 'blur(8px)',
//           padding: '8px 12px',
//           borderRadius: '12px',
//           border: 'none',
//           boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
//           color: '#000000de',
//           fontFamily: MENU_FONT_FAMILY
//         }}
//       >
//         <Typography variant="subtitle2" style={{ fontWeight: 400, marginBottom: 4, color: '#000000de', fontSize: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 4 }}>
//           {payload[0].payload.GROUP_DESC1 || label}
//         </Typography>
//         {payload.map((entry, index) => (
//           <Typography key={index} variant="body2" style={{ color: entry.color, fontSize: '12px', fontWeight: 400, marginTop: 4 }}>
//             {entry.name ? `${entry.name} : ${entry.value}` : `Count : ${entry.value}`}
//           </Typography>
//         ))}
//       </Box>
//     );
//   }
//   return null;
// };

const GRCGraphCard = (props) => {
  const dynamicFont = getDynamicFont(props.color);
  const CONFIG = useMemo(() => ({
    cardHeight: "42vh",
    cardShadow: 8,
    cardRadius: 18,
    borderColor: 'rgb(173, 177, 184)',
    fontFamily: dynamicFont,
    axisFontSize: 12,
    legendFontSize: '12px',
    dialogTitleFontSize: 16,
    gridStroke: "#cbd5e1",
    axisFontColor: "#000000de",
    titleFontWeight: "normal",
    labelFontSize: "70%",
    stackLabelFontSize: "50%",
  }), [dynamicFont]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          style={{
            backgroundColor: '#ffffff',
            backdropFilter: 'blur(8px)',
            padding: '8px 12px',
            borderRadius: '12px',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
            color: '#000000de',
            fontFamily: dynamicFont
          }}
        >
          <Typography variant="subtitle2" style={{ fontWeight: 400, marginBottom: 4, color: '#000000de', fontSize: '11px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 4, fontFamily: dynamicFont }}>
            {payload[0].payload.GROUP_DESC1 || label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" style={{ color: entry.color, fontSize: '11px', fontWeight: 400, marginTop: 4, fontFamily: dynamicFont }}>
              {entry.name ? `${entry.name} : ${entry.value}` : `Count : ${entry.value}`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  const proesResultData = (data, key) => {
    if (data && data != null && data.length > 0) {
      let filtereddata = data.filter(p => p.ZTYPE === key)

      let mappedData = [];
      filtereddata.map(v => {
        let temp = {};
        temp.name = v.GROUP_DESC1;
        temp.ZCOUNT1 = v.ZCOUNT1;
        temp.ZCOUNT2 = v.ZCOUNT2;
        temp.ZCOUNT3 = v.ZCOUNT3;
        temp.ZCOUNT = v.ZCOUNT;
        temp.ZTYPE = v.ZTYPE;
        temp.GROUPBY1 = v.GROUPBY1;
        mappedData.push(temp);
      })
      /*     let array=[1,2,3,4,5,6,7,8,9,10]
          array.map(p=>{
              let temp={};
              temp.x='test'+p;
              temp.y=p*2;
              values.push(temp); 
          }) */
      return filtereddata
    } else {
      return [];
    }
  }
  const getChart = (data, value, color) => {
    switch (value) {
      case 1:
        return getRCVBarChart(data, color);
      case 2:
        return getPiChart(data)
      case 3:
        return getPiCustomChart(data)
      case 4:
        return getRCHBarChart(data, color);
      case 5:
        return getRCVBarChartThreeStack(data, color);
      case 6:
        return getRCHBarChartThreeStack(data, color);
      case 7:
        return getRCVBarChartThree(data, color);
      default:
        return getRCVBarChart(data, color)
    }
  }

  const getRCVBarChart = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%" 
      layout={"horizontal"}
      data={data}
      
      
      maxBarSize={65}
      margin={{
        top: 10, right: 30, left: 30, bottom: 17,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={1} />
      <XAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke={CONFIG.gridStroke} tick={CustomizedAxisTick} />
      <YAxis axisLine={false} tickLine={false} dataKey="ZCOUNT1" interval={0} stroke={CONFIG.gridStroke} width={80} tick={CustomizedYAxisTick} />
      <Bar maxBarSize={65} dataKey="ZCOUNT1" fill={'#00bcd4'} isAnimationActive={false} onClick={(data) => getData(data)} >
        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} />)
        }
        <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff", fontWeight: CONFIG.titleFontWeight }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
    </BarChart></ResponsiveContainer>)
  }




  const CustomizedAxisTick = ({
    x, y, stroke, payload,
  }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={10} textAnchor="middle" fontSize={CONFIG.axisFontSize} fill={CONFIG.axisFontColor} fontFamily={CONFIG.fontFamily} transform="rotate(0)">{payload.value}</text>
      </g>
    );
  }

  const CustomizedYAxisTick = ({
    x, y, stroke, payload,
  }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} dx={-10} textAnchor="end" fontSize={CONFIG.axisFontSize} fill={CONFIG.axisFontColor} fontFamily={CONFIG.fontFamily} transform="rotate(0)">{payload.value}</text>
      </g>
    );
  }




  const getPiChart = (data) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart >
          <Pie
            data={data}
            innerRadius='50%'
            outerRadius='85%'
            dataKey="ZCOUNT1"
            onClick={(data) => getData(data)}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} stroke='none' />)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>)
  }
  const onPieEnter = (data, index) => {
    setActiveIndex(index)
  };

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="#000000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {value === 0 || !value ? "" : value}
    </text>
    );
  };

  const getPiCustomChart = (data) => {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart >
          <Pie
            data={data}
            innerRadius='50%'
            outerRadius='85%'
            dataKey="ZCOUNT1"
            onClick={(data) => getData(data)}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorState[index % colorState.length]} stroke='none' />)
            }
          </Pie>
        </PieChart></ResponsiveContainer>)
  }


  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value, name
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 11;
    const ey = my;
      layout={"horizontal"}
      data={data}
      
      
      layout={"horizontal"}
      data={data}
      
      
      maxBarSize={65}
      margin={{
        top: 10, right: 0, left: 0, bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} stroke={CONFIG.gridStroke} strokeWidth={1} />
      <Legend align='right' layout='vertical' verticalAlign='middle' iconSize={10} wrapperStyle={{
        fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
      , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => legendText(value)} />
      <XAxis tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke={CONFIG.gridStroke} tick={CustomizedAxisTick} />
      <YAxis tickLine={false} interval={0} stroke={CONFIG.gridStroke} width={70} tick={CustomizedYAxisTick} />
      <Bar maxBarSize={65} dataKey="ZCOUNT1" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data)} >
        <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT2" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data)} >
        <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT3" fill={colorState[2]} isAnimationActive={false} onClick={(data) => getData(data)} >
        <LabelList dataKey="ZCOUNT3" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      {/* <Bar maxBarSize={65} dataKey="ZCOUNT1" stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
                  {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSFIRSTSTACK[index % COLORSFIRSTSTACK.length]} />)
                  }
              </Bar>
              <Bar maxBarSize={65} dataKey="ZCOUNT2"  stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
                  {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSSECONDSTACK[index % COLORSSECONDSTACK.length]} />)
                  }
              </Bar>
              <Bar maxBarSize={65} dataKey="ZCOUNT3" stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
                  {
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSTHIRDSTACK[index % COLORSTHIRDSTACK.length]} />)
                  }
              </Bar> */}
    </BarChart></ResponsiveContainer>)
  }
  const getRCHBarChartThreeStack = (data, color) => {

    return (<ResponsiveContainer width='100%' height='100%'>
      <BarChart barGap={4} barCategoryGap="10%" 
        layout={"vertical"}
        data={data}
        
        
        maxBarSize={35}
        margin={{
          top: 5, right: 20, left: 10, bottom: 5,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} strokeWidth={1} />
        <Legend align='right' layout='vertical' verticalAlign='middle' iconSize={10} wrapperStyle={{
          fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
        , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => legendText(value)} />
        <XAxis tickLine={false} type='number' stroke={CONFIG.gridStroke} interval={0} tick={CustomizedAxisTick} />
        <YAxis tickLine={false} dataKey="GROUP_DESC1" type="category" stroke={CONFIG.gridStroke} width={80} interval={0} tick={CustomizedYAxisTick} />
        <Bar maxBarSize={35} dataKey="ZCOUNT1" stackId="a" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data)} >
          <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>
        <Bar maxBarSize={35} dataKey="ZCOUNT2" stackId="a" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data)} >
          <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>
        <Bar maxBarSize={35} dataKey="ZCOUNT3" stackId="a" fill={colorState[2]} isAnimationActive={false} onClick={(data) => getData(data)} >
          <LabelList dataKey="ZCOUNT3" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>
        {/* <Bar dataKey="ZCOUNT1" stackId="a" fill={'#48C9B0'} onClick={(data)=>getData(data)}>
                            {  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSFIRSTSTACK[index % COLORSFIRSTSTACK.length]} />)
                            }
                            </Bar>
                            <Bar dataKey="ZCOUNT2" stackId="a" fill={'#48C9B0'} onClick={(data)=>getData(data)}>
                            {  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSSECONDSTACK[index % COLORSSECONDSTACK.length]} />)
                            }
                            </Bar>
                            <Bar dataKey="ZCOUNT3" stackId="a" fill={'#48C9B0'} onClick={(data)=>getData(data)}>
                            {  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSTHIRDSTACK[index % COLORSTHIRDSTACK.length]} />)
                            }
                            </Bar> */}
      </BarChart></ResponsiveContainer>)
  }





  const getRCHBarChartTwoStack = (data, color) => {

    return (<ResponsiveContainer width='100%' height='100%'>
      <BarChart barGap={4} barCategoryGap="10%" 
        layout={"vertical"}
        data={data}
        
        
        maxBarSize={35}
        margin={{
          top: 5, right: 20, left: 10, bottom: 5,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} />
        <XAxis type='number' stroke={CONFIG.gridStroke} interval={0} tick={CustomizedAxisTick} />
        <YAxis dataKey="GROUP_DESC1" type="category" stroke={CONFIG.gridStroke} width={60} interval={0} tick={CustomizedYAxisTick} />
        <Bar maxBarSize={35} dataKey="ZCOUNT1" stackId="a" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data)} />
        <Bar maxBarSize={35} dataKey="ZCOUNT2" stackId="a" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data)} />

        {/* <Bar dataKey="ZCOUNT1" stackId="a" fill={'#48C9B0'} onClick={(data)=>getData(data)}>
                                {  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSFIRSTSTACK[index % COLORSFIRSTSTACK.length]} />)
                                }
                                </Bar>
                                <Bar dataKey="ZCOUNT2" stackId="a" fill={'#48C9B0'} onClick={(data)=>getData(data)}>
                                {  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSSECONDSTACK[index % COLORSSECONDSTACK.length]} />)
                                }
                                </Bar> */}

      </BarChart></ResponsiveContainer>)
  }
  const legendText = (value) => {
    if (value == 'ZCOUNT1') {
      return "Enabled Risk"
    }
    if (value == 'ZCOUNT2') {
      return "Risk Found"
    }
    if (value == 'ZCOUNT3') {
      return "Risk Not Found"
    }
  }

  const changeGraph = (event) => {
    setChartState(event.target.value)
  }

  const getTableHeader = (data, key, headerdata) => {


    if (data == undefined || data == null || data.length < 1) {
      return []
    }

    let filtereddata = data.filter(p => p.ZTYPE === key);
    if (filtereddata.length < 1) {
      return []
    }

    let columnarray = (key == '01') ? ["GROUPBY1", "GROUP_DESC1", "ZCOUNT1", "ZCOUNT2", "ZCOUNT3"] : ["GROUPBY1", "GROUP_DESC1", "ZCOUNT1"]
    let header = headerdata.split(',')


    let dataset = filtereddata.map(dt => {
      let tem = [];
      if (key != '04') {
        tem.push(dt.GROUPBY1)
      }
      tem.push(dt.GROUP_DESC1)
      tem.push(dt.ZCOUNT1)

      if (key == '01') {
        tem.push(dt.ZCOUNT2)
        tem.push(dt.ZCOUNT3)
      }
      return tem;
    })

    let dataset2 = filtereddata.map(dt => {
      let tem = {};

      tem.COLUMN1 = dt.GROUPBY1
      tem.COLUMN2 = dt.GROUP_DESC1
      tem.COUNT1 = dt.ZCOUNT1

      if (key == '01') {
        tem.COUNT2 = dt.ZCOUNT2
        tem.COUNT3 = dt.ZCOUNT3
      }
      return tem;
    })

    return [header, dataset, dataset2]


  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let getData = (data) => {
    let barNumber;
    if (props.chartId == 'SEC32') {
      barNumber = 8;
    } else if (props.chartId == 'SEC321') {
      barNumber = 1;
    }
    props.dialogueOpen(props.chartId, data.GROUPBY1, barNumber)
  }


  const classes = useStyles({ color: colorState, config: CONFIG });
  const [chartState, setChartState] = useState(props.chartType);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stack, setStack] = useState(props.stack ? props.stack : false);
  const [open, setOpen] = React.useState(false);
  const [colorState, setColorState] = useState([...COLORS]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const selectChartType = (type) => {
    setChartState(type);
    handleMenuClose();
  };
  let getchartDataResult1 = proesResultData(props.data, props.chart);
  let tableData = getTableHeader(props.data, props.chart, props.header)
  let firctChart = getchartDataResult1.length > 0 ? getChart(getchartDataResult1, chartState, '#00bcd4') : <Typography variant="subtitle2" color="inherit" style={{ width: 500 }}>
    No Records found
  </Typography>
  useEffect(() => {
    let arr = [...props.color, ...COLORS]
    setColorState(arr);
  }, [props.color]);

  return (
    <div>
      <Card className={classes.root} elevation={0} style={{ height: '42vh', minHeight: '350px' }}>
        <CardContent style={{ padding: '8px 12px 4px 12px', height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column' }}>
          <Box flex={1} width="100%" minHeight={0} display="flex" justifyContent="center" alignItems="center">
            {firctChart}
          </Box>
        </CardContent>

        {getchartDataResult1.length > 0 ? (
          <CardActions style={{ padding: '12px 16px', backgroundColor: 'transparent', borderTop: 'none' }}>
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
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                {Number(chartState) === 3 ? (
                  <DonutSmallIcon fontSize="small" style={{ color: '#f43f5e' }} />
                ) : (Number(chartState) === 4 || Number(chartState) === 6) ? (
                  <ViewStreamIcon fontSize="small" style={{ color: '#f43f5e' }} />
                ) : (
                  <BarChartIcon fontSize="small" style={{ color: '#f43f5e' }} />
                )}
                <ArrowDropDownIcon fontSize="small" style={{ color: '#64748b', marginLeft: 4 }} />
              </Box>

              <Box flex={1} textAlign="center" px={1}>
                <Typography className={classes.titleLabel}>
                  {props.name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())}
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
                  marginTop: '-20px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  minWidth: '180px'
                }
              }}
            >
              {!stack ? (
                [
                  <MenuItem key="vbar" onClick={() => selectChartType(1)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 1 ? '#2563eb' : '#475569' }}>
                    Vertical Bar
                  </MenuItem>,
                  <MenuItem key="hbar" onClick={() => selectChartType(4)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 4 ? '#2563eb' : '#475569' }}>
                    Horizontal Bar
                  </MenuItem>,
                  <MenuItem key="donut" onClick={() => selectChartType(3)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 3 ? '#2563eb' : '#475569' }}>
                    Donut Chart
                  </MenuItem>
                ]
              ) : (
                [
                  <MenuItem key="vstack" onClick={() => selectChartType(5)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 5 ? '#2563eb' : '#475569' }}>
                    Vertical Stacked Bar
                  </MenuItem>,
                  <MenuItem key="hstack" onClick={() => selectChartType(6)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 6 ? '#2563eb' : '#475569' }}>
                    Horizontal Stacked Bar
                  </MenuItem>,
                  <MenuItem key="vcomp" onClick={() => selectChartType(7)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 7 ? '#2563eb' : '#475569' }}>
                    Vertical Comparison Bar
                  </MenuItem>
                ]
              )}
            </Menu>
          </CardActions>
        ) : null}

      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="lg"
        fullWidth
        disableEnforceFocus
      >
        <DialogTitle id="draggable-dialog-title" className="draggable-dialog-handle" style={{ cursor: 'move', height: '32px', minHeight: '32px', padding: '0 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <Box display="flex" alignItems="center" width="100%" position="relative">
            <Typography variant="h6" style={{ fontFamily: CONFIG.fontFamily, fontWeight: 700, fontSize: '0.9rem', width: '100%', textAlign: 'center', color: '#0f172a' }}>
              {props.name}
            </Typography>
            <IconButton size="small" onClick={handleClose} style={{ position: 'absolute', right: -8 }}>
              <CloseIcon style={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent style={{ padding: '0px 8px 8px 8px !important' }}>
          <GRCReportTable name={props.name} header={tableData[0]} data={tableData[2]} colors={colorState} />
        </DialogContent>
      </Dialog>
    </div>
  );

}

export default withRouter(GRCGraphCard)
