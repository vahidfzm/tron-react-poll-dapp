import React from 'react';
import styled from 'styled-components';

const StyledDiv =styled.div`
&,
&:after {
  border-radius: 50%;
  overflow: hidden;
  width: ${props=>props.size * 2}em;
  height: ${props=>props.size * 2}em;
}
& {
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: ${props=>props.size * .22}em solid rgba(255, 255, 255, 0.2);
  border-right: ${props=>props.size * .22}em solid rgba(255, 255, 255, 0.2);
  border-bottom: ${props=>props.size * .22}em solid rgba(255, 255, 255, 0.2);
  border-left: ${props=>props.size * .22}em solid #000000;
  border-left-color:inherit;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;

const Spinner = props => {

    return (
        <StyledDiv size={props.size ?? 5}>
            Loading...
        </StyledDiv>
    );
}

export default Spinner;