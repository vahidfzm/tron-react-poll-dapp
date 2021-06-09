
const TronWeb = require('tronweb')

const tronConstants = require('./constants');

const getGeneralTronWeb = () => {
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider(tronConstants.tronFullNode);
    const solidityNode = new HttpProvider(tronConstants.tronSolidityNode);
    const eventServer = new HttpProvider(tronConstants.tronEventServer);

    return new TronWeb(fullNode, solidityNode, eventServer, tronConstants.tronGeneralPrivateKey);
}

const getUserTronWeb = () => {
    if (window && window.tronWeb && window.tronWeb.defaultAddress.base58) {
        return window.tronWeb;
    }
}



const getTronContract = async (contractAddress, userOrGeneral) => {
    let tronWeb;
    if (userOrGeneral === 'general') {
        tronWeb = getGeneralTronWeb();
    } else {
        tronWeb = getUserTronWeb();
    }
    return tronWeb.contract().at(contractAddress)
}


const tronHexToDecimal = valueInHex => {
    return TronWeb.toDecimal(valueInHex);
}

const tronHexToAscii = valueInHex => {
    return TronWeb.toAscii(valueInHex);
}


const getUserTronWallet = () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        return window.tronWeb.defaultAddress.base58;
    }
}


const getTransactionInfo = async (transactionId) => {
    const tronWeb = getGeneralTronWeb();
    return tronWeb.trx.getTransactionInfo(transactionId)
}

module.exports.getGeneralTronWeb = getGeneralTronWeb;
module.exports.getTronContract = getTronContract;
module.exports.tronHexToAscii = tronHexToAscii;
module.exports.tronHexToDecimal = tronHexToDecimal;
module.exports.getUserTronWallet = getUserTronWallet;
module.exports.getTransactionInfo = getTransactionInfo;