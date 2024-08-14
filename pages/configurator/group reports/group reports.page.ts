import { Locator, Page,} from "@playwright/test";
import BasePage from "../../../global/base/Base.page";
import ConfiguratorNavbarPage from "../configuratorNavbar.page";
import URLs from "../../../URLs";
import { checkForLogin } from "../../../global/utils/check-for-login";

class GroupReportsPage extends BasePage {

    $ = {
        Answers_aggregated_count_and_percentage : this.page.locator('css= body > div._veritas > section.main-content > div > div > div.nano-content > div > div > div > section > div > div > div.metric-type.position-relative > div > div:nth-child(1) > div > label'),
        Personality_answers_distribution : this.page.locator('css=body > div._veritas > section.main-content > div > div > div.nano-content > div > div > div > section > div > div > div.metric-type.position-relative > div > div:nth-child(3) > div > label')

    }
    
    async goto() {
        await this.page.goto(URLs.configurator.reports)
        await checkForLogin(this.page)
    }
    
}
export default GroupReportsPage