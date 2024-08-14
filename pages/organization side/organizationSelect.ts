import { Page, Locator } from "@playwright/test";
import BasePage from "../../global/base/Base.page";
import LoginPage from "../login/login.page";
import OrgNavbarPage from "./OrgNavbar.page";
import OrgConfiguratorSideNav from "../organization configurator side/orgConfiguratorSideNav";
import ConfiguratorNavbarPage from "../configurator/configuratorNavbar.page";



class OrganizationSelectPage extends BasePage {
    $ = {
        searchInput: this.page.locator('input[ng-model="searchOrg"]'),
        organizationListItem: this.page.locator('div.row'),

        findOrganization: (orgName: string) => {
            this.$.searchInput.fill(orgName)
            const parent = this.$.organizationListItem.filter({ hasText: orgName })
            return {
                parent,
                orgNameLink: parent.locator('i.icon-customer-entrance'),
                configuratorBtn: parent.locator('a.link__white.ng-binding'),
            }
        },
    }

    async goto() {
        const prevPage = new ConfiguratorNavbarPage(this.page)
        await prevPage.goto()
        await prevPage.openOrganizations()
    }

    async navigateToOrgCustomer(orgName: string) {
        const org = this.$.findOrganization(orgName)
        await org.orgNameLink.click()
        return new OrgNavbarPage(this.page)
    }
    async navigateToOrgConfigurator(orgName: string) {
        const org = this.$.findOrganization(orgName)
        await org.configuratorBtn.click()
        return new OrgConfiguratorSideNav(this.page)
    }
}

export default OrganizationSelectPage
