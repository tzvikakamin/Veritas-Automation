import { test, expect, Page } from '@playwright/test';
import AssessmentEditorTabsPage from '../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page';
import { checkForLogin } from '../global/utils/check-for-login';
import AssessmentPreview from '../pages/configurator/assessments/assessment editor/preview/assessmentPreview.page';

let page: Page;
test('test', async ({ browser }) => {
  page = await browser.newPage();
  const assessTab = new AssessmentEditorTabsPage(page);
  
  await assessTab.page.goto('https://34.165.52.158/ac/#/assessment/936748755021000806/questions');
  
  
  if (assessTab.page.locator('alert span[translate="fatal.auth.not_logged_in"]').isVisible({ timeout: 1500 })) {
    await checkForLogin(assessTab.page)
  }
  
  
  
  // await assessTab.page.pause()
  const prePage = await assessTab.openPreview();
  await prePage.clickLanguagesOkButton()

  // await expect(prePage.$.headerOfQuestion).toContainText('Confirm info');
  // await prePage.page.waitForLoadState('networkidle')
  await prePage.clickOnTheFirstAnswer()

  await expect(prePage.$.editQuestionNumber).toContainText('2')


  await prePage.page.close()




  await page.waitForTimeout(1500)
  await assessTab.page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
});
  

