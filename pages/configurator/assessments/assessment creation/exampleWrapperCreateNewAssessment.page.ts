import BasePage from "../../../../global/base/Base.page";
import AddScaleToAnswersSection from "../assessment editor/question tab/questionsEditor/add scale to answers section/addScaleToAnswers.page";
import AssessmentEditorScalesTab from "../assessment editor/scales tab/scaleTab.page";
import AssessmentsPage from "../assessment.page";
import AssessmentCreationPage from "./assessmentCreation.page";
import { assessmentType } from "./assessmentCreation.page"
import { QuestionType } from "../assessment editor/question tab/questionsEditor/questionEditor.page";
// import assessmentType from "./assessmentCreation.page";





class WrapperCreateNewAssessment extends BasePage {



    async gotoAssessmentPage() {
        const assessment = new AssessmentsPage(this.page)
        await assessment.goto()
    }

    async createAssessment(assessmentType: assessmentType) {
        const createAssessment = new AssessmentCreationPage(this.page)
        switch (assessmentType) {
            case 'Integrity':
                await createAssessment.createNewAssessment('Integrity');
                break
            case 'Integrity Extended':
                await createAssessment.createNewAssessment('Integrity Extended');
                break
            case 'Integrity Social Engineering':
                await createAssessment.createNewAssessment('Integrity Social Engineering');
                break
            case 'Intro':
                await createAssessment.createNewAssessment('Intro');
                break
            case 'Personality':
                await createAssessment.createNewAssessment('Personality');
                break
            case 'Skills':
                await createAssessment.createNewAssessment('Skills');
                break
            case 'Skills IGame':
                await createAssessment.createNewAssessment('Skills IGame');
                break
            case 'Skills Speak':
                await createAssessment.createNewAssessment('Skills Speak');
                break
            //Note for undefined
            default:
                console.log('undefined assessment type')

        }
    }


    async createAssessmentWithScalesAndQuestions(assessmentType: assessmentType) {
        const createAssessment = new AssessmentCreationPage(this.page)
        const scalePage = new AssessmentEditorScalesTab(this.page)
        switch (assessmentType) {
            case 'Integrity':
                await createAssessment.createNewAssessment('Integrity');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Integrity');
                break
            case 'Integrity Extended':
                await createAssessment.createNewAssessment('Integrity Extended');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Integrity Extended');
                
                break
            case 'Integrity Social Engineering':
                await createAssessment.createNewAssessment('Integrity Social Engineering');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Integrity Social Engineering');
                break
            case 'Intro':
                await createAssessment.createNewAssessment('Intro');
                break
            case 'Personality':
                await createAssessment.createNewAssessment('Personality');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Personality');
                break
            case 'Skills':
                await createAssessment.createNewAssessment('Skills');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Skills');
                break
            case 'Skills IGame':
                await createAssessment.createNewAssessment('Skills IGame');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Skills IGame');
                break
            case 'Skills Speak':
                await createAssessment.createNewAssessment('Skills Speak');
                await scalePage.navigateToScaleTabAndAddScalesAndNormToAssessment('Skills Speak');
                break
            //Note for undefined
            default:
                console.log('undefined assessment type')


        }
    }















}
export default WrapperCreateNewAssessment