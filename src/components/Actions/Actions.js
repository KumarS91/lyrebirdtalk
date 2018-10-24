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
} from './Constants';

export let getVoices=()=>(dispatch)=>{
    dispatch({type:requestPending});
    
    let location = window.location.href;
    if(location.includes('#access_token')){
            let accessToken = location.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
            fetch('https://avatar.lyrebird.ai/api/v0/generated?offset=0&limit=100',{
                method:'get',
                headers:{
                  'Content-Type' : 'application/json',
                  Authorization : `Bearer ${accessToken}`,
                  Accept: 'application/json'
                }
              })
            .then(response => response.json())
        .then(voice =>dispatch({ type : requestSolved , voice }))
        .catch((error)=> dispatch({ type : requestError , error}))
  }else{
      dispatch({type : tokenExpired})
  }
}

export let onSearchChange = (text) => ({
    type : onSearchInputChange,
    text
})

export let onPostChange = (text) => ({
    type : onPostInputChange,
    text
})

export let clearInput = () => ({
    type : clearInputs
    
})




export let postVoice=(text)=>(dispatch)=>{
    dispatch({type:postRequestPending});
    let location = window.location.href;
    if(location.includes('#access_token')){
        let accessToken = location.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        fetch('https://avatar.lyrebird.ai/api/v0/generate',{
                        method:'post',
                        headers:{
                        'Content-Type' : 'application/json',
                        Authorization : `Bearer ${accessToken}`,
                        Accept: 'application/json'
                        },
                        body:JSON.stringify({
                        "text" : `${text}`
                        })
                        
                        }).then(response => response.text())
                        .then(success => dispatch({ type : postRequestSolved , success }) )
                        .catch(error => dispatch({ type : postRequestError , error}))
        
       
    }else{
        dispatch({type : postTokenExpired})
    }
}