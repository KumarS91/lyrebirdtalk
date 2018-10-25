import {
    clearInputs,
    onPostInputChange,
    onSearchInputChange,
    postRequestError,
    postRequestPending,
    postRequestSolved,
    postTokenExpired,
    requestError,
    requestPending,
    requestSolved,
    tokenExpired
} from '../Actions/Constants';

let voiceState = {
    isPending : false ,
    voice :[],
    error : '',
    hasToken : true,
    searchText : '',
    postText : ''
}

export const voiceReducer = (state = voiceState , action={})=>{
    switch(action.type){
        case requestPending :
            return {...state,isPending:true}
        case requestSolved :
            state.voice = []
            return {...state,
                        voice:state.voice.concat(action.voice.results), 
                        isPending:false,
                        hasToken : true
                    }
        case requestError :
            return {...state,error: action.error,isPending:false,hasToken : true}
        case tokenExpired :
            return {...state,hasToken:false,isPending:false}        
        case onPostInputChange:
            return {
                ...state,
                postText : action.text
                   }
        case onSearchInputChange:
            return {
                ...state,
                searchText : action.text
                   }
        case clearInputs :
            return {
                ...state,
                searchText:'',
                postText:''
                   }
        default :
          return state
    }
}

const postState = {
    success : '',
    error : '',
    loading: false,
    hasToken : true
}

export const postGenarateReducer = (state = postState,action = {}) => {
    switch(action.type){
        case postRequestPending:
            return {...state,loading:true}
        case postRequestSolved :
            return {
                ...state,
                success : action.success,
                loading:false,
                hasToken:true
                }
        case postRequestError :
            return {
            ...state,
            error : action.error,
            loading:false,
            hasToken:true
               }
        case postTokenExpired :
            return {...state,hasToken:false,loading:false} 
        default :
            return state;
    }
}
