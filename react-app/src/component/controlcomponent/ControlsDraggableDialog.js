import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import ControlReportTableDialogue from './ControlReportTableDialogue';
import { makeStyles } from '@material-ui/core/styles';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title">
      <Paper {...props} style={{ 
        ...props.style, 
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  dialoguewidth: {
    maxWidth: 'inherit'
  }
}));

const ControlsDraggableDialog = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [colors, setColors] = React.useState(props.colors);

  React.useEffect(() => {
    setOpen(props.dialogueState);
    setData(props.data == undefined ? [] : props.data);
    setColors(props.colors);
  }, [props]);

  const handleClose = () => {
    props.closeDialogue();
  };

  return (
    <Dialog
      classes={{ paper: classes.dialoguewidth }}
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      disableEnforceFocus
    >
      <DialogContent style={{ padding: '8px 16px 16px 16px', overflow: 'hidden' }}>
        <ControlReportTableDialogue
          header={props.header}
          data={data}
          colors={colors}
          name={props.name}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ControlsDraggableDialog;