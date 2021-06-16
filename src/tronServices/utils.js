
const TronWeb = require('tronweb')

const tronConstants = require('./constants');

export const getGeneralTronWeb = () => {
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



export const getTronContract = async (contractAddress, userOrGeneral) => {
    let tronWeb;
    if (userOrGeneral === 'general') {
        tronWeb = getGeneralTronWeb();
    } else {
        tronWeb = getUserTronWeb();
    }
    return tronWeb.contract().at(contractAddress)
}


export const tronHexToDecimal = valueInHex => {
    return TronWeb.toDecimal(valueInHex);
}

export const tronHexToAscii = valueInHex => {
    return TronWeb.toAscii(valueInHex);
}


export const getUserTronWallet = () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        return window.tronWeb.defaultAddress.base58;
    }
}


export const getTransactionInfo = async (transactionId) => {
    const tronWeb = getGeneralTronWeb();
    return tronWeb.trx.getTransactionInfo(transactionId)
}

export const getUnconfirmedTransactionInfo = async (transactionId) => {
    const tronWeb = getGeneralTronWeb();
    return tronWeb.trx.getUnconfirmedTransactionInfo(transactionId)
}

