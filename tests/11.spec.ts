import { test, expect } from '@playwright/test'
import positionsPage from '../pages/organization configurator side/positions/positions.page'

test('1234', async ({ page }) => {
    const positions = new positionsPage(page)
    await positions.goto('0Max_Test_Org')
    await positions.search('JEFE DE AUTOMATIZACIÓN DE PROCESOS MX')
    await console.log('finish search')
    await positions.checkPositionStatusAndConnect()
    await page.waitForTimeout(1000)
    console.log('finish test successfully')

})
test('1222', async ({ page }) => {
    await page.goto("https://www.pacssee.com/direct/ezer/personal")
    // await page.pause()



    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.insertText('dudikoop@gmail.com')

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.locator('#btn_loginbyid').click()
    await page.waitForTimeout(5000)

})