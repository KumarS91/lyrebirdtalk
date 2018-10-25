import './App.css';
import React, { Component } from 'react';
import {clearInput, getVoices, onPostChange, onSearchChange, postVoice} from './components/Actions/Actions';
import {Alert} from 'reactstrap';
import Utterances from '../src/components/Voices/Utterances';
import {connect} from 'react-redux';
import {Button } from 'react-bootstrap';

let mapStateToProps = state => {  
  return {
    voice : state.voiceReducer.voice ,
    getError : state.voiceReducer.error,
    isTokenValid : state.voiceReducer.hasToken,
    searchText : state.voiceReducer.searchText,
    postText : state.voiceReducer.postText,
    isPending : state.voiceReducer.isPending,
    success : state.postGenarateReducer.success,
    loading : state.postGenarateReducer.loading,
    isValidPostToken : state.postGenarateReducer.hasToken,    
  }
}

let mergeProps = (propsFromState, propsFromDispatch) => {
   return {
    ...propsFromState,
    ...propsFromDispatch,
    generateAudio(){
      const posttext = propsFromState.postText;
      return propsFromDispatch.generateAudio(posttext)
    }
  }
}

let mapDispatchToProps = (dispatch)=>{
  return {
    onGetVoices : () => dispatch(getVoices()),
    clearInput :() => dispatch(clearInput()),
    handleSearchChange : (e)=> dispatch(onSearchChange(e.target.value)),
    handlePostChange : (e)=> dispatch(onPostChange(e.target.value)),
    generateAudio : (posttext) => {
      if(posttext){
        return dispatch(postVoice(posttext))
      }  
    } 
  }
}

class App extends Component {
  getAccessToken=()=>{
    const redirect_uri = encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)
    window.location.href =`https://myvoice.lyrebird.ai/authorize?response_type=token&
      client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=voice&state=123456789`;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.loading !== nextProps.loading){
      this.props.onGetVoices()
    }
    if(this.props.isPending !== nextProps.isPending){
      this.props.clearInput()
    }
  }
 
  render() {
    let filteredVoices; 
    if(this.props.voice.length >0){
      filteredVoices = this.props.voice.filter(voices => {
        return voices.text.toLowerCase().includes(this.props.searchText.toLowerCase())
      })
    }    
     
    return (
      <div className="App">
        {(!this.props.isTokenValid || !this.props.isValidPostToken) && 
          <Alert color="warning">
            You must need access token in the url to get audio or genrate audio.
          </Alert>
        }
              <div>
                <Button bsStyle="primary" onClick={this.getAccessToken}
                  style={{marginBottom:"25px"}}>Get Access Token</Button>
              </div>
              <div>
                <Button bsStyle="info" onClick={this.props.onGetVoices}
                  style={{marginBottom:"20px"}}> Click here to view list of Voices</Button>
              </div>
              <div>
                <input className='textfield' type="text" id="text" 
                  placeholder="Enter text to search" value={this.props.searchText} onChange={this.props.handleSearchChange}/>
              </div>
              <div>            
                <input className='textfield' type="text" id="posttext" 
                  placeholder="Enter text to post" onChange={this.props.handlePostChange} value={this.props.postText}/>
                <Button bsStyle="success" onClick = {this.props.generateAudio}>Generate Audio</Button>
              </div>            
              {this.props.loading &&
                <Alert color="warning"> 
                  Loading ...
                </Alert>}     
              <div>
                <Utterances voices={filteredVoices}/>
              </div> 
       </div>
    );
  }
  }
  
export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(App);
