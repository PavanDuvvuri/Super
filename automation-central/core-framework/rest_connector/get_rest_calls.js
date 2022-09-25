
const { performance } = require('perf_hooks');
const request = require("supertest");
const loadConstants = require('../utils/loadconstants')

class GetMethodRestManager {

    async getCall(path) {
        const startTime = performance.now();
        console.log("Making Get call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .get(path)
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .send();
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }

    async getCallWithToken(path) {

        if (loadConstants.token) {
            console.log("There is no token please sure you add the step :     Then I store token after login ")
        }
        const startTime = performance.now();
        console.log("Making Get call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .get(path)
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .set('access_token', loadConstants.token)
            .send();
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        this.attach(response.text, 'application/json');
        return response;
    }

    async getCallWithFormdata(path, formData) {
        const startTime = performance.now();
        console.log("Making Get call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .get(path)
            .type('form')
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .send(formData);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }

    async getCallWithFormdataAndToken(path, formData) {
        if (loadConstants.token) {
            console.log("There is no token please sure you add the step :     Then I store token after login ")
        }
        console.log("Making Get call to " + loadConstants.url + path)
        const startTime = performance.now();
        const response = await request(loadConstants.url)
            .get(path)
            .type('form')
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .set('access_token', loadConstants.token)
            .send(formData);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }
}

module.exports = new GetMethodRestManager();
