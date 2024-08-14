import ScreenInterface from "./screenInterface";

const popupClose: ScreenInterface = {
    name:'',

    getLocator(page) {
        return page.locator('button[data-sentry-id="message-close"]')
    },

    async handler(page) {
        await popupClose.getLocator(page).click()
    },
}

export default popupClose