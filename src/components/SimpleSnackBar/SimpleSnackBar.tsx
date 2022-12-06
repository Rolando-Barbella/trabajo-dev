import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { SnackbarProps } from '../../../pages/create-job';

type SimpleSnackbarProps = {
  setOpen: (isOpen: React.SetStateAction<SnackbarProps>) => void;
  snackbar: SnackbarProps;
  message: string,
  severity: AlertColor | undefined,
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar({ setOpen, snackbar, message, severity }: SimpleSnackbarProps) {
  // console.log(snackbar)
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log(snackbar)
    setOpen({...snackbar, open: false});
  };
  return (
    <>
      {snackbar.open &&
        <Stack spacing={2} sx={{ width: '100%', pb: 2 }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Stack>
      }
    </>
  );
}
