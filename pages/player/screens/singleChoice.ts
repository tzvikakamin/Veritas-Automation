import clickNext from "./clickNext"
import requireTextInQuestion from "./requireTextInQuestion"
import ScreenInterface from "./screenInterface"


const singleChoice: ScreenInterface = {
    name:'singleChoice',
    
    getLocator(page) {
        return page.locator('app-answer-text-position')
    },

    async handler(page) {
        await requireTextInQuestion(page)

        const answer = singleChoice.getLocator(page).first()

        console.log('❕select answer:')
        console.log((await answer.innerText()).split('').reverse().join(''))// fix hebrew ltr
        
        await answer.click({ timeout: 1000 })
        await clickNext.handler(page)
    },
}

export default singleChoice