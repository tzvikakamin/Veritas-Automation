import { Page } from "@playwright/test";
import PLAYER_LOCATORS, { URL } from "./playerLocators";
import catchNewPage from "../../global/utils/catch new page";
import PlayerInTest from "./playerInTest";

class PlayerEntering {

    page: Page
    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto(URL);
    }

    async login(username?: string, password?: string) {
        username = username || process.env.PLAYER_USERNAME || ''
        password = password || process.env.PLAYER_PASSWORD || ''

        await this.page.click(PLAYER_LOCATORS.USERNAME_INPUT)
        await this.page.fill(PLAYER_LOCATORS.USERNAME_INPUT, username)

        await this.page.click(PLAYER_LOCATORS.PASSWORD_INPUT)
        await this.page.fill(PLAYER_LOCATORS.PASSWORD_INPUT, password)

        await this.page.click(PLAYER_LOCATORS.LOGIN_BUTTON)
    }


    async enterId(id: string) {
        await this.page.click(PLAYER_LOCATORS.ID_INPUT)
        await this.page.fill(PLAYER_LOCATORS.ID_INPUT, id)

        const button = this.page.locator(PLAYER_LOCATORS.START_BUTTON)
        const nextPage = await catchNewPage(this.page, button, true)
        return new PlayerInTest(nextPage, id)
    }

}

export default PlayerEntering