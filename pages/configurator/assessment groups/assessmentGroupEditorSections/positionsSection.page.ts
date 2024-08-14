import BasePage from "../../../../global/base/Base.page"

class PositionInGroupEditorPage extends BasePage {

    private $dialogContainer = this.page.locator('div.modal-dialog')
    $ = {
        positionContainer: this.page.locator('div[ui-view="positions"]'),
        positionAttachedListItem: this.page.locator(`span[ng-repeat="position in group.ag_positions | orderBy:'id'"]`),
        addPositionButton: this.page.locator('span[ng-click="onAddPosition()"]'),

        // dialog
        searchInput: this.$dialogContainer.locator('input[ng-model="search.name"]'),
        okButton: this.$dialogContainer.locator('button[translate="ok"]'),
        cancelButton: this.$dialogContainer.locator('button[translate="cancel"]'),

        getPositionItem: (positionName: string) => {
            const thisParent = this.$dialogContainer.locator('li.zz-checked-list-item').filter({ hasText: positionName }).first();
            return {
                ItemContainer: thisParent,
                // VSign: thisParent.locator('li.active'),
                AttachedToAnotherGroup: thisParent.locator('div.attached-red'),
            }
        }

    }


    async add(positionName: string) {
        await this.$.addPositionButton.click()
        await this.$.searchInput.fill(positionName)
        const positionItem = this.$.getPositionItem(positionName)

        await positionItem.ItemContainer.waitFor({ state: 'attached' })

        // const isActive: boolean = await positionItem.ItemContainer.evaluate(e => e.classList.contains('active'))
        const isActive: boolean = (await positionItem.ItemContainer.getAttribute('class')).includes('active')
        //todo check if it's working

        if (isActive) {
            console.log('is already attached to this group');

        } else if (await positionItem.AttachedToAnotherGroup.isVisible()) {
            console.log('is already attached to another group');

        } else {
            await positionItem.ItemContainer.click();
            console.log('added position: ' + positionName);
        }
        await this.$.okButton.click();
    }

    async remove(positionName: string) {
        // const pos = await this.$.positionAttachedListItem.filter({ hasText: positionName })


        //TODO
    }
}


export default PositionInGroupEditorPage