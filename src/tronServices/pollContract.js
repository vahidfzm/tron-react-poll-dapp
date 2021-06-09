const tronUtils=require('./utils');
const tronConstants=require('./constants');




const createPoll=async (question,answer1,answer2,answer3,answer4,startDate,finishDate)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollDappContract,'user');
    try {
        
        let result=await contract.createPoll(question,answer1,answer2,answer3,answer4,startDate,finishDate).send();
        return result;
    } catch (error) {
        console.log('error',error)
    }
}

const getPoll=async (pollIndex)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollDappContract,'general');
    let poll= await contract.polls(pollIndex).call();
    poll.startDate=tronUtils.tronHexToDecimal(poll.startDate['_hex']);
    poll.finishDate=tronUtils.tronHexToDecimal(poll.finishDate['_hex']);
    return poll;
}

const getPollCount=async ()=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollDappContract,'general');
    let result= await contract.getPollCount().call();
    return tronUtils.tronHexToDecimal(result['_hex']);
}


const getVoteCounter=async (pollIndex)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollDappContract,'general');
    let voteCounter= await contract.voteCounters(pollIndex).call();
    voteCounter.answer1VoteCounter=tronUtils.tronHexToDecimal(voteCounter.answer1VoteCounter['_hex']);
    voteCounter.answer2VoteCounter=tronUtils.tronHexToDecimal(voteCounter.answer2VoteCounter['_hex']);
    voteCounter.answer3VoteCounter=tronUtils.tronHexToDecimal(voteCounter.answer3VoteCounter['_hex']);
    voteCounter.answer4VoteCounter=tronUtils.tronHexToDecimal(voteCounter.answer4VoteCounter['_hex']);
    return voteCounter;
}



const vote=async (pollIndex,answerIndex)=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollDappContract,'user');
    try {
        let result=await contract.vote(pollIndex,answerIndex).send();
        return result;
    } catch (error) {
        console.log('error',error)
    }
}

const setToken=async ()=>{
    let contract=await tronUtils.getTronContract(tronConstants.tronPollDappContract,'general');
    try {
        let result=await contract.setToken(tronConstants.tronPollTokenContract).send();
        return result;
    } catch (error) {
        console.log('error',error)
    }
}



module.exports.createPoll=createPoll;
module.exports.getPoll=getPoll;
module.exports.vote=vote;
module.exports.getVoteCounter=getVoteCounter;
module.exports.getPollCount=getPollCount;
module.exports.setToken=setToken;