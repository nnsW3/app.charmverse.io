export const bonusPartnersRecord: Record<string, { repos: string[]; icon: string; name: string }> = {
  optimism: {
    name: 'Optimism',
    repos: ['optimism-labs/optimism'],
    icon: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png'
  },
  polygon: {
    name: 'Polygon',
    repos: ['polygon-edge/polygon-edge'],
    icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
  },
  celo: {
    name: 'Celo',
    repos: [
      'mento-protocol/reserve-site',
      'mento-protocol/mento-sdk',
      'mento-protocol/mento-web',
      'celo-org/celo-composer',
      'valora-inc/hooks',
      'Glo-Foundation/glo-wallet',
      'Ubeswap/ubeswap-interface-v3',
      'gitcoinco/grants-stack',
      'GoodDollar/GoodWeb3-Mono',
      'GoodDollar/GoodCollective',
      'Ubeswap/ubeswap-interface-v3'
    ],
    icon: 'https://cryptologos.cc/logos/celo-celo-logo.png'
  }
};

export function getBonusPartner(repo: string): string | null {
  for (const partner of Object.keys(bonusPartnersRecord)) {
    const [usernameOrOrg] = repo.split('/');
    if (
      bonusPartnersRecord[partner].repos.includes(repo) ||
      bonusPartnersRecord[partner].repos.includes(usernameOrOrg)
    ) {
      return partner;
    }
  }
  return null;
}
