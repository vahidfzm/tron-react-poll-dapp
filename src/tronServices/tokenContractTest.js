
const tronUtils=require('./utils');
const tronConstants=require('./constants');
const tokenContract=require('./tokenContract');



// ##########################################################################################################

// tokenContract.transfer(tronConstants.tronAccounts[1].publicKey,100000).then(result=>{
//     console.log('transfer',result)
//     tokenContract.balanceOf(tronConstants.tronAccounts[0].publicKey).then(result=>{
//         console.log('account0',result)
//     })
    
//     tokenContract.balanceOf(tronConstants.tronAccounts[1].publicKey).then(result=>{
//         console.log('account1',result)
//     })
// })

// ##########################################################################################################

// tokenContract.approve(
//     tronConstants.tronAccounts[0].publicKey,
//     10000)
//     .then(result=>{
//     console.log('approve',result)
// })

// ##########################################################################################################

// tokenContract.allowance(
//     tronConstants.tronAccounts[1].publicKey,
//     tronConstants.tronAccounts[0].publicKey
//     )
//     .then(result=>{
//     console.log('allowance',result)
// })

// ##########################################################################################################

// tokenContract.transferFrom(
//     tronConstants.tronAccounts[1].publicKey,
//     tronConstants.tronAccounts[2].publicKey,
//     1000)
//     .then(result=>{
//     console.log('transferFrom',result)
   
// })



// tokenContract.approve(
//     tronConstants.tronPollDappContract,
//     1e10
//     )
//     .then(result=>{
//     console.log('approve',result)
// })


tokenContract.balanceOf(tronConstants.tronAccounts[0].publicKey).then(result=>{
    console.log('account0',result)
})

tokenContract.balanceOf(tronConstants.tronAccounts[1].publicKey).then(result=>{
    console.log('account1',result)
})

tokenContract.balanceOf(tronConstants.tronAccounts[2].publicKey).then(result=>{
    console.log('account2',result)
})


