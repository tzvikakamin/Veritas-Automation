import { Page } from "@playwright/test";
import AddPositionWindow from "./add position/addPosition.page";
import SettingsTabsPage from "../settingsNavbar.page";
import PositionListSection from "./list/positionList.page";
import BasePage from "../../../../global/base/Base.page";


class PositionsTab extends BasePage {
    private addPositionWindow: AddPositionWindow
    private list: PositionListSection

    $ = {
        addPositionButton: this.page.locator('[translate-once="ac.settings.positions.btn.addPosition"]')
    }

    constructor(page: Page) {
        super(page);
        this.addPositionWindow = new AddPositionWindow(this.page);
        this.list = new PositionListSection(this.page);
    }

    async goto() {
        const settingsPage = new SettingsTabsPage(this.page);
        await settingsPage.goto();
        await settingsPage.navigateToPositions();

    }

    async clickAddPosition() {
        console.info('click add position button');

        await this.$.addPositionButton.click()
        return this.addPositionWindow;
    }

    async addPosition(positionName?: string) {
        await this.clickAddPosition();
        return await this.addPositionWindow.addPosition(positionName)
    }

    async deletePosition(positionName: string) {
        await this.list.deletePosition(positionName)
    }

}

export default PositionsTab;
