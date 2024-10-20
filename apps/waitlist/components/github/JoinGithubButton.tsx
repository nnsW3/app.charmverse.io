'use client';

import { Box, Button, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export function JoinGithubButton() {
  const params = useSearchParams();
  const connectError = params.get('connect_error');

  return (
    <>
      <Button href='/api/connect-github/get-link' variant='contained' color='primary' sx={{ width: '100%' }}>
        Connect & Sign up
      </Button>

      {connectError && (
        <Box>
          <Typography color='error'>{connectError}</Typography>
        </Box>
      )}
    </>
  );
}
