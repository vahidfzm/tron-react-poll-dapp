
const tronUtils=require('./utils');
const tronConstants=require('./constants');
const pollContract=require('./pollContract');

const tronWeb=tronUtils.getGeneralTronWeb();

// tronWeb.trx.getBalance('TQnwk8eSZjFVH9JhzKkaPnV27r6Xxhg4u1').then(result => console.log(result));

// ##########################################################################################################
// const test1=async ()=>{
//     const contract =await tronUtils.getTronContract(tronConstants.tronPollDappContract);
//     console.log(contract)
// }
    
// test1()
    
// ##########################################################################################################



const startDate=(new Date('2021-05-22T16:23')).getTime()/1000;
const finishDate=(new Date('2023-12-23')).getTime()/1000;
pollContract.createPoll('my secont question','a2','b2','c','d',startDate,finishDate).then(res=>{
    console.log(res);
})


// ##########################################################################################################


// pollContract.getPoll(0).then(res=>{
//     console.log(res);
// })

// ##########################################################################################################

// pollContract.vote(0,2).then(res=>{
//     console.log(res);
// })

// ##########################################################################################################

// pollContract.getVoteCounter(0).then(res=>{
//     console.log(res);
// })

// ##########################################################################################################

// pollContract.getPollCount().then(res=>{
//     console.log(res);
// })


// pollContract.setToken().then(res=>{
//     console.log(res);
// })
