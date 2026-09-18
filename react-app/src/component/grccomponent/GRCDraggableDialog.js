import React from 'react';
import { Dialog, DialogContent, DialogTitle, Paper, Grid, IconButton, Typography, Box } from '@material-ui/core';
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
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
  dialogPaper: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
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
  },
  closeButton: {
    color: '#64748b',
    '&:hover': {
      backgroundColor: '#f1f5f9',
      color: '#0f172a',
    }
  },
  content: {
    padding: '8px 24px !important',
    backgroundColor: '#f8fafc',
  }
}));

const GRCDraggableDialog = (props) => {
  const classes = useStyles();
  const { dialogueState, data, colors, header, name, closeDialogue } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(dialogueState);
  }, [dialogueState]);

  const handleClose = () => {
    closeDialogue();
  };

  // Dynamic font from colors array if available
  const dynamicFont = getDynamicFont(colors);

  const tableOptions = {
    rowsPerPage: 100,
    rowsPerPageOptions: [100, 200, 500],
    selectableRows: 'none',
    download: true,
    print: true,
    filter: true,
    viewColumns: true,
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      maxWidth="lg"
      fullWidth
      classes={{ paper: classes.dialogPaper }}
      aria-labelledby="draggable-dialog-title"
      disableEnforceFocus
    >
      <DialogContent className={classes.content}>
          <ModernCommonTable
            name={name}
            header={header}
            data={data}
            keys={props.keys}
            colors={colors}
            options={tableOptions}
            isReport={false}
            onClose={handleClose}
          />
      </DialogContent>
    </Dialog>
  );
};

export default GRCDraggableDialog;
