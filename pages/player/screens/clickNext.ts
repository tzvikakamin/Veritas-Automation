import cameraQuestion from "./cameraQuestion";
import ScreenInterface from "./screenInterface";

const clickNext: ScreenInterface = {
    name: 'clickNext',

    getLocator(page) {
        return page.locator('button[data-sentry-id="pass-done"]')
            .or(page.locator('button[data-sentry-id="screen-focus-next"]'))
            .or(page.locator('[translate="playerPassing.btn.Next"]'))
    },

    async handler(page) {
        const nextBtn = clickNext.getLocator(page)

        if (await cameraQuestion.getLocator(page).isVisible()) {
            await cameraQuestion.handler(page)
        }

        if (await nextBtn.isVisible()) {
            await nextBtn.click()
        }
    }
}

export default clickNext