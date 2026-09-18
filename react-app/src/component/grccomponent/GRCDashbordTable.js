import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
    // fontFamily:'Helvetica',
  },
  column:{
    border:'1px solid black'
  }
});



const GRCDashbordTable=(props)=> {
  const classes = useStyles();
  
  return (
    <TableContainer component={Paper} style={{marginTop:10}}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{fontSize:12}}>
              {
               props.header.map(head=>(
                <TableCell style={{fontSize:12,padding:3}} className={classes.column}>{head}</TableCell>
               )
              )
               }
  
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((value,index) => (
            <TableRow key={index} style={{fontSize:12}}>
                {value.map((data,indexKey)=>(
                     <TableCell component="th" scope="row" key={indexKey} style={{fontSize:12,padding:3}} className={classes.column}>
                     {data}
                   </TableCell>
                )
                )
                }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default GRCDashbordTable;