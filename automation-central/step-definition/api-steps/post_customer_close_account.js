const { When, Then, After, Given } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/post_rest_calls');
const constants = require('../../core-framework/utils/constants')
const randomGenerator = require('../../core-framework/utils/random_generator')
const clientCheckFunctions = require('../../core-framework/utils/client_check_functions')
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var formData;
var responseData;
var registrationFormData;


Then('I call the Post Customer Close Account API', async function () {
    responseData = await restManager.makePostCallWithToken('/customer/closeAccount?access_token=' + loadConstants.token, {});
    console.log(responseData.text);
});

Then('check the Post Customer Close Account response details', async function () {
    assert.typeOf(responseData.body.response.status.returnCode, 'string');
    assert.equal(responseData.body.response.status.returnCode, 'SUCCESS');
    assert.equal(responseData.body.response.customer.accountStatus, 'CLOSED')
});