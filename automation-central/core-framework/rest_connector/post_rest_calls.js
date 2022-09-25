
const { performance } = require('perf_hooks');
const request = require("supertest");
const loadConstants = require('../utils/loadconstants')

class PostMethodRestManager {
    async makePostCall(path, formData) {
        const startTime = performance.now();
        console.log("Making post call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .post(path)
            .type('form')
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .send(formData);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }

    async makePostCallWithToken(path, formData) {
        if (loadConstants.token) {
            console.log("There is no token please sure you add the step :     Then I store token after login ")
        }
        const startTime = performance.now();
        console.log("Making post call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .post(path)
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

    async makePostCallWithBody(path, body) {
        const startTime = performance.now();
        console.log("Making post call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .post(path)
            .auth(loadConstants.authUserName, loadConstants.authPassword)
            .set('Accept', '*/*')
            .send(body);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }
    async makeCustodianPostCallWithBody(path, body) {
        const startTime = performance.now();
        console.log("Making post call to " + loadConstants.custodianUrl + path)
        const response = await request(loadConstants.custodianUrl)
            .post(path)
            .auth(loadConstants.custodianUsername, loadConstants.custodianPassword)
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send(body);
        const endTime = performance.now();
        loadConstants.apiResponseTime = endTime - startTime;
        loadConstants.responseData = response;
        return response;
    }

    async makePostCallWithBodyAndToken(path, body) {
        if (loadConstants.token) {
            console.log("There is no token please sure you add the step :     Then I store token after login ")
        }
        const startTime = performance.now();
        console.log("Making post call to " + loadConstants.url + path)
        const response = await request(loadConstants.url)
            .post(path)
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

module.exports = new PostMethodRestManager();
