import { Page, Locator } from "@playwright/test";
import ScreenInterface from "./screenInterface";


const questionScreen: ScreenInterface = {
    name: 'question',

    getLocator: (page: Page) => page.locator('div.question-text'),

    async handler(page: Page) {
        console.log('❓question: ')

        let text = await questionScreen.getLocator(page).textContent()
        console.log(text.split('').reverse().join(''));// fix hebrew ltr
    }
}


export default questionScreen