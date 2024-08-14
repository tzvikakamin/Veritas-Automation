import AssessmentListSection from "../assessment list/assessmentList.page";
import AssessmentEditorQuestionTab from "./question tab/questionTab.page";
import BasePage from "../../../../global/base/Base.page";
import AssessmentEditorScalesTab from "./scales tab/scaleTab.page";


class AssessmentEditorTabsPage extends BasePage {

    $ = {
        questionsTab: this.page.locator('[data-ui-sref=".questions"]'),
        scalesTab: this.page.locator('span[translate="ac.assessments.assessment.navTabs.scalesTab"]')
    }

    async goto(assessmentName: string) {
        const assessmentList = new AssessmentListSection(this.page)
        await assessmentList.goto()
        await assessmentList.editAssessment(assessmentName)
    }

    async navigateToQuestions() {
        await this.$.questionsTab.click()
        return new AssessmentEditorQuestionTab(this.page)
    }
    async navigateToScales() {
        await this.$.scalesTab.click()
        return new AssessmentEditorScalesTab(this.page)
    }
}

export default AssessmentEditorTabsPage