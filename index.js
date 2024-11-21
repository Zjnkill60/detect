const { chromium } = require('playwright');
const TelegramBot = require("node-telegram-bot-api");


(async () => {
    const bot = new TelegramBot("7667874339:AAGHgXu0NSMaiEgSMQefhBkd9S0x2q5gW8Y", {
        polling: true,   
    });

    const browser = await chromium.launchPersistentContext("C:\\Users\\zjnki\\Desktop\\duong\\profile", {
        headless: false, // Set to true if you don't want to see the browser UI
    });
    
    let numberRuntime = 0;
    
    const pages =  browser.pages()
    const page = pages[0]
    await page.goto("https://clients.weedit-realestate.com/")  

    while(true) {
        const button =  page.locator('xpath=/html/body/div[1]/div[2]/div/div/div[2]/div[1]/div/div/form/div[4]/button');
        const text = await button.textContent()
        console.log(`${text} number : ${numberRuntime}\n----------------------`);
        if(text.toLocaleUpperCase().includes("YES")) {
            await button.click()
            await bot.sendMessage(1056814691, "detect new job !");
            break
        }
        await new Promise(r => setTimeout(r , 100))
        numberRuntime++
    }
})()