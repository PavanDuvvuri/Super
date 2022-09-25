import locator  from "../../core-framework/browser/locator"
import action from "../../core-framework/browser/action"
import localbrowser from '../../core-framework/browser/browser'
import { Given, When, Then } from "@wdio/cucumber-framework";

When(/^I click on "([^\"]*)\"(?:[^\"]*)?$/, async (selector) => {
    
    const element = await locator.findElement(selector, true);
    
    if (element.error !== undefined)
        expect.fail("Unable to find element : " + selector + " on screen and getting error message : "+element.error.message);
    
    await action.click(element);
    await localbrowser.waitTimeAfterPerformingAction();
    
});

When(/^I click on \"([^\"]*)\"(?:[^\"]*)? within \"([^\"]*)\"(?:[^\"]*)?$/, async (childSelector, parentSelector) => {
    const element = await locator.findChildElementInParent(parentSelector, childSelector, true);
    if (element.error !== undefined)
        expect.fail("Unable to find element : " + childSelector + " within parent element : "+parentSelector+" on screen and getting error message : "+element.error.message);
    
    await action.click(element);
    await localbrowser.waitTimeAfterPerformingAction();
});

When(/^I click on \"([^\"]*)\"(?:[^\"]*)? if elememnt \"([^\"]*)\"(?:[^\"]*) is visible$/, async (selector, conditionalSelector) => {
    
    const conditionalElement = await locator.findElement(conditionalSelector, true);

    if (conditionalElement.error !== undefined)
        expect.fail("Unable to conditional element : " + selector + " on displayed screen");
    
        const element = await locator.findElement(selector, true);
        if (element.error !== undefined)
            expect.fail("Unable to find element : " + selector + " on displayed screen");
        await action.click(element);
    
});

When(/^I click on \"([^\"]*)\"(?:[^\"]*)? if elememnt \"([^\"]*)\"(?:[^\"]*) is not visible$/, async (selector, conditionalSelector) => {
    
    const conditionalElement = await locator.findElement(conditionalSelector, false);

    if (conditionalElement.error !== undefined) {
        const element = await locator.findElement(selector, true);
        if (element.error !== undefined)
            expect.fail("Unable to find element : " + selector + " on displayed screen");
        
        await action.click(element);
    }
});