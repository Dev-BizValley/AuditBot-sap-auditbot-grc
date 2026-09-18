import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Grid, IconButton, Box, MenuItem, Menu, Select, FormControl, InputLabel, Dialog, DialogContent, DialogTitle, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
// import { MENU_FONT_FAMILY } from '../../theme';
import { getDynamicFont } from '../../theme';
import Draggable from 'react-draggable';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Cell } from 'recharts';
import TocIcon from '@material-ui/icons/Toc';
import CloseIcon from '@material-ui/icons/Close';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import ModernCommonTable from '../ModernCommonTable';

function PaperComponent(props) {
  return (
    <Draggable handle=".draggable-dialog-handle">
      <Paper {...props} style={{ ...props.style, backgroundColor: '#ffffff' }} />
    </Draggable>
  );
}


const height = 100
const labelOffset = -6
const focused = 3

let COLORS = ["#004c6d", "#255e7e", "#3d708f", "#5383a1", "#7CB342", "#64B5F6", "#4DD0E1", "#AED581", "#0277bd", "#90caf9", "#4fc3f7", "#ffab91", "#66bb6a", "#9e9d24", "#ffe082", "#26a69a", "#00acc1", "#e57373", "#ff8a80", "#8d6e63", "#ff80ab", "#f48fb1", "#9575cd", "#7986cb", "#64b5f6", "#ffb74d", "#ea80fc", "#4dd0e1", "#d4e157", "#9ccc65", "#fff176", "#ffd740", "#90a4ae", "#eeff41", "#ccff90", "#c0ca33", "#0097a7", "#29b6f6"];
const COLORSFIRSTSTACK = ["#009ed7", "#009ed7", "#009ed7", "#009ed7", "#009ed7", "#009ed7", "#009ed7", "#009ed7", "#009ed7", "#009ed7", "#4fc3f7", "#ffab91", "#66bb6a", "#9e9d24", "#ffe082", "#26a69a", "#00acc1", "#e57373", "#ff8a80", "#8d6e63", "#ff80ab", "#f48fb1", "#9575cd", "#7986cb", "#64b5f6", "#ffb74d", "#ea80fc", "#4dd0e1", "#d4e157", "#9ccc65", "#fff176", "#ffd740", "#90a4ae", "#eeff41", "#ccff90", "#c0ca33", "#0097a7", "#29b6f6"];
const COLORSSECONDSTACK = ["#a05195", "#a05195", "#a05195", "#a05195", "#a05195", "#a05195", "#a05195", "#a05195", "#a05195", "#a05195", "#4fc3f7", "#ffab91", "#66bb6a", "#9e9d24", "#ffe082", "#26a69a", "#00acc1", "#e57373", "#ff8a80", "#8d6e63", "#ff80ab", "#f48fb1", "#9575cd", "#7986cb", "#64b5f6", "#ffb74d", "#ea80fc", "#4dd0e1", "#d4e157", "#9ccc65", "#fff176", "#ffd740", "#90a4ae", "#eeff41", "#ccff90", "#c0ca33", "#0097a7", "#29b6f6"];
const COLORSTHIRDSTACK = ["#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#f95d6a", "#4fc3f7", "#ffab91", "#66bb6a", "#9e9d24", "#ffe082", "#26a69a", "#00acc1", "#e57373", "#ff8a80", "#8d6e63", "#ff80ab", "#f48fb1", "#9575cd", "#7986cb", "#64b5f6", "#ffb74d", "#ea80fc", "#4dd0e1", "#d4e157", "#9ccc65", "#fff176", "#ffd740", "#90a4ae", "#eeff41", "#ccff90", "#c0ca33", "#0097a7", "#29b6f6"];
const RADIAN = Math.PI / 180;

const legendMap = [{ id: 'ZCOUNT1', value: 'Executed Risk', type: "square" }, { id: 'ZCOUNT2', value: 'Executed Risk', type: "square" }, { id: 'ZCOUNT3', value: 'Executed Risk', type: "square" }]

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
  },
  dialogPaper: {
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
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
  }
}));





/* #0288D1 */

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
//           {payload[0].payload.GROUP_DESC1 || payload[0].payload.UTYPLONGTEXT || label}
//         </Typography>
//         {payload.map((entry, index) => (
//           <Box key={index} display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: 4 }}>
//             <Typography style={{ color: entry.color, fontSize: '12px', fontWeight: 400, marginRight: 16 }}>
//               {entry.name || 'Value'}:
//             </Typography>
//             <Typography style={{ color: entry.color, fontSize: '12px', fontWeight: 400 }}>
//               {entry.value}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     );
//   }
//   return null;
// };

