const {Builder, By, Key, until} = require('selenium-webdriver');

async function scrape(phrase) {
    let driver = await new Builder()
        .forBrowser('chrome')
        .build();
    try {
        await driver.get(`https://www.google.com/search?q=${phrase}&tbm=isch`);
        await driver.findElement(By.xpath('//*[@id="islrg"]/div[1]/div[1]/a[1]/div[1]/img')).click()
        await driver.wait(until.elementLocated(By.xpath('//*[@id="Sva75c"]/div/div/div[3]/div[2]/div/div[1]/div[1]/div/div[2]/a/img')), 10000);
        await driver.wait( async () => {
            while(true){
                const src = await driver.findElement(By.xpath('//*[@id="Sva75c"]/div/div/div[3]/div[2]/div/div[1]/div[1]/div/div[2]/a/img')).getAttribute('src')
                if(String(src).includes("data:")){
                } else {
                    return src
                }
            }
        }, 10000)
        return await driver.findElement(By.xpath('//*[@id="Sva75c"]/div/div/div[3]/div[2]/div/div[1]/div[1]/div/div[2]/a/img')).getAttribute('src')
    } catch (error){
        console.log(`ERROR: ${error.message}`)
    } finally {
        await driver.quit();
    }
    };

module.exports = scrape