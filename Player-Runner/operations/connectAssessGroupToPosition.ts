import assessGroupEditorPage from "../../pages/configurator/assessment groups/assessmentGroupEditor.page";
import PositionsTab from "../../pages/configurator/settings/positions/positionsTab.page";
import browser from "../BrowserManager";


const connectAssessGroupToPosition = async (positionName: string, groupName: string) => {

    const page = await browser.launch();
    const position = new PositionsTab(page)
    const assessGroupEditor = new assessGroupEditorPage(page)
    
    await position.goto()
    await position.addPosition(positionName)
    
    await page.context().clearCookies()

    await assessGroupEditor.goto(groupName)
    await assessGroupEditor.positions.add(positionName)
    await assessGroupEditor.saveChanges()

    await browser.close(page);
}


export default connectAssessGroupToPosition