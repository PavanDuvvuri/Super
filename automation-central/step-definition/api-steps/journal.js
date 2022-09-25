const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;


Then('I call the Get Journal API without limit',async function () {
    var getJournalWithoutLimit = {
        access_token: loadConstants.token,
    }
    responseData = await restManager.getCallWithFormdata('/journal.json', getJournalWithoutLimit);
    console.log(responseData.text);

  });
Then('check the get Journal without limit response details', function () {

assert.typeOf(responseData.body.response.pageInfo.limit, 'number');
assert.typeOf(responseData.body.response.customer.journal, 'array');
assert.typeOf(responseData.body.response.customer.id, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].amount, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].balance, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].createdOn, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].currencyCode, 'string');
assert.typeOf(responseData.body.response.customer.journal[0].ref, 'string');
assert.typeOf(responseData.body.response.customer.journal[0].description, 'string');

});

Then('I call the Get Journal API with limit',async function () {
    var getJournalWithLimit = {
        access_token: loadConstants.token,
        offset: 5,
        
    }
    responseData = await restManager.getCallWithFormdata('/journal.json', getJournalWithLimit);
    console.log(responseData.text);

  });
Then('check the get Journal with limit response details', function () {

assert.typeOf(responseData.body.response.pageInfo.limit, 'number');
assert.typeOf(responseData.body.response.customer.journal, 'array');
assert.typeOf(responseData.body.response.customer.id, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].amount, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].balance, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].createdOn, 'number');
assert.typeOf(responseData.body.response.customer.journal[0].currencyCode, 'string');
assert.typeOf(responseData.body.response.customer.journal[0].ref, 'string');
assert.typeOf(responseData.body.response.customer.journal[0].description, 'string');

});