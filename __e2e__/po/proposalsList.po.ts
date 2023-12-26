import type { Page, Locator } from '@playwright/test';

import { baseUrl } from 'config/constants';

import { GlobalPage } from './global.po';

export class ProposalsListPage extends GlobalPage {
  constructor(
    page: Page,
    public emptyState = page.locator('data-test=empty-state'),
    public proposalTemplateSelect = page.locator('data-test=proposal-template-select'),
    public addNewTemplate = page.locator('data-test=new-template-button'),
    public createProposalButton = page.locator('data-test=new-proposal-button'),
    public proposalTemplateFreeFormOption = page.locator('data-test=free_form-proposal-template-menu'),
    public structuredProposalTemplateMenu = page.locator('data-test=structured-proposal-template-menu')
  ) {
    super(page);
  }

  goToProposals(domain: string) {
    return this.page.goto(`${baseUrl}/${domain}/proposals`);
  }

  waitForProposalsList() {
    return this.page.waitForURL(/\/proposals$/);
  }

  getProposalRowLocator(proposalId: string): Locator {
    return this.page.locator(`data-test=database-row-${proposalId}`);
  }

  getProposalRowOpenLocator(proposalId: string): Locator {
    return this.page.locator(`data-test=database-open-button-${proposalId}`);
  }

  getProposalRowReviewersLocators(proposalId: string): Promise<Locator[]> {
    return this.page
      .locator(`data-test=database-row-${proposalId}`)
      .locator(`data-test=selected-reviewers`)
      .locator('data-test=selected-user-or-role-option')
      .all();
  }

  getProposalCategoryLocator(categoryId: string) {
    return this.page.locator(`data-test=proposal-category-${categoryId}`);
  }

  getProposalSidebarButtonLocator() {
    return this.page.locator(`data-test=view-header-actions-menu`);
  }

  getProposalCategorySidebarLocator() {
    return this.page.locator(`data-test=view-sidebar-content`).getByText('Categories');
  }

  getTemplateOptionLocator(pageId: string) {
    return this.page.locator(`data-test=select-option-${pageId}`);
  }

  async openProposalCard(proposalId: string) {
    await this.getProposalRowLocator(proposalId).hover();
    await this.getProposalRowOpenLocator(proposalId).click();
  }

  async openProposalCategoryList() {
    await this.getProposalSidebarButtonLocator().click();
    await this.getProposalCategorySidebarLocator().click();
  }
}
