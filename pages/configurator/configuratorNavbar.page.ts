import LoginPage from '../login/login.page';
import URLs from '../../URLs';
import AssessmentsPage from './assessments/assessment.page';
import SettingsTabsPage from './settings/settingsNavbar.page';
import BasePage from '../../global/base/Base.page';
import AssessmentGroupsPage from './assessment groups/assessmentGroups.page';
import OrganizationSelectPage from '../organization side/organizationSelect';
import { checkForLogin } from '../../global/utils/check-for-login';

class ConfiguratorNavbarPage extends BasePage {

    $ = {
        openOrganizationsBtn: this.page.locator(`div[ng-if="::isAllowed('orgs_view')"]`),

        dashboardLink: this.page.locator('a[data-ui-sref="home.dashboard"]'),
        assessmentsLink: this.page.locator('a[data-ui-sref="home.assessments"]'),
        parallelAssessmentsLink: this.page.locator('a[data-ui-sref="home.parallelAssessments"]'),
        assessGroupsLink: this.page.locator('a[data-ui-sref="home.assessGroups"]'),
        groupReportsLink: this.page.locator('a[data-ui-sref="home.reports"]'),
        settingsLink: this.page.locator('a[ui-sref="home.settings.users"]'),
    }


    async goto() {
        await this.page.goto(URLs.configurator.dashboard)
        await checkForLogin(this.page)
        // const login = new LoginPage(this.page);
        // await login.goto();
        // await login.login();
    }

    async openOrganizations() {
        await this.$.openOrganizationsBtn.click()
        return new OrganizationSelectPage(this.page)
    }

    async navigateToDashboard() {
        console.info('navigate to dashboard')
        await this.$.dashboardLink.click();
        await this.page.waitForURL(URLs.configurator.dashboard)
        //TODO: return new 
    }

    async navigateToAssessments() {
        console.info('navigate to assessments')
        await this.$.assessmentsLink.click();
        await this.page.waitForURL(URLs.configurator.assessments)
        return new AssessmentsPage(this.page)
    }

    async navigateToParallelAssessments() {
        await this.$.parallelAssessmentsLink.click();
        console.info('navigate to parallel assessments')
        await this.page.waitForURL(URLs.configurator.parallelAssessments)
        //TODO: return new 
    }

    async navigateToAssessGroups() {
        console.info('navigate to assess groups')
        await this.$.assessGroupsLink.click();
        await this.page.waitForURL(URLs.configurator.assessGroups)
        return new AssessmentGroupsPage(this.page)
    }

    async navigateToGroupReports() {
        console.info('navigate to group reports')
        await this.$.groupReportsLink.click();
        await this.page.waitForURL(URLs.configurator.reports)
        //TODO: return new 
    }

    async navigateToSettings() {
        console.info('navigate to settings')
        await this.$.settingsLink.click();
        await this.page.waitForURL(URLs.configurator.settings)
        return new SettingsTabsPage(this.page)
    }

}

export default ConfiguratorNavbarPage;