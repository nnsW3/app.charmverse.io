'use server';

import { Paper, Typography, Stack } from '@mui/material';
import Image from 'next/image';

import { getClaimablePoints } from 'lib/points/getClaimablePoints';

import { PointsClaimButton } from './PointsClaimButton';
import { QualifiedActionsTable } from './QualifiedActionsTable';

export async function PointsClaimScreen({ userId, username }: { userId: string; username: string }) {
  const { totalClaimablePoints, weeklyRewards } = await getClaimablePoints(userId);

  if (!totalClaimablePoints) {
    return (
      <Typography textAlign='center' variant='h5'>
        No points to claim
      </Typography>
    );
  }

  return (
    <Stack height='100%' p={1} gap={2.5}>
      <Typography variant='h5' textAlign='center' fontWeight={500} color='secondary'>
        Congratulations!
        <br /> You have earned {totalClaimablePoints} Scout Points!
      </Typography>
      <Stack gap={4} flexDirection={{ xs: 'column', md: 'row-reverse' }}>
        <Paper
          sx={{
            flex: 1,
            padding: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: {
              xs: 'row',
              md: 'column'
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Stack gap={1}>
            <Typography variant='h6'>
              <b>{username}</b> will receive
            </Typography>
            <Stack flexDirection='row' alignItems='center' justifyContent='center' gap={1}>
              <Typography variant='h4' fontWeight={500}>
                {totalClaimablePoints}
              </Typography>
              <Image width={35} height={35} src='/images/profile/scout-game-icon.svg' alt='Scouts' />
            </Stack>
          </Stack>
          <PointsClaimButton />
        </Paper>
        <Stack gap={1} flex={1}>
          <Typography variant='h5' textAlign='left' fontWeight={500}>
            QUALIFIED ACTIONS
          </Typography>
          <QualifiedActionsTable weeklyRewards={weeklyRewards} />
          <Stack flexDirection='row' justifyContent='space-between' width='100%' alignItems='center'>
            <Typography variant='h6'>Total Scout Points</Typography>
            <Stack flexDirection='row' gap={1} alignItems='center'>
              <Typography>{totalClaimablePoints}</Typography>
              <Image width={20} height={20} src='/images/profile/scout-game-icon.svg' alt='Nfts' />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
