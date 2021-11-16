import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit}) {
    const {id, name, email, phone, dob} = data



  return (
    <div>
  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" aling="center">
        {id ? "Update User" : "Create New User"}
        </DialogTitle>
        <DialogContent>
          <form>
              <TextField id="name" value={name} onChange={e => onChange(e)} placeholder="enter name..." label="Name" variant="outlined" margin="dense" fullWidth/>
              <TextField id="email" value={email} onChange={e => onChange(e)} placeholder="enter email..." label="email" variant="outlined" margin="dense" fullWidth/>
              <TextField id="phone" value={phone} onChange={e => onChange(e)} placeholder="enter phone number..." label="Phone Number" margin="dense"  variant="outlined" fullWidth/>
              <TextField id="dob" value={dob} onChange={e => onChange(e)} placeholder="enter date of birth..." label="Date of Birth" margin="dense" variant="outlined" fullWidth/>

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={() => handleFormSubmit()}>
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
