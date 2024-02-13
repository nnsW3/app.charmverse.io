import { prisma } from '@charmverse/core/prisma-client';
import { getCurrentEvaluation } from '@charmverse/core/proposals';

import type { permissionsApiClient } from 'lib/permissions/api/client';

import type { ProposalWithUsersAndRubric } from './interface';
import { mapDbProposalToProposal } from './mapDbProposalToProposal';

type PermissionsMap = Awaited<
  ReturnType<typeof permissionsApiClient.proposals.computeAllProposalEvaluationPermissions>
>;

export async function getProposal({
  id,
  canAccessPrivateFormFields,
  permissionsByStep
}: {
  id: string;
  canAccessPrivateFormFields: boolean;
  permissionsByStep: PermissionsMap;
}): Promise<ProposalWithUsersAndRubric> {
  const proposal = await prisma.proposal.findUniqueOrThrow({
    where: {
      id
    },
    include: {
      evaluations: {
        orderBy: {
          index: 'asc'
        },
        include: {
          permissions: true,
          reviewers: true,
          rubricCriteria: {
            orderBy: {
              index: 'asc'
            }
          },
          rubricAnswers: true,
          draftRubricAnswers: true,
          vote: true
        }
      },
      authors: true,
      page: { select: { id: true, sourceTemplateId: true, type: true } },
      reviewers: true,
      rewards: true,
      form: {
        include: {
          formFields: {
            orderBy: {
              index: 'asc'
            }
          }
        }
      }
    }
  });

  const currentEvaluation = getCurrentEvaluation(proposal.evaluations);

  const currentPermissions =
    proposal.status === 'draft'
      ? permissionsByStep.draft
      : currentEvaluation && permissionsByStep[currentEvaluation.id];

  if (!currentPermissions) {
    throw new Error('Could not find permissions for proposal');
  }

  return mapDbProposalToProposal({
    proposal,
    permissions: currentPermissions,
    permissionsByStep,
    canAccessPrivateFormFields
  });
}
