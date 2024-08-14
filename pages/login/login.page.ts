import BasePage from '../../global/base/Base.page';
import changeToEnglish from './utils/changeToEnglish'
import ConfiguratorNavbarPage from '../configurator/configuratorNavbar.page';
import { selectors } from '@playwright/test';

const LOGIN_TIMEOUT = 20 * 1000 // 20 seconds

class LoginPage extends BasePage {

    $ = {
        usernameInput: this.page.locator('[name="username"]'),
        passwordInput: this.page.locator('[name="password"]'),
        loginButton: this.page.locator('.btn-login'),
        errorMessageDiv: this.page.locator('.text-error').last(),
        captchaSuccessMessage: this.page.locator('span [id="success-text"]'),



        // captchaFrame:  this.page.frameLocator('iframe'),

    }

    async goto() {
        await this.page.goto('/');
        await changeToEnglish(this.page);
    }

    private defaultUsername = process.env.CONFIGURATOR_USERNAME || ''
    private defaultPassword = process.env.CONFIGURATOR_PASSWORD || ''



    async login(username?: string, password?: string) {
        // const a = this.$.captchaFrame
        // await a.getByText('Success!').waitFor({state:'visible'})
        await this.$.usernameInput.click({ timeout: LOGIN_TIMEOUT })
        await this.$.usernameInput.fill(username || this.defaultUsername);

        await this.$.passwordInput.click()
        await this.$.passwordInput.fill(password || this.defaultPassword);
        await this.$.loginButton.click({ timeout: LOGIN_TIMEOUT })

        return new ConfiguratorNavbarPage(this.page);
    }

}

export default LoginPage;