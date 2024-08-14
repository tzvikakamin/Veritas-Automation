import URLs from "../../../URLs"
import BasePage from "../../../global/base/Base.page"
import { checkForLogin } from "../../../global/utils/check-for-login"
import waitForLoading from "../../../global/utils/waitForLoading"
import ConfiguratorNavbarPage from "../configuratorNavbar.page"
import assessGroupEditorPage from "./assessmentGroupEditor.page"

class AssessmentGroupsPage extends BasePage {

    $ = {
        addAssessmentGroupButton: this.page.locator('button[ng-click="onAddAssessmentGroup($event)"]'),
        searchInput: this.page.locator('input#aG'),


        getAssessGroupCard: (name: string) => {
            const parent = this.page.locator('tbody').filter({ hasText: new RegExp('/^'+name+'$/') })
            return {
                parent,
                nameLink: parent.locator('span[lang="LocaleService.content.id"]'),
                updatedText: parent.locator('span[ng-if="assessGroupsData.info[assesGroup.id]"]'),
            }
        }
    }

    async goto() {
        await this.page.goto(URLs.configurator.assessGroups)
        await checkForLogin(this.page)
    }
    
    async searchForGroup(name: string) {
        await this.$.searchInput.fill(name)
        await this.$.searchInput.press('Enter')
        await waitForLoading(this.page)
        console.log('searched for: ' + name);
    }


    async editGroup(name: string) {
        await this.searchForGroup(name)
        const groupCard = this.$.getAssessGroupCard(name)
        await groupCard.nameLink.click()
        return new assessGroupEditorPage(this.page)
    }

}

export default AssessmentGroupsPage