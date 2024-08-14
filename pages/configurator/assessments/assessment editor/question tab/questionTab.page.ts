import AssessmentEditorTabsPage from "../assessmentEditorTabs.page";
import QuestionEditorPage from "./questionsEditor/questionEditor.page";
import BasePage from "../../../../../global/base/Base.page";
import { Page } from "@playwright/test";


class AssessmentEditorQuestionTab extends BasePage{
   
    $ = {
        addQuestionButton: this.page.locator('[data-ui-sref*="home.question"]'),
    }

    async goto(assessmentName: string) {
        const assessmentEditor = new AssessmentEditorTabsPage(this.page)
        await assessmentEditor.goto(assessmentName)
        await assessmentEditor.navigateToQuestions()
    }

    async clickAddQuestion() {
        await this.$.addQuestionButton.first().click()
        return new QuestionEditorPage(this.page)
    }

    async addQuestion(questionName: string,answers?: string[]) {
        const questionEditor = await this.clickAddQuestion()
        await questionEditor.insertQuestionName(questionName)
        if(answers) {
            for(const answer of answers) {
                await questionEditor.clickAddAnswer()
                await questionEditor.insertAnswer(answer)
            }
        }
        await questionEditor.clickSaveQuestion()
        const result = await questionEditor.getSaveMessage()

        if (result) {
            return result
        }
    }


}

export default AssessmentEditorQuestionTab