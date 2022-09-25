
const { performance } = require('perf_hooks');
const request = require("supertest");
const loadConstants = require('../utils/loadconstants')

class PutMethodRestManager {

    async putCall(path, body) {
        const startTime = performance.now();
        console.log("Making Get call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .put(path)
            .type('form')
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .send(body);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }

    async putCallWithToken(path, body) {
        if (loadConstants.token) {
            console.log("There is no token please sure you add the step :     Then I store token after login ")
        }
        const startTime = performance.now();
        console.log("Making Get call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .put(path)
            .type('form')
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .set('access_token', loadConstants.token)
            .send(body);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }
}

module.exports = new PutMethodRestManager();
