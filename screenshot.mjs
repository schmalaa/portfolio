import { chromium } from 'playwright';

(async () => {
    console.log("Launching browser...");
    const browser = await chromium.launch();
    
    console.log("Opening page...");
    const page = await browser.newPage({
        viewport: { width: 1200, height: 630 }
    });
    
    console.log("Navigating to https://alexschmaltz.com...");
    await page.goto('https://alexschmaltz.com', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log("Taking screenshot...");
    await page.screenshot({ path: 'public/og-image.jpg' });
    
    console.log("Closing browser...");
    await browser.close();
    
    console.log("Successfully saved screenshot to public/og-image.jpg");
})();
