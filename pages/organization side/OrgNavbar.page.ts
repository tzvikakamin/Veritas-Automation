import { Page, Locator } from '@playwright/test'
import BasePage from '../../global/base/Base.page';
import OrganizationSelectPage from './organizationSelect';
import AddCandidatePage from './addCandidate.page';


class OrgNavbarPage extends BasePage {

    $ = {
        addCandidateLink: this.page.locator('a.button-add-candidate '),
        allCandidatesLink:this.page.locator(''),
    }

    async goto(customerName: string) {
        const customerSelect = new OrganizationSelectPage(this.page)
        await customerSelect.goto()
        await customerSelect.navigateToOrgCustomer(customerName)
    }

    async navigateToAddCandidate() {
        await this.$.addCandidateLink.click()
        return new AddCandidatePage(this.page)
    }

    async navigateToAllCandidates() {
        await this.$.allCandidatesLink.click()
        return new AddCandidatePage(this.page)
    }

}

export default OrgNavbarPage