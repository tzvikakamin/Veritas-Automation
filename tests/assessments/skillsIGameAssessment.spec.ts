import { test, expect, Page, } from '@playwright/test'
import AssessmentsPage from '../../pages/configurator/assessments/assessment.page';
import AssessmentCreationPage from '../../pages/configurator/assessments/assessment creation/assessmentCreation.page';
import AssessmentEditorTabsPage from '../../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page';
import AssessmentEditorScalesTab from '../../pages/configurator/assessments/assessment editor/scales tab/scaleTab.page';

let page: Page;
let context;

test.describe.serial('Skills IGame', () => {
  test.beforeAll(async ({ browser }) => {

    context = await browser.newContext();
    page = await context.newPage();
  });


  test.afterAll(async () => {
    // await context.close();
  });


  test('Create skills IGame assessment', async () => {
    const assessmentPage = new AssessmentsPage(page);
    const assessmentCreationPage = new AssessmentCreationPage(page);

    // this 'goto' do login and go to the assessment page
    await assessmentPage.goto();

    await assessmentCreationPage.createNewAssessment('Skills IGame');

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(assessmentCreationPage.$.successMessage).toBeVisible({ timeout: 3000 })
  });

  test('Add scales for the new skills IGame assessment', async () => {
    const scalesPage = new AssessmentEditorScalesTab(page)

    await scalesPage.navigateToScaleTabAndAddScalesAndNormToAssessment('Skills IGame')

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(scalesPage.$.successMessage).toBeVisible()
  });


  test('Duplicate the assessment', async () => {
    const assessmentTabPage = new AssessmentEditorTabsPage(page);

    await assessmentTabPage.duplicateAssessment();

    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(assessmentTabPage.$.duplicateAssessmentPopupButton).toBeEnabled({ timeout: 15000 })
  });



});

