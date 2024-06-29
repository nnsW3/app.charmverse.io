import type { Prisma } from '@charmverse/core/prisma';

import type { ProjectAndMembersPayload } from './interfaces';

export function createDefaultProjectAndMembersPayload(): ProjectAndMembersPayload {
  return {
    name: '',
    deletedAt: null,
    excerpt: '',
    description: '',
    twitter: '',
    website: '',
    github: '',
    blog: '',
    demoUrl: '',
    communityUrl: '',
    otherUrl: '',
    walletAddress: '',
    projectMembers: [defaultProjectMember()]
  };
}

export function defaultProjectMember(): ProjectAndMembersPayload['projectMembers'][number] {
  return {
    name: '',
    walletAddress: '',
    email: '',
    twitter: '',
    warpcast: '',
    github: '',
    linkedin: '',
    telegram: '',
    otherUrl: '',
    previousProjects: ''
  };
}

export const projectInclude = {
  projectMembers: {
    orderBy: [
      {
        teamLead: 'desc'
      },
      {
        createdAt: 'asc'
      }
    ]
  }
} satisfies Prisma.ProjectInclude;
