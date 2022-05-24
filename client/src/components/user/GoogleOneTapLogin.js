import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const GoogleOneTapLogin = () => {
  return (
    <Button variant="outlined" startIcon={<Google />}>
      Увійдіть за допомогою Google
    </Button>
  );
};

export default GoogleOneTapLogin;