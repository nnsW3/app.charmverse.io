import { v4 as uuid } from 'uuid';

import type { PageWithContent } from 'lib/pages/interfaces';

export type MockPageInput = Partial<PageWithContent>;
type MockPageOutput = PageWithContent & { additionalPaths: string[]; autoGenerated: boolean; version: number };

export function createMockPage(input: MockPageInput = {}): MockPageOutput {
  return {
    additionalPaths: [],
    autoGenerated: false,
    boardId: null,
    bountyId: null,
    cardId: null,
    content: null,
    contentText: '',
    convertedProposalId: null,
    createdAt: new Date(),
    createdBy: '',
    deletedAt: null,
    deletedBy: null,
    fontFamily: null,
    fontSizeSmall: null,
    galleryImage: null,
    hasContent: false,
    lensPostLink: null,
    updatedAt: new Date(),
    sourceTemplateId: null,
    updatedBy: '',
    headerImage: null,
    icon: null,
    id: uuid(),
    syncWithPageId: null,
    spaceId: '',
    path: `page-${uuid()}`,
    parentId: null,
    permissionFlags: {
      read: true,
      delete: true,
      edit_position: true,
      edit_content: true,
      edit_path: true,
      comment: true,
      grant_permissions: true,
      create_poll: true,
      delete_attached_bounty: true,
      edit_lock: true
    },
    proposalId: null,
    title: '',
    type: 'page',
    index: -1,
    fullWidth: false,
    lockedBy: null,
    isLocked: false,
    version: -1,
    ...input
  };
}
