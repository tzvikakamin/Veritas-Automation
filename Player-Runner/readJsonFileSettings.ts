import { configDotenv } from 'dotenv'
import * as fsp from 'fs/promises'
const prompt = require('prompt-sync')();

configDotenv();
const jsonFileName = 'Player-Runner-Settings.json'

interface Settings {
    // לעזור לך בזיהוי קבצי הגדרות שונים'
    NAME: string,
    // דומיין של הכתובת של השרת
    BASE_URL: string,
    // שם משתמש וסיסמה לקונפיגורטור
    CONFIGURATOR_USERNAME: string,
    CONFIGURATOR_PASSWORD: string,
    // שם משתמש וסיסמה לפלייר
    PLAYER_USERNAME: string,
    PLAYER_PASSWORD: string,
    // שם ארגון ומשרה ברירת  מחדל
    ORGANIZATION_NAME: string,
    POSITION_NAME: string,
}



async function readJsonFile() {
    try {
        const rawData = await fsp.readFile(jsonFileName, { encoding: 'utf8' })
        const data: Settings = JSON.parse(rawData)

        process.env.BASE_URL = data.BASE_URL
        process.env.CONFIGURATOR_USERNAME = data.CONFIGURATOR_USERNAME
        process.env.CONFIGURATOR_PASSWORD = data.CONFIGURATOR_PASSWORD
        process.env.PLAYER_USERNAME = data.PLAYER_USERNAME
        process.env.PLAYER_PASSWORD = data.PLAYER_PASSWORD
        process.env.ORGANIZATION_NAME = data.ORGANIZATION_NAME
        process.env.POSITION_NAME = data.POSITION_NAME

        return data


    } catch (err) {

        console.log(`============================================`);
        console.log(`can not read ${jsonFileName} file`);
        await waitForTimeout(1000)
        console.log('creating new settings file...');
        await createJsonSettingsFile()

        await waitForTimeout(2000)
        console.log('created successfully!');
        await waitForTimeout(1000)
        console.log(`please edit ${jsonFileName} file and save it`);
        console.log('and run this script again');
        console.log(`============================================`);

        prompt('press enter to close')
        process.exit(1)
    }
}

async function createJsonSettingsFile() {
    const data = {
        NAME: '',
        BASE_URL: '',

        CONFIGURATOR_USERNAME: '',
        CONFIGURATOR_PASSWORD: '',

        PLAYER_USERNAME: '',
        PLAYER_PASSWORD: '',

        ORGANIZATION_NAME: '',
        POSITION_NAME: '',
    }
    const json = JSON.stringify(data, null, 2)
    await fsp.writeFile(jsonFileName, json, { encoding: 'utf8' })
}

// createJsonSettingsFile()
// readJsonFile()

async function waitForTimeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default readJsonFile