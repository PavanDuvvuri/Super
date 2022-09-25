import logger from "@wdio/logger";
const log = logger('Browser');
const envCons = require('../utils/loadconstants').default;
const wait_time_before_action = 1000;
class Browser{

    async launchUrl(){
        const url = envCons.uiUrl
        //const url = 'https://betgoodwin:B3tG00Dwin!*@betgoodwin.qa.fsbtech.com/sportsbook/';
        //const url = 'https://szrt-uat1:gMeeER4YMB%5MJ!6T7mu@szrtsk-uat.dev.fsbtech.com/live-bet/';

        return await browser.url(url).then(async function(){
            await browser.maximizeWindow();
            await browser.pause(10000);
            log.info("Loading url : "+url);
        }, function (err) {
            log.error("Failed in loading the url : "+url+" : Error : "+err)
        })
    }

    async waitTimeAfterPerformingAction() {
        await browser.pause(wait_time_before_action);
    }

    // async loginPopup(){
    //     const alert = browser.alert;
    //     browser.se
    // }

}

export default new Browser();