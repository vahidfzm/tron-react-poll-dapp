import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: ${props=>props.disabled ? 'not-allowed': 'pointer'};
  width: 100%;
  height: 48px;
  margin-top: 36px;
  font-weight: bold;
  font-size: 1.1rem;
  background-color: #3f51b5;
  opacity: ${props=>props.disabled ? .5: 1};
  color: white;
  outline: none;
  border: none;
  ${props=>!props.disabled && `
    &:hover{
      opacity: 0.9;
    }
  `}
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Button= props=>{
    return (
        <StyledButton {...props}>{props.children}</StyledButton>
    )
}


export default Button;