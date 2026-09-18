import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getDynamicFont } from '../../theme';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Box } from '@material-ui/core';

const Datepicker = ({ value, onchange, label }) => {
  const dynamicColors = useSelector(state => state.licensefilter.colors) || [];
  const dynamicFont = getDynamicFont(dynamicColors);

  const useStylesInner = makeStyles((theme) => ({
    picker: {
      margin: theme.spacing(0.5),
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        height: '37px',
        fontFamily: dynamicFont,
        fontSize: '11px',
        fontWeight: 400,
        '& .MuiOutlinedInput-input': {
          padding: '0 0 0 10px !important',
          display: 'flex',
          alignItems: 'center',
          height: '37px',
          boxSizing: 'border-box',
        },
        '& .MuiOutlinedInput-adornedEnd': {
          paddingRight: '6px',
        }
      },
      '& .MuiInputLabel-outlined': {
        fontFamily: dynamicFont,
        fontSize: '11px',
        fontWeight: 400,
        color: '#000000de',
        transform: 'translate(10px, 10px) scale(1)',
        '&.Mui-focused': {
          color: '#000000de',
        },
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, -6px) scale(0.75)',
          color: '#000000de',
        }
      },
      '& .MuiIconButton-root': {
        padding: '4px',
        color: '#64748b',
        '&:hover': {
          color: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.05)'
        }
      }
    }
  }));

  const classes = useStylesInner();
  const [selectedDate, setSelectedDate] = useState(value);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleChange = (date) => {
    setSelectedDate(date);
    onchange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        label={label}
        value={selectedDate}
        onChange={handleChange}
        format="yyyy/MM/dd"
        inputVariant="outlined"
        variant="inline"
        size="small"
        fullWidth
        className={classes.picker}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputProps={{
          style: { fontSize: '11px', fontFamily: dynamicFont, fontWeight: 400 }
        }}
        PopoverProps={{
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
          getContentAnchorEl: null,
          disablePortal: false
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Datepicker;
