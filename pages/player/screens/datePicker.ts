import { Page } from "@playwright/test"
import ScreenInterface from "./screenInterface"

export const datePicker: ScreenInterface = {
    name: 'datePicker',

    getLocator: (page: Page) => page.locator('div.date-interval__head'),

    handler: async (page: Page) => {
        const dateTable = page.locator('tbody');
        const someDate = page.locator('td :not(.is-other-month)').first();

        const amount = await dateTable.count();
        for (let i = 0; i < amount; i++) {
            await dateTable.nth(i).locator(someDate).click({ timeout: 200 })
        }

    }
}
