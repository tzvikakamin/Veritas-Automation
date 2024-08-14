import PositionsTab from "../positionsTab.page";
// import waitForLoading from "../../../../../global/utils/waitForLoading";
import BasePage from "../../../../../global/base/Base.page";

class PositionListSection extends BasePage {

    $ = {
        searchInput: this.page.locator('#table-search'),
        listItemsName: this.page.locator('td:nth-child(2)'),
        listItemsDeleteButton: this.page.locator('.icon-trash'),
        deleteConfirmButton: this.page.locator('.button.button-blue__light.ng-scope'),
        deleteConfirmMessage: this.page.locator('alert[type="success"]'),
        nextButton: this.page.locator('.ng-binding[ng-click="selectPage(page + 1, $event)"]'),
    }

    async goto() {
        new PositionsTab(this.page).goto()
    }

    async searchForPosition(positionName: string) {
        console.info('Search for position: ' + positionName)

        await this.$.searchInput.fill(positionName);
        await this.$.searchInput.press('Enter');
    }

    // async editPosition(positionName: string, newPositionName: string) {
        // TODO: implement
    // }

    async deletePosition(positionName: string) {
        console.info('delete position: ' + positionName)
        const positionItem = this.$.listItemsName
        
        await this.searchForPosition(positionName)

        if (await positionItem.count() === 0) { return }


        const name = await positionItem.first().textContent()
        if (name?.trim() !== positionName) { return }

        await this.$.listItemsDeleteButton.first().click()
        await this.$.deleteConfirmButton.click()

        console.info('wait for delete message')
        await this.$.deleteConfirmMessage.waitFor()

    }

    // async deleteAllMebyPosition() {
    //     const meby = 'meby'

    //     console.info("-delete all meby's position")
    //     const positionItem = this.page.locator(POSITION_LIST_LOCATORS.LIST_ITEMS_NAME)

    //     await this.searchForPosition(meby)

    //     await waitForLoading(this.page)

    //     if (await positionItem.count() === 0) { return }

    //     const name = await positionItem.first().textContent()
    //     if (name?.trim().split(' ')[0] !== meby) { return }

    //     await this.page.locator(POSITION_LIST_LOCATORS.LIST_ITEMS_DELETE_BUTTON).first().click()
    //     await this.page.click(POSITION_LIST_LOCATORS.DELETE_CONFIRM_BUTTON)

    //     console.info('wait for delete message')
    //     await this.page.waitForSelector(POSITION_LIST_LOCATORS.DELETE_CONFIRM_MESSAGE)


    //     await this.page.reload()
    //     await this.deleteAllMebyPosition()
    // }
}

export default PositionListSection