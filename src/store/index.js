import {createStore} from 'redux';

const initialState={
    wallet:null
}

const walletReducer=(state=initialState,action)=>{

    if(action.type==='connect'){
        return {
            wallet:action.wallet
        }
    }

    if(action.type==='disconnect'){
        return {
            wallet:null
        }
    }

    return state;
}


const store=createStore(walletReducer);

export default store;