import { Page } from "@playwright/test";

export default async function changeToEnglish(page: Page) {
    await page.click('.btn-login-language');
    await page.locator('li').filter({hasText: 'English'}).click();

}