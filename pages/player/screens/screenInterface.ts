import { Locator, Page } from "@playwright/test"

interface ScreenInterface {
    name: string
    getLocator: (page: Page) => Locator,
    handler: (page: Page) => Promise<void>
}

export default ScreenInterface