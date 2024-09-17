import BasePage from '../../global/base/Base.page';
import OrgNavbarPage from './OrgNavbar.page';
import waitForLoading from '../../global/utils/waitForLoading';

class AddCandidatePage extends BasePage {

    $ = {
        // positions
        addPositionButton: this.page.locator('button[ng-click="openAddPositionsModal()"]'),
        positionItem: this.page.locator('li.positionItem'),
        searchPositionInput: this.page.locator('input[ng-model="search"]'),
        
        findPosition: async (positionName: string) => {
            await this.$.searchPositionInput.fill(positionName)
            return this.$.positionItem.filter({ hasText: positionName })
        },
        positionsDoneButton: this.page.locator('button[ng-click="ok()"]'),

        // candidate info
        idInput: this.page.locator('input[ng-model="candidate.id_value"]'),
        firstNameInput: this.page.locator('input#firstName'),
        lastNameInput: this.page.locator('input#lastName'),
        genderMaleRadioButton: this.page.locator('label[for="male_radio_btn"]'),
        genderFemaleRadioButton: this.page.locator('label[for="female_radio_btn"]'),

        // mass upload 
         massUploadBTN:this.page.locator('.icon.open-true'),
         importFromFileBTN:this.page.locator('#massImportFile'),

        // save
        cameraNotRequiredCheckbox: this.page.locator('label[for="cameraUseNotRequired"]'),
        addButton: this.page.locator('button[ng-click="save()"]'),
        successMessage: this.page.locator('alert span[translate="notices.dataSavedSuccessfully"]'),
    }

    async goto(organizationName: string) {
        const prevPage = new OrgNavbarPage(this.page)
        await prevPage.goto(organizationName)
        await prevPage.$.addCandidateLink.click()
    }


    async addPosition(positionName: string) {
        await this.$.addPositionButton.click(); // open positions modal
        const pos = await this.$.findPosition(positionName); // click on the position
        await pos.click()
        await this.$.positionsDoneButton.click(); // close positions modal
    }


    async fillAndCheckId(id: string) {
        await this.$.idInput.fill(id)
        await this.page.keyboard.press('Enter')

        await this.page.waitForTimeout(1000)
        await waitForLoading(this.page)

        const disabled = await this.$.idInput.getAttribute('disabled')

        if (disabled === 'disabled') { // candidate with such id already exists
            await this.page.goBack()
            await this.page.waitForTimeout(1000)
            await waitForLoading(this.page)

            return false
        }

        return true

    }


    async fillCandidateInfo(firstName: string, lastName: string, gender: 'male' | 'female') {
        await this.$.firstNameInput.fill(firstName)
        await this.$.lastNameInput.fill(lastName)
        if (gender === 'male') {
            await this.$.genderMaleRadioButton.click()
        } else {
            await this.$.genderFemaleRadioButton.click()
        }
    }

    async massUpload() {
        await this.$.massUploadBTN.click()
    
        // await this.$.importFromFileBTN.setInputFiles()

        // await this.$.lastNameInput.fill(lastName)
        // if (gender === 'male') {
        //     await this.$.genderMaleRadioButton.click()
        // } else {
        //     await this.$.genderFemaleRadioButton.click()
        // }
    }


    async save() {
        if (await this.$.cameraNotRequiredCheckbox.isVisible()) {
            await this.$.cameraNotRequiredCheckbox.check()     
        }
        await this.$.addButton.click()
    }

}




export function generateRandomNumbers(): number {
   
    return Math.floor(Math.random() * 900000) + 100000;
}
const randomSixNumbers = generateRandomNumbers();
console.log(randomSixNumbers);

export default AddCandidatePage
 