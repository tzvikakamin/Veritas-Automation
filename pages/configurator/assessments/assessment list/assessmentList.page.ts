import AssessmentsPage from '../assessment.page';
import AssessmentEditorTabsPage from '../assessment editor/assessmentEditorTabs.page';
import BasePage from '../../../../global/base/Base.page';

class AssessmentListSection extends BasePage {

    $ = {
        searchInput: this.page.locator('[ng-model="states.assessmentsList.options.search"]'),
        listItemsName: this.page.locator('[z-ml-bind="p1.assessment_names_ml"]'),
    }

    async goto() {
        await new AssessmentsPage(this.page).goto();
    }

    async searchForAssessment(assessmentName: string) {
        console.info('Search for assessment: ' + assessmentName);

        await this.$.searchInput.fill(assessmentName);
        await this.$.searchInput.press('Enter');
    }

    async editAssessment(assessmentName: string) {
        await this.searchForAssessment(assessmentName);

        await this.$.listItemsName.first().click()
        return new AssessmentEditorTabsPage(this.page)
    }

    // async deleteAssessment(assessmentName: string) {
        // TODO:
    // }


}


export default AssessmentListSection;
