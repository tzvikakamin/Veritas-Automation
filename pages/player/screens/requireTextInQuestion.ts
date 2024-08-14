import { Page } from "@playwright/test";
import questionScreen from "./question";

async function requireTextInQuestion(page: Page) {
    
    let text = await questionScreen.getLocator(page).textContent()
    let counter = 0;
    
    console.log('text: ' + text);
    while (text == '' && counter <= 5) {
        await page.waitForTimeout(1000*2)

        console.log('waiting for text...' + counter + 'times'); ;
        counter++
        text = await questionScreen.getLocator(page).textContent()
    }
    
    if (counter > 5) {
        console.log('error - text not found');
        await page.pause()
    }

}

export default requireTextInQuestion