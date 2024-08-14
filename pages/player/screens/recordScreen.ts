import ScreenInterface from "./screenInterface";


const recordScreen: ScreenInterface={
    name:'recordScreen',
    
    getLocator(page) {
        return page.locator('.screenshare-area')
    },

    async handler(page) {
        // await page.waitForTimeout(10000)
        const button = page.locator('button[data-sentry-id="screen-focus-init"]')
        if (await button.isVisible()) {
            await button.click()
        }
        await page.waitForTimeout(1000)
        await page.keyboard.press('Tab')
        await page.waitForTimeout(1000000)
        await page.keyboard.press('Escape')
    },
}

export default recordScreen
//.questions-answers