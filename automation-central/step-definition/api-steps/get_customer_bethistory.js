const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;


Then('I call the Get Customer bet history API with mandatory fields', async function () {
  var getBetHistoryMandatoryField = {
    access_token: loadConstants.token,
  }
  responseData = await restManager.getCallWithFormdata('/bet', getBetHistoryMandatoryField);
  console.log(responseData.text);

});

Then('check the get customer bet history with mandatory field response details', function () {

  assert.typeOf(responseData.body.response.customer.id, 'number');
  assert.typeOf(responseData.body.response.customer.accessToken, 'string');
  assert.typeOf(responseData.body.response.pageInfo.offset, 'number');
  assert.typeOf(responseData.body.response.pageInfo.limit, 'number');
  assert.typeOf(responseData.body.response.pageInfo.total, 'number');
});

Then('I call the Get Customer unsettled bet history API with all fields', async function () {
  var getUnSettleBetHistoryAllField = {
    access_token: loadConstants.token,
    settled: false,
    offset: 0,
    limit: 10,
  }
  responseData = await restManager.getCallWithFormdata('/bet', getUnSettleBetHistoryAllField);
  console.log(responseData.text);

});

Then('check the get customer unsettled bet history with all field response details', function () {

  assert.typeOf(responseData.body.response.pageInfo.offset, 'number');
  assert.typeOf(responseData.body.response.pageInfo.limit, 'number');
  assert.typeOf(responseData.body.response.pageInfo.total, 'number');
  assert.typeOf(responseData.body.response.customer.id, 'number');
  assert.typeOf(responseData.body.response.customer.accessToken, 'string');
});

Then('I call the Get Customer settled bet history API with all fields', async function () {
  var getSettleBetHistoryAllField = {
    access_token: loadConstants.token,
    settled: false,
    offset: 0,
    limit: 10,
  }
  responseData = await restManager.getCallWithFormdata('/bet', getSettleBetHistoryAllField);
  console.log(responseData.text);

});

Then('check the get customer settled bet history with all field response details', function () {

  assert.typeOf(responseData.body.response.pageInfo.offset, 'number');
  assert.typeOf(responseData.body.response.pageInfo.limit, 'number');
  assert.typeOf(responseData.body.response.pageInfo.total, 'number');
  assert.typeOf(responseData.body.response.customer.id, 'number');
  assert.typeOf(responseData.body.response.customer.accessToken, 'string');
});

When('I call the Get customer bet history API without accesstoken', async function () {
  var getCustomerBetHistoryWithoutAccessToken = {

  }
  responseData = await restManager.getCallWithFormdata('/bet', getCustomerBetHistoryWithoutAccessToken);
  console.log(responseData.text);
});

Then('check the get customer bet history without accesstoken', async function () {
  var devMsg = responseData.body.response.status.devMessage
  assert.include(devMsg, "MissingServletRequestParameterException: Required String parameter 'access_token' is not present");
})
