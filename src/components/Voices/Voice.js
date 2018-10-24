import React,{Component} from 'react';

import AllVoice from './AllVoice';

class Voice extends Component {
    

    render(){
      
        return(
            
            <div>
                { this.props.voices && this.props.voices.map((voice,i)=>{
                    
                
                return(
                
                    <AllVoice  text={this.props.voices[i].text}
                                url={this.props.voices[i].url}
                                key={i}
                             />)
                 
                })}
                
            </div>
        )
    }

}

export default Voice;

