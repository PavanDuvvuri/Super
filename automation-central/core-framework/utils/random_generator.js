
var { uniqueNamesGenerator, names } = require('unique-names-generator');
var randomEmail = require('random-email');
var randomMobile = require('random-mobile');
var rug = require('random-username-generator');


class RandomGenerator {

    getRandomName() {
        const config = {
            dictionaries: [names]
        }
        return uniqueNamesGenerator(config);
    }

    getRandomEmail() {
        return randomEmail({ domain: 'automationFsb.com' })
    }

    getRandomUserName() {
        rug.setSeperator('_');
        return rug.generate();
    }

    async generateRandomString() {
        return await Math.random().toString(36).substring(2, 11)
    }

    getRandomMobile(formatted) {
        if (formatted) {
            return randomMobile({ formatted: true });
        } else {
            return randomMobile();
        }
    }

}

module.exports = new RandomGenerator();