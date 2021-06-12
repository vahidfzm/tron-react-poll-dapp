const tronUtils=require('./utils');
const tronConstants=require('./constants');


export const balanceOf=async (account)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.balanceOf(account).call();
    return tronUtils.tronHexToDecimal(result['_hex']);
}

export const transfer=async (to,amount)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.transfer(to,amount).send();
    return result;
}


export const transferFrom=async (sender,recipient,amount)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.transferFrom(sender,recipient,amount).send();
    return result;
}

export const approve=async (spender,amount)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.approve(spender,amount).send();
    return result;
}

export const allowance=async (owner,spender)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollTokenContract);
    let result= await contract.allowance(owner,spender).call();
    return tronUtils.tronHexToDecimal(result['_hex']);
}


