import PlayerInTest from "../../pages/player/playerInTest";
import browser from "../BrowserManager";


const runPlayer = async (id: string) => {
    const page = await browser.launch();

    const player = new PlayerInTest(page, id);
    await player.goto();
    await player.run();
}

export default runPlayer;