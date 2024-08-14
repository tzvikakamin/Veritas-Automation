import { chromium } from "@playwright/test";

async function testWebMic() {
    const browser = await chromium.launch({
        headless: false,
        args: [
            // use Chrome's fake media streams
            '--use-fake-device-for-media-stream',
            // bypasses Chrome's cam/mic permissions dialog
            '--use-fake-ui-for-media-stream',
            // pass in your own custom media
            '--use-file-for-fake-audio-capture=./audio.wav'
        ]
    });

    const context = await browser.newContext();
    await context.grantPermissions(['microphone']);
    const page = await context.newPage();

    await page.goto('https://mictests.com/');
    // await page.click('button[role="button"][name="Test my mic"]');
    // await page.waitForTimeout(400000); // Use waitForTimeout instead of time.sleep
    // await page.click('button[role="button"][name="Stop microphone"]');
    await page.pause();

    await context.close();
    await browser.close();
}

(async () => {
    await testWebMic();
})();
