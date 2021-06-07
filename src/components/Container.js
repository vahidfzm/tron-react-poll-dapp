import styled from 'styled-components';

const StypedContainer=styled.div`
    padding: 1rem;
    border: 1px solid #eee;
    margin: 2rem auto;
    max-width:1280px;
`;


const Container=(props)=>{
    return (
       <StypedContainer>
           {props.children}
       </StypedContainer>
    )
}

export default Container;