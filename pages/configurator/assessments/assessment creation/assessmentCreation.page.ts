import AssessmentsPage from "../assessment.page"
import waitForSaveMessage from "../../../../global/utils/waitForMessage"
import AssessmentEditorTabsPage from "../assessment editor/assessmentEditorTabs.page"
import BasePage from "../../../../global/base/Base.page"
import WrapperCreateNewAssessment from "./exampleWrapperCreateNewAssessment.page"
import { env } from "node:process"


export type assessmentType = 'Integrity' | 'Integrity Extended' | 'Integrity Social Engineering' | 'Intro' | 'Personality' | 'Skills' | 'Skills IGame' | 'Skills Speak'

// let assessmentType: assessmentType





class AssessmentCreationPage extends BasePage {
    assessmentName: string;

    $ = {
        assessmentNameInput: this.page.locator('#assessmentName'),
        saveButton: this.page.locator('[translate="ac.assessment.settings.btn.save"]'),
        assessmentTypeList: this.page.locator('span[ng-if="a.ct_assess_type_id"]'),
        assessmentTypeIntegrity: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Integrity' }),
        assessmentTypeIntro: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Intro' }),
        assessmentTypePersonality: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Personality' }),
        assessmentTypeSkills: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Skills' }),
        assessmentSubtypeList: this.page.locator('div[class="col-lg-3 col-md-3 ng-scope"] span[class="caret"]'),
        assessmentSubtypeExtendedScore: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Extended Score' }),
        assessmentSubtypePhishingAndSocialEngineering: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Phishing and Social engineering' }),
        assessmentSubtypeIGame: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Pragmatism' }),//Pragmatism
        assessmentSubtypeSpeak: this.page.locator('.custom-dropdown-menu__link.ng-binding').filter({ hasText: 'Spoken English assessment' }),//Spoken English assessment
        automaticContinueButton: this.page.locator('label[for="aas1"]'),
        unlimitedCorrectionsButton: this.page.locator('label[for="AUnlimited"]'),
        skippingButton: this.page.locator('label[for="ASkipping"]'),
        assessmentNamePlaceHolder: this.page.locator('h1[dr-switch-models="a.assessment_names_ml"]'),
        successMessage: this.page.locator('alert span[translate="notices.dataSavedSuccessfully"]'),
        
    }


    async goto() {
        const assessment = new AssessmentsPage(this.page)
        await assessment.goto()
        await assessment.clickAddNewAssessment()
    }

    async insertName(assessmentName: string) {
        await this.$.assessmentNameInput.fill(assessmentName);
        let name = await this.$.assessmentNameInput.inputValue();
        this.assessmentName = name;
        return this.assessmentName;

    }

    async clickSaveButton() {
        await this.$.saveButton.click()
        return new AssessmentEditorTabsPage(this.page)
    }
    async getSaveMessage() {
        return await waitForSaveMessage(this.page, this.$.saveButton)
    }

    async saveAndGetSaveMessage() {
        await this.clickSaveButton();
        await this.getSaveMessage();
    }

    async setOtherSettings() {
        await this.$.automaticContinueButton.click();
        await this.$.unlimitedCorrectionsButton.click();
        await this.$.skippingButton.click();
    }



    private async selectIntegrityAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeIntegrity.click();
    }
    private async selectIntegrityExtendedAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeIntegrity.click();
        await this.$.assessmentSubtypeList.click();
        await this.$.assessmentSubtypeExtendedScore.click();
    }
    private async selectIntegritySocialEngineeringAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeIntegrity.click();
        await this.$.assessmentSubtypeList.click();
        await this.$.assessmentSubtypePhishingAndSocialEngineering.click();
    }
    private async selectIntroAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeIntro.click();
    }
    private async selectPersonalityAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypePersonality.click();
    }
    private async selectSkillsAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeSkills.click();
    }
    private async selectSkillsIGameAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeSkills.click();
        await this.$.assessmentSubtypeList.click();
        await this.$.assessmentSubtypeIGame.click();
    }
    private async selectSkillsSpeakAssessment() {
        await this.$.assessmentTypeList.click();
        await this.$.assessmentTypeSkills.click();
        await this.$.assessmentSubtypeList.click();
        await this.$.assessmentSubtypeSpeak.click();
    }


    // if not logged in the test will be failed - todo = fix the await for...
    async createNewAssessment(assessmentType: assessmentType) {
        const assessment = new AssessmentsPage(this.page)
        const AssessmentPageUrl = 'ac/#/assessments';


        // await assessment.page.waitForURL(process.env.BASE_URL+'/ac/#/assessments',{waitUntil:"domcontentloaded"})
        // await assessment.page.waitForLoadState('domcontentloaded')
        // const [response] = await Promise.all([
        //     await assessment.page.waitForResponse(response =>
        //         response.url() === 'https://34.165.52.158/api/dicts/langs?lang=1' &&
        //         response.status() === 200
        //     ),]);
            
            const currentUrl = await this.page.url();
        if ((currentUrl.endsWith(AssessmentPageUrl)) || (await assessment.$.addAssessmentButton.isVisible())) {
            await assessment.clickAddNewAssessment()
        }

        switch (assessmentType) {
            case 'Integrity':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectIntegrityAssessment();
                await this.setOtherSettings();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName)
                break
            case 'Integrity Extended':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectIntegrityExtendedAssessment();
                await this.setOtherSettings();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            case 'Integrity Social Engineering':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectIntegritySocialEngineeringAssessment();
                await this.setOtherSettings();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            case 'Intro':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectIntroAssessment();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            case 'Personality':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectPersonalityAssessment();
                await this.setOtherSettings();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            case 'Skills':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectSkillsAssessment();
                await this.setOtherSettings();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            case 'Skills IGame':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectSkillsIGameAssessment();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            case 'Skills Speak':
                await this.insertName('QA ' + assessmentType + new Date().toLocaleString())
                await this.selectSkillsSpeakAssessment();
                await this.saveAndGetSaveMessage();
                console.log(this.assessmentName);
                break
            //Note for undefined
            default:
                console.log('undefined assessment type')
        }
    }

}

export default AssessmentCreationPage