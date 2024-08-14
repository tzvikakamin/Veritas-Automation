import { Page, expect } from "@playwright/test";
import ScreenInterface from "./screenInterface";

const helloScreen: ScreenInterface = {
    name: 'helloScreen',

    getLocator(page: Page){
        return page.locator('app-select-language')
    },
    async handler(page: Page){
        await page.click('button[class="button button-blue__light"]')
    }
}

export default helloScreen