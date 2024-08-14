import { Page } from "@playwright/test"
import ScreenInterface from "./screenInterface"

const cameraQuestion: ScreenInterface = {
    name: 'camera-question',
    getLocator: (page: Page) => page.locator('video.visible-camera-view'),
    handler: async (page: Page) => { 
        console.log('waiting for camera...');
        await page.waitForTimeout(1000*10)
    }
}

export default cameraQuestion