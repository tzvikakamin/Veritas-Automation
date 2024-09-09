import { test, expect, selectors, Page, } from '@playwright/test'
import AssessmentsPage from '../../pages/configurator/assessments/assessment.page';
import AssessmentCreationPage from '../../pages/configurator/assessments/assessment creation/assessmentCreation.page';
import AssessmentEditorTabsPage from '../../pages/configurator/assessments/assessment editor/assessmentEditorTabs.page';
import AssessmentEditorScalesTab, { integrityExtendedScales } from '../../pages/configurator/assessments/assessment editor/scales tab/scaleTab.page';
import QuestionEditorPage from '../../pages/configurator/assessments/assessment editor/question tab/questionsEditor/questionEditor.page';
import AssessmentEditorQuestionTab from '../../pages/configurator/assessments/assessment editor/question tab/questionTab.page';

// let browser;
let page: Page;
let context;

test.describe.serial('Integrity assessment', () => {
  test.beforeAll(async ({ browser }) => {

    // context = await browser.newContext();
    page = await browser.newPage();
  });


  test.afterAll(async () => {
    // await context.close();
  });


  test('Create integrity assessment with the settings: Automatic Continue, Unlimited corrections, Skipping', async () => {
    const assessmentPage = new AssessmentsPage(page);
    const assessmentCreationPage = new AssessmentCreationPage(page);

    // this 'goto' do login and go to the assessment page
    await assessmentPage.goto();

    await assessmentCreationPage.createNewAssessment('Integrity');
    await expect(assessmentCreationPage.$.successMessage).toBeVisible({ timeout: 3000 })

  });

  test('Add scales for the new integrity assessment', async () => {
    const scalesPage = new AssessmentEditorScalesTab(page)

    await scalesPage.navigateToScaleTabAndAddScalesAndNormToAssessment('Integrity')
    await expect(scalesPage.$.successMessage).toBeVisible()


  });

  test('Add questions and answers and connect the answers to scales', async () => {
    const assessmentTabsPage = new AssessmentEditorTabsPage(page);
    const questionTabPage = new AssessmentEditorQuestionTab(page);
    const questionPage = new QuestionEditorPage(page);

    await assessmentTabsPage.navigateToQuestions();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Confirm info', [], integrityExtendedScales, 12, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Date', [], integrityExtendedScales, 6, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Dates range', [], integrityExtendedScales, 1, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Drag and Drop', ['answer 1', 'answer 2', 'answer 3'], integrityExtendedScales, 2, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Free text', [], integrityExtendedScales, 3, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Multiple choice', ['answer 1', 'answer 2', 'answer 3'], integrityExtendedScales, 1, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('No answers', [], integrityExtendedScales, 2, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Questionnaire', [], integrityExtendedScales, 3, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer 1', 'answer 2', 'answer 3'], integrityExtendedScales, 1, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Video answer', ['answer 1', 'answer 2', 'answer 3'], integrityExtendedScales, 2, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Yes-No', [], integrityExtendedScales, 3, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();

  });

  test('Add question with media', async () => {
    const questionTabPage = new AssessmentEditorQuestionTab(page);
    const questionPage = new QuestionEditorPage(page);

    await questionPage.gotoQuestionMainPage();
    await questionTabPage.clickAddQuestion();
    await questionPage.addMediaToQuestion();

    await expect(questionPage.$.addMediaSuccessfullyMessage).toBeVisible();
    await questionPage.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer 1',], integrityExtendedScales, 1, undefined);

    await expect(questionPage.$.successMessage).toBeVisible();


  });

  test('Check the preview', async () => {
    const assessmentTabPage = new AssessmentEditorTabsPage(page);
    const questionPage = new QuestionEditorPage(page);
    
    await questionPage.gotoQuestionMainPage();
    const previewPage = await assessmentTabPage.openPreview();

    await previewPage.clickLanguagesOkButton();
    await previewPage.clickOnTheFirstAnswer();

    await expect(previewPage.$.editQuestionNumber).toContainText('2')
    await previewPage.page.close()

  });

  // test('Duplicate the assessment', async () => {
  //   const assessmentTabPage = new AssessmentEditorTabsPage(page);
  //   const questionPage = new QuestionEditorPage(page);


  //   const previewPage =  await assessmentTabPage.openPreview();

  //   await previewPage.clickLanguagesOkButton();

  //   await expect(previewPage.$.editQuestionNumber).toContainText('2')
  //   await previewPage.page.close()

  // });



});

