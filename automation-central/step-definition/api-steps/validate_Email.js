const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
const elementUtil = require('../../core-framework/utils/random_generator')
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;

When('I call the Get Validate Email API', async function () {
   let Email=await elementUtil.getRandomEmail()
    var validateEmailFormData = {
        clientId: loadConstants.clientId,
       value:Email
    }
    responseData = await restManager.getCallWithFormdata('/validate/email.json', validateEmailFormData);
    console.log(responseData.text);

});
Then('check the validate email response details', function () {
    assert.equal(responseData.body.response.status.value, 'Success');
    console.log("statusValue::"+responseData.body.response.status.value)
  });
 After(function () {
    jsonAssertion.softAssertAll();
});  