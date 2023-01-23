import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      © {new Date().getFullYear()} Junior dev jobs. All rights reserved.
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[900]
              : theme.palette.grey[900],
        }}
      >
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </Box>
    </>
  );
}