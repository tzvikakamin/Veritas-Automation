import clickNext from "./clickNext"
import requireTextInQuestion from "./requireTextInQuestion"
import ScreenInterface from "./screenInterface"
import { Page } from "@playwright/test"


const freeTextScreen: ScreenInterface = {
    name: 'freeText',
    getLocator(page) {
        return page.locator('textarea[answertype="freetext"]')
    },

    async handler(page: Page) {
        await requireTextInQuestion(page)

        const answerText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit mollitia in doloribus laudantium eligendi non, amet odio rem. Eligendi soluta culpa enim veritatis dolore maiores! Ipsum saepe facilis libero earum!
        Harum, dolores quas inventore nostrum, quo voluptatibus quod magni aliquid eveniet atque aperiam animi totam tempora? Non quisquam molestias vero autem, voluptates dolorem maxime voluptatem eum dolores molestiae impedit nihil.
        Antiumd accusamus fugiat sint deserunt et eius, nisi, voluptates sapiente dolore minus voluptatem nulla tenetur praesentium corporis repellat soluta laborum ficiis ad nam cum doloremque cupiditate. Nihil tempora quia quos rem provident lorem! Labore accusamus quibusdam error aspernatur excepturi doloribus perspiciatis 
        `
        const textarea = freeTextScreen.getLocator(page)
        await textarea.click({ timeout: 1000 })
        await page.keyboard.type(answerText)
        await clickNext.handler(page)
    },
}


export default freeTextScreen