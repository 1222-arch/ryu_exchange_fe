import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',  // rất quan trọng để đẩy footer xuống dưới cùng khi content ít
        backgroundColor: '#eceef7',
        textAlign: 'center',
        color: '#121858',
      }}
    >
      <Typography variant="body2">
        © 2025 RyuExChange. All rights reserved.
      </Typography>
    </Box>
  );
}
