import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import PollItem from '../PollItem';
import {getPoll, getPollCount} from '../../tronServices/pollContract';

import Container from '../Container';


const Home=()=>{

    const [pollArray,setPollArray]=useState([]);
    const history=useHistory();

    useEffect(()=>{
        getPollCount().then(pollCount=>{

            const pollIndexArray=Array(pollCount).fill().map((_,index)=>(index));

            Promise.all(pollIndexArray.map(index=>getPoll(index))).then(result=>{
                const _pollArray=[];
                result.forEach(item=>{
                    _pollArray.push(item);
                })
                setPollArray(_pollArray)

            })
            
        })

    },[])

    const onSelectHandler=(pollIndex)=>{
        history.push('/poll/' + pollIndex)
    }

    return (
        <Container>
            {pollArray.length>0 && pollArray.map((poll,index)=>(
                <PollItem key={index} poll={poll} onSelect={()=>onSelectHandler(index)}></PollItem>
            ))}
            {pollArray.length===0 && <h1>There is no Poll on this DAPP.</h1>}
        </Container>
    )
}

export default Home;