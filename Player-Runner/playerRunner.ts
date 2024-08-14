import { configDotenv } from "dotenv";
import readJsonFile from "./readJsonFileSettings";
import printLogo from "./printLogo";
import printWelcome from "./printWelcome";
import serverUp, { port } from "./html menu server/server";
import browser from "./BrowserManager";

import addCandidate from "./operations/addCandidate";
import runPlayer from "./operations/runPlayer";
import connectPositionToOrg from "./operations/connectPositionToOrg";
import connectAssessGroupToPosition from "./operations/connectAssessGroupToPosition";
import fullScreen from "../global/utils/fullscreen";

import * as readLine from 'readline/promises';
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

const prompt = require('prompt-sync')();
configDotenv();


main()
async function main() {
    printLogo();
    try {
        // await runTerminal();
        await runUi();
    }
    catch (e) {
        console.log(e)
        await new Promise<void>((res) => setTimeout(() => { res() }, 5000)) // 5 seconds
        process.exit(1)
    }
}


async function runTerminal() {

    const userChoice = printWelcome()

    let id: string = generateId()

    switch (userChoice) {

        case '1': // run player 
            id = prompt('enter id: ');
            break;

        case '2': // add candidate
            const defaults = {
                orgName: process.env.ORGANIZATION_NAME,
                posName: process.env.POSITION_NAME,
            }
            const orgName = prompt(`enter customer name: (default is "${defaults.orgName}") `) || defaults.orgName
            const posName = prompt(`enter position name: (default is "${defaults.posName}") `) || defaults.posName

            await addCandidate(id, orgName, posName);
            break;

        default:
            console.log('invalid choice')
            console.log('closing...');
            await new Promise<void>((res) => setTimeout(() => { res() }, 3000)) // 3 seconds 
            process.exit(1)



    }

    await runPlayer(id)
}



async function runUi() {
    const data = await readJsonFile();

    const page = await browser.launch()
    page.goto(`http://localhost:${port}`)

    // start server and navigate to index.html
    const a = await serverUp(data.ORGANIZATION_NAME, data.POSITION_NAME);


    // await fullScreen.enter(page)
    // const a = await rl.question('enter: ')
    console.log('a', a);



    // const input = page.locator('input').first()
    // await page.addLocatorHandler(input, async () => {
    // await input.dispatchEvent('change')
    //     await page.$$eval('input', (els, env) => {
    //         els.forEach((el) => {
    //             if (el.className == 'changed') return
    //             el.value = env[el.id] || ''
    //             var event = new Event('change', { bubbles: true });
    //             el.dispatchEvent(event);
    //             el.className = 'changed'
    //         })
    //     }, process.env)

    // })


    // wait for results 
    const resultsLocator = page.locator('#results')
    // await resultsLocator.click()
    const textResults = await resultsLocator.innerText()
    const results: resultsType = JSON.parse(textResults)
    console.log(results)

    // leave a message on the page
    // await resultsLocator.evaluate(e => {
    //     e.textContent = 'Thank you. The information sent to Meby-Bot'
    // })


    // close the browser
    await page.waitForTimeout(2500)
    await browser.close(page)



    // run the selected operation
    const operation = Number(results.operation)
    let { id, ORGANIZATION_NAME, POSITION_NAME, GROUP_NAME } = results

    id = id || generateId()
    let position = GROUP_NAME ? id : POSITION_NAME || id // if group name is provided, position name is ignored

    switch (operation) {

        case 4:
            console.log('connecting assess group to position...');
            await connectAssessGroupToPosition(position, results.GROUP_NAME)
            console.log('done!');


        case 3:
            console.log('connecting position to organization...');
            await connectPositionToOrg(results.ORGANIZATION_NAME, position)
            console.log('done!');

        case 2:
            console.log('adding candidate...');
            await addCandidate(id, results.ORGANIZATION_NAME, position)
            console.log('done!');

        case 1:
            console.log('running player...');
            await runPlayer(id)
            console.log('running player...done!');
            break

        default:
            // console.log('invalid choice')
            console.log('closing...');
            await new Promise<void>((res) => setTimeout(() => { res() }, 3000)) // 3 seconds 
            process.exit(1)
    }
}


//===utils===
function generateId() {
    return 'Meby-Bot ' + new Date().toLocaleString()
}

type resultsType = {
    operation: string
    id: string
    ORGANIZATION_NAME: string
    POSITION_NAME: string
    GROUP_NAME: string
}