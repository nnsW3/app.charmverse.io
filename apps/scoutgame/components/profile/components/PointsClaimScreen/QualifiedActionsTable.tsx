import { Divider, Stack, Typography } from '@mui/material';
import { bonusPartnersRecord } from '@packages/scoutgame/bonus';
import Image from 'next/image';

import type { WeeklyReward } from 'lib/points/getClaimablePointsWithEvents';

import { BonusPartnersDisplay } from './BonusPartnersDisplay';

export function QualifiedActionsTable({ weeklyRewards }: { weeklyRewards: WeeklyReward[] }) {
  return (
    <Stack>
      {weeklyRewards.map((weeklyReward) => {
        return (
          <>
            <Stack key={weeklyReward.week} gap={1.5}>
              <Typography variant='h6' fontWeight={600}>
                Week {weeklyReward.weekNumber + 1}
              </Typography>
              <Stack gap={1.5}>
                {weeklyReward.githubContributionReward ? (
                  <Stack flexDirection='row' gap={1} justifyContent='space-between'>
                    <Stack gap={0.5}>
                      <Typography>
                        Finished in rank <b>{weeklyReward.rank}</b>
                      </Typography>
                      {weeklyReward.githubContributionReward.streakCount ? (
                        <Typography variant='body2'>
                          {weeklyReward.githubContributionReward.streakCount} x contribution streak
                        </Typography>
                      ) : null}
                      {weeklyReward.githubContributionReward.firstContributionsCount ? (
                        <Typography variant='body2'>
                          {weeklyReward.githubContributionReward.firstContributionsCount} x first contribution
                        </Typography>
                      ) : null}
                      {weeklyReward.githubContributionReward.regularContributionsCount ? (
                        <Typography variant='body2'>
                          {weeklyReward.githubContributionReward.regularContributionsCount} x regular contribution
                        </Typography>
                      ) : null}
                    </Stack>
                    <Stack gap={1}>
                      <Stack flexDirection='row' gap={1} alignItems='center'>
                        <Typography>{weeklyReward.githubContributionReward.points}</Typography>
                        <Image width={20} height={20} src='/images/profile/scout-game-icon.svg' alt='Nfts' />
                      </Stack>
                      <BonusPartnersDisplay bonusPartners={weeklyReward.githubContributionReward.bonusPartners} />
                    </Stack>
                  </Stack>
                ) : null}
                {weeklyReward.scoutReward ? (
                  <Stack flexDirection='row' justifyContent='space-between'>
                    <Typography>Scout Rewards</Typography>
                    <Stack flexDirection='row' gap={1} alignItems='center'>
                      <Typography>{weeklyReward.scoutReward.points}</Typography>
                      <Image width={20} height={20} src='/images/profile/scout-game-icon.svg' alt='Nfts' />
                    </Stack>
                  </Stack>
                ) : null}
                {weeklyReward.soldNftReward ? (
                  <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                    <Stack flexDirection='row' gap={1} alignItems='center'>
                      <Typography>Sold {weeklyReward.soldNftReward.quantity} NFTs</Typography>
                      <Image width={20} height={20} src='/images/profile/icons/nft-orange-icon.svg' alt='Nfts' />
                    </Stack>
                    <Stack flexDirection='row' gap={1} alignItems='center'>
                      <Typography>{weeklyReward.soldNftReward.points}</Typography>
                      <Image width={20} height={20} src='/images/profile/scout-game-icon.svg' alt='Nfts' />
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
          </>
        );
      })}
    </Stack>
  );
}
