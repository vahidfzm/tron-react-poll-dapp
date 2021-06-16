import swal from 'sweetalert';

import { useHistory, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

const { getUserTronWallet }=require('../tronServices/utils');
const { tronPollDappContract,tronPollTokenContract }=require('../tronServices/constants');



const MenuStyled = styled.div`
  box-sizing: border-box;
  width:100%;
  height:64px;
  color: #fff;
  background-color: #3f51b5;
  display: flex;
  align-items: center;
  padding-left: 1.4rem;
  padding-right: 1.4rem;
  font-size: 21px;
  svg{
    padding-right:1.4rem;
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
  }
  span.title{
    flex-grow:1;
  }
  span.menu{
    cursor:pointer;
    font-size: 16px;
    margin-left:0.7rem;
    margin-right:0.7rem;
  }

  span.wallet{
    position:absolute;
    right:24px;
    top:68px;
    color:#000;
    font-size:12px;
    cursor:pointer
  }
  span.wallet.connected{
    cursor:default;
  }

  div.contracts{
    position:absolute;
    left:24px;
    top:68px;
    color:#000;
    font-size:12px;
    display:flex;
    flex-direction:column;
  }
`;

const Menu = () => {

  const history = useHistory();
  const location = useLocation();

  const wallet=useSelector(state=>state.wallet);

  const dispatch=useDispatch();
  

  const onConnect=()=>{
    const userWallet=getUserTronWallet();
    if(userWallet){
      dispatch({
        type:'connect',
        wallet:userWallet
      });
    }else{

      swal('Error','Install tronlink and login to use this DAPP','error');
       
      dispatch({
        type:'disconnect'
      }); 
    }
  }

  return (
    <MenuStyled>
      <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
      <span className="title">Tron React Poll DAPP</span>

      {location.pathname === '/' && (<span className="menu" onClick={() => {
        history.push('/create-poll')
      }}>Create a Poll</span>)}

      {location.pathname !== '/' && (<span className="menu" onClick={() => {
        history.push('/')
      }}>HOME</span>)}



      {!wallet && <span className="wallet" onClick={onConnect}>
        Connect to Tronlink
      </span>}
      {wallet && <span className="wallet connected" >Connected: {wallet}</span>}

      <div className="contracts">
        <a href={`https://shasta.tronscan.org/#/contract/${tronPollDappContract}`} target="_blank" rel="noreferrer">Poll Contract</a>
        <a href={`https://shasta.tronscan.org/#/contract/${tronPollTokenContract}`} target="_blank" rel="noreferrer">Token Contract</a>
      </div>      


    </MenuStyled>
  )
}

export default Menu;