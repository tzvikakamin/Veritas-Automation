import { Page } from "@playwright/test"
import BasePage from "../../../global/base/Base.page"
import AssessGroupsPage from "./assessmentGroups.page"
import PositionInGroupEditorPage from "./assessmentGroupEditorSections/positionsSection.page"
import waitForSaveMessage from "../../../global/utils/waitForMessage"

class assessGroupEditorPage extends BasePage {

    positions = new PositionInGroupEditorPage(this.page)
    $ = {
        saveButton:this.page.locator('button[translate="ac.assessmentGroups.btn.save"]').first(),
    }


    async goto(groupName: string) {
        const prevPage = new AssessGroupsPage(this.page)
        await prevPage.goto()
        await prevPage.editGroup(groupName)
    }

    async saveChanges() {
        await this.$.saveButton.click()
        await waitForSaveMessage(this.page, this.$.saveButton)
    }


}

export default assessGroupEditorPage