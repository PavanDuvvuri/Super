class ClientCheckFunctions {
    shouldActivateInCustodian() {
        if (process.env.ENV.toLowerCase().includes('jeninngs')) {
            return false;
        } else {
            return true;
        }
    }
}
module.exports = new ClientCheckFunctions();