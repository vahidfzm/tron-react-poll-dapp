const tronUtils=require('./utils');
const tronConstants=require('./constants');






const balanceOf=async (account)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.balanceOf(account).call();
    return tronUtils.tronHexToDecimal(result['_hex']);
}

const transfer=async (to,amount)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.transfer(to,amount).send();
    return result;
}


const transferFrom=async (sender,recipient,amount)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.transferFrom(sender,recipient,amount).send();
    return result;
}

const approve=async (spender,amount)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.approve(spender,amount).send();
    return result;
}

const allowance=async (owner,spender)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.allowance(owner,spender).call();
    return tronUtils.tronHexToDecimal(result['_hex']);
}




module.exports.transfer=transfer;
module.exports.balanceOf=balanceOf;
module.exports.transferFrom=transferFrom;
module.exports.approve=approve;
module.exports.allowance=allowance;

