import positionsPage from "../../pages/organization configurator side/positions/positions.page";
import browser from "../BrowserManager";


const connectPositionToOrg = async (orgName: string, positionName: string) => {

    const page = await browser.launch();

    const positionOrgConfig = new positionsPage(page)
    await positionOrgConfig.goto(orgName)

    await positionOrgConfig.search(positionName)
    await positionOrgConfig.checkPositionStatusAndConnect()

    await browser.close(page);
}


export default connectPositionToOrg