import { Page, chromium, defineConfig } from "@playwright/test";


async function launchBrowser() {


    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome',
        args: ['--start-maximized'],
        // slowMo: 500
    });
    const context = await browser.newContext({
        baseURL: process.env.BASE_URL || 'https://34.165.121.223', ignoreHTTPSErrors: true, viewport: null
    });

    context.setDefaultTimeout(0)

    return await context.newPage();
}

async function closeBrowser(page: Page) {
    await page.context().browser().close();
}




const browser = {
    launch: launchBrowser,
    close: closeBrowser
}

export default browser