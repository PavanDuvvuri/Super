
const { When, Then, After, And } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;

Then('I call the Get deposit limit details', async function () {
    var path = "depositLimit.json?access_token=" + loadConstants.token
    responseData = restManager.getCallWithToken(path)
});


Then('check the deposit limit response details', async function () {
});