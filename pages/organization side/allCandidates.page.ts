import { idText } from "typescript"
import BasePage from "../../global/base/Base.page"
import OrgNavbarPage from "./OrgNavbar.page"

class AllCandidatePage extends BasePage {

    $ = {

        futureCandidatesTab: this.page.locator('[translate="customer.position.futureCandidates"]'),
        searchField: this.page.locator('[ng-model="search"]'),
        candidateRow: this.page.locator('.text-standard.no-wrap.p10'),

    }

    async goto(orgName: string) {
        const prevPage = new OrgNavbarPage(this.page)
        await prevPage.goto(orgName)
        await prevPage.navigateToAllCandidates()
        //navigate
    }

    async goToFutureCandidates() {
        await this.$.futureCandidatesTab.click()
    }

    async searchCandidate(id: string) {
        await this.$.searchField.click()
        await this.$.searchField.fill(id)
        await this.page.keyboard.press('Enter')
        

    }


}

export default AllCandidatePage