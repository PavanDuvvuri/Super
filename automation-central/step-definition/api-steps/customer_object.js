const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
const constants = require('../../core-framework/utils/constants');
var responseData;


Then('I call the Get Customer object API with mandatory fields',async function () {
    var getCustomerObjectMandatoryField = {
        access_token: loadConstants.token,
    }
    responseData = await restManager.getCallWithFormdata('/customer', getCustomerObjectMandatoryField);
    console.log(responseData.text);
  });
Then('check the get customer object with mandatory field response details', function () {
  if (walletId = responseData.body.response.customer.wallet !=undefined)
  {
assert.typeOf(responseData.body.response.customer.wallet[0].id, 'number');
assert.typeOf(responseData.body.response.customer.wallet[0].siteId, 'number');
assert.typeOf(responseData.body.response.customer.wallet[0].currencyCode, 'string');
assert.typeOf(responseData.body.response.customer.wallet[0].description, 'string');
assert.typeOf(responseData.body.response.customer.wallet[0].credit, 'number');
assert.typeOf(responseData.body.response.customer.accountStatus, 'string');
assert.typeOf(responseData.body.response.customer.accessToken, 'string');
assert.typeOf(responseData.body.response.customer.balance, 'number');
assert.typeOf(responseData.body.response.customer.stakeLimitUnrestricted, 'number');
assert.typeOf(responseData.body.response.customer.hasDeposited, 'boolean');
assert.typeOf(responseData.body.response.customer.zendeskId, 'string');
  }
  
});

Then('I call the Get Customer object API with all fields',async function () {
 
    var getCustomerObjectAllField = {
        access_token: loadConstants.token,
        details: constants.details,
          
    }
    responseData = await restManager.getCallWithFormdata('/customer', getCustomerObjectAllField);
    console.log(responseData.text);

  });
Then('check the get customer object with all field response details', function () {
  if (walletId = responseData.body.response.customer.wallet !=undefined)
  {
assert.typeOf(responseData.body.response.customer.wallet[0].id, 'number');
assert.typeOf(responseData.body.response.customer.wallet[0].siteId, 'number');
assert.typeOf(responseData.body.response.customer.wallet[0].currencyCode, 'string');
assert.typeOf(responseData.body.response.customer.wallet[0].description, 'string');
assert.typeOf(responseData.body.response.customer.wallet[0].credit, 'number');
assert.typeOf(responseData.body.response.customer.accountStatus, 'string');
assert.typeOf(responseData.body.response.customer.accessToken, 'string');
assert.typeOf(responseData.body.response.customer.balance, 'number');
assert.typeOf(responseData.body.response.customer.stakeLimitUnrestricted, 'number');
assert.typeOf(responseData.body.response.customer.hasDeposited, 'boolean');
assert.typeOf(responseData.body.response.customer.zendeskId, 'string');

  }
});
When('I call the Get customer object API without accesstoken', async function () {
  var getCustomerObjectWithoutAccessToken = {
  
}
responseData = await restManager.getCallWithFormdata('/customer',getCustomerObjectWithoutAccessToken);
console.log(responseData.text);
});

Then('check the get customer object without accesstoken', async function () {
    console.log("access_token is not present");
})