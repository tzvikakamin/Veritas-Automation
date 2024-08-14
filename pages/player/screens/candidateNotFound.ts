import ScreenInterface from "./screenInterface";

const candidateNotFoundScreen: ScreenInterface = {
    name: '❌Error: Candidate Not Found',
    getLocator: (page) => page.locator('div.error-text'),
    handler: async (page) => {
        page.close()
    }
}

export default candidateNotFoundScreen