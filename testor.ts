import { chromium } from '@playwright/test'
import ConfiguratorNavbarPage from './pages/configurator/configuratorNavbar.page'

(async function test() {
    //! try to use your one chrome profile
    // const browser = await chromium.launchPersistentContext(
    //     'C:\\Users\\Mosheli\\AppData\\Local\\Google\\Chrome\\User Data',
    //     { headless: false })
    // const page = await browser.newPage()

    // await page.goto('https://www.youtube.com/')
    // await page.locator('#video-title-link').first().click()
    //     console.log('done');

    // await page.waitForTimeout(100000)
    // console.log('');

}())
