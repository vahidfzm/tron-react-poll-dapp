
import styled from 'styled-components';

const StypedPoll=styled.div`
    padding: 1rem;
    font-size: 2rem;
    border-bottom: 1px solid #eee;
    margin: 1rem;
    cursor: pointer;
    &:hover{
        opacity:0.8;
    }
`;

const PollItem=(props)=>{
    return (
       <StypedPoll onClick={props.onSelect}>
           {props.poll.question}
       </StypedPoll>
    )
}

export default PollItem;