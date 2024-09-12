import AssessmentListSection from "../assessment list/assessmentList.page";
import AssessmentEditorQuestionTab from "./question tab/questionTab.page";
import BasePage from "../../../../global/base/Base.page";
import AssessmentEditorScalesTab from "./scales tab/scaleTab.page";
import AssessmentPreview from "./preview/assessmentPreview.page";


class AssessmentEditorTabsPage extends BasePage {


    $ = {
        questionsTab: this.page.locator('[data-ui-sref=".questions"]'),
        scalesTab: this.page.locator('span[translate="ac.assessments.assessment.navTabs.scalesTab"]'),


        //preview element
        previewButton: this.page.getByRole('button', { name: 'Preview' }),


        // duplicate elements
        duplicateButton: this.page.locator('//button[normalize-space()="Duplicate"]'),
        duplicateAssessmentPopupButton: this.page.locator('button[class="button button-blue__dark ng-scope"]'),


    }

    async goto(assessmentName: string) {
        const assessmentList = new AssessmentListSection(this.page);
        await assessmentList.goto();
        await assessmentList.editAssessment(assessmentName);
    }

    async navigateToQuestions() {
        await this.$.questionsTab.click();
        return new AssessmentEditorQuestionTab(this.page);
    }
    async navigateToScales() {
        await this.$.scalesTab.click();
        return new AssessmentEditorScalesTab(this.page);
    }

    async openPreview() {
       const catchPreviewPage = this.page.waitForEvent('popup',{timeout:10000});

        await this.$.previewButton.click();
        const previewPage = await catchPreviewPage;
        return new AssessmentPreview(previewPage);
    }

    async duplicateAssessment() {
        await this.$.duplicateButton.click();
        await this.$.duplicateAssessmentPopupButton.click();


    }




}

export default AssessmentEditorTabsPage