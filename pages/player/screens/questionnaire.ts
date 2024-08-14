import { Locator, Page } from "@playwright/test"
import ScreenInterface from "./screenInterface"

const questionnaire: ScreenInterface = {
    name: 'questionnaire',

    getLocator: (page: Page) => page.locator('div.questionnaire-answers').first(),

    handler: async (page: Page) => {

        const eachQuestion = page.locator('div.questionnaire-answers')
        const title = page.locator('h2.questionnaire-answer-title')

        const select = page.locator('div.app-sl')
        const selectItem = page.locator('div.app-sl-popover-item')

        const freeText = page.locator('textarea.questionnaire-textarea')

        const datePicker = page.locator('input.questionnaire__datepicker')
        const someDate = page.locator('td :not(.is-other-month)')

        const thisChild = (i: number, locator: Locator) => eachQuestion.nth(i).locator(locator)

        for (let i = 0; i < await eachQuestion.count(); i++) {


            // console.log(await title.nth(i).innerText());

            // if ((await title.nth(i).getAttribute('data-bot'))==='i was here'){
            //     continue
            // }
            // await title.nth(i).evaluate((el) => el.dataset.bot = 'i was here')

            console.log('question: ' + i);
            if (await thisChild(i, select).isVisible()) {
                console.log('selecting...');
                await thisChild(i, select).click({timeout:200})
                await selectItem.first().click({timeout:200})
            }

            if (await thisChild(i, freeText).isVisible()) {
                console.log('writing...');
                await thisChild(i, freeText).fill('test',{timeout:200})
            }

            if (await thisChild(i, datePicker).first().isVisible()) {
                console.log('date picking...');
                const amount = await thisChild(i, datePicker).count()
                for (let j = 0; j < amount; j++) {

                    await thisChild(i, datePicker).nth(j).click({timeout:200})
                    await someDate.first().click({timeout:200})
                }
            }
        }

    }
}


export default questionnaire