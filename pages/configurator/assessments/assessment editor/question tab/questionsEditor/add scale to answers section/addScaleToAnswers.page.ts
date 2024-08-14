import BasePage from "../../../../../../../global/base/Base.page";


class AddScaleToAnswersSection extends BasePage {

    $ = {
        addScaleButton: this.page.locator("button[ng-click='addAnswerScale(answer)']"),
        scaleListContainer: this.page.locator('div[class="b-answer-scales ng-scope"]'),
        ScaleDropdownButton: this.page.locator('div [class="button light-color-gray button__adaptive dropdown-toggle"]'),
        scaleDropdownItem: this.page.locator('li[ng-click="setScale(scale, item)"]'),
        ScoreInput: this.page.locator('input[class="form-group-input light-color-gray form-group__full-width no-spinners ng-pristine ng-untouched ng-valid ng-empty"]'),
        SpecialRuleDropdownButton: this.page.locator("div[class='btn-form-group form-group__full-width dropdown'] button[type='button']"),
        specialRuleDropdownItem: this.page.locator(`div[class='btn-form-group form-group__full-width dropdown'] button[type='button']`),
        DeleteScaleButton: this.page.locator('button[class="button button__xs button__transparent"]'),
        deleteScaleConfirmButton: this.page.locator('button[class=".button.button-blue__light.ng-scope.zz-dialog-default-focus"]'),
    }
    private async clickAddScale() {
        console.info('click add scale button')
        await this.$.addScaleButton.click()
        // await this.page.click(ADD_SCALE_TO_ANSWERS_LOCATORS.ADD_SCALE_BUTTON)
    }

    private async getScaleCard(index: number) {
        return this.$.scaleListContainer.nth(index)
        // return this.page.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.SCALE_LIST_CONTAINER)
        //     .nth(index)
    }

    private async selectScale(scaleNumber: number, scaleName: string) {
        console.info('select scale: ' + scaleName)
        const scaleCard = await this.getScaleCard(scaleNumber)

        await scaleCard.locator(this.$.ScaleDropdownButton).click()
        await scaleCard.locator(this.$.scaleDropdownItem).filter({ hasText: scaleName })
            .click()
    }

    private async insertScaleScore(scaleNumber: number, score: number) {
        console.info('insert scale score: ' + score)
        const scaleCard = await this.getScaleCard(scaleNumber)
        
        await this.$.ScoreInput.click()
        await this.$.ScoreInput.fill(score.toString())
        
        // const input = scaleCard.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.SCORE_INPUT)

        // await input.click()
        // await input.fill(score.toString())
    }

    private async selectSpecialRule(scaleNumber: number, specialRule: string) {
        console.info('select special rule: ' + specialRule)
        const scaleCard = await this.getScaleCard(scaleNumber)

        await scaleCard.locator(this.$.SpecialRuleDropdownButton).click()
        await scaleCard.locator(this.$.specialRuleDropdownItem).filter({ hasText: specialRule })
            .click()

        // await scaleCard.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.SPECIAL_RULE_DROPDOWN_BUTTON)
            // .click()
        // await scaleCard.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.SPECIAL_RULE_DROPDOWN_ITEM)
            // .filter({ hasText: specialRule })
            // .click()
    }

    async getHowManyScales() {
        return await this.$.scaleListContainer.count()
        // return await this.page.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.SCALE_LIST_CONTAINER)
            // .count()
    }

    async deleteScale(scaleNumber: number) {
        console.info('delete scale: ' + scaleNumber)
        const scaleCard = await this.getScaleCard(scaleNumber)

        await scaleCard.locator(this.$.DeleteScaleButton).click()
        await scaleCard.locator(this.$.deleteScaleConfirmButton).click()

        // await scaleCard.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.DELETE_SCALE_BUTTON)
            // .click()
        // await scaleCard.locator(ADD_SCALE_TO_ANSWERS_LOCATORS.DELETE_SCALE_CONFIRM_BUTTON)
            // .click()

    }

    async addScale(scaleName: string, score: number, specialRule?: string) {
        const scaleNum = await this.getHowManyScales()
        await this.clickAddScale()
        await this.selectScale(scaleNum, scaleName)
        await this.insertScaleScore(scaleNum, score)
        if(specialRule){
            await this.selectSpecialRule(scaleNum, specialRule)
        }
        
    }

}

export default AddScaleToAnswersSection