
import swal from 'sweetalert';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Spinner from '../UI/Spinner';

import styled from 'styled-components';


import Container from '../Container';
import Button from '../UI/Button';

const createPoll=require('../../tronServices/pollContract').createPoll;

const StyledItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height:82px;
  input{
    height:36px;
  }
  div.error{
    color:red;
    font-size:10px;
  }
`;

const CreatePoll = () => {

    const history=useHistory();
    const [pollLoading, setPollLoading] = useState(false);
    const wallet=useSelector(state=>state.wallet);


    const [poll, setPoll] = useState({
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        startDate: '',
        finishDate: '',
    })


    const handleChange = (field, value) => {
        setPoll({
            ...poll,
            [field]: value
        })
    }

    const validate=()=>{
        return (
          poll.question.trim()!==''
          &&
          poll.answer1.trim()!==''
          &&
          poll.answer2.trim()!==''
          &&
          poll.answer3.trim()!==''
          &&
          poll.answer4.trim()!==''
          &&
          poll.startDate.trim()!==''
          &&
          poll.finishDate.trim()!==''
          &&
          poll.startDate.trim() >= (new Date().toISOString().slice(0,10))
          &&
          poll.startDate.trim() < poll.finishDate.trim()
         );
    
      }

    const onSaveHandler=()=>{

        if(!wallet){
            swal('Error','Connect to your wallet!','error');
            return;
        }
        
        const payload={...poll};
        payload.startDate=Math.floor(new Date(payload.startDate).getTime()/1000)
        payload.finishDate=Math.floor(new Date(payload.finishDate).getTime()/1000)

        setPollLoading(true);
        createPoll(
            payload.question,
            payload.answer1,
            payload.answer2,
            payload.answer3,
            payload.answer4,
            payload.startDate,
            payload.finishDate
            ).then(transactionId=>{
                
                setPollLoading(false);

                //check if confirmation declined by user
                if(!transactionId){
                    return;
                }

                //TODO: check if the transaction failed or not
                history.push('/')
            })
            .catch(error=>{
                setPollLoading(false);
                console.log(error)
            })
    }

    return (
        <Container>
            <h2>Create a Poll</h2>

            {['question', 'answer1', 'answer2', 'answer3', 'answer4'].map(item => (
                <StyledItemWrapper key={item}>
                    <label htmlFor={item}>
                        {item}
                    </label>
                    <input
                        type="text"
                        value={poll[item]}
                        onChange={event => handleChange(item, event.target.value)}
                        id={item}
                    />
                </StyledItemWrapper>
            ))}

            <StyledItemWrapper >
                <label htmlFor="start-date">
                    Start Date
                    </label>
                <input
                    type="date"
                    value={poll.startDate}
                    onChange={event => handleChange('startDate', event.target.value)}
                    id="start-date"
                />
                {(poll.startDate && poll.startDate<(new Date().toISOString().slice(0,10))) && <div className="error">Minimum value for this field is today </div>}
            </StyledItemWrapper>

            <StyledItemWrapper >
                <label htmlFor="finish-date">
                    Finish Date
                    </label>
                <input
                    type="date"
                    value={poll.finishDate}
                    onChange={event => handleChange('finishDate', event.target.value)}
                    id="finish-date"
                />
                {(poll.startDate && poll.finishDate && poll.finishDate<poll.startDate) && <div className="error">Finish date should be after Start date </div>}

            </StyledItemWrapper>


            <Button onClick={() => onSaveHandler()} disabled={!validate() || pollLoading}>
                {pollLoading ? <Spinner size="1" /> : 'Save'}                
            </Button>


        </Container>
    )
}

export default CreatePoll;