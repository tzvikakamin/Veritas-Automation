import BasePage from '../../global/base/Base.page';
import changeToEnglish from './utils/changeToEnglish'
import ConfiguratorNavbarPage from '../configurator/configuratorNavbar.page';
import Tesseract from 'tesseract.js';
import { selectors } from '@playwright/test';
import extractTextFromImage from '../../Convert files/convertCode';
import { timeLog } from 'console';

const LOGIN_TIMEOUT = 20 * 1000 // 20 seconds

class LoginPage extends BasePage {

    $ = {
        usernameInput: this.page.locator('[name="username"]'),
        passwordInput: this.page.locator('[name="password"]'),
        loginButton: this.page.locator('.btn-login'),
        errorMessageDiv: this.page.locator('.text-error').last(),
        captchaSuccessMessage: this.page.locator('span [id="success-text"]'),

        captchaLocator: this.page.locator('[id="turnstile_widget"]'),
        captchaFrame: this.page.frameLocator('iframe'),

    }

    async goto() {
        await this.page.goto('/');
        await changeToEnglish(this.page);
    }

    private defaultUsername = process.env.CONFIGURATOR_USERNAME || ''
    private defaultPassword = process.env.CONFIGURATOR_PASSWORD || ''




    async login(username?: string, password?: string) {

        await this.$.usernameInput.click({ timeout: LOGIN_TIMEOUT })
        await this.$.usernameInput.fill(username || this.defaultUsername);

        await this.$.passwordInput.click()
        await this.$.passwordInput.fill(password || this.defaultPassword);
        


        let imageText = await this.screenShotCaptcha()
        let successLogin: boolean = false



        for (let index = 0; index < 10; index++) {
            if (imageText.includes('ccess')) {
                await this.$.loginButton.click({ timeout: LOGIN_TIMEOUT });
                successLogin = true
                break;
            } else {
                imageText = await this.screenShotCaptcha()

            }
        }
        if (!successLogin) {
            await console.log('The captcha blocked me')
            

        }

        return new ConfiguratorNavbarPage(this.page);
    }


    async screenShotCaptcha() {
        await this.$.captchaLocator.screenshot({ path: 'Convert files/screenShots/captcha.png', });
        const imagePath = 'Convert files/screenShots/captcha.png'; // הנתיב לתמונה שצולמה
        const result = await Tesseract.recognize(imagePath, 'eng',);
        const text = result.data.text;
        console.log('Extracted text:', text);
        return text
    }


}

export default LoginPage;