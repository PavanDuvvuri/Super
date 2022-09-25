import locator from "./locator";
import logger from "@wdio/logger";
import { expect } from "chai";
const log = logger("Action")
const default_timeout = 3000;

class Action{

    /**
     * Element attribute value
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @param  {String}  attrName element attribute name
    */
    async getElementAttributeValue(selector, attrName) {
        const attrValue = await selector.getElementAttribute(attrName); 
        return attrValue == undefined ? null : attrValue; 
    }

    // /**
    //  * Element Displayed or Not
    //  * @param  {WebdriverIO.Element}   selector   Element selector
    //  * @returns {Boolean}
    // */
    // async isElementDisplayed(selector) {
    //     try {
    //         await selector.waitForDisplayed({ timeout: default_timeout });
    //     } catch (error) { 
    //         log.error(error)
    //     }
    //     return await selector.isDisplayed();
    // }

    /**
     * Element Enable or Not
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @param  {Boolean}    isEnable 
     * @returns {Boolean}
    */
    async isElementEnabled(selector, isEnable) {
        try {
            if (isEnable)
                await selector.waitForEnabled({ timeout: default_timeout });
        } catch (error) { 
            log.error(error)
        }
        return await selector.isEnabled();
    }

    /**
     * Element Selected or Not
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @returns {Boolean}
    */
    async checkElementSelected(selector) {
        return await selector.isSelected();
    }

    /**
     * type text in textboxes
     * @param  {WebdriverIO.Element}   selector   parent Element selector
     * @param  {String}   value   child Element selector
    */
    async type(selector, value) {
        if (this.isElementEnabled(selector, true)) {
            await selector.clearValue();
            await selector.setValue(value)
        } else
            expect.fail("Web element " + selector.getHTML() + " is not enabled");
            
    }

    /**
     * Element clickable or Not
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @param  {Boolean}        clickFlag
     * @returns {Boolean}
    */
    async isElementClickable(selector, clickFlag) {
        if (clickFlag)
            try {
                await selector.waitForClickable({timeout : 3000})
            } catch (error) {
                log.error(error);
            }
        return await selector.isClickable();        
    }

    /**
     * Element click
     * @param  {WebdriverIO.Element}   selector   Element selector
    */
    async click(selector) {
        if (await this.isElementClickable(selector, true)) {
            return await selector.click();
        } else
            // expect.fail("Web element " + selector.getHTML() + "is not clickable");
        console.error("enable to click on element");
    }

    /**
     * Element double
     * @param  {WebdriverIO.Element}   selector   Element selector
    */
    async doubleClick(selector) {
        if (this.isElementClickable(selector)) {
            return (await selector.doubleClick()).then(() => { }).catch(() => {
                expect.fail("Web element " + selector.getHTML() + " is not double clicked");
            });
        } else
            expect.fail("Web element " + selector.getHTML() + " is not clickable");
        console.error("enable to click on element");
    }
    
    /**
     * select checkbox
     * @param  {WebdriverIO.Element}   selector   Element selector
    */
    async selectCheckBox(selector) {
        if (!this.checkElementSelected(selector)) 
            this.click(selector);
    }

    /**
     * select from dropdown by visible option
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @param  {String}   text   Element selector
    */
    async selectByVisibleText(selector, text) {
        return (await selector.selectByVisibleText(text)).then(() => { }).catch((error) => {
            log.error(error);
            expect.fail("Unable to select alement using visible text "+text+" on Web element " + selector.getHTML());
        })
    }

    /**
     * select from dropdown by index option
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @param  {Number}   index   Element selector
    */
    async selectByIndex(selector, index) {
        return (await selector.selectByIndex(index)).then(() => { }).catch((error) => {
            log.error(error);
            expect.fail("Unable to select alement using index "+index+" on Web element " + selector.getHTML());
        })
    }

    /**
     * select from dropdown by attribute option
     * @param  {WebdriverIO.Element}   selector   Element selector
     * @param  {String}   attrValue   attribute value
     * @param  {String}   value   value
    */
    async selectByAttribute(selector, attrValue, value) {
        return (await selector.selectByAttribute(attrValue, value)).then(() => { }).catch((error) => {
            log.error(error);
            expect.fail("Unable to select alement using attribute value "+attrValue+" on Web element " + selector.getHTML());
        })
    }

    /**
     * get visibletext from specific element
    */
    async getElementText(selector) {
        const text = await selector.getText(); 
        return text == undefined ? null : text; 
    }

    async getPageTitle() {
        const text = await browser.getTitle(); 
        return text == undefined ? null : text; 
    }
}

export default new Action();