import swal from 'sweetalert';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';


import Container from '../Container';


import Spinner from '../UI/Spinner';
import Button from '../UI/Button';

const { getPoll, getVoteCounter, vote } = require('../../tronServices/pollContract');
const { getUnconfirmedTransactionInfo, tronHexToAscii } = require('../../tronServices/utils');




const PollWrapper = styled.div`
  margin-top: 24px;
  padding: 1rem;
`;

const PollQuestion = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const PollDates = styled.div`
  display:flex;
  justify-content:space-between;
`;

const PollAnswer = styled.div`
  position: relative;
  border: 1px solid #eee;
  cursor: pointer;
  padding: 8px;
  margin-top: 64px;
  &:hover {
      background-color: azure;
  }
`;

const AnswerVoteCount = styled.div`
  position:absolute;
  top:-24px;
  left:0;
  width:100%;
  span.color{
    background-image:linear-gradient(to right,red 90%,white);
    width:${({ size = 0 }) => size}%;
    position:absolute;
    top:16px;
    height:5px;
    left:0;
    z-index:1;
  }
  span.text{
    top:0;
    right:0;
    z-index:1;
    color:blue;
    position:absolute;
  }
`;






const Poll = (props) => {

    const pollIndex = props.match.params.index;
    const [poll, setPoll] = useState(null);
    const [voteCounter, setVoteCounter] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [voteLoading, setVoteLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const wallet = useSelector(state => state.wallet);

    useEffect(() => {
        setPageLoading(true);
        Promise.all([getPoll(pollIndex), getVoteCounter(pollIndex)])
            .then(result => {
                setPageLoading(false);
                setPoll(result[0]);
                setVoteCounter(result[1]);
            })
            .catch(error => {
                setPageLoading(false);
                console.log(error);
            })

    }, [pollIndex]);


    const loadVoteCounter = () => {
        getVoteCounter(pollIndex)
            .then(_voteCounter => {
                setVoteLoading(false);
                setVoteCounter(_voteCounter)
            })
            .catch(error => {
                setVoteLoading(false);
                console.log(error);
            })
    }


    const onVoteHandler = () => {

        if (!wallet) {
            swal('Error', 'Connect to your wallet!', 'error');
            return;
        }


    
        if (poll.startDate>(new Date().getTime()/1000)) {
            swal('Error', 'The poll has not started yet.', 'error');
            return;
        }
    
        if (poll.finishDate<(new Date().getTime()/1000)) {
            swal('Error', 'Time to participate in this poll has expired.', 'error');
            return;
        }

        setVoteLoading(true);
        vote(pollIndex, (selectedAnswer - 1))
            .then(transactionId => {

                console.log('transactionId',transactionId)

                //check if confirmation declined by user
                if (!transactionId) {
                    setVoteLoading(false);
                    return;
                }

                setTimeout(()=>{

                    getUnconfirmedTransactionInfo(transactionId).then(transactionInfo => {
                        console.log('transactionInfo',transactionInfo)
                        if (transactionInfo['result'] === 'FAILED') {
                            setVoteLoading(false);
                            let transactionMessage = '';
                            transactionMessage = transactionMessage + tronHexToAscii(transactionInfo['resMessage']) + ', ';
                            transactionMessage = transactionMessage + tronHexToAscii(transactionInfo['contractResult'][0]);
    
                            transactionMessage = transactionMessage.replace(/[^\w\s]/gi, '');
    
                            swal('Error', transactionMessage, 'error');
                        }
    
                        loadVoteCounter()
    
                    })
                        .catch(error => {
                            setVoteLoading(false);
                            console.log(error)
                        })


                },5000)
                

            })
            .catch(error => {
                setVoteLoading(false);
                console.log(error)
            })
    }


    return (
        <Container>
            <PollWrapper>
                {poll && (
                    <div>
                        <PollQuestion>
                            {poll.question}
                        </PollQuestion>
                        <PollDates>
                            <span>
                                Start-date: {new Date(poll.startDate * 1000).toISOString().slice(0, 10)}
                            </span>
                            <span>
                                Finish-date: {new Date(poll.finishDate * 1000).toISOString().slice(0, 10)}
                            </span>
                        </PollDates>
                        {[1, 2, 3, 4].map(answerNumber => (
                            <PollAnswer key={answerNumber} onClick={() => setSelectedAnswer(answerNumber)}>
                                <AnswerVoteCount size={
                                    voteCounter &&
                                        voteCounter[`answer${answerNumber}VoteCounter`] > 0 ?
                                        Math.floor(voteCounter[`answer${answerNumber}VoteCounter`] * 100 / (voteCounter['answer1VoteCounter'] + voteCounter['answer2VoteCounter'] + voteCounter['answer3VoteCounter'] + voteCounter['answer4VoteCounter']))
                                        : 0
                                }>
                                    <span className="color">&nbsp;</span>
                                    <span className="text">
                                        {voteCounter ? voteCounter[`answer${answerNumber}VoteCounter`] : 'no '} Vote{voteCounter && voteCounter[`answer${answerNumber}VoteCounter`] > 1 ? 's' : ''}
                                    </span>
                                </AnswerVoteCount>
                                <input
                                    id={`answer${answerNumber}`}
                                    type="radio"
                                    name="answer"
                                    value={answerNumber}
                                    checked={selectedAnswer === answerNumber}
                                    onChange={(event) => {
                                        setSelectedAnswer(+event.target.value);
                                    }}
                                />

                                <label htmlFor={`answer${answerNumber}`}>
                                    {poll[`answer${answerNumber}`]}
                                </label>
                            </PollAnswer>
                        ))}
                        <div>
                            <Button onClick={() => onVoteHandler()} disabled={voteLoading || selectedAnswer === null}>
                                {voteLoading ? <Spinner size="1" /> : 'Vote'}
                            </Button>
                        </div>
                    </div>
                )}
                {pageLoading && <Spinner size="5" />}

            </PollWrapper>
        </Container>
    )
}

export default Poll;