const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;

Then('I call the Get Customer API', async function () {
    console.log(loadConstants.token);
    var getCustomerFormData = {
        access_token: loadConstants.token,
        details: true,
        metadata: true,
        lastBets: 1,
        betDetails: true,
        betBoostConfig: true,
        platformConfig: true,
        productGroupRef: 'SPORTSBOOK'
    }
    responseData = await restManager.getCallWithFormdata('/customer.json', getCustomerFormData);
    console.log(responseData.text);

});

Then('check the get customer response details', function () {
    assert.typeOf(responseData.body.response.customer.platformConfig.type, 'string');
    assert.typeOf(responseData.body.response.customer.firstName, 'string');
    assert.typeOf(responseData.body.response.customer.lastName, 'string');
    assert.typeOf(responseData.body.response.customer.cashOutBetsSummary.bets, 'number');
    assert.typeOf(responseData.body.response.customer.betBoostConfig.isActive, 'boolean');
    console.log(responseData.body.response.customer.betBoostConfig.maxAwardsPerDay, 'number');
});

After(function () {
    jsonAssertion.softAssertAll();
});