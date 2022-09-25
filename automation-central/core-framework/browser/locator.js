import { clientSecret } from "../../constants/bet600_preprod";
import { expect } from "chai";
import localBrowser from "./browser";
import { ClassificationType } from "typescript";
import { appobjects } from "../utils/loadpageobject";


const defaultTimeout = 3000;

class Locator{
    
    // async elementFindAttempt(selector) {
    //     for (let i = 0; i < 3; i++){
    //         const element = await selector
    //         if (element.p)
    //             return element;
    //     }
        
    // }
    /**
     * locate elements
     * @param  {String}   selector   Element selector
     * @param  {Boolean}   isVisible Check for a visible or a hidden element
     * @returns {WebdriverIO.Element}
    */
    async findElements(selector, isVisible) {
        const webElement = await $(selector.replaceAll(/\'/g, "\""))
        if (webElement.error === undefined)
            if (isVisible)
                await  webElement.waitForDisplayed({ timeout: defaultTimeout })
            
        return webElement;
    }

    /**
     * locate child elements inside parent
     * @param  {String}   paSelector   parent Element selector
     * @param  {String}   chSelector   child Element selector
     * @param  {Boolean}   isVisible Check for a visible or a hidden element
     * @returns {WebdriverIO.Element}
    */
    async findElementsWithinElement(paSelector, chSelector, isVisible) {
        const parentElement = await this.findElement(paSelector, true);
        if (await parentElement.isExisting()) {
            const childElement = await $(paSelector.replaceAll(/\'/g, "\"")).$('.'+chSelector.replaceAll(/\'/g, "\""));
            if (childElement.error === undefined)
                if (isVisible) 
                    await childElement.waitForDisplayed({ timeout: defaultTimeout });
            
            return childElement;
        } else
            expect.fail("ubale to find element : "+paSelector)    
    }
    
    /**
     * locate child element inside parent
     * @param  {String}   paSelector   parent Element selector
     * @param  {String}   chSelector   child Element selector
     * @param  {Boolean}   isVisible Check for a visible or a hidden element
     * @returns {WebdriverIO.Element}
    */
    async findChildElementInParent(paSelector, chSelector, isVisible) {
        await browser.switchToParentFrame();
        paSelector = this.getSelector(paSelector);
        chSelector = this.getSelector(chSelector);
        var element = await this.findElementsWithinElement(paSelector, chSelector, isVisible);
        if (element.error !== undefined) {
            var iframes = await this.getIframeHavingContents();
            if (iframes.length > 0)
                element = await this.findElementWithinElementInsideIframe(paSelector, chSelector, isVisible);
        }
        
        return element;
    }

    /**
     * locate elements
     * @param  {String}   selector   Element selector
     * @param  {Boolean}   isVisible Check for a visible or a hidden element
     * @returns {WebdriverIO.Element}
    */
    async findElement(selector, isVisible) {
        // if (browser instanceof bs)
        await browser.switchToParentFrame();
        selector = this.getSelector(selector);
        var element = await this.findElements(selector, isVisible);
        if (element.error !== undefined ) {
            var iframes = await this.getIframeHavingContents();
            if (iframes.length > 0)
                element = await this.findElementInsideIframe(selector, isVisible);
        }
            
                
        return element;
    }

    /**
     * locate elements
     * @param  {String}   selector   Element selector
     * @returns {Object}
    */
    getSelector(selector) {
        if (selector.startsWith('//'))
            return selector;
        
        if (selector.indexOf('.') > 0) {
            var newSelector = appobjects;
            var selctorArr = selector.split('.')
            selctorArr.forEach(sel => {
                newSelector = newSelector[sel]
            });
            return newSelector;
        } else{}
            return appobjects[selector];
    }

    /**
     * locate elements inside iframe
     * @param  {String}   selector   Element selector
     * @param  {Boolean}   isVisible Check for a visible or a hidden element
     * @returns {WebdriverIO.Element}
    */
    async findElementInsideIframe(selector, isVisible) {
        var iframes = await this.getIframeHavingContents();
        if (iframes.length > 0) { 
            var element = null;
            for (const iframe of iframes) {
                await browser.switchToFrame(iframe)
                element = await this.findElements(selector, isVisible);
                if (element.error != undefined) {
                    element = await this.findElementInsideIframe(selector, isVisible);
                    if (element !== undefined && element.error !== undefined)
                        return element;
                } else
                    break;
            }
            return element;
        } else
            await browser.switchToParentFrame();
    }

    /**
     * locate child element inside parent in iframes
     * @param  {String}   paSelector   parent Element selector
     * @param  {String}   chSelector   child Element selector
     * @param  {Boolean}   isVisible Check for a visible or a hidden element
     * @returns {WebdriverIO.Element}
    */
    async findElementWithinElementInsideIframe(paSelector, chSelector, isVisible) {
        var element = null;
        var iframes = await this.getIframeHavingContents();
            
        if (iframes.length > 0) { 
            for (const iframe of iframes) {
                await browser.switchToFrame(iframe);
                element = await this.findElementsWithinElement(paSelector, chSelector, isVisible)
                if (element.error !== undefined) {
                    element = await this.findElementWithinElementInsideIframe(paSelector, chSelector, isVisible);
                    if (element !== undefined && element.error !== undefined)
                        return element;
                } else
                    break;
            }
        } else
            await browser.switchToParentFrame();
        return element;
        
    }

    /**
     * locate child element inside parent
     * @returns {WebdriverIO.Element}
    */
    async getIframeHavingContents() {
        await browser.pause(10000);
        var visibleIframe = [];
        const iframes = await $$('//iframe[not (contains(@style, "display: none") or contains(@style, "visibility: hidden;")  or (contains(@style, "width: 0px; height: 0px;")))]');
        for (const iframe of iframes) {
            if (await iframe.isDisplayed()) {
                await browser.switchToFrame(iframe);
                const frameContent = await $("//body");
                var text = (await frameContent.getText());
                if (text !== null && text !== undefined && text.trim().length != 0) {
                    visibleIframe.push(iframe);
                    await browser.switchToParentFrame();
                }
            }
        }
        return visibleIframe;
    }
}

export default new Locator();