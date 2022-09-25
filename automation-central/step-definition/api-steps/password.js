const { When, Then, After } = require('@cucumber/cucumber');
const loadConstants = require('../../core-framework/utils/loadconstants')
const restManager = require('../../core-framework/rest_connector/get_rest_calls');
const restManagerDEl = require('../../core-framework/rest_connector/delete_rest_calls');
const restManagerPut = require('../../core-framework/rest_connector/put_rest_calls');

const restManagerPost = require('../../core-framework/rest_connector/post_rest_calls');
const constants = require('../../core-framework/utils/constants')
var assert = require('chai').assert
const jsonAssertion = require('soft-assert');
var responseData;

var formData1;
var responseData;

Then('I call the API for create a customer set password',async function () {
     var CreateNewPassword = {
      access_token: loadConstants.token,
      oldPassword: loadConstants.reg_password,
      newPassword: loadConstants.newPassword 
    }
    console.log("regidata"+loadConstants.token)
    console.log("regipassword"+loadConstants.reg_password)
    responseData = await restManagerPut.putCallWithToken('/password.json', CreateNewPassword);
    console.log(responseData.text);
});
Then('check the customer set password response details',async function () {
  assert.typeOf(responseData.body.response.customer.id, 'number');
  assert.typeOf(responseData.body.response.customer.accessToken, 'string');
  assert.equal(responseData.body.response.customer.id,loadConstants.customerId)
});
Then('I get user name and new password with {string}',async function (prefix) {
  formData1 = {
    clientId: loadConstants.clientId,
    clientSecret: loadConstants.clientSecret,
    userName: loadConstants.username_passwordcollection,
    password: loadConstants.newPassword 
}
console.log("loadConstants.username_passwordcollection"+loadConstants.username_passwordcollection)
}); 

Then('I login with that user name and new pasword',async function () {
  responseData = await restManagerPost.makePostCall('/authenticate', formData1);
});