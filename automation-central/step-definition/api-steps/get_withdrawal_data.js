const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants').default
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;

Then('I call the Get Withdrawal API', async function () {
    console.log(loadConstants.token);
    var getWithdrawalFormData = {
        access_token: loadConstants.token,
        details: true,
        metadata: true,
        lastBets: 1,
        betDetails: true,
        betBoostConfig: true,
        platformConfig: true,
        productGroupRef: 'SPORTSBOOK'
    }
    responseData = await restManager.getCallWithFormdata('/withdrawal', getWithdrawalFormData);
    console.log(responseData.text);

});

Then('check the get Withdrawal response details', function () {
    assert.typeOf(responseData.body.response.customer.withdrawal[0].id, 'number');
    assert.typeOf(responseData.body.response.customer.withdrawal[0].amount, 'number');
    assert.typeOf(responseData.body.response.customer.withdrawal[0].created, 'number');
    assert.typeOf(responseData.body.response.customer.withdrawal[0].preference, 'string');

});

After(function () {
    jsonAssertion.softAssertAll();
});