import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { GemsIcon, PointsIcon } from 'components/common/Icons';

export function BuilderCardStats({
  gemsCollected,
  builderPoints,
  nftsSold
}: {
  gemsCollected?: number;
  builderPoints?: number;
  nftsSold?: number;
}) {
  return (
    <Stack flexDirection='row' alignItems='center' justifyContent='space-between' gap={1}>
      {typeof builderPoints === 'number' && (
        <Stack flexDirection='row' gap={0.2} alignItems='center'>
          <Typography variant='body2' component='span' color='green.main'>
            {builderPoints}
          </Typography>
          <PointsIcon size={15} color='green' />
        </Stack>
      )}
      {typeof gemsCollected === 'number' && (
        <Stack flexDirection='row' gap={0.2} alignItems='center'>
          <Typography variant='body2' component='span' color='text.secondary'>
            {gemsCollected}
          </Typography>
          <GemsIcon size={15} />
        </Stack>
      )}
      {typeof nftsSold === 'number' && (
        <Stack flexDirection='row' gap={0.2} alignItems='center'>
          <Typography variant='body2' component='span' color='orange.main'>
            {nftsSold}
          </Typography>
          <Image width={12} height={12} src='/images/profile/icons/nft-orange-icon.svg' alt='Nfts' />
        </Stack>
      )}
    </Stack>
  );
}
