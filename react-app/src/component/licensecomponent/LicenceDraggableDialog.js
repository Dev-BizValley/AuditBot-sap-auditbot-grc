import React from 'react';
import { Dialog, DialogContent, Paper, IconButton, Typography, Box } from '@material-ui/core';
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import ModernCommonTable from '../ModernCommonTable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title">
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
  content: {
    padding: '8px 24px !important',
    backgroundColor: '#f8fafc',
  }
}));

const LicenceDraggableDialog = (props) => {
  const classes = useStyles();
  const { dialogueState, data, colors, header, name, closeDialogue } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(dialogueState);
  }, [dialogueState]);

  const handleClose = () => {
    closeDialogue();
  };

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
            data={data || []}
            colors={colors}
            options={tableOptions}
            isReport={false}
            onClose={handleClose}
          />
      </DialogContent>
    </Dialog>
  );
};

export default LicenceDraggableDialog;