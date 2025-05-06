'use client'
import React, { useEffect, useState } from 'react';
import { useNetworkState } from 'react-use';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const NetworkStatusSnackbar = ({ children }: { children: React.ReactNode }) => {
  const networkState = useNetworkState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!networkState.online) {
      setMessage('You have lost internet connection.');
      setOpen(true); 
    } else if (networkState.online && message === 'You have lost internet connection.') {
      setMessage('Internet connection restored.');
      setOpen(true); 

      // Show "Refreshing page..." before reloading
      setTimeout(() => {
        setMessage('Refreshing...');
        setOpen(true);

        // Delay the reload to show "Refreshing page..." snackbar
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2 seconds to display the refreshing message
      }, 2000); // Delay the refreshing message after restoring connection
    }

    // Auto-hide the snackbar after 3 seconds if online
    const timeout = networkState.online
      ? setTimeout(() => setOpen(false), 3000)
      : undefined;

    return () => {
      if (timeout) clearTimeout(timeout); 
    };
  }, [networkState.online, message]);

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setOpen(false)} 
      >
        <Alert severity={networkState.online ? 'success' : 'warning'} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>

      {children}
    </>
  );
};

export default NetworkStatusSnackbar;
