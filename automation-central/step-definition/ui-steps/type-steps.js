import locator from "../../core-framework/browser/locator"
import action from "../../core-framework/browser/action"
import { Given, When, Then } from "@wdio/cucumber-framework";

When(/^I type \"([^\"]*)\" into \"([^\"]*)\"(?:[^\\\"]*)?$/, async (value, selector) => {
    
    const element = await locator.findElement(selector, true);
    if (element.error !== undefined)
        expect.fail("Unable to find element : " + selector + " on displayed screen");
    
    await action.type(element, value)
});

When(/^I type \"([^\"]*)\" into \"([^\"]*)\"(?:[^\\\"]*)? within \"([^\"]*)\"(?:[^\"]*)?$/, async (value, childElement, parentElement) => {
    
    const element = await locator.findElementsWithinElement(parentElement, childElement, true);
    if (element.error !== undefined)
        expect.fail("Unable to find element : " + childElement + " within parent element : "+parentElement+" on displayed screen");
    
    await action.type(element, value);
});

When(/^I type \"([^\"]*)\" into \"([^\"]*)\"(?:[^\\\"]*)? if elememnt \"([^\"]*)\"(?:[^\"]*) is visible$/, async (value, selector, conditionalSelector) => {
    
    const conditionalElement = await locator.findElement(conditionalSelector, true);

    if (conditionalElement.error !== undefined) {
        const element = await locator.findElement(selector, true);
        if (element.error !== undefined)
            expect.fail("Unable to find element : " + selector + " on displayed screen");
        await action.type(element, value)
    }
});

When(/^I type \"([^\"]*)\" into \"([^\"]*)\"(?:[^\\\"]*)? if elememnt \"([^\"]*)\"(?:[^\"]*) is not visible$/, async (value, selector, conditionalSelector) => {
    
    const conditionalElement = await locator.findElement(conditionalSelector, true);

    if (conditionalElement.error === undefined) {
        const element = await locator.findElement(selector, true);
        if (element.error !== undefined)
            expect.fail("Unable to find element : " + selector + " on displayed screen");
        await action.type(element, value);
    }
});