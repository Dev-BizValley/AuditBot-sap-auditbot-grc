import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { getDynamicFont } from '../../theme';

const LicenceTextFiled = ({ label, onchange, value }) => {
  const dynamicColors = useSelector(state => state.licensefilter.colors) || [];
  const dynamicFont = getDynamicFont(dynamicColors);

  const useStylesInner = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(0.5),
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        height: '37px',
        fontFamily: dynamicFont,
        fontSize: '11px',
        fontWeight: 400,
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
      }
    },
    input: {
      padding: '0 10px !important',
      display: 'flex',
      alignItems: 'center',
      height: '37px',
      boxSizing: 'border-box',
    }
  }));

  const classes = useStylesInner();

  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      className={classes.root}
      value={value || ''}
      onChange={(e) => onchange(e.target.value)}
      InputProps={{
        classes: { input: classes.input },
        style: { fontSize: '11px', fontFamily: dynamicFont, fontWeight: 400 }
      }}
    />
  );
};

export default LicenceTextFiled;