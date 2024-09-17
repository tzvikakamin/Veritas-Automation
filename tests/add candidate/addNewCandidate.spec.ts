import { test, expect, Page, chromium, } from '@playwright/test'
import AddCandidatePage from '../../pages/organization side/addCandidate.page';
import OrganizationSelectPage from '../../pages/organization side/organizationSelect';
import { generateRandomNumbers } from '../../pages/organization side/addCandidate.page';
import OrgNavbarPage from '../../pages/organization side/OrgNavbar.page';
import AllCandidatePage from '../../pages/organization side/allCandidates.page';





let page: Page;
let context;
const organizationName = '00 QA AUTOMATION'
const positionName = 'AutomationsDavid1'

test.describe.serial('Add candidate', () => {
  test.beforeAll(async ({ browser }) => {

    browser = await chromium.launch({ slowMo: 40 });
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(async () => {
    // await context.close();
  });



  test('add new id', async () => {
    const addCandidatePage = new AddCandidatePage(page)
    const orgNavbarPage = new OrgNavbarPage(page)
    const allCandidatesPage = new AllCandidatePage(page)

     await addCandidatePage.goto(organizationName)

    //Adding ID and verification that it is unique
    let idAvailable = false
    let id = generateRandomNumbers() + ' AUTO'

    while (!idAvailable) {
      idAvailable = await addCandidatePage.fillAndCheckId(id)

      if (!idAvailable) {
        id = generateRandomNumbers() + ' AUTO'
      }
    }

    await addCandidatePage.addPosition(positionName)
    await addCandidatePage.fillCandidateInfo('david', 'automation', 'male')
    await addCandidatePage.save()
    /* ------------------------------------------- Assert --------------------------------------------------------*/
    await expect(addCandidatePage.$.successMessage).toBeVisible({ timeout: 10000 })
    await orgNavbarPage.navigateToAllCandidates()
    await allCandidatesPage.goToFutureCandidates()
    await allCandidatesPage.searchCandidate(id)


  /* ------------------------------------------- Assert --------------------------------------------------------*/
  await expect(allCandidatesPage.$.candidateRow.first()).toBeVisible({timeout:10000})




  })


















































  //   const assessmentPage = new AssessmentsPage(page);
  //   const assessmentCreationPage = new AssessmentCreationPage(page);

  //   // this 'goto' do login and go to the assessment page
  //   await assessmentPage.goto();

  //   await assessmentCreationPage.createNewAssessment('Skills');

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(assessmentCreationPage.$.successMessage).toBeVisible({ timeout: 3000 })

  // });

  // test('Add scales for the new skills assessment', async () => {
  //   const scalesPage = new AssessmentEditorScalesTab(page)

  //   await scalesPage.navigateToScaleTabAndAddScalesAndNormToAssessment('Skills')

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(scalesPage.$.successMessage).toBeVisible()


  // });

  // test('Add questions and answers and connect the answers to scales', async () => {
  //   const assessmentTabsPage = new AssessmentEditorTabsPage(page);
  //   const questionTabPage = new AssessmentEditorQuestionTab(page);
  //   const questionPage = new QuestionEditorPage(page);

  //   await assessmentTabsPage.navigateToQuestions();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Confirm info', [], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Date', [], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Dates range', [], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Free text', [], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Multiple choice', ['answer 1', 'answer 2', 'answer 3'], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('No answers', [], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer 1', 'answer 2', 'answer 3'], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Video answer', ['answer 1', 'answer 2', 'answer 3'], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Yes-No', [], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();
  // });


  // test('Add question with media', async () => {
  //   const questionTabPage = new AssessmentEditorQuestionTab(page);
  //   const questionPage = new QuestionEditorPage(page);

  //   await questionPage.gotoQuestionMainPage();
  //   await questionTabPage.clickAddQuestion();
  //   await questionPage.addMediaToQuestion();

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.addMediaSuccessfullyMessage).toBeVisible();

  //   /* ----------------------------------------- Question type ---------------------------------------------------*/
  //   await questionPage.AddQuestionAndAnswersAndConnectScale('Single choice', ['answer 1',], undefined, undefined, undefined);

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(questionPage.$.successMessage).toBeVisible();


  // });

  // test('Check the preview', async () => {
  //   const assessmentTabPage = new AssessmentEditorTabsPage(page);
  //   const questionPage = new QuestionEditorPage(page);

  //   await questionPage.gotoQuestionMainPage();
  //   const previewPage = await assessmentTabPage.openPreview();

  //   await previewPage.clickLanguagesOkButton();
  //   await previewPage.clickOnTheFirstAnswer();

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(previewPage.$.editQuestionNumber).toContainText('2')
  //   await previewPage.page.close()

  // });

  // test('Duplicate the assessment', async () => {
  //   const assessmentTabPage = new AssessmentEditorTabsPage(page);
  //   const questionPage = new QuestionEditorPage(page);

  //   await assessmentTabPage.duplicateAssessment();

  //   /* ------------------------------------------- Assert --------------------------------------------------------*/
  //   await expect(assessmentTabPage.$.duplicateAssessmentPopupButton).toBeEnabled({ timeout: 15000 })

  // });



});