const GRCStackGraphCard = (props) => {
  const dynamicFont = getDynamicFont(props.color);
  const CONFIG = React.useMemo(() => ({
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
            {payload[0].payload.GROUP_DESC1 || payload[0].payload.UTYPLONGTEXT || label}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={index} display="flex" justifyContent="space-between" alignItems="center" style={{ marginTop: 4 }}>
              <Typography style={{ color: entry.color, fontSize: '11px', fontWeight: 400, marginRight: 16, fontFamily: dynamicFont }}>
                {entry.name || 'Value'}:
              </Typography>
              <Typography style={{ color: entry.color, fontSize: '11px', fontWeight: 400, fontFamily: dynamicFont }}>
                {entry.value}
              </Typography>
            </Box>
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
        temp.COUNT1 = v.ZCOUNT1;
        temp.COUNT2 = v.ZCOUNT2;
        temp.COUNT3 = v.ZCOUNT3;
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
  const getChart = (data, value, color, stack) => {
    switch (value) {


      case 1:
        if (stack == '1')
          return getRCHBarChartTwoStack(data, color);
        if (stack == '2')
          return getRCHBarChartTwoStack(data, color);
        if (stack == '3')
          return getRCHBarChartThreeStack(data, color);

      case 2:
        if (stack == '1')
          return getRCVBarChartTwoStack(data, color);
        if (stack == '2')
          return getRCVBarChartTwoStack(data, color);
        if (stack == '3')
          return getRCVBarChartThreeStack(data, color);
      case 3:
        if (stack == '1')
          return getRCVBarChartTwo(data, color);
        if (stack == '2')
          return getRCVBarChartTwo(data, color);
        if (stack == '3')
          return getRCVBarChartThree(data, color);

      default:
        return getRCHBarChartTwoStack(data, color)
    }
  }





  const getRCVBarChartTwoStack = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%" 
      layout={"horizontal"}
      data={data}
      
      
      maxBarSize={65}
      margin={{
        top: 10, right: 30, left: 30, bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} height={10} stroke={CONFIG.gridStroke} />
      <LabelList dataKey="name" position="top"  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
      <Legend iconSize={15} align='center' layout='horizontal' verticalAlign='top' height='30px' wrapperStyle={{
        fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
      , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => legendText(value, chartId)} />
      <XAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke={CONFIG.gridStroke} tick={CustomizedAxisTick} />
      <YAxis axisLine={false} tickLine={false} interval={0} stroke={CONFIG.gridStroke} width={80} tick={CustomizedYAxisTick} />
      <Bar maxBarSize={65} dataKey="ZCOUNT1" stackId="a" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data, 1)}  >
        <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT2" stackId="a" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data, 2)}>
        <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>

      {/* <Bar maxBarSize={65} dataKey="ZCOUNT1" stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
              {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSFIRSTSTACK[index % COLORSFIRSTSTACK.length]} />)
              }
          </Bar>
          <Bar maxBarSize={65} dataKey="ZCOUNT2" stackId="a" fill={'#00bcd4'} onClick={(data) => getData(data)} >
              {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORSSECONDSTACK[index % COLORSSECONDSTACK.length]} />)
              }
          </Bar> */}
    </BarChart></ResponsiveContainer>)
  }


  const getRCVBarChartTwo = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%" 
      layout={"horizontal"}
      data={data}
      
      
      maxBarSize={65}
      margin={{
        top: 10, right: 30, left: 30, bottom: 5,
      }}
    >
      {/* <CartesianGrid  strokeDasharray="3 3" vertical horizontal={false} verticalFill='#555555' fillOpacity={0.2} /> */}
      <CartesianGrid vertical={false} horizontal={true} height={10} stroke={CONFIG.gridStroke} />
      <LabelList dataKey="name" position="top"  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
      <Legend iconSize={15} align='center' layout='horizontal' verticalAlign='top' height='30px' wrapperStyle={{
        fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
      , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => legendText(value, chartId)} />
      <XAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke={CONFIG.gridStroke} tick={CustomizedAxisTick} />
      <YAxis axisLine={false} tickLine={false} interval={0} stroke={CONFIG.gridStroke} width={80} tick={CustomizedYAxisTick} />
      <Bar maxBarSize={65} dataKey="ZCOUNT1" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data, 1)} >
        <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT2" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data, 2)} >
        <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>


    </BarChart></ResponsiveContainer>)
  }


  const getRCVBarChartThreeStack = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%" 
      layout={"horizontal"}
      data={data}
      
      
      maxBarSize={65}
      margin={{
        top: 10, right: 30, left: 30, bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} height={10} stroke={CONFIG.gridStroke} />
      <Tooltip formatter={(value, name, props) => {
        return tooltipText(value, name, chartId)
      }} cursor={{ fill: 'transparent' }} wrapperStyle={{ fontFamily: CONFIG.fontFamily, fontSize: '11px' , marginTop: '-20px' }} />
      <Legend iconSize={15} align='center' layout='horizontal' verticalAlign='top' height='30px' wrapperStyle={{
        fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
      , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => {
        return legendText(value, chartId)
      }
      } />
      <XAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke={CONFIG.gridStroke} tick={CustomizedAxisTick} />
      <YAxis axisLine={false} tickLine={false} interval={0} stroke={CONFIG.gridStroke} width={80} tick={CustomizedYAxisTick} />
      <Bar maxBarSize={65} dataKey="ZCOUNT1" stackId="a" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data, 1)} >

        <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT2" stackId="a" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data, 2)} >

        <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT3" stackId="a" fill={colorState[2]} isAnimationActive={false} onClick={(data) => getData(data, 3)}>

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


  const getRCVBarChartThree = (data, color) => {
    return (<ResponsiveContainer width='100%' height='100%'><BarChart barGap={4} barCategoryGap="5%" 
      layout={"horizontal"}
      data={data}
      
      
      maxBarSize={65}
      margin={{
        top: 10, right: 30, left: 30, bottom: 5,
      }}
    >
      <CartesianGrid vertical={false} horizontal={true} height={10} stroke={CONFIG.gridStroke} strokeWidth={1} />
<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
      <Legend iconSize={15} align='center' layout='horizontal' verticalAlign='top' height='30px' wrapperStyle={{
        fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
      , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => {
        return legendText(value, chartId)
      }} />
      <XAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" interval={0} stroke={CONFIG.gridStroke} tick={CustomizedAxisTick} />
      <YAxis axisLine={false} tickLine={false} interval={0} stroke={CONFIG.gridStroke} width={80} tick={CustomizedYAxisTick} />
      <Bar maxBarSize={65} dataKey="ZCOUNT1" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data, 1)}  >

        <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT2" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data, 2)} >

        <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
      </Bar>
      <Bar maxBarSize={65} dataKey="ZCOUNT3" fill={colorState[2]} isAnimationActive={false} onClick={(data) => getData(data, 3)} >

        <LabelList dataKey="ZCOUNT3" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
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





  const getRCHBarChartThreeStack = (data, color) => {

    return (<ResponsiveContainer width='100%' height='100%'>
      <BarChart barGap={4} barCategoryGap="10%" 
        layout={"vertical"}
        data={data}
        
        
        maxBarSize={35}
        margin={{
          top: 10, right: 20, left: 10, bottom: 5,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} strokeWidth={1} />
        <Tooltip formatter={(value, name, props) => {
          return tooltipText(value, name, chartId)
        }
        } cursor={{ fill: 'transparent' }} wrapperStyle={{ fontFamily: CONFIG.fontFamily, fontSize: '11px' , marginTop: '-20px' }} />
        <Legend iconSize={15} align='center' layout='horizontal' verticalAlign='top' height='30px' wrapperStyle={{
          fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
        , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => {
          return legendText(value, chartId)
        }} />

        <XAxis axisLine={false} tickLine={false} type='number' stroke={CONFIG.gridStroke} interval={0} tick={CustomizedAxisTick} />
        <YAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" type="category" stroke={CONFIG.gridStroke} width={75} interval={0} tick={CustomizedYAxisTick} />
        <Bar maxBarSize={35} dataKey="ZCOUNT1" stackId="a" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data, 1)} >
          <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>
        <Bar maxBarSize={35} dataKey="ZCOUNT2" stackId="a" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data, 2)} >
          <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>
        <Bar maxBarSize={35} dataKey="ZCOUNT3" stackId="a" fill={colorState[2]} isAnimationActive={false} onClick={(data) => getData(data, 3)} >
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
          top: 10, right: 20, left: 10, bottom: 5,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} stroke={CONFIG.gridStroke} strokeWidth={1} />

  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 250, 252, 0.5)' }} />
        <Legend iconSize={15} align='center' layout='horizontal' verticalAlign='top' height='30px' wrapperStyle={{
          fontFamily: CONFIG.fontFamily, fontSize: CONFIG.legendFontSize
        , marginTop: '-10px', paddingBottom: '10px' , marginTop: '-20px' }} formatter={(value, entry, index) => legendText(value, chartId)} />
        <XAxis axisLine={false} tickLine={false} type='number' stroke={CONFIG.gridStroke} interval={0} tick={CustomizedAxisTick} />
        <YAxis axisLine={false} tickLine={false} dataKey="GROUP_DESC1" type="category" stroke={CONFIG.gridStroke} width={75} interval={0} tick={CustomizedYAxisTick} />
        <Bar maxBarSize={35} dataKey="ZCOUNT1" stackId="a" fill={colorState[0]} isAnimationActive={false} onClick={(data) => getData(data, 1)} >
          <LabelList dataKey="ZCOUNT1" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>
        <Bar maxBarSize={35} dataKey="ZCOUNT2" stackId="a" fill={colorState[1]} isAnimationActive={false} onClick={(data) => getData(data, 2)} >
          <LabelList dataKey="ZCOUNT2" position="center" style={{ textAnchor: 'middle', fontSize: 11, fill: "#ffffff" }}  formatter={(val) => (val && val !== 0 && val !== '0') ? val : ''} />
        </Bar>

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



  const legendText = (value, chartId) => {
    if (chartId == 'SEC1') {
      return legendTextForChartOne(value);
    } else if (chartId == 'SEC12') {
      return legendTextForChartFive(value);
    } else if (chartId == 'SEC11') {
      return legendTextForChartSix(value);
    } else {
      if (value == 'ZCOUNT1') {
        return "Executed Risks"
      }
      if (value == 'ZCOUNT2') {
        return "Non-Executed Risks"
      }
      if (value == 'ZCOUNT3') {
        return "Never Executed Risks"
      }
    }

  }
  const legendTextForChartOne = (value) => {
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

  const legendTextForChartFive = (value) => {
    if (value == 'ZCOUNT1') {   /* Vel Fix */
      return "Risk Found"
    }
    if (value == 'ZCOUNT2') {
      return "Executed Risks"
    }
    if (value == 'ZCOUNT3') {
      return "Non Executed Risk"
    }
  }

  const legendTextForChartSix = (value) => {
    if (value == 'ZCOUNT1') {
      return "Executed Risk Users"
    }
    if (value == 'ZCOUNT2') {
      return "Non Executed Risk Users"
    }
  }



  const tooltipTextForChartOne = (value, name) => {
    if (name == 'ZCOUNT1') {
      return [value, "Enabled Risk",]
    }
    if (name == 'ZCOUNT2') {
      return [value, "Risk Found"]
    }
    if (name == 'ZCOUNT3') {
      return [value, "Risk Not Found"]
    }
  }

  const tooltipTextForChartFive = (value, name) => {
    if (name == 'ZCOUNT1') {
      return [value, "Risk Found",]  /* Vel Fix */
    }
    if (name == 'ZCOUNT2') {
      return [value, "Executed Risks"]
    }
    if (name == 'ZCOUNT3') {
      return [value, "Non Executed Risks"]
    }
  }

  const tooltipTextForChartSix = (value, name) => {
    if (name == 'ZCOUNT1') {
      return [value, "Executed Risk Users",]
    }
    if (name == 'ZCOUNT2') {
      return [value, "Non Executed Risk Users"]
    }
  }

  const tooltipText = (value, name, chartId) => {
    if (chartId == 'SEC1') {
      return tooltipTextForChartOne(value, name);
    } else if (chartId == 'SEC12') {
      return tooltipTextForChartFive(value, name);
    } else if (chartId == 'SEC11') {
      return tooltipTextForChartSix(value, name);
    } else {
      if (name == 'ZCOUNT1') {
        return [value, "Executed Risks",]
      }
      if (name == 'ZCOUNT2') {
        return [value, "Non-Executed Risks"]
      }
      if (name == 'ZCOUNT3') {
        return [value, "Never Executed Risks"]
      }
    }
  }


  const changeGraph = (event) => {
    setChartState(event.target.value)
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTableHeader = (data, key, headerdata) => {
    if (data == undefined || data == null || data.length < 1) {
      return []
    }
    let filtereddata = data.filter(p => p.ZTYPE === key);
    if (filtereddata.length < 1) {
      return []
    }

    let columnarray = (key == '01') ? ["GROUPBY1", "GROUP_DESC1", "ZCOUNT1", "ZCOUNT2", "ZCOUNT3"] : ["GROUPBY1", "GROUP_DESC1", "ZCOUNT1", "ZCOUNT2"]
    let header = headerdata.split(',')


    let dataset = filtereddata.map(dt => {
      let tem = [];
      tem.push(dt.GROUPBY1)
      tem.push(dt.GROUP_DESC1)
      tem.push(dt.ZCOUNT1)
      tem.push(dt.ZCOUNT2)
      if (key == '01') {
        tem.push(dt.ZCOUNT3)
      }
      return tem;
    })


    let dataset2 = filtereddata.map(dt => {
      let tem = {};
      tem.COLUMN1 = dt.GROUPBY1
      tem.COLUMN2 = dt.GROUP_DESC1
      tem.COUNT1 = dt.ZCOUNT1
      tem.COUNT2 = dt.ZCOUNT2
      if (key == '01') {
        tem.COUNT3 = dt.ZCOUNT3
      }
      return tem;
    })

    return [header, dataset, dataset2]


  }

  let getData = (data, num) => {
    console.log(data)
    let barNum;
    if (props.chartId == 'SEC13') {
      var h = { 1: 2, 2: 3 }
      barNum = h[num]
    } else if (props.chartId == 'SEC11') {
      var h = { 1: 'B', 2: 'C' }
      barNum = h[num]
    } else if (props.chartId == 'SEC12') {
      var h = { 1: 5, 2: 9, 3: 'A' }
      barNum = h[num]
    } else if (props.chartId == 'SEC1') {
      var h = { 1: 7, 2: 5, 3: 6 }
      barNum = h[num]
    }
    props.dialogueOpen(props.chartId, data.GROUPBY1, barNum)
  }

  const classes = useStyles({ color: colorState, config: CONFIG });
  const [chartState, setChartState] = useState(props.chartType);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [colorState, setColorState] = useState([...COLORS]);
  const [chartId, setChartId] = useState(props.chartId);
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
  let firctChart = getchartDataResult1.length > 0 ? getChart(getchartDataResult1, chartState, '#00bcd4', props.stack) : <Typography variant="subtitle2" color="inherit" style={{ width: 500 }}>
    No Records found
  </Typography>
  useEffect(() => {
    let arr = [...props.color, ...COLORS]
    setColorState(arr);
    setChartId(props.chartId)
  }, [props.chartId, props.color]);

  return (
    <div>
      <Card className={classes.root} elevation={0} style={{ height: '42vh', minHeight: '350px' }}>
        <CardContent style={{ padding: '8px 12px 4px 12px', height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column' }}>
          <Box flex={1} width="100%" minHeight={0}>
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
                {Number(chartState) === 1 ? (
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
              <MenuItem onClick={() => selectChartType(2)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 2 ? '#2563eb' : '#475569' }}>
                Vertical Stacked Bar
              </MenuItem>
              <MenuItem onClick={() => selectChartType(1)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 1 ? '#2563eb' : '#475569' }}>
                Horizontal Stacked Bar
              </MenuItem>
              <MenuItem onClick={() => selectChartType(3)} style={{ fontSize: '0.875rem', padding: '10px 20px', fontWeight: 500, color: chartState === 3 ? '#2563eb' : '#475569' }}>
                Vertical Bar
              </MenuItem>
            </Menu>
          </CardActions>
        ) : null}

      </Card>


      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        maxWidth="lg"
        fullWidth={false}
        classes={{ paper: classes.dialogPaper }}
        aria-labelledby="draggable-dialog-title"
        disableEnforceFocus
      >
        <DialogContent style={{ padding: '0px 8px !important' }}>
          {tableData && tableData.length > 0 && (
            <ModernCommonTable
              name={props.name}
              header={tableData[0]}
              data={tableData[2]}
              colors={props.color}
              onClose={handleClose}
              isReport={false}
              isTocGrid={true}
            />
          )}
        </DialogContent>
      </Dialog>

    </div>
  );

}

export default withRouter(GRCStackGraphCard)
