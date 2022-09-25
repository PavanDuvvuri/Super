
var environmentConstant = require('../../constants/' + process.env.ENV.toLowerCase());
var commonEnvironmentConstant = require('../../constants/common');
var { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);
class LoadConstants {
    loadConstant() {
        for (var key in commonEnvironmentConstant) {
            if (!(key in environmentConstant)) {
                environmentConstant[key] = commonEnvironmentConstant[key]
            }
        }
        return environmentConstant;
    }
}

module.exports = new LoadConstants().loadConstant();

