import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import PollItem from '../PollItem';
import {getPoll, getPollCount} from '../../tronServices/pollContract';

import Container from '../Container';
import Spinner from '../UI/Spinner';


const Home=()=>{

    const [pollArray,setPollArray]=useState([]);
    const history=useHistory();
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(()=>{
        setPageLoading(true);
        getPollCount().then(pollCount=>{
            const pollIndexArray=Array(pollCount).fill().map((_,index)=>(index));
            
            Promise.all(pollIndexArray.map(index=>getPoll(index)))
            .then(result=>{
                setPageLoading(false);
                const _pollArray=[];
                result.forEach(item=>{
                    _pollArray.push(item);
                })
                setPollArray(_pollArray)
            })
            .catch(error=>{
                setPageLoading(false);
                console.log(error)
            })
            
        })
        .catch(error=>{
            setPageLoading(false);
            console.log(error)
        })

    },[])

    const onSelectHandler=(pollIndex)=>{
        history.push('/poll/' + pollIndex)
    }

    return (
        <Container>
            {!pageLoading && pollArray.length>0 && pollArray.map((poll,index)=>(
                <PollItem key={index} poll={poll} onSelect={()=>onSelectHandler(index)}></PollItem>
            ))}
            {!pageLoading && pollArray.length===0 && <h1>There is no Poll on this DAPP.</h1>}
            {pageLoading && <Spinner size="5" />}
        </Container>
    )
}

export default Home;