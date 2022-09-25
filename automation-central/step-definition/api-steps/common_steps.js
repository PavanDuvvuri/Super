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
When('I get user name and password with {string}', async function (prefix) {
    formData = {
        clientId: loadConstants.clientId,
        clientSecret: loadConstants.clientSecret,
        userName: loadConstants["userName" + prefix],
        password: loadConstants["password" + prefix]
    }
});

Then('I login with that user name and pasword', async function () {
    responseData = await restManager.makePostCall('/authenticate', formData);
});

Then('verify the status code is {int}', async function (status) {
    assert.equal(loadConstants.responseData.status, status);
});
Then('verify the status code is {string}', async function (status) {
    assert.equal(loadConstants.responseData.status, status);
});
Then('Verify the response time is less then {string}', async function (responseTimekey) {
    console.log("the actual response time is" + loadConstants.apiResponseTime);
    console.log("the expected response time less than " + loadConstants[responseTimekey]);
    jsonAssertion.softTrue(parseInt(loadConstants[responseTimekey]) > loadConstants.apiResponseTime);
});

Then('I store token after login', async function () {
    await storeToken();
});

Then('I store customerId after login', async function () {
    await storeCustomerId();
});

async function storeCustomerId() {
    console.log("storing the customerId" + JSON.stringify(responseData.body.response));
    console.log("storing the customerId" + JSON.stringify(responseData.body.response.customer.id));
    loadConstants['customerId'] = responseData.body.response.customer.id
    console.log(loadConstants.customerId);
}
async function storeToken() {
    console.log("storing the token" + JSON.stringify(responseData.body.response));
    console.log("storing the token" + JSON.stringify(responseData.body.response.customer.accessToken));
    loadConstants['token'] = responseData.body.response.customer.accessToken
    console.log(loadConstants.token);
}
Then('I store token after registration', async function () {
    await storeToken();
});

Then('I store account_id after registration', async function () {
    storeCustomerId();
});
Then('check the authentication response details', async function () {
    assert.typeOf(responseData.body.response.customer.id, 'number');
    if (!process.env.ENV.includes("NairaBet") && (!process.env.ENV.includes("Casinotime"))) {
        assert.typeOf(responseData.body.response.customer.title, 'string');
    }
    assert.typeOf(responseData.body.response.customer.accountStatus, 'string');
    assert.typeOf(responseData.body.response.customer.level, 'string');
    assert.typeOf(responseData.body.response.customer.accessToken, 'string');
    assert.typeOf(responseData.body.response.customer.currencyCode, 'string');
    console.log(responseData.body.response.customer.firstActivated);
    assert.typeOf(responseData.body.response.customer.firstActivated, 'number');
    assert.equal(responseData.body.response.customer.accountStatus, 'ACTIVE')

});

Given('I populate registration details like {string} {string} {string} {string} {string} {string} {string} {string} {string}', function (
    email, firstName, lastName, password, currencyCode, tsAndCs, userName, mobileNo, title) {
    loadConstants["reg_password"] = password;
    loadConstants["reg_tsAndCs"] = tsAndCs;
    loadConstants["reg_title"] = title;
    console.log(mobileNo);
    console.log(userName);
    if (mobileNo.includes(constants.RANDOM_KEYWORD)) {
        console.log(randomGenerator.getRandomMobile(true));
        loadConstants["reg_mobileNo"] = randomGenerator.getRandomMobile(true);
    }
    else {
        loadConstants["reg_mobileNo"] = mobileNo;
    }
    if (email.includes(constants.RANDOM_KEYWORD)) {
        loadConstants["reg_email"] = randomGenerator.getRandomEmail();
    }
    else {
        loadConstants["reg_email"] = email;
    }
    if (userName.includes(constants.RANDOM_KEYWORD)) {
        loadConstants["reg_userName"] = randomGenerator.getRandomUserName();
    }
    else {
        loadConstants["reg_userName"] = userName;
    }
    if (firstName.includes(constants.RANDOM_KEYWORD)) {
        loadConstants["reg_firstName"] = randomGenerator.getRandomName();
    }
    else {
        loadConstants["reg_firstName"] = firstName;
    }
    if (lastName.includes(constants.RANDOM_KEYWORD)) {
        loadConstants["reg_lastName"] = randomGenerator.getRandomName();
    }
    else {
        loadConstants["reg_lastName"] = lastName;
    }
    if (currencyCode.includes(constants.PROPERTY_KEYWORD)) {
        loadConstants["reg_currencyCode"] = loadConstants.currencyCode;
    }
    else {
        loadConstants["reg_currencyCode"] = currencyCode;
    }

    registrationFormData = {
        email: loadConstants["reg_email"],
        firstName: loadConstants["reg_firstName"],
        lastName: loadConstants["reg_lastName"],
        clientId: loadConstants.clientId,
        clientSecret: loadConstants.clientSecret,
        password: loadConstants["reg_password"],
        currencyCode: loadConstants.currencyCode,
        //dateOfBirth:{{dateOfBirth}}
        tsAndCs: true,
        userName: loadConstants["reg_userName"],
        mobileNo: loadConstants["reg_mobileNo"],
        title: title,
        kyc: true
    }
});
Then('I call the registration service', async function () {

    responseData = await restManager.makePostCall('/register.json?dateOfBirth=1962-10-23', registrationFormData);
    console.log(registrationFormData)
    console.log(responseData.text);

});

Then('check the registration response details', async function () {
    var customerId = responseData.body.response.customer.id
    console.log("customerId"+customerId)
    loadConstants['customerId'] = customerId
    loadConstants['token'] = responseData.body.response.customer.accessToken
    console.log("RegistrationToken::"+loadConstants.tokenRegistration);
    loadConstants['username_passwordcollection'] = responseData.body.response.customer.userName
});
Then('activate the user in the custodian', async function () {
    if (clientCheckFunctions.shouldActivateInCustodian()) {
        var fullCustodianUrl = "/customer/" + loadConstants.customerId;
        const body = '{"accountStatus":"ACTIVE"}';
        const responseData = await restManager.makeCustodianPostCallWithBody(fullCustodianUrl, body);
        console.log(responseData);
        console.log(responseData.text);
    }
});

After(function () {
    jsonAssertion.softAssertAll();
});