import BasePage from "../../global/base/Base.page"
import OrgNavbarPage from "./OrgNavbar.page"

class allCandidatePage extends BasePage {

    $ = {
        locator: this.page.locator('locatorString'),
    }

    async goto(orgName: string) {
        const prevPage = new OrgNavbarPage(this.page)
        await prevPage.goto(orgName)
        await prevPage.navigateToAllCandidates()
        //navigate
    }

}

export default allCandidatePage