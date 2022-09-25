import locator from "../../core-framework/browser/locator"
import action from "../../core-framework/browser/action"
import { Then } from "@wdio/cucumber-framework";
import { expect } from "chai";

Then(/^I can validate \"([^\"]*)\"(?:[^\"]*)? is present on webpage?$/, async (selector) => {
    
    const element = await locator.findElement(selector, true);
    var isVisible = element.error !== undefined ? false : (await element.isDisplayed());
    if (!isVisible) 
        expect.fail("Expected element : " + selector + " should be visible on webpage but in actual it is not visible");    
});

Then(/^I can validate \"([^\"]*)\"(?:[^\"]*)? is not present on webpage?$/, async (selector) => {
    
    const element = await locator.findElement(selector, false);
    if (element.error === undefined && (await element.isDisplayed()))
        expect.fail("Expected element : " + selector + " should not visible on webpage but in actual it is visible");
                
});

Then(/^I can validate \"([^\"]*)\"(?:[^\"]*)? is enabled on webpage?$/, async (selector) => {
    
    const element = await locator.findElement(selector, true);
    if (element === null)
        expect.fail("Expected element : " + selector + " should be visible on webpage but in actual it is not visible");
    
    expect(await element.isEnabled()).is.not.equal(true, "Expected element " + selector + " to not be enabled");
    
});

Then(/^I can validate \"([^\"]*)\"(?:[^\"]*)? is not enabled on webpage?$/, async (selector) => {
    
    const element = await locator.findElement(selector, false);
    if (element !== null && element.isDisplayed())
        expect.fail("Expected element : " + selector + " should not visible on webpage but in actual it is visible");
    
    expect(await element.isEnabled()).to.equal(true, "Expected element "+selector+" to be enabled");
});

Then(/^I can validate \"([^\"]*)\"(?:[^\"]*)? is selected on webpage?$/, async (selector) => {
    
    const element = await locator.findElement(selector, true);
    if (element === null)
        expect.fail("Expected element : " + selector + " should be visible on webpage but in actual it is not visible");
    
    expect(await element.isSelected()).is.not.equal(true, "Expected element " + selector + " to not be selected");
    
});

Then(/^I can validate \"([^\"]*)\"(?:[^\"]*)? is not selected on webpage?$/, async (selector) => {
    
    const element = await locator.findElement(selector, false);
    if (element !== null && element.isDisplayed())
        expect.fail("Expected element : " + selector + " should not visible on webpage but in actual it is visible");
    
    expect(await element.isSelected()).to.equal(true, "Expected element "+selector+" to be selected");
});

Then(/^I can validate visibility of element on webpage?$/, async (dataTable) => {

    var data = dataTable.raw();
    for (let index = 0; index < data.length; index++) {
        var selector = data[index][0].replaceAll(/\"/g, "");
        const element = await locator.findElement(selector, true);
        var isVisible = element.error !== undefined ? false : (await element.isDisplayed());
        if (!isVisible) 
            expect.fail("Expected element : " + selector + " should be visible on webpage but in actual it is not visible");  
        
    }
    
});