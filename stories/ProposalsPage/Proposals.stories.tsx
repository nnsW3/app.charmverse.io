import { Box } from '@mui/material';
import { rest } from 'msw';
import { GlobalContext } from 'stories/lib/GlobalContext';

import DocumentPage from 'components/[pageId]/DocumentPage/DocumentPage';
import { HeaderSpacer } from 'components/common/PageLayout/components/Header/Header';
import { NewProposalPage as ProposalPageComponent } from 'components/proposals/ProposalPage/NewProposalPage';
import type { ProposalWithUsersAndRubric } from 'lib/proposal/interface';
import { createMockPage } from 'testing/mocks/page';
import { createMockProposal } from 'testing/mocks/proposal';
import { builders as _, jsonDoc } from 'testing/prosemirror/builders';

import { members, userProfile } from '../lib/mockData';

import { ProposalsPageStory } from './ProposalsPageStory';

export default {
  title: 'Proposals/Views',
  component: ProposalPageComponent
};

export function ProposalsPage() {
  return (
    <GlobalContext>
      <ProposalsPageStory />
    </GlobalContext>
  );
}

ProposalsPage.parameters = ProposalsPageStory.parameters;

export function NewProposal() {
  return (
    <GlobalContext>
      <HeaderSpacer />
      <ProposalPageComponent />
    </GlobalContext>
  );
}

export function ProposalInEvaluation() {
  const page = createMockPage({
    title: 'A simple proposition',
    type: 'proposal',
    content: jsonDoc(_.p('This is the content')),
    proposalId: 'a proposal id'
  });

  return (
    <GlobalContext>
      <Box sx={{ overflowY: 'auto' }}>
        <DocumentPage page={page} refreshPage={async () => {}} readOnly={true} savePage={() => {}} />
      </Box>
    </GlobalContext>
  );
}

ProposalInEvaluation.parameters = {
  msw: {
    handlers: {
      proposal: rest.get('/api/proposals/:proposalId', (req, res, ctx) => {
        const rubricCriteria: ProposalWithUsersAndRubric['rubricCriteria'] = [
          {
            id: '1',
            index: -1,
            proposalId: '1',
            title: 'Developer Presence',
            description:
              'Makes their point clearly. This is a long description designed to appear on multiple lines :)',
            type: 'range',
            parameters: {
              min: 0,
              max: 2
            },
            evaluationId: null
          },
          {
            id: '2',
            index: -1,
            proposalId: '1',
            title: 'Developer Draw',
            description:
              'Makes their point clearly. This is a long description designed to appear on multiple lines :)',
            type: 'range',
            parameters: {
              min: 0,
              max: 10
            },
            evaluationId: null
          },
          {
            id: '3',
            index: -1,
            proposalId: '1',
            title: 'Developer Commitment',
            description: `A\nmulti-line\ndescription`,
            type: 'range',
            parameters: {
              min: 0,
              max: 4
            },
            evaluationId: null
          },
          {
            id: '4',
            index: -1,
            proposalId: '1',
            title: 'Developer activity',
            description: null,
            type: 'range',
            parameters: {
              min: 0,
              max: 4
            },
            evaluationId: null
          },
          {
            id: '5',
            index: -1,
            proposalId: '1',
            title: 'Community engagement',
            description: null,
            type: 'range',
            parameters: {
              min: 0,
              max: 4
            },
            evaluationId: null
          },
          {
            id: '6',
            index: -1,
            proposalId: '1',
            title: 'Twitter activity',
            description: null,
            type: 'range',
            parameters: {
              min: 0,
              max: 4
            },
            evaluationId: null
          },
          {
            id: '7',
            index: -1,
            proposalId: '1',
            title: 'Github activity',
            description: null,
            type: 'range',
            parameters: {
              min: 0,
              max: 4
            },
            evaluationId: null
          }
        ];
        const rubricAnswers: ProposalWithUsersAndRubric['rubricAnswers'] = [
          ...rubricCriteria.map((criteria) => ({
            rubricCriteriaId: criteria.id,
            proposalId: criteria.proposalId,
            criteriaId: criteria.id,
            userId: userProfile.id,
            comment: 'Nice job',
            response: { score: criteria.parameters.max - 1 },
            evaluationId: criteria.evaluationId
          })),
          ...rubricCriteria.map((criteria) => ({
            rubricCriteriaId: criteria.id,
            proposalId: criteria.proposalId,
            criteriaId: criteria.id,
            userId: members[1].id,
            comment: 'Needs work and probably some more details',
            response: { score: criteria.parameters.min + 1 },
            evaluationId: criteria.evaluationId
          }))
        ];
        const proposal = createMockProposal({
          authors: [{ proposalId: '', userId: members[0].id }],
          reviewers: [
            { evaluationId: null, id: '1', proposalId: '', roleId: null, userId: userProfile.id, systemRole: null },
            { evaluationId: null, id: '2', proposalId: '', roleId: null, userId: members[0].id, systemRole: null },
            { evaluationId: null, id: '3', proposalId: '', roleId: null, userId: members[1].id, systemRole: null }
          ],
          evaluationType: 'rubric',
          status: 'published',
          rubricCriteria,
          rubricAnswers
        });
        return res(ctx.json(proposal));
      })
    }
  }
};
