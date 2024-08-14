import AssessmentEditorTabsPage from './assessment editor/assessmentEditorTabs.page';
import BasePage from '../../../global/base/Base.page';
import URLs from '../../../URLs';
import { checkForLogin } from '../../../global/utils/check-for-login';
import AssessmentCreationPage from './assessment creation/assessmentCreation.page';

class AssessmentsPage extends BasePage {

    $ = {
        addAssessmentButton: this.page.locator('[translate="ac.assessments.btn.addAssessment"]',)
    }

    async goto() {
        await this.page.goto(URLs.configurator.assessments)
        await checkForLogin(this.page)
    }

    async clickAddNewAssessment() {
        await this.$.addAssessmentButton.click()
        return new AssessmentCreationPage(this.page);
    }

    async addNewAssessment(assessmentName: string) {
        const assessmentCreationPage = await this.clickAddNewAssessment()
        await assessmentCreationPage.insertName(assessmentName)
        await assessmentCreationPage.clickSaveButton()
        const result = await assessmentCreationPage.getSaveMessage()
        if (result) {
            return new AssessmentEditorTabsPage(this.page)
        }
    }
}


export default AssessmentsPage;
