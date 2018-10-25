import React,{Component} from 'react';
import Utteranceslist from './Utteranceslist';

class Utterances extends Component {   
    render(){      
        return(            
            <div>
                { this.props.voices && this.props.voices.map((voice,i)=>{                  
                      return(                
                      <Utteranceslist  text={this.props.voices[i].text}
                                url={this.props.voices[i].url}
                                key={i}
                             />)                 
                })}                
             </div>
        )
    }
}

export default Utterances;

