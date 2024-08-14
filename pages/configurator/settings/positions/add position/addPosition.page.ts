import BasePage from "../../../../../global/base/Base.page";
import waitForSaveMessage from "../../../../../global/utils/waitForMessage";
import PositionsTab from "../positionsTab.page";

class AddPositionWindow extends BasePage {
    $ = {
        englishTextBox: this.page.locator('#create-position-1'),
        submitButton: this.page.locator('[translate="dialogs.EditPosition.btn.ok"]'),
        saveMessage: this.page.locator('[translate="notices.dataSavedSuccessfully"]'),
    }

    async goto() {
        const positionsPage = new PositionsTab(this.page);
        await positionsPage.goto();
        await positionsPage.clickAddPosition();
    }


    // basic functions ======

    // async fillEnglishPositionName(positionName: string = 'meby qa ' + Date.now()) {
    //     console.info('fill position name: ' + positionName);
    // }

    // async clickSubmitButton() {
    //     console.info('click submit button');
    // }

    // async getSaveMessage() {
    //     return 
    // }



    async addPosition(positionName?: string) {
        await this.$.englishTextBox.fill(positionName);
        await this.$.submitButton.click()

        return await waitForSaveMessage(this.page, this.$.submitButton)
    }


}

export default AddPositionWindow