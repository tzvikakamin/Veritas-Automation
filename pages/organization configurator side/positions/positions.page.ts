import { expect } from "@playwright/test";
import BasePage from "../../../global/base/Base.page";
import OrgConfiguratorSideNav from "../orgConfiguratorSideNav";
import waitForSaveMessage from "../../../global/utils/waitForMessage";
import waitForLoading from "../../../global/utils/waitForLoading";

class positionsPage extends BasePage {

    $ = {
        searchField: this.page.locator('input.input__white'),
        addBtn: this.page.locator('[ng-click="selectPosition(position)"]'),
        theVBtn: this.page.locator('span.glyphicon.glyphicon-ok.ng-scope'),
        archivedBtn: this.page.locator('span[translate-once="ac.org.positionsTab.btn.archived"]'),
        applyBtn: this.page.locator('button[ng-click="isAvailableToApply() && ok()"]'),
        beforeSelectDropDown: this.page.locator('span[ng-if="!classification.ct_amq_benchmark_position_id"]'),
        afterSelectDropDown: this.page.locator('span[ng-bind="classification.amq_benchmark_position.name"]'),
        okBtn: this.page.locator('[translate="dialogs.Ok.btn.ok"]'),


    }


    async goto(orgName: string) {
        const prevPage = new OrgConfiguratorSideNav(this.page);
        await prevPage.goto(orgName);
        await prevPage.navigateToPositionsPage();
    }
    async search(positionName: string) {
        await this.$.searchField.fill(positionName);

    }
    private async connectPositionToOrg() {
        await this.page.locator('li').filter({ hasText: 'Internal Testing' }).first().click()
        await this.$.applyBtn.click();
        await waitForSaveMessage(this.page, this.$.applyBtn)
        await this.page.waitForTimeout(3000)
        // await waitForLoading(this.page)
    }
    async checkPositionStatusAndConnect() {
        if (await this.$.archivedBtn.isVisible()) {
            await this.reconnectFromArchived();

        } else if (await this.$.addBtn.isVisible()) {
            await this.$.addBtn.click();
            await this.$.beforeSelectDropDown.click();
            
        } else if (await this.$.theVBtn.isVisible()) {
            console.log('The position is already connected ');
            return
        }

        await this.connectPositionToOrg();
    }
    private async reconnectFromArchived() {
        await this.$.archivedBtn.click()
        await this.$.okBtn.click()
        await this.$.afterSelectDropDown.click();
    }



}
export default positionsPage
