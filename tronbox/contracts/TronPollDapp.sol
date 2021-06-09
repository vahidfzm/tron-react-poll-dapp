pragma solidity >=0.5.0 <0.7.0;

import './TronPollToken.sol';

contract Ownable{
    address payable owner;
    constructor() public{
        owner=msg.sender;
    }
}


contract TronPollDapp is Ownable {

    event PollCreated(uint createDate);


    TronPollToken private pollToken;
    bool pollTokenAssigned=false;

    struct Voter{
        bool voted;
        uint256 votedIndex;
    }

    struct Poll{
        string question;
        address owner;
        uint256 startDate;
        uint256 finishDate;
        string answer1;
        string answer2;
        string answer3;
        string answer4;
        mapping(address => Voter) voters;
    }

    struct VoteCounter {
        uint256 answer1VoteCounter;
        uint256 answer2VoteCounter;
        uint256 answer3VoteCounter;
        uint256 answer4VoteCounter;
    }

    Poll[] public polls;
    VoteCounter[] public voteCounters;


    function setToken(address _tokenAddress) public onlyOwner validateIfPollTokenNotAssigned{
        pollTokenAssigned=true;
        pollToken=TronPollToken(_tokenAddress);
    }

    function createPoll(
        string memory question,
        string memory answer1,
        string memory answer2,
        string memory answer3,
        string memory answer4,
        uint startDate,
        uint finishDate
    ) public
    validatePollStartDate(startDate)
    validatePollFinishDate(startDate, finishDate)
    {
        polls.length +=1;
        Poll storage _poll=polls[polls.length-1];
        _poll.question=question;
        _poll.answer1=answer1;
        _poll.answer2=answer2;
        _poll.answer3=answer3;
        _poll.answer4=answer4;
        _poll.startDate=startDate;
        _poll.finishDate=finishDate;


        voteCounters.length +=1;
        VoteCounter storage _voteCounter=voteCounters[voteCounters.length-1];
        _voteCounter.answer1VoteCounter=0;
        _voteCounter.answer2VoteCounter=0;
        _voteCounter.answer3VoteCounter=0;
        _voteCounter.answer4VoteCounter=0;

        emit PollCreated(block.timestamp);
    }

    function vote(uint256 pollIndex, uint256 answerIndex) public 
    validatePollIndex(pollIndex) 
    afterStartingPoll(pollIndex)
    beforeFinishingPoll(pollIndex)
    notVotedBefore(pollIndex)
    validateIfPollTokenAssigned
    {
        Poll storage _poll=polls[pollIndex];
        VoteCounter storage _voteCounter=voteCounters[pollIndex];
        
        uint256 tokenAllowance=pollToken.allowance(owner,address(this));
        require(tokenAllowance>=16000,"not enough tokens !");
        pollToken.transferFrom(owner,msg.sender,16000);

        _poll.voters[msg.sender].voted=true;
        _poll.voters[msg.sender].votedIndex=answerIndex;
        if(answerIndex==0){
            _voteCounter.answer1VoteCounter++;
        }else if(answerIndex==1){
            _voteCounter.answer2VoteCounter++;
        }else if(answerIndex==2){
            _voteCounter.answer3VoteCounter++;
        }else if(answerIndex==3){
            _voteCounter.answer4VoteCounter++;
        }
        


    }

    function getPollCount() public view returns(uint){
        return polls.length;
    }

    modifier validatePollFinishDate(uint256 startDate, uint finishDate) {
        require(
            startDate > block.timestamp && finishDate>startDate,
            "Invalid Finish Date"
        );
        _;
    }

    modifier validatePollStartDate(uint256 startDate) {
        require(
            startDate > block.timestamp,
            "Invalid Start Date"
        );
        _;
    }

    modifier validatePollIndex(uint256 _pollIndex){
        require(
            _pollIndex<polls.length,
            "Invalid poll-index"
        );
        _;
    }


    modifier afterStartingPoll(uint256 pollIndex) {
        Poll storage _poll = polls[pollIndex];
        require(
            block.timestamp >= _poll.startDate,
            "This function is callable just after starting the poll."
        );
        _;
    }


    modifier beforeFinishingPoll(uint256 pollIndex) {
        Poll storage _poll = polls[pollIndex];
        require(
            block.timestamp < _poll.finishDate,
            "This function is callable before finishing the poll."
        );
        _;
    }

    modifier notVotedBefore(uint256 pollIndex) {
        Poll storage _poll = polls[pollIndex];
        require(
            !_poll.voters[msg.sender].voted,
            "You voted for this poll before!."
        );
        _;
    }

    modifier onlyPollOwner(uint256 pollIndex) {
        Poll storage _poll = polls[pollIndex];
        require(
            msg.sender == _poll.owner,
            "Only owner of the poll can call this function."
        );
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    modifier validateIfPollTokenAssigned() {
        require(
            pollTokenAssigned, 
            "Token is not assigned"
        );
        _;
    }

    modifier validateIfPollTokenNotAssigned() {
        require(
            !pollTokenAssigned, 
            "Token was already assigned"
        );
        _;
    }

}