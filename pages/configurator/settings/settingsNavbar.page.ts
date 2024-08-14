import BasePage from "../../../global/base/Base.page";
import PositionsTab from "./positions/positionsTab.page";
import URLs from "../../../URLs";
import { checkForLogin } from "../../../global/utils/check-for-login";


class SettingsTabsPage extends BasePage {
    $={
        positionsTab: this.page.locator('[data-ui-sref="home.settings.positions"]')
    }

    async goto() {
        await this.page.goto(URLs.configurator.settings)
        await checkForLogin(this.page)
    }

    async navigateToPositions() {
        console.info('click positions tab');

        await this.$.positionsTab.click();
        return new PositionsTab(this.page)
    }
}

export default SettingsTabsPage