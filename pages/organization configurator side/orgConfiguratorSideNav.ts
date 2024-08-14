import BasePage from "../../global/base/Base.page";
import OrganizationSelectPage from "../organization side/organizationSelect";
import positionsPage from "./positions/positions.page";

class OrgConfiguratorSideNav extends BasePage {

    $ = {
        settingsBtn: this.page.locator('i.icon.icon-settings-sprite') ,
        billingBtn: this.page.locator('a[ui-sref=".billing"]') ,
        positionsBtn: this.page.locator('span[translate-once="ac.org.navItem.positions"]')
    }

    async goto(orgName: string) {
        const prevPage = new OrganizationSelectPage(this.page)
        await prevPage.goto()
        await prevPage.navigateToOrgConfigurator(orgName)
    }
    async navigateToPositionsPage() {

        await this.$.positionsBtn.click()
        return new positionsPage(this.page)
    }


}
export default OrgConfiguratorSideNav