import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <TextField id="rows" label="Rows" />
      <TextField id="cols" label="Cols"  />
      <TextField id="mines" label="Mines" />
      <Button className="button" onClick={() => this.handleSubmit()}>Create</Button>
    </form>
  );
}
