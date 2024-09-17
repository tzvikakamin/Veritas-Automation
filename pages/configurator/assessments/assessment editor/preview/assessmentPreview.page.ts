import BasePage from "../../../../../global/base/Base.page";


class AssessmentPreview extends BasePage {

    $ = {

        languagesOkPopupButton: this.page.getByRole('button', { name: 'Ok' }),
        headerOfQuestion: this.page.locator('div[role="button"] h1 p'),
        answerNumberOne: this.page.locator('li[title="Question answers number 1"] app-answer-text-position[class="ov-hidden displ-block"]'),
        editQuestionNumber: this.page.locator('a[target="_blank"] span').last()
    }

    async clickLanguagesOkButton() {

        await this.$.languagesOkPopupButton.click()
    }

    async clickOnTheFirstAnswer() {
        // await this.$.answerNumberOne.isEnabled({ timeout: 1000 })
        await this.$.answerNumberOne.click({ delay: 200 });
     
   
    }


}
export default AssessmentPreview