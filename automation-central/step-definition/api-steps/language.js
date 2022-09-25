const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManagerPut = require('../../core-framework/rest_connector/put_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;


Then('I call the put English Language API',async function () {
    var putEnglishLang = {
        access_token: loadConstants.token,
        languageId :1,
    }
    responseData = await restManagerPut.putCallWithToken('/language', putEnglishLang);
    console.log(responseData.text);

  });
Then('check the put English Language response details', function () {

assert.typeOf(responseData.body.response.customer. languageId, 'number');
assert.typeOf(responseData.body.response.customer.localeKey, 'string');

});


Then('I call the put French Language API',async function () {
    var putFrenchLang = {
        access_token: loadConstants.token,
        languageId :2,
    }
    responseData = await restManagerPut.putCallWithToken('/language', putFrenchLang);
    console.log(responseData.text);

  });
Then('check the put French Language response details', function () {

assert.typeOf(responseData.body.response.customer. languageId, 'number');
assert.typeOf(responseData.body.response.customer.localeKey, 'string');

});